import { db } from '../config/connection.js';

const addPomodoro = (req, res) => {

    console.log("Se guardo el pomodoro", req.body.pomodoroInfo);

    const body = req.body.pomodoroInfo;

    const query = {
        sql: "INSERT INTO `pomodoros`(`pomodoro_id`,`tpomodoro_hour_work`, `pomodoro_min_work`, `pomodoro_shortrest`, `pomodoro_longrest`, `tone_id`) VALUES (?,?, ?, ?, ?, ?)",
        values: [
            body.pomodoro_id,
            body.tpomodoro_hour_work,
            body.pomodoro_min_work,
            body.pomodoro_shortrest,
            body.pomodoro_longrest,
            body.tone_id,
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
        sql: `
            SELECT 
                p.pomodoro_id, 
                p.tpomodoro_hour_work, 
                p.pomodoro_min_work, 
                p.pomodoro_shortrest, 
                p.pomodoro_longrest, 
                p.tone_id,
                t.tone_location,
                t.tone_name
            FROM 
                pomodoros p
            INNER JOIN 
                tones t ON p.tone_id = t.tone_id
            WHERE 
                p.pomodoro_id = ?
        `,
        values: [req.body.pomodoro_id],
    };
    db.query(query.sql, query.values, (err, data) => {
        if (err) {
            return res.json({ message: "Error retrieving pomodoro", error: err });
        }
        return res.json(data);
    });
};


const updatePomodoro = (req, res) => {

    console.log("Se actualizó el pomodoro:", req.body.pomodoroInfo);

    const body =req.body.pomodoroInfo;

    const query = {
        sql: "UPDATE `pomodoros` SET `tpomodoro_hour_work` = ?, `pomodoro_min_work` = ?, `pomodoro_shortrest` = ?, `pomodoro_longrest` = ?, `tone_id` = ? WHERE `pomodoro_id` = ?",
        values: [
            body.tpomodoro_hour_work,
            body.pomodoro_min_work,
            body.pomodoro_shortrest,
            body.pomodoro_longrest,
            body.tone_id,
            body.pomodoro_id
            
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
