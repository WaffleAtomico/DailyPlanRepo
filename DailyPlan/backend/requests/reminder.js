import { db } from '../config/connection.js';

const addReminder = (req, res) => {
    const query = {
        sql: "INSERT INTO `reminders`(`reminder_name`, `reminder_date`, `reminder_hour`, `reminder_min`, `reminder_active`, `repdays_id`, `reminder_tone_duration_sec`, `reminder_advance_min`, `reminder_img`, `reminder_desc`, `reminder_days_suspended`, `reminder_share`, `reminder_sourse_id`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        values: [
            req.body.reminder_name,
            req.body.reminder_date,
            req.body.reminder_hour,
            req.body.reminder_min,
            req.body.reminder_active,
            req.body.repdays_id,
            req.body.reminder_tone_duration_sec,
            req.body.reminder_advance_min,
            req.body.reminder_img,
            req.body.reminder_desc,
            req.body.reminder_days_suspended,
            req.body.reminder_share,
            req.body.reminder_sourse_id,
        ],
    };
    db.query(query.sql, query.values, (err, data) => {
        if (err) {
            return res.json({ message: "Error adding reminder", error: err });
        }
        return res.json({ message: "Reminder added successfully" });
    });
};

const getReminders = (req, res) => {
    const query = {
        sql: "SELECT `reminder_id`, `reminder_name`, `reminder_date`, `reminder_hour`, `reminder_min`, `reminder_active`, `repdays_id`, `reminder_tone_duration_sec`, `reminder_advance_min`, `reminder_img`, `reminder_desc`, `reminder_days_suspended`, `reminder_share`, `reminder_sourse_id` FROM `reminders` WHERE 1",
    };
    db.query(query.sql, (err, data) => {
        if (err) {
            return res.json({ message: "Error retrieving reminders", error: err });
        }
        return res.json(data);
    });
};

const getReminderById = (req, res) => {
    const query = {
        sql: "SELECT `reminder_id`, `reminder_name`, `reminder_date`, `reminder_hour`, `reminder_min`, `reminder_active`, `repdays_id`, `reminder_tone_duration_sec`, `reminder_advance_min`, `reminder_img`, `reminder_desc`, `reminder_days_suspended`, `reminder_share`, `reminder_sourse_id` FROM `reminders` WHERE `reminder_id` = ?",
        values: [req.params.reminder_id],
    };
    db.query(query.sql, query.values, (err, data) => {
        if (err) {
            return res.json({ message: "Error retrieving reminder", error: err });
        }
        return res.json(data);
    });
};

const updateReminder = (req, res) => {
    const query = {
        sql: "UPDATE `reminders` SET `reminder_name` = ?, `reminder_date` = ?, `reminder_hour` = ?, `reminder_min` = ?, `reminder_active` = ?, `repdays_id` = ?, `reminder_tone_duration_sec` = ?, `reminder_advance_min` = ?, `reminder_img` = ?, `reminder_desc` = ?, `reminder_days_suspended` = ?, `reminder_share` = ?, `reminder_sourse_id` = ? WHERE `reminder_id` = ?",
        values: [
            req.body.reminder_name,
            req.body.reminder_date,
            req.body.reminder_hour,
            req.body.reminder_min,
            req.body.reminder_active,
            req.body.repdays_id,
            req.body.reminder_tone_duration_sec,
            req.body.reminder_advance_min,
            req.body.reminder_img,
            req.body.reminder_desc,
            req.body.reminder_days_suspended,
            req.body.reminder_share,
            req.body.reminder_sourse_id,
            req.params.reminder_id,
        ],
    };
    db.query(query.sql, query.values, (err, data) => {
        if (err) {
            return res.json({ message: "Error updating reminder", error: err });
        }
        return res.json({ message: "Reminder updated successfully" });
    });
};

const deleteReminder = (req, res) => {
    const query = {
        sql: "DELETE FROM `reminders` WHERE `reminder_id` = ?",
        values: [req.params.reminder_id],
    };
    db.query(query.sql, query.values, (err, data) => {
        if (err) {
            return res.json({ message: "Error deleting reminder", error: err });
        }
        return res.json({ message: "Reminder deleted successfully" });
    });
};

export { 
    addReminder,
    getReminders,
    getReminderById,
    updateReminder,
    deleteReminder 
};
