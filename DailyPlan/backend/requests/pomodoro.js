import { db } from '../config/connection.js';

const addPomodoro = (req, res) => {
    const query = {
        sql: "INSERT INTO `pomodoros`(`tpomodoro_hour_work`, `pomodoro_min_work`, `pomodoro_shortrest`, `pomodoro_longrest`, `tone_id`) VALUES (?, ?, ?, ?, ?)",
        values: [
            req.body.tpomodoro_hour_work,
            req.body.pomodoro_min_work,
            req.body.pomodoro_shortrest,
            req.body.pomodoro_longrest,
            req.body.tone_id,
        ],
    };
    db.query(query.sql, query.values, (err, data) => {
        if (err) {
            return res.json({ message: "Error adding pomodoro", error: err });
        }
        return res.json({ message: "Pomodoro added successfully" });
    });
};

const getPomodoros = (req, res) => {
    const query = {
        sql: "SELECT `pomodoro_id`, `tpomodoro_hour_work`, `pomodoro_min_work`, `pomodoro_shortrest`, `pomodoro_longrest`, `tone_id` FROM `pomodoros` WHERE 1",
    };
    db.query(query.sql, (err, data) => {
        if (err) {
            return res.json({ message: "Error retrieving pomodoros", error: err });
        }
        return res.json(data);
    });
};

const getPomodoroById = (req, res) => {
    const query = {
        sql: "SELECT `pomodoro_id`, `tpomodoro_hour_work`, `pomodoro_min_work`, `pomodoro_shortrest`, `pomodoro_longrest`, `tone_id` FROM `pomodoros` WHERE `pomodoro_id` = ?",
        values: [req.params.pomodoro_id],
    };
    db.query(query.sql, query.values, (err, data) => {
        if (err) {
            return res.json({ message: "Error retrieving pomodoro", error: err });
        }
        return res.json(data);
    });
};

const updatePomodoro = (req, res) => {
    const query = {
        sql: "UPDATE `pomodoros` SET `tpomodoro_hour_work` = ?, `pomodoro_min_work` = ?, `pomodoro_shortrest` = ?, `pomodoro_longrest` = ?, `tone_id` = ? WHERE `pomodoro_id` = ?",
        values: [
            req.body.tpomodoro_hour_work,
            req.body.pomodoro_min_work,
            req.body.pomodoro_shortrest,
            req.body.pomodoro_longrest,
            req.body.tone_id,
            req.params.pomodoro_id,
        ],
    };
    db.query(query.sql, query.values, (err, data) => {
        if (err) {
            return res.json({ message: "Error updating pomodoro", error: err });
        }
        return res.json({ message: "Pomodoro updated successfully" });
    });
};

const deletePomodoro = (req, res) => {
    const query = {
        sql: "DELETE FROM `pomodoros` WHERE `pomodoro_id` = ?",
        values: [req.params.pomodoro_id],
    };
    db.query(query.sql, query.values, (err, data) => {
        if (err) {
            return res.json({ message: "Error deleting pomodoro", error: err });
        }
        return res.json({ message: "Pomodoro deleted successfully" });
    });
};

export { 
    addPomodoro,
    getPomodoros,
    getPomodoroById,
    updatePomodoro,
    deletePomodoro 
};
