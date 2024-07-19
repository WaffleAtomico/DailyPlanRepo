import axios from 'axios';

import {
    ADD_SLEEP_QUALITY_URL,
    GET_SLEEP_QUALITIES_URL,
    GET_SLEEPQUALITIES_BY_USER_URL,
    GET_SLEEP_QUALITY_BY_ID_URL,
    GET_SLEEPQUALITIES_BY_DATE_RANGE_URL,
} from '../routes';

// Recibe un objeto sleepQualityInfo con las siguientes propiedades:
// quality_good, quality_medium, quiality_bad, quality_date, sleep_id
export const saveSleepQuality = async (sleepQualityInfo) => {
    try {
        console.log("la esencia:",sleepQualityInfo);
        await axios.post(ADD_SLEEP_QUALITY_URL, {sleepQualityInfo});
        return true;
    } catch (err) {
        console.log(err);
    }
};

// Recibe un objeto con la propiedad quality_id
export const getSleepQualityById = async ({ quality_id, current_date }) => {
    try {
        const response = await axios.post(GET_SLEEP_QUALITY_BY_ID_URL, { quality_id, current_date });
        return response;
    } catch (err) {
        console.log(err);
    }
};

//recibe todos los sleepQuality de un determinado usuario


export const getSleepQualityByUser = async (quality_id) => {

    console.log("Se acaba de solicitar la calidad para el usuario", quality_id);
    try {
        const response = await axios.post(GET_SLEEPQUALITIES_BY_USER_URL, { quality_id });
        return response;
    } catch (err) {
        console.log(err);
    }
};



// Recibe un objeto con las propiedades startDate, endDate, userId
export const getSleepQualitiesByDateRange = async (dateRangeInfo) => {
    try {
        const { startDate, endDate, userId } = dateRangeInfo;
        const response = await axios.post(GET_SLEEPQUALITIES_BY_DATE_RANGE_URL, { startDate, endDate, userId });
        return response;
    } catch (err) {
        console.log(err);
    }
};
