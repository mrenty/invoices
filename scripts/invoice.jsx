import React from 'react';
import CSSTransitionGroup from 'react-addons-css-transition-group';

import h from './helpers';

class Invoice extends React.Component{
    constructor(props) {
        super(props);
    }
    render() {
        const company = this.props.company;
        const client = this.props.client;
        const meta = this.props.meta;
        const prices = this.props.prices;
        return (
            <div className="preview">
                <div className="document">
                    <header className="invoice__header">
                        <img className="invoice__logo" src={company.basic.logo} alt={company.basic.name}/>

                        <div className="invoice__contact-info">
                            <div className="invoice__sender">
                                <h2 className="invoice__name">{company.basic.name}</h2>
                                <p>{company.basic.address}</p>
                                <p>{company.basic.zipCode} {company.basic.city}</p>

                                {Object.keys(company.extra).map(key => {
                                    return <p key={key} className="invoice__extra">{company.extra[key]}</p>
                                })}
                            </div>

                            <div className="invoice__client">
                                <h2 className="invoice__name">{client.name}</h2>
                                <p>{client.address}</p>
                                <p>{client.zipCode} {client.city}</p>
                            </div>
                        </div>
                    </header>
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
                            {Object.keys(this.props.tasks).map(this.props.renderTask)}
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