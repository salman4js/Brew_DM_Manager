import React, {useEffect} from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { sublime } from '@uiw/codemirror-theme-sublime';
import { dracula } from '@uiw/codemirror-theme-dracula';
import { javascript } from '@codemirror/lang-javascript';

const Editor = (props) => {

    // Handle Editor data function untill ctrl + s is clicked to save the changes!
    function handleData(data){
        props.data(data)
    }

    // Always listen for ctrl + s key event to save the file through add version!
    // Save the code in ctrl + save!
    useEffect(() => {
        function handleKeyDown(event) {
            if (event.ctrlKey && event.key === "s") {
                event.preventDefault();
                props.saveText();
            }
        }

        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    });
    
    return (
        <div className = "editor-view">
            <CodeMirror
                value={props.options.value}
                height={(props.options.height - props.options.headerHeight) + "px"}
                width = {"100%"}
                theme={dracula}
                extensions={[javascript()]}
                onChange={(editor, change) => {
                    handleData(editor)
                }}
            />
        </div>
    )
}

export default Editor;