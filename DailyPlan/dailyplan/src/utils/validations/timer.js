import axios from 'axios';
import {
    ADD_TIMER_URL,
    GET_TIMERS_FOR_USER_URL,
    GET_TIMER_BY_ID_URL,
    GET_TIMER_BY_ID_URL,
    DELETE_TIMER_URL
} from '../routes';

const addTimer = async (timerData) => {
    try {
        const response = await axios.post(ADD_TIMER_URL, timerData);
        return response.data;
    } catch (err) {
        console.log(err);
        throw err;
    }
};

const getTimersForUser = async (userId) => {
    try {
        const response = await axios.get(`${GET_TIMERS_FOR_USER_URL}/${userId}`);
        return response.data;
    } catch (err) {
        console.log(err);
        throw err;
    }
};

const getTimerById = async (timerId) => {
    try {
        const response = await axios.get(`${GET_TIMER_BY_ID_URL}/${timerId}`);
        return response.data;
    } catch (err) {
        console.log(err);
        throw err;
    }
};

const updateTimer = async (timerId, timerData) => {
    try {
        const response = await axios.post(`${UPDATE_TIMER_URL}/${timerId}`, timerData);
        return response.data;
    } catch (err) {
        console.log(err);
        throw err;
    }
};

const deleteTimer = async (timerId) => {
    try {
        const response = await axios.post(`${urls.DELETE_TIMER_URL}/${timerId}`);
        return response.data;
    } catch (err) {
        console.log(err);
        throw err;
    }
};

export {
    addTimer,
    getTimersForUser,
    getTimerById,
    updateTimer,
    deleteTimer
};
