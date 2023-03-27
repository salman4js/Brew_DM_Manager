import React from "react";


const ActionItems = (props) => {
    
    return(
        <div className = "menu-action-items">
            <div className = "menu-action-item btn btn-light" onClick = {() => props.onDownload()}>{props.actionItems.btnAttr.btn1}</div>
            <div className = "menu-action-item btn btn-light" onClick={() => props.onShow(props.fileName, props.filePath)}>{props.actionItems.btnAttr.btn2}</div>
        </div>
    )
}

export default ActionItems;