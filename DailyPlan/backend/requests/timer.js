import { db } from '../config/connection.js';

const addTimer = async (req, res) => {
    console.log(req.body);

    const query = {
        sql: "INSERT INTO `timers`(`timer_hour`, `timer_min`, `timer_sec`, `timer_duration`, `timer_name`, `tone_id`, `user_id`) VALUES (?, ?, ?, ?, ?, ?, ?)",
        values: [
            req.body.timer_hour,
            req.body.timer_min,
            req.body.timer_sec,
            req.body.timer_duration,
            req.body.timer_name,
            req.body.tone_id,
            req.body.user_id,
        ],
    };

    db.query(query.sql, query.values, (err, data) => {
        if (err) {
            return res.json({ message: "Error adding timer", error: err });
        }

        // Use the insertId property to get the ID of the inserted row
        const timer_id = data.insertId;
        return res.json({ message: "Success adding timer", timer_id: timer_id });
    });
};
const getTimersForUser = async (req, res) => {
    console.log(req.body.user_id);
    const query = {
        sql: `
            SELECT 
                t.timer_id, 
                t.timer_hour, 
                t.timer_min, 
                t.timer_sec, 
                t.timer_duration, 
                t.timer_name, 
                t.tone_id, 
                t.user_id,
                tones.tone_location 
            FROM 
                timers t
            INNER JOIN 
                tones 
            ON 
                t.tone_id = tones.tone_id 
            WHERE 
                t.user_id = ?`,
        values: [req.body.user_id],
    };
    db.query(query.sql, query.values, (err, data) => {
        if (err) {
            console.log(res);
            return res.json({ message: "Error retrieving chronometers", error: err });
        }
        return res.json(data);
    });
};

const getTimerById = async (req, res) => {
    const query = {
        sql: "SELECT `timer_id`, `timer_hour`, `timer_min`, `timer_sec`, `timer_duration`, `timer_name`, `tone_id`, `user_id` FROM `timers` WHERE `timer_id` = ?",
        values: [req.params.timer_id],
    };

    try {
        const data = await db.query(query.sql, query.values);
        return res.json({ message: "Timer retrieved successfully", data: data });
    } catch (err) {
        return res.status(500).json({ message: "Error retrieving timer", error: err });
    }
};

const updateTimer = async (req, res) => {
    const query = {
        sql: "UPDATE `timers` SET `timer_hour` = ?, `timer_min` = ?, `timer_sec` = ?, `timer_duration` = ?, `timer_name` = ?, `tone_id` = ?, `user_id` = ? WHERE `timer_id` = ?",
        values: [
            req.body.timer_hour,
            req.body.timer_min,
            req.body.timer_sec,
            req.body.timer_duration,
            req.body.timer_name,
            req.body.tone_id,
            req.body.user_id,
            req.params.timer_id,
        ],
    };

    try {
        const data = await db.query(query.sql, query.values);
        return res.json({ message: "Timer updated successfully", data: data });
    } catch (err) {
        return res.status(500).json({ message: "Error updating timer", error: err });
    }
};

const deleteTimer = async (req, res) => {
    const query = {
        sql: "DELETE FROM `timers` WHERE `timer_id` = ?",
        values: [req.params.timer_id],
    };

    try {
        const data = await db.query(query.sql, query.values);
        return res.json({ message: "Timer deleted successfully", data: data });
    } catch (err) {
        return res.status(500).json({ message: "Error deleting timer", error: err });
    }
};

export {
    addTimer,
    getTimersForUser,
    getTimerById,
    updateTimer,
    deleteTimer
};
