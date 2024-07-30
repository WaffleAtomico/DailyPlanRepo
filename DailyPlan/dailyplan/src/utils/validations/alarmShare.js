import axios from 'axios';
import {
    ADD_ALARMSHARE_URL,
    GET_ALARMSHARES_URL,
    GET_ALARMSHARE_BY_ID_URL,
    UPDATE_ALARMSHARE_URL,
    DELETE_ALARMSHARE_URL
} from '../routes.js';



export const addAlarmShare = async (alarmShareInfo) => {
    try {
        const response = await axios.post(ADD_ALARMSHARE_URL, alarmShareInfo);
        return response.data;
    } catch (err) {
        console.error(err);
    }
};

export const getAlarmShares = async () => {
    try {
        const response = await axios.post(GET_ALARMSHARES_URL);
        return response.data;
    } catch (err) {
        console.error(err);
    }
};

export const getAlarmShareById = async (alarm_id) => {
    try {
        const response = await axios.post(GET_ALARMSHARE_BY_ID_URL, {alarm_id});
        return response.data;
    } catch (err) {
        console.error(err);
    }
};

export const updateAlarmShare = async ( alarmShareInfo) => {
    try {
        const response = await axios.post(UPDATE_ALARMSHARE_URL, alarmShareInfo);
        return response.data;
    } catch (err) {
        console.error(err);
    }
};

export const deleteAlarmShare = async (alarmsha_id) => {
    try {
        const response = await axios.post(DELETE_ALARMSHARE_URL,{alarmsha_id});
        return response.data;
    } catch (err) {
        console.error(err);
    }
};
