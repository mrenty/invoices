/*
 Client Form
 <ClientForm />
 */

import React from 'react';

var ClientForm = React.createClass({
    updateClient: function (event) {
        event.preventDefault();
        let client = {
            name: this.refs.name.value,
            address: this.refs.address.value,
            zipCode: this.refs.zipCode.value,
            city: this.refs.city.value,
        }

        this.props.updateClient(client);
    },
    render: function () {
        return (
            <form className="client-form" ref="clientForm" onSubmit={this.updateClient}>
                <input type="text" ref="name" placeholder="Name" />
                <input type="text" ref="address" placeholder="Address" />
                <input type="text" ref="zipCode" placeholder="Zip-code" />
                <input type="text" ref="city" placeholder="City" />
                <button type="submit">Update</button>
            </form>
        )
    }
});

export default ClientForm;