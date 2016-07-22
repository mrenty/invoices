import React from 'react';
import ReactDOM from 'react-dom';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import { Router, Route } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import h from './helpers';

/*
 App
 */

var App = React.createClass({
    getInitialState: function () {
        return {
            tasks: {},
            meta: {
                docnr: '#01-001',
                date: h.getToday()
            }
        }
    },
    addTask: function (task) {
        let timestamp = (new Date()).getTime();
        this.state.tasks['task-' + timestamp] = task;
        this.setState({tasks: this.state.tasks});
    },
    removeTask: function (task) {
        let tasks = Object.keys(this.state.tasks)
            .filter(key => key !== task)
            .reduce((result, current) => {
                result[current] = this.state.tasks[current];
                return result;
            }, {});
        this.setState({tasks: tasks});
    },
    renderTask: function (key) {
        return <Task key={key} index={key} details={this.state.tasks[key]}
                     removeTask={this.removeTask.bind(this, key)}/>
    },
    updateMeta: function (meta) {
        this.setState({meta: meta});
    },
    renderTotal:function () {
        let taskIds = Object.keys(this.state.tasks);

        var total = taskIds.reduce((prevTotal, key)=> {

            let task = this.state.tasks[key];

            if (task) {
                return prevTotal + parseFloat(task.totalExcl) || 0;
            }

            return prevTotal;
        }, 0);
        return total;
    },
    render: function () {
        let companyInfo = require('./company-info');
        return (
            <div>
                <Sidebar addTask={this.addTask} updateMeta={this.updateMeta} />
                <div className="preview">
                    <div className="document">
                        <Header company={companyInfo} />
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
});

/*
 Header
 <Header />
 */

var Header = React.createClass({
    render: function () {
        const company = this.props.company;
        return (
            <header className="invoice__header">
                <img className="invoice__logo" src={company.basic.logo} alt={company.basic.name}/>

                <div className="invoice__sender">
                    <h2 className="invoice__name">{company.basic.name}</h2>
                    <p>{company.basic.address}</p>
                    <p>{company.basic.zipcode} {company.basic.city}</p>

                    {Object.keys(company.extra).map(key => {
                        return <p key={key} className="invoice__extra">{company.extra[key]}</p>
                    })}
                </div>
            </header>
        )
    }
});

/*
 Task
 <Task />
 */

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


/*
 Add Task Form
 <AddTaskForm />
 */

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

/*
 Meta Form
 <MetaForm />
 */

var MetaForm = React.createClass({
    updateMeta: function (event) {
        event.preventDefault();
        let meta = {
            docnr: this.refs.docnr.value,
            date: this.refs.date.value,
        }

        this.props.updateMeta(meta);
    },
    render: function () {
        return (
            <form className="meta-form" ref="metaForm" onSubmit={this.updateMeta}>
                <input type="text" ref="docnr" placeholder="Document #" />
                <input type="date" ref="date" placeholder="Date" />
                <button type="submit">Update</button>
            </form>
        )
    }
});

/*
 Sidebar
 <Sidebar/>
 */

var Sidebar = React.createClass({
    render: function () {
        return (
            <div className="sidebar">
                <Tabs selectedIndex={0} >
                    <TabList>
                        <Tab className="tab">Tasks</Tab>
                        <Tab>Meta</Tab>
                    </TabList>

                    <TabPanel>
                        <h2>Task</h2>
                        <AddTaskForm {...this.props} />
                    </TabPanel>
                    <TabPanel>
                        <h2>Meta</h2>
                        <MetaForm {...this.props} />
                        <button>Load Company Info</button>
                    </TabPanel>
                </Tabs>
                <div className="sidebar__actions">
                    <button className="print" onClick={window.print}>Print</button>
                </div>
            </div>
        )
    }
})

/*
 Not Found
 */

var NotFound = React.createClass({
    render: function () {
        return <h1>Not Found!</h1>
    }
});


/*
 Routes
 */

var routes = (
    <Router history={createBrowserHistory()}>
        <Route path="/" component={App}/>
        <Route path="*" component={NotFound}/>
    </Router>
)

ReactDOM.render(routes, document.querySelector('#main'));