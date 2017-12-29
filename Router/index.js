import { h, Component } from 'preact';
import pathToRegexp from 'path-to-regexp';
import createHistory from 'history/createBrowserHistory';
import Route from './Route';
import RawLink from './Link';
import bindHistory from './BindHistory';
import createNavigator from './Navigate';
/** @jsx h */
/* eslint-disable react/prop-types */

const history = createHistory();
const Link = bindHistory(RawLink, history);
const navigate = createNavigator(history);

class Router extends Component {
    constructor(props) {
        super(props);
        const resolvedRoutes = {};
        const { children } = props;
        const { location: { pathname: currentUrl } } = window;
        const routes = children.reduce((acc, route) => {
            const { attributes: { path, component, ...rest } } = route;
            if (path) {
                acc.set(path, { component, ...rest });
            }
            return acc;
        }, new Map());

        this.state = {
            history,
            routes,
            resolvedRoutes,
            currentUrl
        };
    }

    componentDidMount() {
        window.onpopstate = (e) => {
            this.setState({
                currentUrl: location.pathname,
                e
            });
        };
        document.addEventListener('ROUTE_PUSH', () => {
            this.setState({
                currentUrl: location.pathname
            });
        });
    }
    checkRegExpPath(pathname) {
        const { routes, resolvedRoutes } = this.state;
        const iterator = routes.keys();
        let loopOver = true;
        let route = {};
        do {
            const { value, done } = iterator.next();
            if (done) {
                break;
            }
            const regexp = pathToRegexp(value);

            if (regexp.exec(pathname) !== null) {
                route = routes[value];
                this.setState({
                    ...resolvedRoutes,
                    [pathname]: route
                });
            }

            loopOver = !done;
        } while (loopOver);

        return route;
    }

    isPathExist(pathname) {
        const { routes, resolvedRoutes } = this.state;
        const route = resolvedRoutes[pathname];
        if (route) {
            return route;
        }
        if (routes.has(pathname)) {
            return routes.get(pathname);
        }

        return {};
    }

    findCurrentPath() {
        const { location: { pathname } } = window;
        let component = this.isPathExist(pathname);

        if (!component) {
            component = this.checkRegExpPath(pathname);
        }

        return component;
    }
    render(props) {
        const { component: CurrentComponent, ...rest } = this.findCurrentPath();
        return (
            <div>
                {CurrentComponent && <CurrentComponent history={history} {...props} {...rest} />}
            </div>
        );
    }
}

export default Router;
export {
    Router,
    Route,
    Link,
    navigate
};
