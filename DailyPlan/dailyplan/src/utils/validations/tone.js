import axios from 'axios';
import { 
    ADD_TONE_URL,
    GET_TONES_URL,
    GET_TONE_BY_ID_URL,
    UPDATE_TONE_URL,
    DELETE_TONE_URL

} from '../routes';


const getTones = async () => {
    try {
        const response = await axios.get(GET_TONES_URL);
        return response;
    } catch (err) {
        console.log(err);
        throw err;
    }
};

const getToneById = async (toneId) => {
    try {
        const response = await axios.get(GET_TONE_BY_ID_URL, { params: { toneId } });
        return response;
    } catch (err) {
        console.log(err);
        throw err;
    }
};

const addTone = async (toneData) => {
    

    try {

        console.log("los datos que se tienen:", toneData)
        const response = await axios.post(ADD_TONE_URL, toneData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response;
    } catch (err) {
        console.log(err);
        throw err;
    }
};

const updateTone = async (toneData) => {
    try {
        const response = await axios.post(UPDATE_TONE_URL, toneData);
        return response;
    } catch (err) {
        console.log(err);
        throw err;
    }
};

const deleteTone = async (toneId) => {
    try {
        const response = await axios.post(DELETE_TONE_URL, { toneId });
        return response;
    } catch (err) {
        console.log(err);
        throw err;
    }
};

export { getTones, getToneById, addTone, updateTone, deleteTone };