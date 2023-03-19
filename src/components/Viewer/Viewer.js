import React, { useState } from 'react';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';

const Viewer = (props) => {

    // Page Number State Handler!
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    // On Document Load Function!
    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
        setPageNumber(2);
    }
    
    // Move Forward!
    function goToNextPage(){
        setPageNumber(pageNumber + 1);
    }

    // Move Backward!
    function goToPrevPage(){
        setPageNumber(pageNumber - 1)
    }

    return (
        <div>
            <div style={{ width: window.innerWidth}}>
                <Document
                    file={props.file}
                    onLoadSuccess={onDocumentLoadSuccess}
                >
                    <Page pageNumber={pageNumber} width={window.innerWidth} />
                </Document>

            </div>
        </div>
    )
}

export default Viewer;