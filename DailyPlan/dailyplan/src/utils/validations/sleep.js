import axios from 'axios';

import { 
    ADD_SLEEP_MODE_URL,
    GET_SLEEP_MODES_URL,
    UPDATE_SLEEP_MODE_REP_URL,
    GET_SLEEP_MODE_BY_ID_URL,
    UPDATE_SLEEP_MODE_URL
 } from "../routes";

 // Recibe un objeto sleepmodeInfo con las siguientes propiedades:
// sleep_id, sleep_starthour, sleep_endhour, sleep_active, sleep_rep, sleep_video_url, sleep_rep_stopped, tone_id
export const saveUserSleepmode = async (sleepmodeInfo) => {
    try {
        console.log(sleepmodeInfo);
        await axios.post(ADD_SLEEP_MODE_URL, sleepmodeInfo); // debería verificar si retorna un error
        return true;
    } catch (err) {
        console.log(err);
    }
};

// Recibe un objeto con la propiedad sleep_id
export const getSleepmodeById = async (sleep_id) => {
    try {
        const response = await axios.post(GET_SLEEP_MODE_BY_ID_URL, { sleep_id });
        return response;
    } catch (err) {
        console.log(err);
    }
};

// Recibe un objeto sleepmodeInfo con las siguientes propiedades:
// sleep_starthour, sleep_endhour, sleep_active, sleep_rep, sleep_video_url, sleep_rep_stopped, tone_id, sleep_id
export const updateSleepmode = async (sleepmodeInfo) => {
    console.log("dentro de validations:", sleepmodeInfo)
    try {
        const res = await axios.post(UPDATE_SLEEP_MODE_URL, sleepmodeInfo);
        if(res)
        return true;
    } catch (err) {
        console.log(err);
    }
};


export const updateSleepRepStopped = async (sleep_id, sleep_rep_stopped) => {
    try {
        const response = await axios.post(UPDATE_SLEEP_MODE_REP_URL, { sleep_id, sleep_rep_stopped });
        return response;
    } catch (err) {
        console.error(err);
    }
};