import React, { useState } from 'react';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';

const Viewer = (props) => {

    // On Document Load Function!
    function onDocumentLoadSuccess({ numPages }) {
        props.setNumPages(numPages);
        props.setPageNumber(1);
    }


    return (
        <div>
            <div>
                <Document
                    file={props.file}
                    onLoadSuccess={onDocumentLoadSuccess}
                >
                    <Page pageNumber={props.pageNumber}/>
                </Document>

            </div>
        </div>
    )
}

export default Viewer;