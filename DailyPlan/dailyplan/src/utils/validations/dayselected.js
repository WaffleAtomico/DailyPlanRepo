import axios from 'axios';
import {
    ADD_DAYSELECTED_URL,
    GET_DAYSELECTEDS_URL,
    GET_DAYSELECTED_BY_ID_URL,
    UPDATE_DAYSELECTED_URL,
    DELETE_DAYSELECTED_URL
} from '../routes';

export const addDaySelected = async (daySelectedData) => {
    try {
        const response = await axios.post(ADD_DAYSELECTED_URL, daySelectedData);
        return response.data;
        // console.log('addDaySelected', response.data.data.insertId)
        // return response;
    } catch (err) {
        console.log(err);
        throw err;
    }
};

export const getDaySelected = async () => {
    try {
        const response = await axios.post(GET_DAYSELECTEDS_URL);
        //   return response.data;
        return response;
    } catch (err) {
        console.log(err);
        throw err;
    }
};

export const getDaySelectedById = async (daySelectedId) => {
    try {
        const response = await axios.post(GET_DAYSELECTED_BY_ID_URL, { daysel_id: daySelectedId });
        //   return response.data;
        return response;
    } catch (err) {
        console.log(err);
        throw err;
    }
};

// Campos que se deben enviar en alarmData:
// daysel_mon, daysel_tues, daysel_wed, daysel_thur, daysel_fri, daysel_sat, daysel_sun
export const updateDaySelected = async (daySelectedData) => {
    try {
        const response = await axios.post(UPDATE_DAYSELECTED_URL, daySelectedData);
        //   return response.data;
        return response;
    } catch (err) {
        console.log(err);
        throw err;
    }
};

export const deleteDaySelected = async (daySelectedId) => {
    try {
        const response = await axios.post(DELETE_DAYSELECTED_URL, { daysel_id: daySelectedId });
        //   return response.data;
        return response;
    } catch (err) {
        console.log(err);
        throw err;
    }
};