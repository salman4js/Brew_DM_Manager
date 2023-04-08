import React, {useState} from "react";
import Viewer from '../document.modal.viewer';
import DocumentHeader from "./document.viewer.header/document.viewer.header";

const DocumentViewer = (props) => {

    // Page Number State Handler!
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    // On Document Load Function!
    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
        setPageNumber(1);
    }
    
    // Move Forward!
    function goToNextPage(){
        setPageNumber(pageNumber + 1);
    }

    // Move Backward!
    function goToPrevPage(){
        setPageNumber(pageNumber - 1)
    }

    // Editor Header Options!
    const editorHeaderOptions = {
        header: true,
        controls: false,
        page: true
    }

    return (
        <div className="document-viewer-component" style={{ height: props.height + "px" }}>
            <div className="document-modal-viewer">
                <div className="document-viewer">
                    <div>
                        <DocumentHeader options = {editorHeaderOptions} goToPrevPage = {() => goToPrevPage()} goToNextPage = {() => goToNextPage()} pageNumber = {pageNumber} numPages = {numPages} cancelViewer = {() => props.cancelViewer()} />
                    </div>
                    <Viewer file={props.file} onDocumentLoadSuccess = {() => onDocumentLoadSuccess()} 
                    pageNumber = {pageNumber} 
                    setPageNumber = {(data) => setPageNumber(data)} setNumPages = {(data) => setNumPages(data)}
                    />
                </div>
            </div>
        </div>
    )
}

export default DocumentViewer;