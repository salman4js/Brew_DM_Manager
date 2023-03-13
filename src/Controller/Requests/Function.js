import axios from 'axios';
const url = "http://localhost:3002"

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
    //const URL = "https://" + id + ".ngrok.io";
    try{
        const data = {
            folder: path
        }
        const result = await axios.post("http://localhost:3200/folders", data);
        return result;
    } catch(err){
        if(err.response && err.response.status){
            return err.response;
        }
    }
}