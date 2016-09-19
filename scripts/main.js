import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';

import NotFound from './components/not-found';
import App from './components/app';

/*
 Routes
 */

var routes = (
    <Router history={browserHistory}>
        <Route path="/" component={App}/>
        <Route path="*" component={NotFound}/>
    </Router>
)

ReactDOM.render(routes, document.querySelector('#main'));