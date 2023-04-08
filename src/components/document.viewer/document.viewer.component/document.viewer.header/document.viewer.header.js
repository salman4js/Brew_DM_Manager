import React from "react";
import { root } from "../../../Main/root/root";
import DocumentControl from "../document.viewer.header.control.js/document.viewer.header.control";

const DocumentHeader = (props) => {

    return (
        <div className = "document-header-control">
            <span className="document-header text-header">
                {props.options.headerText === undefined ? root.DocumentHeader : props.options.headerText}
            </span>
                <span className="document-viewer-control-key">
                    {props.options.header && (
                        <div>
                            <span style={{ marginRight: '20px' }}>
                                {root.page} {props.pageNumber} of {props.numPages}
                            </span>
                            <DocumentControl goToPrevPage={() => props.goToPrevPage()}
                                goToNextPage={() => props.goToNextPage()} cancelViewer={() => props.cancelViewer()}
                            />
                        </div>
                    )}
                    {props.options.controls && (
                        <div className = "document-editor-control">
                            <span className = "document-viewer-controls" onClick={() => props.cancelEditor()}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-dash-square-fill" viewBox="0 0 16 16">
                                    <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm2.5 7.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1z" />
                                </svg>
                            </span>
                        </div>
                    )}
                </span>
        </div>
    )
}

export default DocumentHeader;