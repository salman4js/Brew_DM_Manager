import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { sublime } from '@uiw/codemirror-theme-sublime';
import { dracula } from '@uiw/codemirror-theme-dracula';
import { javascript } from '@codemirror/lang-javascript';

const Editor = (props) => {
    
    return (
        <div className = "editor-view">
            <CodeMirror
                value={props.options.value}
                height={(props.options.height - props.options.headerHeight) + "px"}
                width = {"100%"}
                theme={dracula}
                extensions={[javascript()]}
                // onChange={(editor, change) => {
                //     setStorage(storage, editor);
                //     props.data(editor)
                // }}
            />
        </div>
    )
}

export default Editor;