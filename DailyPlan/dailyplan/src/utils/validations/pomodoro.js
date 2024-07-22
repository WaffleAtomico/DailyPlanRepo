import axios from 'axios';
import {
    ADD_POMODORO_URL,
    GET_POMODOROS_URL,
    GET_POMODORO_BY_ID_URL,
    UPDATE_POMODORO_URL,
    DELETE_POMODORO_URL
} from '../routes';

export const savePomodoro = async (pomodoroInfo) => {

    console.log("Se esta guardando el pomodoro");
    try {
        console.log(pomodoroInfo);
        await axios.post(ADD_POMODORO_URL, {pomodoroInfo});
        return true;
    } catch (err) {
        console.log(err);
        return false;
    }
};

export const getPomodoros = async () => {
    try {
        const response = await axios.post(GET_POMODOROS_URL);
        return response;
    } catch (err) {
        console.log(err);
    }
};

export const getPomodoroById = async (pomodoro_id) => {
    try {
        const response = await axios.post(GET_POMODORO_BY_ID_URL, {pomodoro_id});
        return response;
    } catch (err) {
        console.log(err);
    }
};

export const updatePomodoro = async ( pomodoroInfo) => {
    try {
        const response = await axios.post(UPDATE_POMODORO_URL, { pomodoroInfo});
        return true;
    } catch (err) {
        console.log(err);
        return false;
    }
};

export const deletePomodoro = async (pomodoro_id) => {
    try {
        const response = await axios.post(DELETE_POMODORO_URL, {pomodoro_id});
        return true;
    } catch (err) {
        console.log(err);
        return false;
    }
};
