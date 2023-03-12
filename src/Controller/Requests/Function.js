import axios from 'axios';
const url = "http://localhost:3002"

export async function loginUser(data, id){
    const credentials = {
        cs : "https://179e-2409-4071-2116-4233-1873-aa15-e6c4-9010.ngrok.io",
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