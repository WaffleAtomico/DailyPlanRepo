import axios from 'axios';
import {
    ADD_TIMER_URL,
    GET_TIMERS_FOR_USER_URL,
    GET_TIMER_BY_ID_URL,
    UPDATE_TIMER_URL,
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

const getTimersForUser = async (user_id) => {
    try {
        const response = await axios.post(GET_TIMERS_FOR_USER_URL, {user_id });
        console.log(response.data);
        return response;
    } catch (err) {
        console.log(err);
        throw err;
    }
};

const getTimerById = async (timer_id) => {
    try {
        const response = await axios.post(GET_TIMER_BY_ID_URL, { timer_id });
        return response.data;
    } catch (err) {
        console.log(err);
        throw err;
    }
};

const updateTimer = async (timer_id, timerData) => {
    try {
        const response = await axios.post(UPDATE_TIMER_URL, { timer_id, ...timerData });
        return response.data;
    } catch (err) {
        console.log(err);
        throw err;
    }
};

const deleteTimer = async (timer_id) => {
    try {
        const response = await axios.post(DELETE_TIMER_URL, { timer_id });
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
