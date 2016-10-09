/*
 Client Form
 <ClientForm />
 */

import React from 'react';
import h from './../helpers';

class ClientForm extends React.Component{
    constructor(props) {
        super(props);
        this.getClient = this.getClient.bind(this);
        this.updateClient = this.updateClient.bind(this);
        this.saveClient = this.saveClient.bind(this);
        this.loadClient = this.loadClient.bind(this);
        this.setNotification = this.setNotification.bind(this);
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

        for(let prop in Object.values(client)) {
            if (Object.values(client)[prop] !== null) {
                this.props.updateClient(client);
                return;
            }
        }
    }
    saveClient(event) {
        event.preventDefault();
        let client = this.getClient();
        for(let prop in Object.values(client)) {
            if (Object.values(client)[prop] !== null) {
                localStorage.setItem('invoice-client', JSON.stringify(client));
                this.setNotification('Saved client info!');
                return;
            } else {
                this.setNotification('No data found');
            }
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
            this.setNotification('Loaded client info');
        } else {
            this.setNotification('No data found');
        }
    }
    setNotification(message) {
        if (!('Notification' in window)) {
            return;
        }

        const delay = this.props.delay;

        Notification.requestPermission().then(function() {
            const options = {
                body: message,
                icon: '/assets/badge.png'
            };

            let n = new Notification('Invoices', options);
            setTimeout(
                () => {
                    n.close.bind(n);
                }, delay
            );
        });
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
            </div>
        )
    }
}

ClientForm.propTypes = {

    delay: React.PropTypes.number

};

ClientForm.defaultProps = {

    delay: 4000

};

export default ClientForm;