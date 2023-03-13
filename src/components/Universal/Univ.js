import React, {useState, useEffect} from 'react';
import Sidebar from '../Main/SideBar/Sidebar'
import Explorer from '../Main/Explorer/Explorer'
import Header from '../Main/Header/Header'

// Importing Side Panel data!
import { root } from '../Main/root/root';
import { getData } from '../../Controller/Requests/Function';

// Importing storage functions!
import { getStorage, setStorage } from '../../Controller/Storage';
import Spinner from '../Loader/Spinner';

const Univ = (props) => {

    // Side bar state handler!
    const [crumb, setCrumb] = useState(JSON.parse(getStorage(root.breadCrumb)));

    // Content state handler!
    const [content, setContent] = useState(getStorage(root.content));

    // Cabinets & Explorer state handler!
    const [cabinet, setCabinet] = useState([]);
    const [explorer, setExplorer] = useState([]);

    // Loader state handler!
    const [loader, setLoader] = useState(false);

    // Side Bar File Selection Handler!
    function handleSelect(data) {

        // Content state update to get the valid data from the content server!
       setContent((options) => {
        const updateValue = options.concat("/"+data);
        // Get the data from the content server!
        getExplorerData(props.id, updateValue);
        return updateValue;
       })

        // Crumb data which needs to be modified later : TODO
        // setCrumb((opt => {
        //     const updatedOptions = [...opt, data];
        //     setStorage(root.breadCrumb, JSON.stringify(updatedOptions));
        //     return updatedOptions;
        // }));
    }

    // Handle Crumb Selection!
    function crumbSelection(data) {
        console.log("Crumb Selection triggered", data);
    }

    // Get explorer data!
    async function getExplorerData(id, node){
        setLoader(true);
        const result = await getData(id, node);
        if(result.status === 200){
            setExplorer(result.data.message);
            setLoader(false);
        } else {
            console.error(result.data.message);
            setLoader(false);
        }
    }

    // Get Cabinet Data
    async function getCabinetData(id, node){
        setLoader(true);
        const result = await getData(id, node);
        if(result.status === 200){
            setCabinet(result.data.message);
            setLoader(false);
        } else {
            console.error(result.data.message);
            setLoader(false);
        }
    }

    // Get the side tree data before the page renders!
    useEffect(() => {
        getCabinetData(props.id, getStorage(root.content));
    }, [])


    if(props.footerHeight !== undefined && loader === false){
        return (
            <div>
                <div className="universal">
                    <Header root={root.prop} crumbData={crumb} crumbSelection={(data) => crumbSelection(data)} />
                    <div className="main-container">
                        <Sidebar height={props.windowHeight - props.footerHeight} root={cabinet} handleSelect={(data) => handleSelect(data)} />
                        <Explorer height={props.windowHeight - props.footerHeight} explorer = {explorer} />
                    </div>
                </div>
            </div>
        )
    } else {
        return(
            <Spinner width = "120px" height = "120px" />
        )
    }


}

export default Univ;