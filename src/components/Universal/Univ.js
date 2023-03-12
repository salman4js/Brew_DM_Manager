import React, {useState} from 'react';
import Sidebar from '../Main/SideBar/Sidebar'
import Explorer from '../Main/Explorer/Explorer'
import Header from '../Main/Header/Header'

// Importing Side Panel data!
import { root } from '../Main/root/root';

// Importing storage functions!
import { getStorage, setStorage } from '../../Controller/Storage';
import Spinner from '../Loader/Spinner';

const Univ = (props) => {

    // Side bar state handler!
    const [crumb, setCrumb] = useState(JSON.parse(getStorage(root.breadCrumb)))

    // Side Bar File Selection Handler!
    function handleSelect(data) {
        setCrumb((opt => {
            const updatedOptions = [...opt, data];
            setStorage(root.breadCrumb, JSON.stringify(updatedOptions));
            return updatedOptions;
        }))
    }

    // Handle Crumb Selection!
    function crumbSelection(data) {
        console.log("Crumb Selection triggered", data);
    }


    if(props.footerHeight !== undefined){
        return (
            <div>
                <div className="universal">
                    <Header root={root.prop} crumbData={crumb} crumbSelection={(data) => crumbSelection(data)} />
                    <div className="main-container">
                        <Sidebar height={props.windowHeight - props.footerHeight} root={root.sideData} handleSelect={(data) => handleSelect(data)} />
                        <Explorer height={props.windowHeight - props.footerHeight} />
                    </div>
                </div>
            </div>
        )
    } else {
        return(
            <Spinner />
        )
    }


}

export default Univ;