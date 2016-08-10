import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';

import NotFound from './components/not-found';
import App from './components/app';

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