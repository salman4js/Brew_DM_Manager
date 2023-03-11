import React, {useState} from 'react';
import Sidebar from './SideBar/Sidebar';
import Explorer from './Explorer/Explorer';
import Spinner from '../Loader/Spinner';
import Header from './Header/Header';

// Importing storage functions!
import { getStorage, setStorage } from '../../Controller/Storage';

// Importing Side Panel data!
import { root } from './root/root';

const Main = (props) => {

    // Side bar state handler!
    const [crumb, setCrumb] = useState(JSON.parse(getStorage(root.breadCrumb)))

    // Side Bar File Selection Handler!
    function handleSelect(data){
        setCrumb((opt => {
           const updatedOptions = [...opt, data];
           setStorage(root.breadCrumb, JSON.stringify(updatedOptions));
           return updatedOptions;
        }))
    }

    // Handle Crumb Selection!
    function crumbSelection(data){
        console.log("Crumb Selection triggered", data);
    }

    if (props.footerHeight !== undefined) {
        return (
            <div className = "universal">
                <Header root = {root.prop} crumbData = {crumb} crumbSelection = {(data) => crumbSelection(data)}  />
                <div className="main-container">
                    <Sidebar height={props.windowHeight - props.footerHeight} root={root.sideData} handleSelect = {(data) => handleSelect(data)} />
                    <Explorer height={props.windowHeight - props.footerHeight} />
                </div>
            </div>
        )
    } else {
        return (
            <Spinner width="120px" height="120px" />
        )
    }

}

export default Main;