/*
 Sidebar
 <Sidebar/>
 */

import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import AddTaskForm from './add-task-form';
import MetaForm from './meta-form';
import ClientForm from './client-form';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

var Sidebar = React.createClass({
    saveToComputer: function () {
        this.save('save');
    },
    saveToDrive: function () {
        this.save('gcp');
    },
    save: function (method) {

        if (!navigator.onLine) {
            console.warn('No active internet connection!');
            return false;
        }

        const gadget = new cloudprint.Gadget();
        const name = this.props.meta.docnr;
        const a4 = {
            width: 595.28,
            height: 841.89
        };
        const element = document.querySelector('.document');
        const cache_width = element.style.width;

        const pdf = new jsPDF('p', 'mm', 'a4');
        const zoomFactor = 1.33333;

        //RETINA
        const originalWidth = element.offsetWidth;
        const originalHeight = element.offsetHeight;
        const scaledCanvas = document.createElement('canvas');
        const scaledContext = scaledCanvas.getContext('2d');

        document.body.classList.add('print-preview');
        element.style.width = (a4.width * zoomFactor) + 'px';
        element.style.height = (a4.height * zoomFactor) + 'px';

        //RETINA
        element.style.width = originalWidth + "px";
        element.style.height = originalHeight + "px";
        element.style.position = 'absolute';
        element.style.top = '0';
        element.style.left = '0';

        scaledCanvas.width = originalWidth * 2;
        scaledCanvas.height = originalHeight * 2;
        scaledCanvas.style.width = originalWidth + 'px';
        scaledCanvas.style.height = originalHeight + 'px';

        scaledContext.webkitImageSmoothingEnabled = false;
        scaledContext.mozImageSmoothingEnabled = false;
        scaledContext.imageSmoothingEnabled = false;
        scaledContext.scale(2, 2);

        html2canvas(element, {
            imageTimeout: 2000,
            removeContainer: true,
            canvas: scaledCanvas
        }).then((canvas) => {
            // Has to be JPEG since PNG crashes jsPDF
            // https://github.com/MrRio/jsPDF/issues/702
            var img = canvas.toDataURL('image/jpeg');
            pdf.addImage(img, 'JPEG', 0, 0, pdf.internal.pageSize.width, pdf.internal.pageSize.height);

            switch(method) {
                case 'gcp':
                    let rawData = pdf.output('datauristring').split(',')[1];
                    gadget.setPrintDocument('application/pdf', name, rawData, 'base64');
                    gadget.openPrintDialog();
                    break;
                default:
                    pdf.save(name + '.pdf');
            }

        });

        element.style.position = 'relative';
        element.style.width = cache_width;

        document.body.classList.remove('print-preview');
    },
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
                    <button className="print" onClick={this.saveToComputer}>Save</button>
                    <button className="print" onClick={this.saveToDrive}>Sync to Drive</button>
                </div>
            </div>
        )
    }
});

export default Sidebar;