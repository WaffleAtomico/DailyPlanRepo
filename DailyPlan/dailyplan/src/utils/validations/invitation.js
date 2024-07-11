import axios from 'axios';
import {
    ADD_INVITATION_URL,
    GET_INVITATIONS_URL,
    GET_INVITATION_BY_ID_URL,
    UPDATE_INVITATION_URL,
    DELETE_INVITATION_URL
} from '../routes';

// Function to add an invitation
export const addInvitation = async (invitationInfo) => {
    try {
        const response = await axios.post(ADD_INVITATION_URL, invitationInfo);
        return response;
    } catch (err) {
        console.log("Error adding invitation:", err);
        return "Error adding invitation";
    }
};

// Function to get all invitations
export const getInvitations = async () => {
    try {
        const response = await axios.get(GET_INVITATIONS_URL);
        return response;
    } catch (err) {
        console.log("Error retrieving invitations:", err);
        return "Error retrieving invitations";
    }
};

// Function to get an invitation by ID
export const getInvitationById = async (inv_id) => {
    try {
        const response = await axios.get(`${GET_INVITATION_BY_ID_URL}/${inv_id}`);
        return response;
    } catch (err) {
        console.log("Error retrieving invitation:", err);
        return "Error retrieving invitation";
    }
};

// Function to update an invitation
export const updateInvitation = async (inv_id, invitationInfo) => {
    try {
        const response = await axios.put(`${UPDATE_INVITATION_URL}/${inv_id}`, invitationInfo);
        return response;
    } catch (err) {
        console.log("Error updating invitation:", err);
        return "Error updating invitation";
    }
};

// Function to delete an invitation
export const deleteInvitation = async (inv_id) => {
    try {
        const response = await axios.delete(`${DELETE_INVITATION_URL}/${inv_id}`);
        return response;
    } catch (err) {
        console.log("Error deleting invitation:", err);
        return "Error deleting invitation";
    }
};
