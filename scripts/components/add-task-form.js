/*
 Add Task Form
 <AddTaskForm />
 */

import React from 'react';

var AddTaskForm = React.createClass({
    createTask: function (event) {
        event.preventDefault();
        let task = {
            name: this.refs.name.value,
            desc: this.refs.desc.value,
            price: parseFloat(this.refs.price.value.replace(/,/g, '.')),
            hours: this.refs.hours.value,
            totalExcl: ((parseFloat(this.refs.hours.value) || 1) * parseFloat(this.refs.price.value.replace(/,/g, '.'))),
            vat: (parseInt(this.refs.hours.value) * parseFloat(this.refs.price.value.replace(/,/g, '.')) * 0.21)
        }

        this.props.addTask(task);
        this.refs.taskForm.reset();
        this.refs.taskForm.elements[0].focus();
    },
    render: function () {
        return (
            <form className="task-form" ref="taskForm" onSubmit={this.createTask}>
                <input type="text" ref="name" placeholder="Name" />
                <textarea type="text" ref="desc" placeholder="Desc"></textarea>
                <input type="text" ref="price" placeholder="Price" />
                <input type="text" ref="hours" placeholder="Hours" />
                <button type="submit">+ Add Task</button>
            </form>
        )
    }
});

export default AddTaskForm;