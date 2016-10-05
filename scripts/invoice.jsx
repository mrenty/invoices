import React from 'react';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import Header from './components/header';
import Task from './components/task';

import h from './helpers';

class Invoice extends React.Component{
    constructor(props) {
        super(props);
    }
    renderTask(key) {
        const tasks = this.props.tasks;
        return <Task key={key} index={key} details={tasks[key]}
                     removeTask={this.removeTask.bind(this, key)}/>
    }
    removeTask(key) {
        delete this.props.tasks[key];
        this.setState({
            tasks : this.props.tasks
        });
    }
    render() {
        const company = require('./company-info');
        const client = this.props.client;
        const meta = this.props.meta;
        const prices = this.props.prices;
        return (
            <div className="preview">
                <div className="document">
                    <Header company={company} client={client} />
                    <div className="invoice__meta">
                        <div className="invoice__meta__data">
                            <span className="invoice__docnr">{meta.docnr}</span>
                            <time dateTime={meta.date} className="invoice__date">{h.formatDate(meta.date)}</time>
                        </div>
                        <div className="invoice__total invoice__total--large">
                            <span className="invoice__total__label">Total</span>
                            <strong>{h.formatPrice(prices.total + prices.vat)}</strong>
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
                            {Object.keys(this.props.tasks).map(this.renderTask)}
                        </CSSTransitionGroup>
                    </table>
                    <footer className="invoice__footer">
                        <div className="invoice__calculation">
                            <div className="invoice__calculation__item">
                                <span className="invoice__calculation__label">Subtotal</span>
                                <b>{h.formatPrice(prices.total)}</b>
                            </div>
                            <div className="invoice__calculation__addition"></div>
                            <div className="invoice__calculation__item">
                                <span className="invoice__calculation__label">VAT</span>
                                <b>{h.formatPrice(prices.vat)}</b>
                            </div>
                            <div className="invoice__total">
                                <span className="invoice__total__label">Total</span>
                                <strong>{h.formatPrice(prices.total + prices.vat)}</strong>
                            </div>
                        </div>
                        <p className="invoice__disclaimer">Please transfer the amount within 30 days <span>IBAN {company.basic.bankAccountNumber}</span>.</p>
                    </footer>
                </div>
            </div>
        )
    }
}

export default Invoice;