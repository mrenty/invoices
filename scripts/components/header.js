/*
 Header
 <Header />
 */

import React from 'react';

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

export default Header;