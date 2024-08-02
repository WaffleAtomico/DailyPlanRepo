import { db } from '../config/connection.js';

const addDayselected = (req, res) => {
    const query = {
        sql: "INSERT INTO `dayselected`(`daysel_mon`, `daysel_tues`, `daysel_wed`, `daysel_thur`, `daysel_fri`, `daysel_sat`, `daysel_sun`) VALUES (?, ?, ?, ?, ?, ?, ?)",
        values: [
            req.body.daysel_mon,
            req.body.daysel_tues,
            req.body.daysel_wed,
            req.body.daysel_thur,
            req.body.daysel_fri,
            req.body.daysel_sat,
            req.body.daysel_sun,
        ],
    };
    db.query(query.sql, query.values, (err, data) => {
        if (err) {
            return res.json({ message: "Error adding day selected", error: err });
        }
        return res.json({ message: "Day selected added successfully", data });
    });
};

const getDayselecteds = (req, res) => {
    const query = {
        sql: "SELECT `daysel_id`, `daysel_mon`, `daysel_tues`, `daysel_wed`, `daysel_thur`, `daysel_fri`, `daysel_sat`, `daysel_sun` FROM `dayselected` WHERE 1",
    };
    db.query(query.sql, (err, data) => {
        if (err) {
            return res.json({ message: "Error retrieving day selected", error: err });
        }
        return res.json(data);
    });
};

const getDayselectedById = (req, res) => {
    const query = {
        sql: "SELECT `daysel_id`, `daysel_mon`, `daysel_tues`, `daysel_wed`, `daysel_thur`, `daysel_fri`, `daysel_sat`, `daysel_sun` FROM `dayselected` WHERE `daysel_id` = ?",
        values: [req.body.daysel_id],
    };
    db.query(query.sql, query.values, (err, data) => {
        if (err) {
            return res.json({ message: "Error retrieving day selected", error: err });
        }
        return res.json(data);
    });
};

const updateDayselected = (req, res) => {
    const query = {
        sql: "UPDATE `dayselected` SET `daysel_mon` = ?, `daysel_tues` = ?, `daysel_wed` = ?, `daysel_thur` = ?, `daysel_fri` = ?, `daysel_sat` = ?, `daysel_sun` = ? WHERE `daysel_id` = ?",
        values: [
            req.body.daysel_mon,
            req.body.daysel_tues,
            req.body.daysel_wed,
            req.body.daysel_thur,
            req.body.daysel_fri,
            req.body.daysel_sat,
            req.body.daysel_sun,
            req.params.daysel_id,
        ],
    };
    db.query(query.sql, query.values, (err, data) => {
        if (err) {
            return res.json({ message: "Error updating day selected", error: err });
        }
        return res.json({ message: "Day selected updated successfully" });
    });
};

const deleteDayselected = (req, res) => {
    const query = {
        sql: "DELETE FROM `dayselected` WHERE `daysel_id` = ?",
        values: [req.params.daysel_id],
    };
    db.query(query.sql, query.values, (err, data) => {
        if (err) {
            return res.json({ message: "Error deleting day selected", error: err });
        }
        return res.json({ message: "Day selected deleted successfully" });
    });
};

export { 
    addDayselected,
    getDayselecteds, 
    getDayselectedById, 
    updateDayselected,
    deleteDayselected 
};
