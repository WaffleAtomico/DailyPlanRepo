import { db } from '../config/connection.js';
const addReminderShare = (req, res) => {

    const body = req.body.reminderShareInfo;
    
    const query = {
        sql: "INSERT INTO `remindershare`(`rs_user_id_target`, `reminder_id`) VALUES (?, ?)",
        values: [
            body.rs_user_id_target,
            body.reminder_id,
        ],
    };
    db.query(query.sql, query.values, (err, result) => {
        if (err) {
            return res.status(500).json({ message: "Error adding reminder share", error: err });
        }
        return res.status(200).json({ message: "Reminder share added successfully", remindsha_id: result.insertId });
    });
};
//inservible
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
        values: [req.body.remindsha_id],
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
            req.body.remindsha_id,
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
        values: [req.body.remindsha_id],
    };
    db.query(query.sql, query.values, (err, data) => {
        if (err) {
            return res.json({ message: "Error deleting reminder share", error: err });
        }
        return res.json({ message: "Reminder share deleted successfully" });
    });
};

const getUserIdsByReminder = (req, res) => {
    
    const query = {
        sql: "SELECT `rs_user_id_target` FROM `remindershare` WHERE `reminder_id` = ?",
        values: [req.body.reminder_id],
    };
    db.query(query.sql, query.values, (err, data) => {
        if (err) {
            return res.json({ message: "Error retrieving user IDs", error: err });
        }
        return res.json(data);
    });
};

export { 
    addReminderShare,
    getReminderShares,
    getReminderShareById,
    updateReminderShare,
    deleteReminderShare,
    getUserIdsByReminder
};
