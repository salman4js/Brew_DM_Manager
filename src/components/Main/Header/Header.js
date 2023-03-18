import React from 'react';
import Control from './ControlKeys/Control';
import Crumbs from './BreadCrumb/Crumbs';

const Header = (props) => {
    return (
        <div className="header-container">
            <div className="header-grid-container">
                <Control />
                <Crumbs actions = {props.root} crumb = {props.crumbData} crumbSelection = {(data) => props.crumbSelection(data)}
                    uploadFile = {(data) => props.uploadFile(data)}
                />
            </div>
        </div>
    )
}

export default Header;