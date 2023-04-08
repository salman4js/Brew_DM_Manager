import React from "react";
import Editor from "../Editor";
import EditorHeader from "../editor.header.view/editor.header.view";

const EditorView = (props) => {

    // Editor Header Options!
    const editorHeaderOptions = {
        header: false,
        controls: true,
        page: false,
        headerText: props.options.headerText
    }

    return (
        <div style = {{width : "100%"}}>
            <EditorHeader options = {editorHeaderOptions} headerHeight = {(data) => props.headerHeight(data) } cancelEditor = {() => props.cancelEditor()} />
            <Editor options = {props.options} data = {(data, fileName) => props.data(data, props.options.headerText)} saveText = {() => props.saveText()} />
        </div>
    )
}

export default EditorView;