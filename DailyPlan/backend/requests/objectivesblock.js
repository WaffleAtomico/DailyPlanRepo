import { db } from '../config/connection.js';
const addObjectivesBlock = (req, res) => {

    console.log("meter bloque,", req.body);

    const query = {
        sql: "INSERT INTO `objectivesblock`(`reminder_id`, `objblo_name`) VALUES (?, ?)",
        values: [
            req.body.reminder_id,
            req.body.objblo_name,
        ],
    };
    db.query(query.sql, query.values, (err, result) => {
        if (err) {
            return res.status(500).json({ message: "Error adding objective block", error: err });
        }
        return res.status(200).json({ message: "Objective block added successfully", objblo_id: result.insertId });
    });
};


const getObjectivesBlocks = (req, res) => {
    const query = {
        sql: "SELECT `objblo_id`, `reminder_id`, `objblo_name` FROM `objectivesblock` WHERE 1",
    };
    db.query(query.sql, (err, data) => {
        if (err) {
            return res.json({ message: "Error retrieving objective blocks", error: err });
        }
        return res.json(data);
    });
};

const getObjectivesBlockById = (req, res) => {
    const query = {
        sql: "SELECT `objblo_id`, `reminder_id`, `objblo_name` FROM `objectivesblock` WHERE `objblo_id` = ?",
        values: [req.params.objblo_id],
    };
    db.query(query.sql, query.values, (err, data) => {
        if (err) {
            return res.json({ message: "Error retrieving objective block", error: err });
        }
        return res.json(data);
    });
};

const updateObjectivesBlock = (req, res) => {
    const query = {
        sql: "UPDATE `objectivesblock` SET `reminder_id` = ?, `objblo_name` = ? WHERE `objblo_id` = ?",
        values: [
            req.body.reminder_id,
            req.body.objblo_name,
            req.params.objblo_id,
        ],
    };
    db.query(query.sql, query.values, (err, data) => {
        if (err) {
            return res.json({ message: "Error updating objective block", error: err });
        }
        return res.json({ message: "Objective block updated successfully" });
    });
};

const deleteObjectivesBlock = (req, res) => {
    const query = {
        sql: "DELETE FROM `objectivesblock` WHERE `objblo_id` = ?",
        values: [req.params.objblo_id],
    };
    db.query(query.sql, query.values, (err, data) => {
        if (err) {
            return res.json({ message: "Error deleting objective block", error: err });
        }
        return res.json({ message: "Objective block deleted successfully" });
    });
};

export { 
    addObjectivesBlock,
    getObjectivesBlocks,
    getObjectivesBlockById,
    updateObjectivesBlock,
    deleteObjectivesBlock 
};
