import { db } from '../config/connection.js';

const addReminderShare = (req, res) => {
    const query = {
        sql: "INSERT INTO `remindershare`(`rs_user_id_target`, `reminder_id`) VALUES (?, ?)",
        values: [
            req.body.rs_user_id_target,
            req.body.reminder_id,
        ],
    };
    db.query(query.sql, query.values, (err, data) => {
        if (err) {
            return res.json({ message: "Error adding reminder share", error: err });
        }
        return res.json(data, { message: "Reminder share added successfully" });
    });
};

const getReminderShares = (req, res) => {
    const query = {
        sql: "SELECT `remindsha_id`, `rs_user_id_target`, `reminder_id` FROM `remindershare` WHERE 1",
    };
    db.query(query.sql, (err, data) => {
        if (err) {
            return res.json({ message: "Error retrieving reminder shares", error: err });
        }
        return res.json(data);
    });
};

const getReminderShareById = (req, res) => {
    const query = {
        sql: "SELECT `remindsha_id`, `rs_user_id_target`, `reminder_id` FROM `remindershare` WHERE `remindsha_id` = ?",
        values: [req.params.remindsha_id],
    };
    db.query(query.sql, query.values, (err, data) => {
        if (err) {
            return res.json({ message: "Error retrieving reminder share", error: err });
        }
        return res.json(data);
    });
};

const updateReminderShare = (req, res) => {
    const query = {
        sql: "UPDATE `remindershare` SET `rs_user_id_target` = ?, `reminder_id` = ? WHERE `remindsha_id` = ?",
        values: [
            req.body.rs_user_id_target,
            req.body.reminder_id,
            req.params.remindsha_id,
        ],
    };
    db.query(query.sql, query.values, (err, data) => {
        if (err) {
            return res.json({ message: "Error updating reminder share", error: err });
        }
        return res.json({ message: "Reminder share updated successfully" });
    });
};

const deleteReminderShare = (req, res) => {
    const query = {
        sql: "DELETE FROM `remindershare` WHERE `remindsha_id` = ?",
        values: [req.params.remindsha_id],
    };
    db.query(query.sql, query.values, (err, data) => {
        if (err) {
            return res.json({ message: "Error deleting reminder share", error: err });
        }
        return res.json({ message: "Reminder share deleted successfully" });
    });
};

export { 
    addReminderShare,
    getReminderShares,
    getReminderShareById,
    updateReminderShare,
    deleteReminderShare 
};
