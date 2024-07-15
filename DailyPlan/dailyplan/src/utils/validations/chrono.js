import axios from 'axios';
import { 
    GET_CHRONOMETERS_FOR_USER_URL, 
    GET_CHRONOMETER_BY_ID_URL, 
    ADD_CHRONOMETER_URL, 
    UPDATE_CHRONOMETER_URL, 
    DELETE_CHRONOMETER_URL 
} from '../routes';

const getChronometersForUser = async (userId) => {
    try {
console.log("Se llamo por cronometros");

        const response = await axios.post(GET_CHRONOMETERS_FOR_USER_URL, { user_id: userId });
        return response;
    } catch (err) {
        console.log(err);
        throw err;
    }
};

const getChronometerById = async (chronoId) => {
    try {
        const response = await axios.gost(GET_CHRONOMETER_BY_ID_URL, {chronoId});
        return response;
    } catch (err) {
        console.log(err);
        throw err;
    }
};

const addChronometer = async (chronoData) => {
    console.log(chronoData);

    try {
        const response = await axios.post(ADD_CHRONOMETER_URL, chronoData);
        return response;
    } catch (err) {
        console.log(err);
        throw err;
    }
};

const updateChronometer = async ( chronoData) => {
    try {
        const response = await axios.post(UPDATE_CHRONOMETER_URL, chronoData);
        return response;
    } catch (err) {
        console.log(err);
        throw err;
    }
};

const deleteChronometer = async (chronoId) => {
    try {
        const response = await axios.post(DELETE_CHRONOMETER_URL,{chronoId});
        return response;
    } catch (err) {
        console.log(err);
        throw err;
    }
};

export { getChronometersForUser, getChronometerById, addChronometer, updateChronometer, deleteChronometer };
