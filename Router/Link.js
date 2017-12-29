/* eslint-disable */
import { h } from 'preact';
import { ROUTE_PUSH_EVENT } from './Events';
/** @jsx h */

const Link = ({ to, history, ...rest }) => {
    const { className, children } = rest;
    const onClick = (e) => {
        e.preventDefault();
        const { currentTarget: { href } } = e;
        history.push(href, state);
        document.dispatchEvent(ROUTE_PUSH_EVENT);
    }
    return (
        <a
            href={to}
            className={className}
            onClick={onClick}
        >
            {children}
        </a>
    );
}

export default Link;