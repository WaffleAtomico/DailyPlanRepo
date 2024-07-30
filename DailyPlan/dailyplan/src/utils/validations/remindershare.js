import axios from 'axios';
import {
    ADD_REMINDERSHARE_URL,
    GET_REMINDERSHARES_FOR_USER_URL,
    GET_REMINDERSHARE_BY_ID_URL,
    UPDATE_REMINDERSHARE_URL,
    DELETE_REMINDERSHARE_URL,
    GET_REMINDERSHARES_URL,
    GET_USER_IDS_BY_REMINDER_URL
} from '../routes';

// Function to add a reminder share
export const saveReminderShare = async (reminderShareInfo) => {
    try {
        // console.log(reminderShareInfo);
        /*
            body.rs_user_id_target,
            body.reminder_id,
        */
        const response = await axios.post(ADD_REMINDERSHARE_URL, { reminderShareInfo });
        return response.data;
    } catch (err) {
        console.log(err);
        return { error: err };
    }
};

// Function to get all reminder shares
export const getReminderShares = async () => {
    try {
        const response = await axios.post(GET_REMINDERSHARES_URL);
        return response.data;
    } catch (err) {
        console.log(err);
        return { error: err };
    }
};

// Function to get all reminder shares for a specific user
export const getReminderSharesForUser = async (userId) => {
    try {
        const response = await axios.post(GET_REMINDERSHARES_FOR_USER_URL, { user_id: userId });
        // return response.data;
        return response;
    } catch (err) {
        console.log(err);
        return { error: err };
    }
};

// Function to get a specific reminder share by ID
export const getReminderShareById = async (remindsha_id) => {
    try {
        const response = await axios.post(GET_REMINDERSHARE_BY_ID_URL, { remindsha_id });
        // return response.data;
        return response;
    } catch (err) {
        console.log(err);
        return { error: err };
    }
};

// Function to update a reminder share
export const updateReminderShare = async (remindsha_id, reminderShareInfo) => {
    try {
        const response = await axios.post(UPDATE_REMINDERSHARE_URL, { remindsha_id, reminderShareInfo });
        // return response.data;
        return response;
    } catch (err) {
        console.log(err);
        return { error: err };
    }
};

// Function to delete a reminder share
export const deleteReminderShare = async (remindsha_id) => {
    try {
        const response = await axios.post(DELETE_REMINDERSHARE_URL, { remindsha_id });
        // return response.data;
        return response;
    } catch (err) {
        console.log(err);
        return { error: err };
    }
};

export const getUserIdsByReminder = async (reminder_id) => {
    try {
        const response = await axios.post(GET_USER_IDS_BY_REMINDER_URL, { reminder_id });
        return response;
    } catch (err) {
        console.log("Error retrieving user IDs:", err);
        return "Error retrieving user IDs";
    }
};