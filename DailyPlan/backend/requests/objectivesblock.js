import { db } from '../config/connection.js';
const addObjectivesBlock = (req, res) => {

    console.log("meter bloque,", req.body);
    const body = req.body.blockInfo;
    const query = {
        sql: "INSERT INTO `objectivesblock`(`reminder_id`, `objblo_name`, `objblo_check`, `objblo_duration_min`, `objblo_durationreal_min`) VALUES (?, ?, ?, ?, ?)",
        values: [
            body.reminder_id,
            body.objblo_name,
            body.objblo_check,
            body.objblo_duration_min,
            body.objblo_durationreal_min
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
        sql: "SELECT *FROM `objectivesblock` WHERE `objblo_id` = ?",
        values: [req.body.objblo_id],
    };
    db.query(query.sql, query.values, (err, data) => {
        if (err) {
            return res.json({ message: "Error retrieving objective block", error: err });
        }
        return res.json(data);
    });
};

const updateObjectivesBlock = (req, res) => {
    console.log("Se mando a actualizar", req.body);
    const idObj = req.body.objblo_id;
    const body = req.body.blockInfo;
    const query = {
        sql: "UPDATE `objectivesblock` SET `reminder_id` = ?, `objblo_name` = ?, `objblo_check` = ?, `objblo_duration_min` = ?, `objblo_durationreal_min` = ? WHERE `objblo_id` = ?",
        values: [
            body.reminder_id,
            body.objblo_name,
            body.objblo_check,
            body.objblo_duration_min,
            body.objblo_durationreal_min,
            idObj
        ],
    }
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


const CompleteObjectivesBlock = (req, res) => {
    console.log("Se mando a completar", req.body);
    const idObj = req.body.objblo_id;
    const { objblo_check, objblo_durationreal_min } = req.body.blockInfo;

    const query = {
        sql: "UPDATE `objectivesblock` SET `objblo_check` = ?, `objblo_durationreal_min` = ? WHERE `objblo_id` = ?",
        values: [
            objblo_check,
            objblo_durationreal_min,
            idObj
        ],
    };

    db.query(query.sql, query.values, (err, data) => {
        if (err) {
            return res.json({ message: "Error updating objective block", error: err });
        }
        return res.json({ message: "Objective block updated successfully" });
    });
};

export default updateObjectivesBlock;


export { 
    addObjectivesBlock,
    getObjectivesBlocks,
    CompleteObjectivesBlock,
    getObjectivesBlockById,
    updateObjectivesBlock,
    deleteObjectivesBlock 
};
