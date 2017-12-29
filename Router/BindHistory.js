/* eslint-disable */
import { h } from 'preact';
/** @jsx h */

const BindHistory = ({ component: TargetComponent }, history) => {
    return (props) => {
        return <TargetComponent history={history} {...props} />
    }
};

export default BindHistory;

