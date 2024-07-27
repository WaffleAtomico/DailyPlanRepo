import axios from 'axios';
import {
    ADD_USER_BLOCKED_URL,
    DELETE_USER_BLOCKED_URL,
    GET_USERS_BLOCKED_URL,
    CHECK_USER_BLOCKED_URL
} from '../routes';

export const addUserBlocked = async (userBlockedInfo) => {
    try {
        const response = await axios.post(ADD_USER_BLOCKED_URL, userBlockedInfo);
        // return response.data;
        return response;
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

export const checkIfUserBlocked = async (user_id_sourse, user_id_target) => {
    //    values: [req.body.user_id_sourse, req.body. user_id_target],
  try {
    const response = await axios.post(CHECK_USER_BLOCKED_URL, { user_id_sourse, user_id_target });
    // return response.data.isBlocked;
    return response;
    /*
      const isBlocked = data[0].count > 0;
        return res.json({ isBlocked });
    */
  } catch (err) {
    console.log(err);
    throw err;
  }
};
