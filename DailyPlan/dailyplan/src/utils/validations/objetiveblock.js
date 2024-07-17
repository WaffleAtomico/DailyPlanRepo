import axios from 'axios';
import {
    ADD_OBJECTIVES_BLOCK_URL,
    GET_OBJECTIVES_BLOCKS_URL,
    GET_OBJECTIVES_BLOCK_BY_ID_URL,
    UPDATE_OBJECTIVES_BLOCK_URL,
    DELETE_OBJECTIVES_BLOCK_URL
} from '../routes';

export const saveObjectivesBlock = async (blockInfo) => {
    try {
        const response = await  axios.post(ADD_OBJECTIVES_BLOCK_URL, {blockInfo});
        return response;
    } catch (err) {
        console.error("Error adding objective block:", err);
        return false;
    }
};

export const getObjectivesBlocks = async () => {
    try {
        const response = await axios.post(GET_OBJECTIVES_BLOCKS_URL);
        return response.data;
    } catch (err) {
        console.error("Error retrieving objective blocks:", err);
    }
};

export const getObjectivesBlockById = async (objblo_id) => {
    try {
        const response = await axios.post(GET_OBJECTIVES_BLOCK_BY_ID_URL, { objblo_id });
        return response.data;
    } catch (err) {
        console.error("Error retrieving objective block:", err);
    }
};

export const updateObjectivesBlock = async (blockInfo, objblo_id) => {
    try {
        await axios.post(UPDATE_OBJECTIVES_BLOCK_URL, { ...blockInfo, objblo_id });
        return true;
    } catch (err) {
        console.error("Error updating objective block:", err);
        return false;
    }
};

export const deleteObjectivesBlock = async (objblo_id) => {
    try {
        await axios.post(DELETE_OBJECTIVES_BLOCK_URL, { objblo_id });
        return true;
    } catch (err) {
        console.error("Error deleting objective block:", err);
        return false;
    }
};
