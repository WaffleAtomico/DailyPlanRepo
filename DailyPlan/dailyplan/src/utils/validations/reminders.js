import axios from 'axios';
import {
    ADD_REMINDER_URL,
    GET_REMINDERS_FOR_USER_URL,
    GET_REMINDER_BY_ID_URL,
    UPDATE_REMINDER_URL,
    DELETE_REMINDER_URL,
    GET_REMINDERS_BY_MONTH_URL,
    GET_REMINDERS_BY_WEEK_URL,
    GET_REMINDER_BY_DAY_URL,
    GET_REMINDER_BY_SOURCE_ID_AND_USER_ID_URL 
} from '../routes.js';

export const saveUserReminder = async (reminderInfo) => {
    try {
        console.log(reminderInfo);
        const response =  await axios.post(ADD_REMINDER_URL, {reminderInfo}); 
        return response;
    } catch (err) {
        console.log(err);
    }
};

export const getUserReminders = async (user_id) => {
    try {
        const response = await axios.post(GET_REMINDERS_FOR_USER_URL, { user_id });
        return response;
    } catch (err) {
        console.log(err);
    }
};

export const getReminderById = async (reminder_id) => {
    try {
        const response = await axios.post(GET_REMINDER_BY_ID_URL, { reminder_id });
        return response;
    } catch (err) {
        console.log(err);
    }
};

export const updateReminder = async (reminderInfo) => {
    try {
        await axios.post(UPDATE_REMINDER_URL, {reminderInfo});
        return true;
    } catch (err) {
        console.log(err);
    }
};

export const deleteReminder = async (reminder_id) => {
    try {
        await axios.post(DELETE_REMINDER_URL, { reminder_id });
        return true;
    } catch (err) {
        console.log(err);
    }
};

export const getRemindersByMonth = async (month, user_id) => {
    try {
        const response = await axios.post(GET_REMINDERS_BY_MONTH_URL, { month, user_id });
        return response;
    } catch (err) {
        console.log(err);
    }
};

export const getRemindersByWeek = async (startDate, endDate, user_id) => {
    try {
        const response = await axios.post(GET_REMINDERS_BY_WEEK_URL, { startDate, endDate, user_id });
        return response.data;
    } catch (err) {
        console.log(err);
    }
};


export const getRemindersByDay = async (date, user_id) => {
    try {
        const response = await axios.post(GET_REMINDER_BY_DAY_URL, { date,  user_id });
        return response.data;
    } catch (err) {
        console.log(err);
    }
};


export const getReminderBySourceIdAndUserId = async (reminder_sourse_id, user_id) => {
    try {
        const response = await axios.post(GET_REMINDER_BY_SOURCE_ID_AND_USER_ID_URL, { reminder_sourse_id, user_id });
        return response;
    } catch (err) {
        console.log("Error retrieving reminder:", err);
        return "Error retrieving reminder";
    }
};