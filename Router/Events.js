import { ROUTE_PUSH, ROUTE_POP } from './Config';

const ROUTE_PUSH_EVENT = new Event(ROUTE_PUSH);
const ROUTE_POP_EVENT = new Event(ROUTE_POP);

export {
    ROUTE_PUSH_EVENT,
    ROUTE_POP_EVENT
};

