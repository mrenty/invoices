/*
 App
 */

import React from 'react';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import Sidebar from './sidebar';
import Task from './task';
import Header from './header';

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
        let companyInfo = require('./../company-info');
        return (
            <div>
                <Sidebar addTask={this.addTask} updateMeta={this.updateMeta} meta={this.state.meta} updateClient={this.updateClient} />
                <div className="preview">
                    <div className="document">
                        <Header company={companyInfo} client={this.state.client} />
                        <div className="invoice__meta">
                            <div className="invoice__meta__data">
                                <span className="invoice__docnr">{this.state.meta.docnr}</span>
                                <time dateTime={this.state.meta.date} className="invoice__date">{h.formatDate(this.state.meta.date)}</time>
                            </div>
                            <div className="invoice__total invoice__total--large">
                                <span className="invoice__total__label">Total</span>
                                <strong>{h.formatPrice((this.renderTotal() * 0.21) + this.renderTotal())}</strong>
                            </div>
                        </div>
                        <table className="invoice__table">
                            <thead>
                            <tr>
                                <th>Task description</th>
                                <th>Rate</th>
                                <th>Hours</th>
                                <th>Line total</th>
                            </tr>
                            </thead>
                            <CSSTransitionGroup component="tbody" transitionName="task" transitionEnterTimeout={250} transitionLeaveTimeout={250}>
                                {Object.keys(this.state.tasks).map(this.renderTask)}
                            </CSSTransitionGroup>
                        </table>
                        <footer className="invoice__footer">
                            <div className="invoice__calculation">
                                <div className="invoice__calculation__item">
                                    <span className="invoice__calculation__label">Subtotal</span>
                                    <b>{h.formatPrice(this.renderTotal())}</b>
                                </div>
                                <div className="invoice__calculation__addition"></div>
                                <div className="invoice__calculation__item">
                                    <span className="invoice__calculation__label">VAT</span>
                                    <b>{h.formatPrice(this.renderTotal() * 0.21)}</b>
                                </div>
                                <div className="invoice__total">
                                    <span className="invoice__total__label">Total</span>
                                    <strong>{h.formatPrice((this.renderTotal() * 0.21) + this.renderTotal())}</strong>
                                </div>
                            </div>
                            <p className="invoice__disclaimer">Please transfer the amount within 30 days <span>IBAN {companyInfo.basic.bankAccountNumber}</span>.</p>
                        </footer>
                    </div>
                </div>
            </div>
        )
    }
}

export default App;