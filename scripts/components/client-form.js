/*
 Client Form
 <ClientForm />
 */

import React from 'react';
import Expire from './expire';
import h from './../helpers';

var ClientForm = React.createClass({
    getDefaultProps: function () {
        return {
            delay: 1000
        };
    },
    getInitialState: function () {
        return {
            message: {},
        };
    },
    getClient: function () {
        return {
            name: this.refs.name.value || null,
            address: this.refs.address.value || null,
            zipCode: this.refs.zipCode.value || null,
            city: this.refs.city.value || null,
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
        for(let prop in Object.values(client)) {
            if (Object.values(client)[prop] !== null) {
                localStorage.setItem('invoice-client', JSON.stringify(client));
                this.setMessage('Saved!');
                return;
            }
        }
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
            this.setMessage('Loaded');
        } else {
            this.setMessage('No data found', 'error');
        }
    },
    setMessage: function (message, type) {
        this.setState({message: {type: type || 'info', text: message}});
        setTimeout(
            () => {
                this.setState({message: {}});
            }, this.props.delay
        );
    },
    render: function () {
        const isLocalStorageSupported = !h.localStorageSupport;
        return (
            <div>
                <form className="client-form" ref="clientForm" onSubmit={this.updateClient}>
                    <input type="text" ref="name" placeholder="Name" />
                    <input type="text" ref="address" placeholder="Address" />
                    <input type="text" ref="zipCode" placeholder="Zip-code" />
                    <input type="text" ref="city" placeholder="City" />
                    <button type="submit">Update</button>
                    <button type="button" disabled={isLocalStorageSupported} onClick={this.saveClient}>Save</button>
                    <button type="button" disabled={isLocalStorageSupported} onClick={this.loadClient}>Load</button>
                </form>
                <Expire delay={this.props.delay} type={this.state.message.type}>
                    {this.state.message.text}
                </Expire>
            </div>
        )
    }
});

export default ClientForm;