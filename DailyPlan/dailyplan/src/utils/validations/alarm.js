import axios from 'axios';
import {
    ADD_ALARM_URL,
    GET_ALARMS_FOR_USER_URL,
    GET_ALARM_BY_ID_URL,
    UPDATE_ALARM_URL,
    DELETE_ALARM_URL,
    ALARM_NAME_EXISTS_URL,
    USER_ALARM_LIMIT_REACHED_URL
} from '../routes';

export const addAlarm = async (alarmData) => {
    try {
        const response = await axios.post(ADD_ALARM_URL, { alarmData });
        //   return response.data;
        return response;
    } catch (err) {
        console.log(err);
        throw err;
    }
};

// Campos que se deben enviar en alarmData:
// alarm_name, daysel_id, alarm_hour, alarm_min, alarm_sec, alarm_rep_tone, tone_id, alarm_days_suspended, alarm_active, alarm_imgage, alarm_desc, user_id
export const getAlarmsForUser = async (userId) => {
    try {
        const response = await axios.post(GET_ALARMS_FOR_USER_URL, { user_id: userId });
        //   return response.data;
        return response;
    } catch (err) {
        console.log(err);
        throw err;
    }
};

export const getAlarmById = async (alarmId) => {
    try {
        const response = await axios.post(GET_ALARM_BY_ID_URL, { alarm_id: alarmId });
        //   return response.data;
        return response;
    } catch (err) {
        console.log(err);
        throw err;
    }
};

// Campos que se deben enviar en alarmData:
// alarm_name, daysel_id, alarm_hour, alarm_min, alarm_sec, alarm_rep_tone, tone_id, alarm_days_suspended, alarm_active, alarm_imgage, alarm_desc, alarm_id
export const updateAlarm = async (alarmData) => {
    try {
        const response = await axios.post(UPDATE_ALARM_URL, alarmData);
        //   return response.data;
        return response;
    } catch (err) {
        console.log(err);
        throw err;
    }
};

export const deleteAlarm = async (alarmId) => {
    try {
        const response = await axios.post(DELETE_ALARM_URL, { alarm_id: alarmId });
        //   return response.data;
        return response;
    } catch (err) {
        console.log(err);
        throw err;
    }
};

// Campos que se deben enviar en alarmInfo:
// alarm_name, user_id
export const isAlarmNameExistForUser = async (alarmInfo) => {
    try {
        const response = await axios.post(ALARM_NAME_EXISTS_URL, alarmInfo);
        //   return response.data.exists;
        return response;
    } catch (err) {
        console.log(err);
        throw err;
    }
};

// Campos que se deben enviar en userData:
// user_id
export const isUserAlarmLimitReached = async (userData) => {
    try {
        const response = await axios.post(USER_ALARM_LIMIT_REACHED_URL, userData);
        //   return response.data.isLimitReached;
        return response;
    } catch (err) {
        console.log(err);
        throw err;
    }
};
