import axios from 'axios';
import {
    ADD_INVITATION_URL,
    GET_INVITATIONS_URL,
    GET_INVITATION_BY_ID_URL,
    GET_INVITATION_BY_USER_URL,
    UPDATE_INVITATION_STATE_URL,
    UPDATE_INVITATION_REASON_URL,
    UPDATE_INVITATION_URL,
    DELETE_INVITATION_URL
} from '../routes';

// Function to add an invitation
export const addInvitation = async (invitationInfo) => {
    /*
     values: [
            req.body.reminder_id,
            req.body.alarm_id,
            req.body.user_id_owner,
            req.body.user_id_target,
            req.body.inv_state,
            req.body.inv_reason,
        ],
    */
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
        const response = await axios.post(GET_INVITATIONS_URL);
        return response;
    } catch (err) {
        console.log("Error retrieving invitations:", err);
        return "Error retrieving invitations";
    }
};

// Function to get an invitation by ID
export const getInvitationById = async (inv_id) => {
    try {
        const response = await axios.post(GET_INVITATION_BY_ID_URL, {inv_id});
        return response;
    } catch (err) {
        console.log("Error retrieving invitation:", err);
        return "Error retrieving invitation";
    }
};


//function to get the invitation by USer
export const getInvitationByUser = async (user_id) => {
    try {
        const response = await axios.post(GET_INVITATION_BY_USER_URL, {user_id});
        return response;
    } catch (err) {
        console.log("Error retrieving invitation:", err);
        return "Error retrieving invitation";
    }
};

// Function to update invitation state
export const updateInvitationState = async (inv_id, inv_state) => {
    try {
        const response = await axios.post(UPDATE_INVITATION_STATE_URL, { inv_state, inv_id });
        return response;
    } catch (err) {
        console.log("Error updating invitation state:", err);
        return "Error updating invitation state";
    }
};

// Function to update invitation reason
export const updateInvitationReason = async (inv_id, inv_reason) => {
    try {
        const response = await axios.post(UPDATE_INVITATION_REASON_URL, { inv_reason, inv_id });
        return response;
    } catch (err) {
        console.log("Error updating invitation reason:", err);
        return "Error updating invitation reason";
    }
};

// Function to update an invitation
export const updateInvitation = async (inv_id, invitationInfo) => {
    try {
        const response = await axios.put(UPDATE_INVITATION_URL, invitationInfo);
        return response;
    } catch (err) {
        console.log("Error updating invitation:", err);
        return "Error updating invitation";
    }
};

// Function to delete an invitation
export const deleteInvitation = async (inv_id) => {
    try {
        const response = await axios.delete(DELETE_INVITATION_URL, { inv_id });
        return response;
    } catch (err) {
        console.log("Error deleting invitation:", err);
        return "Error deleting invitation";
    }
};
