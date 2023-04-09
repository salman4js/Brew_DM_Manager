import React, { useState, useEffect, useRef } from 'react';
import Sidebar from '../Main/SideBar/Sidebar'
import download from 'downloadjs';
import Explorer from '../Main/Explorer/Explorer'
import Header from '../Main/Header/Header';
import PanelView from '../modal.panel/modal.panel.header.view';
import InputBox from '../modal.panel/modal.textfield.view/modal.textfield.view';
import ActionItems from '../modal.panel/menu.action.modal/menu.action.view';
import EditorView from '../Editor/editor.view/editor.view';

// Importing Side Panel data!
import { root } from '../Main/root/root';
import { getData, uploadFile, createFolder, downloadFile, addVersion, deleteFile, downloadOn, getFileData } from '../../Controller/Requests/Function';

// Importing storage functions!
import { getStorage, setStorage } from '../../Controller/Storage';
import Spinner from '../Loader/Spinner';
import DocumentViewer from '../document.viewer/document.viewer.component/document.viewer.component';

const Univ = (props) => {

    // Side bar state handler!
    const [crumb, setCrumb] = useState(JSON.parse(getStorage(root.breadCrumb)));

    // Permissions!
    const perm = JSON.parse(getStorage("permission"));

    // Header Height state handler!
    const [headerHeight, setHeaderHeight] = useState("");

    // Content state handler!
    const [content, setContent] = useState(getStorage(root.content));

    // Temporary file data state handler!
    const [fileBlob, setFileBlob] = useState();

    // Temporary file data handler for the code editor!
    const [file, setFile] = useState({
        fileName: undefined,
        data: undefined
    })

    // Populate the file state handler!
    function populateFile(modal){
        setFile({
            ...file,
            fileName: modal.fileName,
            data: modal.data
        })
    }

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

    // Editor state handler!
    const [editor, setEditor] = useState({
        show: false,
        header: false,
        headerText: undefined,
        headerHeight: undefined,
        value: undefined,
        height: undefined,
        onHide: function(){
            closeEditor();
        }
    })

    // Close the editor modal
    function closeEditor(){
        setEditor({
            ...editor,
            show: false,
            header: false,
            headerText: undefined,
            headerHeight: undefined,
            value: undefined,
            height: undefined
        })
    }

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
    function menuAction(fileName, isDirectory, version){
        // Initiate the menu actions!
        const menuModal = {
            show: true,
            header: "What action would you like to perform?",
            body: true,
            bodyText: actionButton(fileName, isDirectory, version),
            footer: false,
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
        try{
            setLoader(true);
            const result = await getData(id, node);
            if (result.status === 200) {
                setExplorer(result.data.message);
                setLoader(false);
                return true;
            } else {
                console.error(result.data.message);
                setLoader(false);
            }
        } catch(err){
            getExplorerData(props.id, content)
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

        const isFetched = await getExplorerData(props.id, content);

        if(isFetched){
            // Shut the loader down!
            setLoader(false);
            
            // Populate Modal
            populateModal(panelState);   
        }
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
            const isFetched = await getExplorerData(id, content); // Call the getExplorer data to make the changes appear from the content server!
            if(isFetched){
                // Open up the toast based on the response!
                panelValue.show = result.data.success;
                panelValue.header = result.data.message;
            } 
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
    function actionButton(fileName, isDirectory, version){

        const perm = JSON.parse(getStorage("permission"));
        // Action Items!
        const actionItems = {
            buttons : true, 
            isDirectory: isDirectory,
            btnAttr: {
                btn1: {
                    visible: function(){
                        if(perm.includes("Delete")){
                            return true
                        }
                    },
                    text: "Download"
                },
                btn2: "Show all versions",
                btn3: {
                    visible: function(){    
                        if(perm.includes("Delete")){
                            return true
                        }
                    },
                    text: "Open in code editor"
                },
                btn4: {
                    visible: function(){
                        if(perm.includes("Delete")){
                            return true
                        }
                    },
                    text: "Delete"
                }
            }
        }

        return(
            <ActionItems onEditor = {(fileName, filePath, version) => openCodeEditor(fileName, filePath, version)} actionItems = {actionItems} onDelete = {(fileName, filePath) => onDelete(fileName, filePath)} 
            onDownload = {(filePath, fileName) => onDownload(filePath, fileName)} 
            onShow = {(fileName, filePath) => onShow(fileName, filePath)} fileName = {fileName} 
            filePath = {content} version = {version}  />
        )
    }

    // On code editor handler!
    async function openCodeEditor(fileName, filePath, version){

        const filename = version === undefined ? fileName : fileName + "--" + version;

        const getData = await getFileData(filename, filePath, props.id);

        modal.onHide(); // Close the action modal!

        const editorModal = {
            show: true,
            header: true,
            headerText: fileName,
            value: getData.data.message,
            height: props.windowHeight - props.footerHeight - headerHeight
        }

        // Populate the editor modal!
        populateEditor(editorModal);

    }

    // Populate editor modal!
    function populateEditor(modal){
        setEditor({
            show: modal.show,
            header: modal.header,
            headerText: modal.headerText,
            value: modal.value,
            height: modal.height
        })
    }
    
    // On Delete handler!
    async function onDelete(fileName, filePath){

        setLoader(true);
        // Panel value model for folder creation!
        const panelValue = {
            show: undefined,
            header: undefined,
            body: undefined,
            bodyText: undefined,
            footer: undefined
        }

        const file = filePath + "/" + fileName;
        const result = await deleteFile(file, props.id);
        if(result.status === 200){
            closeModal();
            const isFetched = await getExplorerData(props.id, content);
            if(isFetched){
                panelValue.show = result.data.success;
                panelValue.header = result.data.message;
            }
        } else {
             // Updating panel value state
             panelValue.show = !result.data.success;
             panelValue.header = "Couldn't able to delete this file, please try again later!";
             panelValue.body = result.data.success;
             panelValue.footer = result.data.success;
        }

        populateModal(panelValue); // Populate the model with the data response!

        setLoader(false); 

    }

    // Action Items Helper Functions - Handles Download and Add version files viewer!
    async function onDownload(filepath, fileName){
        const file = filepath + "/" + fileName
        const res = await downloadOn(file, props.id);
        const blob = await res.blob();
        download(blob, fileName);
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
            const permMessage = {
                show: true,
                header: "You don't have permission to view this file",
                body: false,
                bodyText: undefined,
                footer: false
            }
            perm.includes("View") ? openViewer(folderName) : populateModal(permMessage);
        }
    }

    // Handling the file download from the server!
    async function fileDownload(filePath) {
        return await downloadFile(filePath, props.id);
    }

    // Open the file viewer!
    async function openViewer(folderName) {
        // Populate the view state modal
        const filePath = content + "/" + folderName;
        const result = await fileDownload(filePath);
        setView({
            ...view,
            show: true,
            file: result
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

    // Cancel Code editor!
    function cancelEditor(){
        closeEditor(); // Close the editor modal
    }

    // Handle Editor Data!
    function handleEditorData(data, fileName){
        // Form the data into the modal and populate it!
        const fileModal = {
            fileName: fileName,
            data: data
        }

        populateFile(fileModal)
    }

    // Save the text through add version content!
    function saveText(){

        const fileOldValue = editor.value.length; // Usefull to check if the file has been changed or not!
        const modal = {
            show: true,
            header: "No changes have been detected",
            body: false,
            bodyText: undefined,
            footer: false
        }

        if(file.data === undefined){
            populateModal(modal);
        } else {
            const fileData = new File([file.data], file.fileName, {
                type: "text/plain",
            });
        
            fileData.size === fileOldValue ? populateModal(modal) : handleUpload(fileData, false);
        }
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
                                {
                                    editor.show ? (
                                        <EditorView cancelEditor = {() => cancelEditor()} options = {editor} headerHeight = {(data) => setEditor({...editor, headerHeight: data})} data = {(data, fileName) => handleEditorData(data, fileName)} saveText = {() => saveText()}/>
                                    ) : (
                                        <Explorer handleDirectory={(isDirectory, folderName) => handleDirectory(isDirectory, folderName)} height={props.windowHeight - props.footerHeight - headerHeight} explorer={explorer} 
                                        menuAction = {(fileName, isDirectory, version) => menuAction(fileName, isDirectory, version)}
                                        />
                                    )
                                }
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