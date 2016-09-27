/*
 Header
 <Header />
 */

import React from 'react';

class Header extends React.Component{
    constructor(props) {
        super(props);
    }
    render() {
        const company = this.props.company;
        const client = this.props.client;
        return (
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
        )
    }
}

export default Header;