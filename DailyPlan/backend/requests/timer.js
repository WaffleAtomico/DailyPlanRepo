import db from '../db';

const addTimer = async (req, res) => {
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

    try {
        const data = await db.query(query.sql, query.values);
        return res.json({ message: "Timer added successfully", data: data });
    } catch (err) {
        return res.status(500).json({ message: "Error adding timer", error: err });
    }
};

const getTimersForUser = async (req, res) => {
    const query = {
        sql: "SELECT `timer_id`, `timer_hour`, `timer_min`, `timer_sec`, `timer_duration`, `timer_name`, `tone_id`, `user_id` FROM `timers` WHERE `user_id` = ?",
        values: [req.params.user_id],
    };

    try {
        const data = await db.query(query.sql, query.values);
        return res.json({ message: "Timers retrieved successfully", data: data });
    } catch (err) {
        return res.status(500).json({ message: "Error retrieving timers", error: err });
    }
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
