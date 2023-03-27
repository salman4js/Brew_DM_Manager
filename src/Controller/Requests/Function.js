import axios from 'axios';
const url = "http://localhost:3002"

// Login User Handler!
export async function loginUser(data, id){
    const credentials = {
        cs : id,
        password: data
    }
    try{
        const result = await axios.post(`${url}/loginuser`, credentials);
        return result;
    } catch(err){
        if(err.response && err.response.status){
            return err.response;
        }
    }
}

// Get Tree Data!
export async function getData(id, path){
    // Make Up the ID!
    const URL = "https://" + id + ".ngrok.io"; // Cannot use this with localhost:3000 as localhost have cors issue policy enabled!
    
    // Form Required Data!
    const data = {
        folder: path
    }
    try{
        const result = await axios.post("http://localhost:3200/folders", data);
        return result;

    } catch(err){
        if(err.response && err.response.status){
            return err.response;
        }
    }
}

// Upload the file to the server in the respective path!
export async function uploadFile(data, path, id, addVersion){

    const URL = "https://" + id + ".ngrok.io"; // Cannot use this with localhost:3000 as localhost have cors issue policy enabled!
    const pathName = path.substring(path.indexOf("/") + 1) + "/" // Adding "/" as the path identifier for the server to upload the documents!

    // Form Data with PathName
    const uploadFile = new FormData();
    uploadFile.append("uploadFile", data);
    uploadFile.append("pathName", pathName);

    // To catch the error in the catch block if the call fails
    try{
        if(addVersion){
            // Upload the file to the server!
            const result = await axios.post("http://localhost:3200/addversion-fileupload", uploadFile);
            return result;
        } else {
            // Upload the file to the server!
            const result = await axios.post("http://localhost:3200/upload", uploadFile);
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

    const URL = "https://" + id + ".ngrok.io"; // Cannot use this with localhost:3000 as localhost have cors issue policy enabled!
    
    // Create a data!
    const data = {
        pathName: pathName
    }
    
    try{
        const result = await axios.post("http://localhost:3200/createfolder", data)
        return result;
    } catch(err){
        if(err.response && err.response.status){
            return err.response;
        }
    }
}

// Handle file download from the server for the viewer!
export async function downloadFile(filePath, id){

    const URL = "https://" + id + ".ngrok.io";

    const data = {
        filePath: filePath
    }

    try{
        const result = await axios.post("http://localhost:3200/download", data);
        return result;
    } catch(err){
        if(err.response && err.response.status){
            return err.response;
        }
    }
}

// Handle Add Version File Viewer!
export async function addVersion(fileName, filePath, id){

    const URL = "https://" + id + ".ngrok.io";

    const data = {
        fileName: fileName,
        folder: filePath
    }

    try{
        const result = await axios.post("http://localhost:3200/addversion-files", data);
        return result;
    } catch(err){
        if(err.response && err.response.status){
            return err.response;
        }
    }
}