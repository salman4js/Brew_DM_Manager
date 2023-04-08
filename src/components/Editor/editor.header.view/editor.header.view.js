import React, {useEffect, useRef} from 'react';
import DocumentHeader from '../../document.viewer/document.viewer.component/document.viewer.header/document.viewer.header';


const EditorHeader = (props) => {

    // Initializing header reference!
    const headerRef = useRef(null);

    useEffect(() => {
        props.headerHeight(headerRef.current.offsetHeight);
    }, [])


    return(
        <div ref = {headerRef}>
            <DocumentHeader options = {props.options} cancelEditor = {() => props.cancelEditor()} />
        </div>
    )
}

export default EditorHeader;