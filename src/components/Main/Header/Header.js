import React, {useEffect, useRef} from 'react';
import Control from './ControlKeys/Control';
import Crumbs from './BreadCrumb/Crumbs';

const Header = (props) => {

    // Header Component Instance!
    const headerRef = useRef(null);

    // Constructor - To send the header height, to the parent component to calculate the height of the explorer and sidebar!
    useEffect(() => {
        try{
            props.headerHeight(headerRef.current.offsetHeight);
        } catch(err){
            console.error("Header Component!")
        }
    }, [])

    return (
        <div className="header-container" ref = {headerRef}>
            <div className="header-grid-container">
                <Control />
                <Crumbs actions = {props.root} crumb = {props.crumbData} crumbSelection = {(data) => props.crumbSelection(data)}
                    uploadFile = {(data) => props.uploadFile(data)} action = {(data) => props.action(data) }
                />
            </div>
        </div>
    )
}

export default Header;