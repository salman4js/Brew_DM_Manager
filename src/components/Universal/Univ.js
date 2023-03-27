import React, { useState, useEffect, useRef } from 'react';
import Sidebar from '../Main/SideBar/Sidebar'
import Explorer from '../Main/Explorer/Explorer'
import Header from '../Main/Header/Header';
import PanelView from '../modal.panel/modal.panel.header.view';
import InputBox from '../modal.panel/modal.textfield.view/modal.textfield.view';
import ActionItems from '../modal.panel/menu.action.modal/menu.action.view';

// Importing Side Panel data!
import { root } from '../Main/root/root';
import { getData, uploadFile, createFolder, downloadFile, addVersion } from '../../Controller/Requests/Function';

// Importing storage functions!
import { getStorage, setStorage } from '../../Controller/Storage';
import Spinner from '../Loader/Spinner';
import DocumentViewer from '../document.viewer/document.viewer.component/document.viewer.component';

const Univ = (props) => {

    // Side bar state handler!
    const [crumb, setCrumb] = useState(JSON.parse(getStorage(root.breadCrumb)));

    // Header Height state handler!
    const [headerHeight, setHeaderHeight] = useState("");

    // Content state handler!
    const [content, setContent] = useState(getStorage(root.content));

    // Temporary file data state handler!
    const [fileBlob, setFileBlob] = useState();

    // Cabinets & Explorer state handler!
    const [cabinet, setCabinet] = useState([]);
    const [cabinetData, setCabinetData] = useState([]);
    const [explorer, setExplorer] = useState([]);

    // Loader state handler!
    const [loader, setLoader] = useState(false);

    // File Viewer State Handler!
    const [view, setView] = useState({
        show: false,
        file: undefined
    })

    // Panel State handler!
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
        onHide: function () {
            closeModal()
        }
    })

    // Input State Handler!
    const [modalInput, setModalInput] = useState();

    // Manu Action for all the versions of the document!
    function menuAction(fileName){
        // Initiate the menu actions!
        const menuModal = {
            show: true,
            header: "What action would you like to perform?",
            body: true,
            bodyText: actionButton(fileName),
            footer: false
        }

        // Populate the modal!
        populateModal(menuModal);
    }

    // Side Bar File Selection Handler!
    function handleSelect(data) {

        // Check the curernt path of the content!
        var currentPath = afterOccurence(content, "/");

        if (currentPath === data) {
            return;
        } else {
            // Content state update to get the valid data from the content server!
            setContent((options) => {
                if (options.indexOf("/") > -1) {
                    if (checkCabinet(data) || Array.isArray(data)) {
                        if(Array.isArray(data)){
                            var cabinetValue = data.join("/")
                        } else {
                            var cabinetValue = data;
                        }
                        const updateValue = afterOccurence(options, "/");
                        const initialValue = beforeOccurence(options, "/");
                        const newValue = initialValue + "/" + updateValue.replace(updateValue, cabinetValue); // Combining the cs default data 'content' 
                        // with the replacable data from the bread crumbs
                        // Get the data from the content server!
                        getExplorerData(props.id, newValue);
                        return newValue;
                    } else {
                        // This else block if for the folders which are not in the cabinets tree structure!
                        const result = handleFolderAction(options, data);
                        return result;
                    }
                } else {
                    const result = handleFolderAction(options, data);
                    return result;
                }
            })

            // Update the crumbs data only when the selected values are not from the cabinets data!
            // Crumb data which needs to be modified later : TODO
            updateCrumb(data)
        }
    }

    // Handle Select for the first time and for the data which are not in the cabinet structure!
    function handleFolderAction(options, data) {
        const updateValue = options.concat("/" + data);
        // Get the data from the content server!
        getExplorerData(props.id, updateValue);
        return updateValue;
    }

    // substring of the data after the fisrt occurence!
    function afterOccurence(data, value) {
        return data.substring(data.indexOf(value) + 1);
    }

    // substring of the data before the first occurence!
    function beforeOccurence(data, value) {
        return data.substring(0, data.indexOf(value));
    }

    // Handle Crumb Selection!
    function crumbSelection(data) {
        const isValue = checkCrumb(data);
        if(isValue){
            let indexOfData = crumb.indexOf(data);
            let newArrOfData = crumb.slice(0, indexOfData + 1);
            handleSelect(newArrOfData);
        }
    }

    // Check Cabinet Data
    function checkCabinet(data) {
        return cabinetData.includes(data);
    }

    // Check Crumb Data!
    function checkCrumb(data){
        return crumb.includes(data);
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

    // Update Crumb on onRender!
    function updateCrumb(data) {
        setCrumb((opt => {
            if (checkCabinet(data) || Array.isArray(data)) {
                if(Array.isArray(data)){
                    var updatedOptions = [];
                    data.map((options) => {
                        updatedOptions.push(options);
                    })
                    return updatedOptions;
                    // Used array data type, cause we store this in the local storage with JSON.stringify usage!
                } else {
                    var updatedOptions = [data];
                }
                setStorage(root.breadCrumb, JSON.stringify(updatedOptions));
                return updatedOptions;
            } else {
                const updatedOptions = [...opt, data];
                setStorage(root.breadCrumb, JSON.stringify(updatedOptions));
                return updatedOptions;
            }
        }));
    }

    // Control Keys Handler!
    function navigateBack(){
        const getPath = crumb.slice(0, crumb.length -1);
        const crumbPath = getPath[getPath.length -1]; // Gets the crumb value before the current crumb value. 
        //Pass the before value to the crumbSelection to take care of the navigation part.
        crumbSelection(crumbPath);
    }

    function navigateFront(){
        return;
    }

    // Get Cabinet Data
    async function getCabinetData(id, node) {
        setLoader(true);
        const result = await getData(id, node);
        if (result.status === 200) {
            setCabinet(result.data.message);
            result.data.message.map((options, key) => {
                setCabinetData(cabinetData => [...cabinetData, options.name])
            })
            setLoader(false);
        } else {
            console.error(result.data.message);
            setLoader(false);
        }
    }

    // Upload the file to the server
    async function handleUpload(data, addVersion) {
        // Store the file value temporarily in the state handler!
        setFileBlob(data);

        setLoader(true);
        // Defining the panel state for toast message!
        const panelState = {
            show: false,
            header: undefined,
            body: false,
            bodyText: undefined,
            footer: false,
            onHide: function () {
                closeModal();
            }
        }
        const result = await uploadFile(data, content, props.id, addVersion); // Have a modal to let the user know that the file has been uploaded!
        if (result.status === 200) {
            // Alert that the file has been successfully uploaded!
            panelState['show'] = result.data.success;
            panelState['header'] = result.data.message;
        } else if(result.status === 201) {
            panelState['show'] = result.data.success;
            panelState['header'] = result.data.message;
            panelState['body'] = result.data.success;
            panelState['bodyText'] = result.data.bodyText;
            panelState['footer'] = result.data.success;
        } else {
            panelState['show'] = !result.data.success;
            panelState['header'] = result.data.message;            
        }

        getExplorerData(props.id, content);
        // Shut the loader down!
        setLoader(false);
        
        // Populate Modal
        populateModal(panelState);
    }

    // Handle Crumbs Dropdown action!
    async function handleAction(data) {
        switch (data) {
            case "New Folder":
                const _modalData = {
                    header: "Folder Creation",
                    footer: true,
                    show: true,
                    body: true,
                    bodyText: Input("Enter your folder name", "form-control")
                }
                populateModal(_modalData);
                break;
            case "Properties":
                break;
        }
    }

    // Open and Close Modal
    function populateModal(_modalData) {
        setModal({
            ...modal,
            header: _modalData.header,
            footer: _modalData.footer,
            show: _modalData.show,
            body: _modalData.body,
            bodyText: _modalData.bodyText
        })
    }

    function closeModal() {
        setModal({
            ...modal,
            show: false,
            header: undefined,
            body: undefined,
            bodyText: undefined,
            footer: undefined,
        })
    }

    // Folder Creation!
    async function folderCreation(path, id) {

        setLoader(true);
        // Panel value model for folder creation!
        const panelValue = {
            show: undefined,
            header: undefined,
            body: undefined,
            bodyText: undefined,
            footer: undefined
        }
        const result = await createFolder(path, id);
        if (result.status === 200) {
            closeModal() // Close the modal before making the call
            getExplorerData(id, content); // Call the getExplorer data to make the changes appear from the content server!
            
            // Open up the toast based on the response!
            panelValue.show = result.data.success;
            panelValue.header = result.data.message;
        } else {
            // Updating panel value state
            panelValue.show = !result.data.success;
            panelValue.header = result.data.message;
            panelValue.body = result.data.success;
            panelValue.footer = result.data.success;
        }

        populateModal(panelValue); // Populate the model with the data response!

        setLoader(false); 
    }

    // On Modal Success!
    async function onModalSuccess() {
        if(modal.header === "Folder Creation"){

            const path = content + "/" + modalInput // Folder Name defined in the modal textarea view!
            folderCreation(path, props.id);
        } else { // Add Version Dialog and if the user triggers add version!
            closeModal();
            handleUpload(fileBlob, true); 
        }
    }

    // Input Box for the modal to handle the folder creation data
    function Input(placeholder, className) {
        return (
            <InputBox placeholder={placeholder} className={className} onChange={(data) => setModalInput(data)} />
        )
    }

    // Actions buttons for the add version actions!
    function actionButton(fileName){

        // Action Items!
        const actionItems = {
            buttons : true, 
            btnAttr: {
                btn1: "Download",
                btn2: "Show all versions"
            }
        }

        return(
            <ActionItems actionItems = {actionItems} onDownload = {() => onDownload()} onShow = {(fileName, filePath) => onShow(fileName, filePath)} fileName = {fileName} filePath = {content}  />
        )
    }

    // Action Items Helper Functions - Handles Download and Add version files viewer!
    function onDownload(){
        console.log("Download Initiated!");
    }

    async function onShow(fileName, filePath){

        // Toast Message Handler!
        const toastHandler = {
            show: undefined,
            header: undefined,
            body: undefined,
            bodyText: undefined,
            footer: undefined
        }

        const result = await addVersion(fileName, filePath, props.id);
        if(result.status === 200){
            setExplorer(result.data.message);
            modal.onHide(); // Close the actions modal!
        } else {
            toastHandler['show'] = !result.data.success;
            toastHandler['header'] = result.data.message;
            toastHandler['body'] = result.data.success;
            toastHandler['footer'] = result.data.success;

            // Populate the modal for the error toast message!
            populateModal(toastHandler);
        }
    }

    // Handle Directory for the explorer
    async function handleDirectory(isDirectory, folderName) {
        if (isDirectory) {
            handleSelect(folderName);
        } else {
            // Populate the view state modal
            const filePath = content + "/" + folderName;
            const result = await fileDownload(filePath);
            const viewModal = {
                show: true,
                file: result
            }
            openViewer(viewModal);
        }
    }

    // Handling the file download from the server!
    async function fileDownload(filePath) {
        return await downloadFile(filePath, props.id);
    }

    // Open the file viewer!
    function openViewer(modal) {
        setView({
            ...view,
            show: modal.show,
            file: modal.file
        })
    }

    // Close the document viewer!
    function cancelViewer(){
        setView({
            ...view,
            show: false,
            file: undefined
        })
    }

    // Render the viewer with the modal attributes!
    function renderViewer(windowHeight, footerHeight) {
        return (
            <DocumentViewer file={view.file} height={windowHeight - footerHeight} cancelViewer = {() => cancelViewer()} />
        )
    }

    // Get the side tree data before the page renders!
    useEffect(() => {
        getCabinetData(props.id, getStorage(root.content));
        handleSelect("Home");
    }, [props.id])


    if (props.footerHeight !== undefined && loader === false) {
        return (
            <div>
                {/* Render the document viewer if triggered */}
                {
                    view.show ? (
                        renderViewer(props.windowHeight, props.footerHeight) // Rendering Document View!
                    ) : (
                        <div className="universal">
                            {
                                modal ? (
                                    <PanelView onHide={modal.onHide} show={modal.show} header={modal.header} body={modal.body}
                                        footer={modal.footer} footerAttr={modal.footerAttr}
                                        bodyText={modal.bodyText}
                                        onModalSuccess={() => onModalSuccess()}
                                    />
                                ) : (
                                    null
                                )
                            }
                            <Header root={root.prop} crumbData={crumb} crumbSelection={(data) => crumbSelection(data)}
                                uploadFile={(data) => handleUpload(data, false)}
                                action={(data) => handleAction(data)} headerHeight={(data) => setHeaderHeight(data)}
                                navigateBack = {() => navigateBack()} navigateFront = {() => navigateFront()}
                            />
                            <div className="main-container">
                                <Sidebar height={props.windowHeight - props.footerHeight - headerHeight} root={cabinet} handleSelect={(data) => handleSelect(data)} />
                                <Explorer handleDirectory={(isDirectory, folderName) => handleDirectory(isDirectory, folderName)} height={props.windowHeight - props.footerHeight - headerHeight} explorer={explorer} 
                                menuAction = {(fileName) => menuAction(fileName)}
                                />
                            </div>
                        </div>
                    )
                }

            </div>
        )
    } else {
        return (
            <Spinner width="120px" height="120px" />
        )
    }


}

export default Univ;