import axios from 'axios';
import {
    ADD_PERMISSION_URL,
    GET_PERMISSIONS_URL,
    GET_PERMISSION_BY_ID_URL,
    UPDATE_PERMISSION_URL,
    DELETE_PERMISSION_URL
} from '../routes';

export const addPermission = async (permissionInfo) => {
    try {
        const response = await axios.post(ADD_PERMISSION_URL, {permissionInfo});
        return response.data;
    } catch (err) {
        console.error("Error adding permission:", err);
    }
};

export const getPermissions = async () => {
    try {
        const response = await axios.post(GET_PERMISSIONS_URL);
        return response.data;
    } catch (err) {
        console.error("Error retrieving permissions:", err);
    }
};

export const getPermissionById = async (permissionId) => {
    try {
        const response = await axios.post(GET_PERMISSION_BY_ID_URL, {permissionId});
        
        return response.data;
    } catch (err) {
        console.error("Error retrieving permission by ID:", err);
    }
};

export const updatePermission = async (permissionId, permissionInfo) => {
    try {
        const response = await axios.put(`${UPDATE_PERMISSION_URL}/${permissionId}`, permissionInfo);
        return response.data;
    } catch (err) {
        console.error("Error updating permission:", err);
    }
};

export const deletePermission = async (permissionId) => {
    try {
        const response = await axios.delete(`${DELETE_PERMISSION_URL}/${permissionId}`);
        return response.data;
    } catch (err) {
        console.error("Error deleting permission:", err);
    }
};
