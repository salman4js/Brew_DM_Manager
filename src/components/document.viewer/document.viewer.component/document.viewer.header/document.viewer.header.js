import React from "react";
import { root } from "../../../Main/root/root";
import DocumentControl from "../document.viewer.header.control.js/document.viewer.header.control";

const DocumentHeader = (props) => {
    return (
        <div>
            <span className="document-header text-header">
                {root.DocumentHeader}
            </span>
            <span className="document-viewer-control-key">
                <span style={{ marginRight: '20px' }}>
                    {root.page} {props.pageNumber} of {props.numPages}
                </span>
                <DocumentControl goToPrevPage={() => props.goToPrevPage()}
                    goToNextPage={() => props.goToNextPage()} cancelViewer = {() => props.cancelViewer()}
                />
            </span>
        </div>
    )
}

export default DocumentHeader;