import React from 'react'

const BreadCrumb = (props) => {
    return (
        <span className = "crumb-container" style = {{cursor: 'pointer'}} onClick = {() => props.crumbSelection(props.crumb)}>
            {props.crumb + " / "}
        </span>
    )
}

export default BreadCrumb;