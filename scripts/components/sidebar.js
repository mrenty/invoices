/*
 Sidebar
 <Sidebar/>
 */

import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import AddTaskForm from './add-task-form';
import MetaForm from './meta-form';

var Sidebar = React.createClass({
    render: function () {
        return (
            <div className="sidebar">
                <Tabs>
                    <TabList>
                        <Tab className="tab">Tasks</Tab>
                        <Tab>Meta</Tab>
                    </TabList>

                    <TabPanel>
                        <h2>Task</h2>
                        <AddTaskForm {...this.props} />
                    </TabPanel>
                    <TabPanel>
                        <h2>Meta</h2>
                        <MetaForm {...this.props} />
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