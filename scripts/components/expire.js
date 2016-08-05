/*
 Expire
 <Expire />
 */

import React from 'react';

var Expire = React.createClass({
    getDefaultProps: function () {
        return {
            delay: 1000,
            type: 'info'
        };
    },
    getInitialState: function () {
        return {visible: true};
    },
    componentWillReceiveProps: function (nextProps) {
        if (nextProps.children !== this.props.children) {
            this.setTimer();
            this.setState({visible: true});
        }
    },
    componentDidMount: function () {
        this.setTimer();
    },
    setTimer: function () {
        this._timer != null ? clearTimeout(this._timer) : null;

        this._timer = setTimeout(function(){
            this.setState({visible: false});
            this._timer = null;
        }.bind(this), this.props.delay);
    },
    render: function(){
        const className = 'form__message form__message--' + this.props.type;
        return this.state.visible
            ? <div className={className}>{this.props.children}</div>
            : <span />;
    }
});

export default Expire;