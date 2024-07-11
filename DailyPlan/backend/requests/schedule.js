import { db } from '../config/connection.js';

const addSchedule = (req, res) => {
    const query = {
        sql: "INSERT INTO `schedules`(`schedule_eventname`, `schedule_datetime`, `schedule_duration_hour`, `schedule_duration_min`) VALUES (?, ?, ?, ?)",
        values: [
            req.body.schedule_eventname,
            req.body.schedule_datetime,
            req.body.schedule_duration_hour,
            req.body.schedule_duration_min,
        ],
    };
    db.query(query.sql, query.values, (err, data) => {
        if (err) {
            return res.json({ message: "Error adding schedule", error: err });
        }
        return res.json({ message: "Schedule added successfully" });
    });
};

const getSchedules = (req, res) => {
    const query = {
        sql: "SELECT `schedule_id`, `schedule_eventname`, `schedule_datetime`, `schedule_duration_hour`, `schedule_duration_min` FROM `schedules` WHERE 1",
    };
    db.query(query.sql, (err, data) => {
        if (err) {
            return res.json({ message: "Error retrieving schedules", error: err });
        }
        return res.json(data);
    });
};

const getScheduleById = (req, res) => {
    const query = {
        sql: "SELECT `schedule_id`, `schedule_eventname`, `schedule_datetime`, `schedule_duration_hour`, `schedule_duration_min` FROM `schedules` WHERE `schedule_id` = ?",
        values: [req.params.schedule_id],
    };
    db.query(query.sql, query.values, (err, data) => {
        if (err) {
            return res.json({ message: "Error retrieving schedule", error: err });
        }
        return res.json(data);
    });
};

const updateSchedule = (req, res) => {
    const query = {
        sql: "UPDATE `schedules` SET `schedule_eventname` = ?, `schedule_datetime` = ?, `schedule_duration_hour` = ?, `schedule_duration_min` = ? WHERE `schedule_id` = ?",
        values: [
            req.body.schedule_eventname,
            req.body.schedule_datetime,
            req.body.schedule_duration_hour,
            req.body.schedule_duration_min,
            req.params.schedule_id,
        ],
    };
    db.query(query.sql, query.values, (err, data) => {
        if (err) {
            return res.json({ message: "Error updating schedule", error: err });
        }
        return res.json({ message: "Schedule updated successfully" });
    });
};

const deleteSchedule = (req, res) => {
    const query = {
        sql: "DELETE FROM `schedules` WHERE `schedule_id` = ?",
        values: [req.params.schedule_id],
    };
    db.query(query.sql, query.values, (err, data) => {
        if (err) {
            return res.json({ message: "Error deleting schedule", error: err });
        }
        return res.json({ message: "Schedule deleted successfully" });
    });
};

export { 
    addSchedule,
    getSchedules,
    getScheduleById,
    updateSchedule,
    deleteSchedule 
};
