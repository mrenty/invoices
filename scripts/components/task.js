/*
 Task
 <Task />
 */

import React from 'react';
import h from './../helpers';

class Task extends React.Component{
    constructor(props) {
        super(props);
    }
    render() {
        let details = this.props.details;
        return (
            <tr>
                <td>
                    <button className="invoice__remove" onClick={this.props.removeTask}>Remove</button>
                    <span className="invoice__task">{details.name}</span>
                    {details.desc}
                </td>
                <td>{h.formatPrice(details.rate)}</td>
                <td>{details.hours}</td>
                <td>{h.formatPrice(details.totalExcl)}</td>
            </tr>
        )
    }
}

export default Task;