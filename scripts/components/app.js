/*
 App
 */

import React from 'react';
import Sidebar from './sidebar';
import Task from './task';
import Invoice from '../invoice.jsx';

import h from './../helpers';

class App extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            tasks: {},
            meta: {
                docnr: '#01-001',
                date: h.getToday()
            },
            client: {
                name: 'Jane Doe',
                address: '123 Main St',
                zipCode: '1234',
                city: 'Anytown'
            }
        };
        this.addTask = this.addTask.bind(this);
        this.removeTask = this.removeTask.bind(this);
        this.renderTask = this.renderTask.bind(this);
        this.updateMeta = this.updateMeta.bind(this);
        this.updateClient = this.updateClient.bind(this);
        this.renderTotal = this.renderTotal.bind(this);
    }
    addTask(task) {
        let timestamp = (new Date()).getTime();
        this.state.tasks['task-' + timestamp] = task;
        this.setState({tasks: this.state.tasks});
    }
    removeTask(key) {
        delete this.state.tasks[key];
        this.setState({
            tasks : this.state.tasks
        });
    }
    renderTask(key) {
        return <Task key={key} index={key} details={this.state.tasks[key]}
                     removeTask={this.removeTask.bind(this, key)}/>
    }
    updateMeta(meta) {
        this.setState({meta: meta});
    }
    updateClient(client) {
        this.setState({client: client});
    }
    renderTotal() {
        let taskIds = Object.keys(this.state.tasks);

        return taskIds.reduce((prevTotal, key)=> {

            let task = this.state.tasks[key];

            if (task) {
                return prevTotal + parseFloat(task.totalExcl) || 0;
            }

            return prevTotal;
        }, 0);
    }
    render() {
        const prices = {
            total: (this.renderTotal() * 0.21) + this.renderTotal(),
            vat: (this.renderTotal() * 0.21)
        };
        return (
            <div>
                <Sidebar addTask={this.addTask} updateMeta={this.updateMeta} meta={this.state.meta} updateClient={this.updateClient} />
                <Invoice client={this.state.client} meta={this.state.meta} prices={prices} tasks={this.state.tasks} />
            </div>
        )
    }
}

export default App;