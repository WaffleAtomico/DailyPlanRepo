import axios from 'axios';
import {
    ADD_NOTIFICATION_URL,
    GET_USER_NOTIFICATIONS_URL,
} from '../routes';

// Function to add a notification
export const addNotification = async (notificationInfo) => {
    try {
        const response = await axios.post(ADD_NOTIFICATION_URL, notificationInfo);
        return response;
    } catch (err) {
        console.log("Error adding notification:", err);
        return "Error adding notification";
    }
};

// Function to get notifications for a specific user
export const getUserNotifications = async (user_id) => {
    try {
        const response = await axios.post(GET_USER_NOTIFICATIONS_URL, { user_id });
        return response;
    } catch (err) {
        console.log("Error retrieving notifications:", err);
        return "Error retrieving notifications";
    }
};
