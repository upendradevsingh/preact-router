
import { ROUTE_PUSH_EVENT } from './Events';

const createNavigator = (history) => {
    const target = document;
    return (path, data = {}) => {
        history.push(path, data);
        target.dispatchEvent(ROUTE_PUSH_EVENT, data);
    };
};

export default createNavigator;
