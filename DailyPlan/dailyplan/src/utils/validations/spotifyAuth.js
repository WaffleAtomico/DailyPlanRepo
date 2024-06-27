import axios from 'axios';
import { urllocalhost } from "../urlrequest";



export const getAuthUrl = async () => {
    const response = await axios.get(`${urllocalhost}/auth-url`);
    return response.data.url;
};

export const getToken = async (code) => {
    const response = await axios.post(`${urllocalhost}/get-token`, { code });
    return response.data;
};
