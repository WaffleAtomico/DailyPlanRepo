import { db } from '../config/connection.js';

const addRepetitionDay = (req, res) => {
    const query = {
        sql: "INSERT INTO `repetitiondays`(`repday_date`) VALUES (?)",
        values: [
            req.body.repday_date,
        ],
    };
    db.query(query.sql, query.values, (err, data) => {
        if (err) {
            return res.json({ message: "Error adding repetition day", error: err });
        }
        return res.json({ message: "Repetition day added successfully" });
    });
};

const getRepetitionDays = (req, res) => {
    const query = {
        sql: "SELECT `repdays_id`, `repday_date` FROM `repetitiondays` WHERE 1",
    };
    db.query(query.sql, (err, data) => {
        if (err) {
            return res.json({ message: "Error retrieving repetition days", error: err });
        }
        return res.json(data);
    });
};

const getRepetitionDayById = (req, res) => {
    const query = {
        sql: "SELECT `repdays_id`, `repday_date` FROM `repetitiondays` WHERE `repdays_id` = ?",
        values: [req.params.repdays_id],
    };
    db.query(query.sql, query.values, (err, data) => {
        if (err) {
            return res.json({ message: "Error retrieving repetition day", error: err });
        }
        return res.json(data);
    });
};

const updateRepetitionDay = (req, res) => {
    const query = {
        sql: "UPDATE `repetitiondays` SET `repday_date` = ? WHERE `repdays_id` = ?",
        values: [
            req.body.repday_date,
            req.params.repdays_id,
        ],
    };
    db.query(query.sql, query.values, (err, data) => {
        if (err) {
            return res.json({ message: "Error updating repetition day", error: err });
        }
        return res.json({ message: "Repetition day updated successfully" });
    });
};

const deleteRepetitionDay = (req, res) => {
    const query = {
        sql: "DELETE FROM `repetitiondays` WHERE `repdays_id` = ?",
        values: [req.params.repdays_id],
    };
    db.query(query.sql, query.values, (err, data) => {
        if (err) {
            return res.json({ message: "Error deleting repetition day", error: err });
        }
        return res.json({ message: "Repetition day deleted successfully" });
    });
};

export { 
    addRepetitionDay,
    getRepetitionDays,
    getRepetitionDayById,
    updateRepetitionDay,
    deleteRepetitionDay 
};
