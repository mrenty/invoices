/*
 Task
 <Task />
 */

import React from 'react';
import h from './../helpers';

var Task = React.createClass({
    render: function () {
        let details = this.props.details;
        return (
            <tr>
                <td>
                    <button className="invoice__remove" onClick={this.props.removeTask}>Remove</button>
                    <span className="invoice__task">{details.name}</span>
                    {details.desc}
                </td>
                <td>{h.formatPrice(details.price)}</td>
                <td>{details.hours}</td>
                <td>{h.formatPrice(details.totalExcl)}</td>
            </tr>
        )
    }
});

export default Task;