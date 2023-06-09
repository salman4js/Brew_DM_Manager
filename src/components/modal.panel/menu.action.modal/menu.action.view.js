import React from "react";


const ActionItems = (props) => {

    if (!props.actionItems.isDirectory) {
        return (
            <div className="menu-action-items">
                {props.actionItems.btnAttr.btn1.visible() && (
                    <div className="menu-action-item btn btn-light" onClick={() => props.onDownload(props.filePath, props.fileName)}>{props.actionItems.btnAttr.btn1.text}</div>
                )}
                <div className="menu-action-item btn btn-light" onClick={() => props.onShow(props.fileName, props.filePath)}>{props.actionItems.btnAttr.btn2}</div>
                {props.actionItems.btnAttr.btn3.visible() && (
                    <div className="menu-action-item btn btn-light" onClick={() => props.onEditor(props.fileName, props.filePath, props.version)}>{props.actionItems.btnAttr.btn3.text}</div>
                )}
                {props.actionItems.btnAttr.btn4.visible() && (
                    <div className="menu-action-item btn btn-light" onClick={() => props.onDelete(props.fileName, props.filePath)}>{props.actionItems.btnAttr.btn4.text}</div>
                )}
            </div>
        )
    } else {
        return(
            <div>
                {props.actionItems.btnAttr.btn4.visible() && (
                    <div className="menu-action-item btn btn-light" onClick={() => props.onDelete(props.fileName, props.filePath)}>{props.actionItems.btnAttr.btn4.text}</div>
                )}
            </div>
        )
    }
}

export default ActionItems;