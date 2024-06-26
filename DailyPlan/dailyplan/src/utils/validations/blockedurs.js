import axios from 'axios';

export const addUserBlocked = async (userBlockedInfo) => {
    try {
        const response = await axios.post(`${urllocalhost}/bloqusr`, userBlockedInfo);
        return response.data;
    } catch (err) {
        console.error('Error adding user blocked:', err);
        throw err; // Puedes manejar el error según tu lógica de frontend
    }
};


export const delUserBlocked = async (userBlockedId) => {
    try {
        const response = await axios.post(`${urllocalhost}/unbloq`, { userblocked_id: userBlockedId });
        return response.data;
    } catch (err) {
        console.error('Error deleting user blocked:', err);
        throw err; // Puedes manejar el error según tu lógica de frontend
    }
};


export const getUsersBlocked = async (userId) => {
    try {
        const response = await axios.post(`${urllocalhost}/getusrbloq`, { user_id: userId });
        return response.data;
    } catch (err) {
        console.error('Error retrieving blocked users:', err);
        throw err; // Puedes manejar el error según tu lógica de frontend
    }
};
