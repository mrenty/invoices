var React = require('react');
var ReactDOM = require('react-dom');

var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var createBrowserHistory = require('history/lib/createBrowserHistory');

var h = require('./helpers');

/*
 App
 */

var App = React.createClass({
    getInitialState: function () {
        return {
            tasks: {}
        }
    },
    addTask: function (task) {
        var timestamp = (new Date()).getTime();
        // update the state object
        this.state.tasks['task-' + timestamp] = task;
        // set the state
        this.setState({tasks: this.state.tasks});
    },
    removeTask: function (task) {
        var tasks = Object.keys(this.state.tasks)
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
    renderTotal:function () {
        var taskIds = Object.keys(this.state.tasks);

        var total = taskIds.reduce((prevTotal, key)=> {

            var task = this.state.tasks[key];

            if (task) {
                return prevTotal + parseFloat(task.totalExcl) || 0;
            }

            return prevTotal;
        }, 0);
        return total;
    },
    render: function () {
        return (
            <div>
                <Inventory addTask={this.addTask} />
                <div className="preview">
                    <div className="document">
                        <Header/>
                        <div className="invoice__meta">
                            <div className="invoice__total invoice__total--large">
                                <span className="invoice__total__label">Total</span>
                                {h.formatPrice((this.renderTotal() * 0.21) + this.renderTotal())}
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
                            <tbody>
                                {Object.keys(this.state.tasks).map(this.renderTask)}
                            </tbody>
                        </table>
                        <footer className="invoice__footer">
                            <div className="invoice__calculation">
                                <div className="invoice__calculation__item">
                                    <span className="invoice__calculation__label">Subtotal</span>
                                    {h.formatPrice(this.renderTotal())}
                                </div>
                                <div className="invoice__calculation__addition"></div>
                                <div className="invoice__calculation__item">
                                    <span className="invoice__calculation__label">VAT</span>
                                    {h.formatPrice(this.renderTotal() * 0.21)}
                                </div>
                                <div className="invoice__total">
                                    <span className="invoice__total__label">Total</span>
                                    {h.formatPrice((this.renderTotal() * 0.21) + this.renderTotal())}
                                </div>
                            </div>
                            <p className="invoice__disclaimer">Please transfer the amount within 30 days IBAN 1234 5678 9010.</p>
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
        var company = require('./company-info');
        return (
            <header className="invoice__header">
                <img className="invoice__logo" src="http://placehold.it/120x32" alt="{company.name}"/>

                <div className="invoice__sender">
                    <h2 className="invoice__name">{company.name}</h2>
                    <p>{company.address}</p>
                    <p>{company.zipcode} {company.city}</p>
                    <p>{company.vatin}</p>
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
        var details = this.props.details;
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
        // 1. Stop the form from submitting
        event.preventDefault();
        // 2. Take the data from the form and create an object
        var task = {
            name: this.refs.name.value,
            desc: this.refs.desc.value,
            price: parseFloat(this.refs.price.value.replace(/,/g, '.')),
            hours: this.refs.hours.value,
            totalExcl: (parseFloat(this.refs.hours.value) * parseFloat(this.refs.price.value.replace(/,/g, '.'))),
            vat: (parseInt(this.refs.hours.value) * parseFloat(this.refs.price.value.replace(/,/g, '.')) * 0.21)
        }

        // 3. Add the task to the App State
        this.props.addTask(task);
        this.refs.taskForm.reset();
    },
    render: function () {
        return (
            <form className="task-form" ref="taskForm" onSubmit={this.createTask}>
                <input type="text" ref="name" placeholder="Name"/>
                <textarea type="text" ref="desc" placeholder="Desc"></textarea>
                <input type="text" ref="price" placeholder="Price"/>
                <input type="text" ref="hours" placeholder="Hours"/>
                <button type="submit">+ Add Task</button>
            </form>
        )
    }
});

/*
 Inventory
 <Inventory/>
 */

var Inventory = React.createClass({
    render: function () {
        return (
            <div className="sidebar">
                <h2>Task</h2>

                <AddTaskForm {...this.props} />
                <button>Load Company Info</button>
                <button className="print" onClick={window.print}>Print</button>
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