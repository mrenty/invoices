/*
 Client Form
 <ClientForm />
 */

import React from 'react';
import Expire from './expire';
import h from './../helpers';

class ClientForm extends React.Component{
    constructor(props) {
        super(props);
        this.state = { message: {} };
        this.getClient = this.getClient.bind(this);
        this.updateClient = this.updateClient.bind(this);
        this.saveClient = this.saveClient.bind(this);
        this.loadClient = this.loadClient.bind(this);
        this.setMessage = this.setMessage.bind(this);
    }
    getClient() {
        return {
            name: this.refs.name.value || null,
            address: this.refs.address.value || null,
            zipCode: this.refs.zipCode.value || null,
            city: this.refs.city.value || null,
        }
    }
    updateClient(event) {
        event.preventDefault();
        let client = this.getClient();

        const notEmpty = Object.keys(client).every(function(k){ return client.hasOwnProperty(k) });
        if (notEmpty) {
            this.props.updateClient(client);
            return;
        }
    }
    saveClient(event) {
        event.preventDefault();
        let client = this.getClient();

        const notEmpty = Object.keys(client).every(function(k){ return client.hasOwnProperty(k) });
        if (notEmpty) {
            localStorage.setItem('invoice-client', JSON.stringify(client));
            this.setMessage('Saved!');
            return;
        } else {
            this.setMessage('No data found');
        }
    }
    loadClient(event) {
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
            this.setMessage('No data found');
        }
    }
    setMessage(message, type) {
        this.setState({message: {type: type || 'info', text: message}});
        setTimeout(
            () => {
                this.setState({message: {}});
            }, this.props.delay
        );
    }
    render() {
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
}

ClientForm.propTypes = {

    delay: React.PropTypes.number

};

ClientForm.defaultProps = {

    delay: 1000

};

export default ClientForm;