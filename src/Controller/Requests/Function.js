import { getStorage, setStorage } from '../Storage';
import axios from 'axios';
const url = "https://brew-dm-controller.netlify.app/.netlify/functions/server";

var localController = "http://localhost:3002"

var localDataServer = "http://localhost:3200"

var localURL = "https://tasty-geckos-like-157-50-37-152.loca.lt";

// Login User Handler!
export async function loginUser(data, id, username){
    const credentials = {
        cs : id,
        username: username,
        password: data
    }
    try{
        const result = await axios.post(`${localController}/${id}/loginuser`, credentials);
        if(result.status === 200){
            setStorage("permission", JSON.stringify(result.data.permission)); // Setting permissions in local storage!
            setStorage("username", username); // Setting the username in local storage!
            return result;
        }
    } catch(err){
        if(err.response && err.response.status){
            return err.response;
        }
    }
}

// Get Tree Data!
export async function getData(id, path){
   
    // Make Up the ID!
    const testUrl = "http://127.0.0.1:4040"
    const URL = "https://" + id + ".ngrok-free.app"; // Cannot use this with localhost:3000 as localhost have cors issue policy enabled!
    
    // Form Required Data!
    const data = {
        folder: path
    }
    try{
        const result = await axios.post(`${localDataServer}/folders`, data);
        return result;

    } catch(err){
        if(err.response && err.response.status){
            return err.response;
        }
    }
}

// Upload the file to the server in the respective path!
export async function uploadFile(data, path, id, addVersion){

    let getUsername = getStorage("username");

    const URL = "https://" + id + ".ngrok-free.app"; // Cannot use this with localhost:3000 as localhost have cors issue policy enabled!
    const pathName = path.substring(path.indexOf("/") + 1) + "/" // Adding "/" as the path identifier for the server to upload the documents!

    // Form Data with PathName
    const uploadFile = new FormData();
    uploadFile.append("uploadFile", data);
    uploadFile.append("pathName", pathName);
    uploadFile.append("username", getUsername);

    // To catch the error in the catch block if the call fails
    try{
        if(addVersion){
            // Upload the file to the server!
            const result = await axios.post(`${localDataServer}/addversion-fileupload`, uploadFile);
            return result;
        } else {
            // Upload the file to the server!
            const result = await axios.post(`${localDataServer}/upload`, uploadFile);
            return result;
        }
    } catch(err){
        if(err.response && err.response.status){
            return err.response;
        }
    }
}

// Create a folder in the destination path!
export async function createFolder(pathName, id){

    const URL = "https://" + id + ".ngrok-free.app"; // Cannot use this with localhost:3000 as localhost have cors issue policy enabled!
    
    // Create a data!
    const data = {
        pathName: pathName
    }
    
    try{
        const result = await axios.post(`${localDataServer}/createfolder`, data)
        return result;
    } catch(err){
        if(err.response && err.response.status){
            return err.response;
        }
    }
}

// Handle file download from the server for the viewer!
export async function downloadFile(filePath, id){

    const URL = "https://" + id + ".ngrok-free.app";

    const data = {
        filePath: filePath
    }

    try{
        const result = await axios.post(`${localDataServer}/download`, data);
        return result;
    } catch(err){
        if(err.response && err.response.status){
            return err.response;
        }
    }
}

export async function downloadOn(filePath, id){
    const URL = "https://" + id + ".ngrok-free.app";

    const data = {
        filePath: filePath
    }

    try{
        const result = await fetch(`${localDataServer}/download`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({ filePath: filePath })
          });
          return result;
    } catch(err){
        if(err.response && err.response.status){
            return err.response;
        }
    }
}

// Handle Add Version File Viewer!
export async function addVersion(fileName, filePath, id){

    const URL = "https://" + id + ".ngrok-free.app";

    const data = {
        fileName: fileName,
        folder: filePath
    }

    try{
        const result = await axios.post(`${localDataServer}/addversion-files`, data);
        return result;
    } catch(err){
        if(err.response && err.response.status){
            return err.response;
        }
    }
}

// Handle File Deletion!
export async function deleteFile(file, id){
    const URL = "https://" + id + ".ngrok-free.app";

    const data = {
       filePath: file
    }

    try{
        const result = await axios.post(`${localDataServer}/deletefile`, data);
        return result;
    } catch(err){
        if(err.response && err.response.status){
            return err.response;
        }
    }
}

// Get file data from the server for the code editor!
export async function getFileData(fileName, filePath, id){

    const URL = "https://" + id + ".ngrok-free.app";

    const file = filePath + "/" + fileName;

    const data = { 
        filePath: file
    }
    
    try{
        const result = await axios.post(`${localDataServer}/getfiledata`, data)
        return result;
    } catch(err){
        if(err.response && err.response.status){
            return err.response;
        }
    }
}