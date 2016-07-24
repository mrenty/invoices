/*
 Meta Form
 <MetaForm />
 */

import React from 'react';
import h from './../helpers';

var MetaForm = React.createClass({
    updateMeta: function (event) {
        event.preventDefault();
        let meta = {
            docnr: this.refs.docnr.value,
            date: this.refs.date.value,
        }

        this.props.updateMeta(meta);
    },
    render: function () {
        const meta = this.props.meta;
        return (
            <form className="meta-form" ref="metaForm" onSubmit={this.updateMeta}>
                <input type="text" ref="docnr" placeholder="Document #" defaultValue={meta.docnr} />
                <input type="date" ref="date" placeholder="Date" defaultValue={meta.date} />
                <button type="submit">Update</button>
            </form>
        )
    }
});

export default MetaForm;