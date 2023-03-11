import React from 'react';
import { IconFile, IconFolder } from '../Icons/IconsHolder'

const FileItems = (props) => {
    return (
        <div className='file-items' onClick={() => props.handleSelect(props.name)}>
            <span className="side-align brew-icon-workspace">
                <IconFolder />
            </span>
            <span className="brew-title-workspace side-align">
                {props.name}
            </span>
        </div>
    )
}

export default FileItems;