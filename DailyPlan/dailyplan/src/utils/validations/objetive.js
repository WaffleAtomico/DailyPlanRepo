import axios from 'axios';
import {
    ADD_OBJECTIVE_URL,
    GET_OBJECTIVES_URL,
    GET_OBJECTIVE_BY_ID_URL,
    UPDATE_OBJECTIVE_URL,
    DELETE_OBJECTIVE_URL,
    UPDATE_OBJECTIVE_STATUS_URL
} from '../routes';

export const saveObjective = async (objectiveInfo) => {
    try {
        await axios.post(ADD_OBJECTIVE_URL, objectiveInfo);
        return true;
    } catch (err) {
        console.error("Error adding objective:", err);
        return false;
    }
};

export const getObjectives = async () => {
    try {
        const response = await axios.post(GET_OBJECTIVES_URL);
        return response.data;
    } catch (err) {
        console.error("Error retrieving objectives:", err);
    }
};

export const getObjectiveById = async (obj_id) => {
    try {
        const response = await axios.post(GET_OBJECTIVE_BY_ID_URL, { obj_id });
        return response.data;
    } catch (err) {
        console.error("Error retrieving objective:", err);
    }
};

export const updateObjective = async (objectiveInfo, obj_id) => {
    try {
        await axios.post(UPDATE_OBJECTIVE_URL, { ...objectiveInfo, obj_id });
        return true;
    } catch (err) {
        console.error("Error updating objective:", err);
        return false;
    }
};

export const updateObjectiveStatus = async (objectiveId, completedWithinTime) => {
    try {
        const response = await axios.post(UPDATE_OBJECTIVE_STATUS_URL, {
            obj_id: objectiveId,
            obj_at_time: completedWithinTime
        });
        return response.data;
    } catch (error) {
        console.error('Error updating objective status:', error);
        throw error;
    }
};

export const deleteObjective = async (obj_id) => {
    try {
        await axios.post(DELETE_OBJECTIVE_URL, { obj_id });
        return true;
    } catch (err) {
        console.error("Error deleting objective:", err);
        return false;
    }
};
