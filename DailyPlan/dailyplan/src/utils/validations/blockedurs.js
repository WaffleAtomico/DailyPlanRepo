import axios from 'axios';
import {
    ADD_USER_BLOCKED_URL,
    DELETE_USER_BLOCKED_URL,
    GET_USERS_BLOCKED_URL
} from '../routes';

export const addUserBlocked = async (userBlockedInfo) => {
    try {
        const response = await axios.post(ADD_USER_BLOCKED_URL, userBlockedInfo);
        return response.data;
    } catch (err) {
        console.error('Error adding user blocked:', err);
        throw err; 
    }
};

export const delUserBlocked = async (userBlockedId) => {
    try {
        const response = await axios.post(DELETE_USER_BLOCKED_URL, { userblocked_id: userBlockedId });
        // return response.data;
        return response;
    } catch (err) {
        console.error('Error deleting user blocked:', err);
        throw err;
    }
};

export const getUsersBlocked = async (user_id) => {
    try {
        const response = await axios.post(GET_USERS_BLOCKED_URL, { user_id });
        // return response.data;
        return response;
    } catch (err) {
        console.error('Error retrieving blocked users:', err);
        throw err;
    }
};
