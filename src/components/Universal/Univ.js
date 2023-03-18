import React, { useState, useEffect } from 'react';
import Sidebar from '../Main/SideBar/Sidebar'
import Explorer from '../Main/Explorer/Explorer'
import Header from '../Main/Header/Header';
import PanelView from '../modal.panel/modal.panel.header.view';
import InputBox from '../modal.panel/modal.textfield.view/modal.textfield.view';

// Importing Side Panel data!
import { root } from '../Main/root/root';
import { getData, uploadFile, createFolder } from '../../Controller/Requests/Function';

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

    // Modal State handler!
    const [modal, setModal] = useState({
        show: false,
        header: undefined,
        body: false,
        bodyText: undefined,
        footer: false,
        footerAttr: {
            variant1: "secondary",
            variant2: "primary",
            btnText1: "Cancel",
            btnText2: "OK"
        },
        onHide : function(){
            closeModal()
        } 
    })

    // Input State Handler!
    const [modalInput, setModalInput] = useState();

    // Side Bar File Selection Handler!
    function handleSelect(data) {

        // Check the curernt path of the content!
        var currentPath = content.split("/");

        if (currentPath[1] === data) {
            return;
        } else {
            // Content state update to get the valid data from the content server!
            setContent((options) => {
                if (options.indexOf("/") > -1) {
                    if (cabinet.includes(data)) {
                        const cabinetValue = data;
                        const updateValue = options.replace(/\/\w+$/, "/" + cabinetValue);
                        // Get the data from the content server!
                        getExplorerData(props.id, updateValue);
                        return updateValue;
                    } else {
                        return;
                    }
                } else {
                    const updateValue = options.concat("/" + data);
                    // Get the data from the content server!
                    getExplorerData(props.id, updateValue);
                    return updateValue;
                }
            })

            // Update the crumbs data only when the selected values are not from the cabinets data!
            // Crumb data which needs to be modified later : TODO
            setCrumb((opt => {
                if (cabinet.includes(data)) {
                    const updatedOptions = [data]; // Used array data type, cause we store this in the local storage with JSON.stringify usage!
                    setStorage(root.breadCrumb, JSON.stringify(updatedOptions));
                    return updatedOptions;
                } else {
                    const updatedOptions = [...opt, data];
                    setStorage(root.breadCrumb, JSON.stringify(updatedOptions));
                    return updatedOptions;
                }
            }));
        }
    }

    // Handle Crumb Selection!
    function crumbSelection(data) {
        console.log("Crumb Selection triggered", data);
    }

    // Get explorer data!
    async function getExplorerData(id, node) {
        setLoader(true);
        const result = await getData(id, node);
        if (result.status === 200) {
            setExplorer(result.data.message);
            setLoader(false);
        } else {
            console.error(result.data.message);
            setLoader(false);
        }
    }

    // Get Cabinet Data
    async function getCabinetData(id, node) {
        setLoader(true);
        const result = await getData(id, node);
        if (result.status === 200) {
            setCabinet(result.data.message);
            setLoader(false);
        } else {
            console.error(result.data.message);
            setLoader(false);
        }
    }

    // Upload the file to the server
    async function handleUpload(data){
        setLoader(true);
        const result = await uploadFile(data, content, props.id); // Have a modal to let the user know that the file has been uploaded!
        if(result.status === 200){
            getExplorerData(props.id, content);
            setLoader(false);
        } else {
            console.error(result.data.message);
            setLoader(false);
        }
    }

    // Handle Crumbs Dropdown action!
    async function handleAction(data){
        switch(data){
            case "New Folder":
                const _modalData = {
                    header: "Folder Creation",
                    footer: true,
                    show: true,
                    body: true,
                }
                populateModal(_modalData);
                break;
            case "Properties": 
                console.log("Hey hey switch!")
                break;
        }
    }

    // Open and Close Modal
    function populateModal(_modalData){
        setModal({
            ...modal,
            header: _modalData.header,
            footer: _modalData.footer,
            show: _modalData.show,
            body: _modalData.body
        })
    }

    function closeModal(){
        setModal({
            ...modal,
            show: false,
            show: undefined,
            header: undefined,
            body: undefined,
            bodyText: undefined,
            footer: undefined,
        })
    }

    // Folder Creation!
    async function folderCreation(path, id){
       const result =  await createFolder(path, id);
       if(result.status === 200){
        closeModal() // Close the modal before making the call
        getExplorerData(id, content); // Call the getExplorer data to make the changes appear from the content server!
       } else {
        console.error(result.data.message);
       }
    }

    // On Modal Success!
    async function onModalSuccess(){
        // Form the path with the folder name defined
        const path = content + "/" + modalInput // Folder Name defined in the modal textarea view!
        folderCreation(path, props.id);
    }

    // Input Box for the modal to handle the folder creation data
    function Input(placeholder, className){
        return(
            <InputBox placeholder = {placeholder} className = {className} onChange = {(data) => setModalInput(data)} />
        )
    }

    // Get the side tree data before the page renders!
    useEffect(() => {
        getCabinetData(props.id, getStorage(root.content));
    }, [])


    if (props.footerHeight !== undefined && loader === false) {
        return (
            <div>
                {
                    modal ? (
                        <PanelView onHide = {modal.onHide} show = {modal.show} header = {modal.header} body = {modal.body}
                        footer = {modal.footer} footerAttr = {modal.footerAttr}
                        bodyText = {Input("Enter your folder name", "form-control")}
                        onModalSuccess = {() => onModalSuccess()}
                        />
                    ) : (
                        null
                    )
                }
                <div className="universal">
                    <Header root={root.prop} crumbData={crumb} crumbSelection={(data) => crumbSelection(data)} 
                    uploadFile = {(data) => handleUpload(data)}
                    action = {(data) => handleAction(data)}
                    />
                    <div className="main-container">
                        <Sidebar height={props.windowHeight - props.footerHeight} root={cabinet} handleSelect={(data) => handleSelect(data)} />
                        <Explorer height={props.windowHeight - props.footerHeight} explorer={explorer} />
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <Spinner width="120px" height="120px" />
        )
    }


}

export default Univ;