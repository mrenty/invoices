/*
 Add Task Form
 <AddTaskForm />
 */

import React from 'react';

class AddTaskForm extends React.Component {
    constructor(props) {
        super(props);
        this.createTask = this.createTask.bind(this);
    }
    createTask(event) {
        event.preventDefault();
        const rate = parseFloat(this.refs.rate.value.replace(/,/g, '.')) * 100 || 0;
        const vat = rate * 0.21;
        const hours = parseFloat(this.refs.hours.value) || 1;
        const task = {
            name: this.refs.name.value || '',
            desc: this.refs.desc.value || '',
            rate: rate,
            hours: this.refs.hours.value,
            totalExcl: hours * rate,
            vat: hours * vat
        };

        this.props.addTask(task);
        this.refs.taskForm.reset();
        this.refs.taskForm.elements[0].focus();
    }
    render() {
        return (
            <form className="task-form" ref="taskForm" onSubmit={this.createTask}>
                <input type="text" ref="name" placeholder="Name" />
                <textarea type="text" ref="desc" placeholder="Desc"></textarea>
                <input type="text" ref="rate" placeholder="Rate" />
                <input type="text" ref="hours" placeholder="Hours" />
                <button type="submit">+ Add Task</button>
            </form>
        )
    }
}

export default AddTaskForm;