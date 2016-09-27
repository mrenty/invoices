/*
 Expire
 <Expire />
 */

import React from 'react';

class Expire extends React.Component{
    constructor(props) {
        super(props);
        this.state = { visible: true };
        this.setTimer = this.setTimer.bind(this);
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.children !== this.props.children) {
            this.setTimer();
            this.setState({visible: true});
        }
    }
    componentDidMount() {
        this.setTimer();
    }
    setTimer() {
        this._timer != null ? clearTimeout(this._timer) : null;

        this._timer = setTimeout(function(){
            this.setState({visible: false});
            this._timer = null;
        }.bind(this), this.props.delay);
    }
    render(){
        const className = 'form__message form__message--' + this.props.type;
        return this.state.visible
            ? <div className={className}>{this.props.children}</div>
            : <span />;
    }
}

Expire.propTypes = {

    delay: React.PropTypes.number,
    type: React.PropTypes.string

};

Expire.defaultProps = {

    delay: 1000,
    type: 'info'

};

export default Expire;