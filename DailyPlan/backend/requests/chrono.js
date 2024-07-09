import { db } from '../config/connection.js';

import { db } from "../config/connection.js";

const addChronometer = (req, res) => {
    const query = {
        sql: "INSERT INTO `chronometers`(`chrono_name`, `chrono_hour`, `chrono_min`, `chrono_sec`, `user_id`) VALUES (?, ?, ?, ?, ?)",
        values: [
            req.body.chrono_name,
            req.body.chrono_hour,
            req.body.chrono_min,
            req.body.chrono_sec,
            req.body.user_id,
        ],
    };
    db.query(query.sql, query.values, (err, data) => {
        if (err) {
            return res.json({ message: "Error adding chronometer", error: err });
        }
        return res.json({ message: "Chronometer added successfully" });
    });
};

const getChronometersForUser = (req, res) => {
    const query = {
        sql: "SELECT `chrono_id`, `chrono_name`, `chrono_hour`, `chrono_min`, `chrono_sec`, `user_id` FROM `chronometers` WHERE `user_id` = ?",
        values: [req.params.user_id],
    };
    db.query(query.sql, query.values, (err, data) => {
        if (err) {
            return res.json({ message: "Error retrieving chronometers", error: err });
        }
        return res.json(data);
    });
};

const getChronometerById = (req, res) => {
    const query = {
        sql: "SELECT `chrono_id`, `chrono_name`, `chrono_hour`, `chrono_min`, `chrono_sec`, `user_id` FROM `chronometers` WHERE `chrono_id` = ?",
        values: [req.params.chrono_id],
    };
    db.query(query.sql, query.values, (err, data) => {
        if (err) {
            return res.json({ message: "Error retrieving chronometer", error: err });
        }
        return res.json(data);
    });
};

const updateChronometer = (req, res) => {
    const query = {
        sql: "UPDATE `chronometers` SET `chrono_name` = ?, `chrono_hour` = ?, `chrono_min` = ?, `chrono_sec` = ? WHERE `chrono_id` = ?",
        values: [
            req.body.chrono_name,
            req.body.chrono_hour,
            req.body.chrono_min,
            req.body.chrono_sec,
            req.params.chrono_id,
        ],
    };
    db.query(query.sql, query.values, (err, data) => {
        if (err) {
            return res.json({ message: "Error updating chronometer", error: err });
        }
        return res.json({ message: "Chronometer updated successfully" });
    });
};

const deleteChronometer = (req, res) => {
    const query = {
        sql: "DELETE FROM `chronometers` WHERE `chrono_id` = ?",
        values: [req.params.chrono_id],
    };
    db.query(query.sql, query.values, (err, data) => {
        if (err) {
            return res.json({ message: "Error deleting chronometer", error: err });
        }
        return res.json({ message: "Chronometer deleted successfully" });
    });
};

export { addChronometer, getChronometersForUser, getChronometerById, updateChronometer, deleteChronometer };
