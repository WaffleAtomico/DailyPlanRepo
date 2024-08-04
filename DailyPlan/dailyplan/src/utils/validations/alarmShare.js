import axios from 'axios';
import {
    ADD_ALARMSHARE_URL,
    GET_ALARMSHARES_URL,
    GET_ALARMSHARE_BY_ID_URL,
    UPDATE_ALARMSHARE_URL,
    DELETE_ALARMSHARE_URL,
    GET_USER_IDS_BY_ALARM_URL,
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

export const deleteAlarmShare = async (ar_user_id_target, alarm_id) => {
    try {
        const response = await axios.post(DELETE_ALARMSHARE_URL,{ar_user_id_target, alarm_id});
        return response.data;
    } catch (err) {
        console.error(err);
    }
};

export const getUserIdsByAlarm = async (alarm_id) => {
    try {
        const response = await axios.post(GET_USER_IDS_BY_ALARM_URL, { alarm_id });
        return response;
    } catch (err) {
        console.log("Error retrieving user IDs:", err);
        return "Error retrieving user IDs";
    }
};

// '/get-user-ids-by-alarm'