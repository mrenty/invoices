/*
 Sidebar
 <Sidebar/>
 */

import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import AddTaskForm from './add-task-form';
import MetaForm from './meta-form';
import ClientForm from './client-form';

var Sidebar = React.createClass({
    render: function () {
        return (
            <div className="sidebar">
                <Tabs>
                    <TabList>
                        <Tab className="tab">Tasks</Tab>
                        <Tab>Meta</Tab>
                        <Tab>Client</Tab>
                    </TabList>

                    <TabPanel>
                        <h2>Task</h2>
                        <AddTaskForm {...this.props} />
                    </TabPanel>
                    <TabPanel>
                        <h2>Meta</h2>
                        <MetaForm {...this.props} />
                    </TabPanel>
                    <TabPanel>
                        <h2>Client</h2>
                        <ClientForm {...this.props} />
                    </TabPanel>
                </Tabs>
                <div className="sidebar__actions">
                    <button className="print" onClick={window.print}>Print</button>
                </div>
            </div>
        )
    }
});

export default Sidebar;