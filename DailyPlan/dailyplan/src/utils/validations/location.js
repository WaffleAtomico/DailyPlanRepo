import axios from 'axios';
import {
    ADD_LOCATION_URL,
    GET_LOCATIONS_URL,
    GET_LOCATION_BY_ID_URL,
    UPDATE_LOCATION_URL,
    DELETE_LOCATION_URL
} from '../routes';

export const addLocation = async (locationInfo) => {
    try {
        const response = await axios.post(ADD_LOCATION_URL, {locationInfo});
        return response.data;
    } catch (err) {
        console.error("Error adding location:", err);
    }
};

export const getLocations = async () => {
    try {
        const response = await axios.post(GET_LOCATIONS_URL);
        return response.data;
    } catch (err) {
        console.error("Error retrieving locations:", err);
    }
};

export const getLocationById = async (reminderId) => {
    try {
        const response = await axios.post(GET_LOCATION_BY_ID_URL, {reminder_id: reminderId });
        return response.data;
    } catch (err) {
        console.error("Error retrieving location by ID:", err);
    }
};

export const updateLocation = async (locationId, locationInfo) => {
    try {
        const response = await axios.post(UPDATE_LOCATION_URL, { locationInfo, location_id: locationId });
        return response.data;
    } catch (err) {
        console.error("Error updating location:", err);
    }
};

export const deleteLocation = async (locationId) => {
    try {
        const response = await axios.post(DELETE_LOCATION_URL, { location_id: locationId });
        return response.data;
    } catch (err) {
        console.error("Error deleting location:", err);
    }
};
