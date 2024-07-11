import { db } from '../config/connection.js';

const addInvitation = (req, res) => {
    const query = {
        sql: "INSERT INTO `invitations`(`reminder_id`, `alarm_id`, `user_id_owner`, `user_id_target`, `inv_state`, `inv_reason`) VALUES (?, ?, ?, ?, ?, ?)",
        values: [
            req.body.reminder_id,
            req.body.alarm_id,
            req.body.user_id_owner,
            req.body.user_id_target,
            req.body.inv_state,
            req.body.inv_reason,
        ],
    };
    db.query(query.sql, query.values, (err, data) => {
        if (err) {
            return res.json({ message: "Error adding invitation", error: err });
        }
        return res.json({ message: "Invitation added successfully" });
    });
};

const getInvitations = (req, res) => {
    const query = {
        sql: "SELECT `inv_id`, `reminder_id`, `alarm_id`, `user_id_owner`, `user_id_target`, `inv_state`, `inv_reason` FROM `invitations` WHERE 1",
    };
    db.query(query.sql, (err, data) => {
        if (err) {
            return res.json({ message: "Error retrieving invitations", error: err });
        }
        return res.json(data);
    });
};

const getInvitationById = (req, res) => {
    const query = {
        sql: "SELECT `inv_id`, `reminder_id`, `alarm_id`, `user_id_owner`, `user_id_target`, `inv_state`, `inv_reason` FROM `invitations` WHERE `inv_id` = ?",
        values: [req.params.inv_id],
    };
    db.query(query.sql, query.values, (err, data) => {
        if (err) {
            return res.json({ message: "Error retrieving invitation", error: err });
        }
        return res.json(data);
    });
};

const updateInvitation = (req, res) => {
    const query = {
        sql: "UPDATE `invitations` SET `reminder_id` = ?, `alarm_id` = ?, `user_id_owner` = ?, `user_id_target` = ?, `inv_state` = ?, `inv_reason` = ? WHERE `inv_id` = ?",
        values: [
            req.body.reminder_id,
            req.body.alarm_id,
            req.body.user_id_owner,
            req.body.user_id_target,
            req.body.inv_state,
            req.body.inv_reason,
            req.params.inv_id,
        ],
    };
    db.query(query.sql, query.values, (err, data) => {
        if (err) {
            return res.json({ message: "Error updating invitation", error: err });
        }
        return res.json({ message: "Invitation updated successfully" });
    });
};

const deleteInvitation = (req, res) => {
    const query = {
        sql: "DELETE FROM `invitations` WHERE `inv_id` = ?",
        values: [req.params.inv_id],
    };
    db.query(query.sql, query.values, (err, data) => {
        if (err) {
            return res.json({ message: "Error deleting invitation", error: err });
        }
        return res.json({ message: "Invitation deleted successfully" });
    });
};

export { 
    addInvitation,
    getInvitations, 
    getInvitationById, 
    updateInvitation,
    deleteInvitation 
};
