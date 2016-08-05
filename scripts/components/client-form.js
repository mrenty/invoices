/*
 Client Form
 <ClientForm />
 */

import React from 'react';

var ClientForm = React.createClass({
    getClient: function () {
        return {
            name: this.refs.name.value,
            address: this.refs.address.value,
            zipCode: this.refs.zipCode.value,
            city: this.refs.city.value,
        }
    },
    updateClient: function (event) {
        event.preventDefault();
        let client = this.getClient();

        this.props.updateClient(client);
    },
    saveClient: function (event) {
        event.preventDefault();
        let client = this.getClient();
        localStorage.setItem('invoice-client', JSON.stringify(client));
    },
    loadClient: function (event) {
        event.preventDefault();

        if (localStorage.getItem('invoice-client') !== null) {
            let client = JSON.parse(localStorage.getItem('invoice-client')) || {};

            this.refs.name.value = client.name;
            this.refs.address.value = client.address;
            this.refs.zipCode.value = client.zipCode;
            this.refs.city.value = client.city;

            this.props.updateClient(client);
        }
    },
    render: function () {
        return (
            <form className="client-form" ref="clientForm" onSubmit={this.updateClient}>
                <input type="text" ref="name" placeholder="Name" />
                <input type="text" ref="address" placeholder="Address" />
                <input type="text" ref="zipCode" placeholder="Zip-code" />
                <input type="text" ref="city" placeholder="City" />
                <button type="submit">Update</button>
                <button type="button" onClick={this.saveClient}>Save</button>
                <button type="button" onClick={this.loadClient}>Get latest</button>
            </form>
        )
    }
});

export default ClientForm;