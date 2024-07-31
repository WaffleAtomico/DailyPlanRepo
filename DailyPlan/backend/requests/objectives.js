import { db } from '../config/connection.js';

const addObjective = (req, res) => {

   
    const query = {
        sql: "INSERT INTO `objectives`(`obj_name`,`id_user`, `objblo_id`, `obj_check`, `obj_at_time` ) VALUES (?, ?, ?, ?, ?)",
        values: [
            req.body.obj_name,            
            req.body.id_user,
            req.body.objblo_id,
            0,
            0
        ],
    };
    db.query(query.sql, query.values, (err, data) => {
        if (err) {
            return res.json({ message: "Error adding objective", error: err });
        }
        return res.json({ message: "Objective added successfully" });
    });
};

const getObjectives = (req, res) => {
    const query = {
        sql: "SELECT `obj_id`, `obj_name`, `id_user`, `objblo_id` FROM `objectives` WHERE 1",
    };
    db.query(query.sql, (err, data) => {
        if (err) {
            return res.json({ message: "Error retrieving objectives", error: err });
        }
        return res.json(data);
    });
};

const getObjectiveById = (req, res) => {
    const query = {
        sql: "SELECT `obj_id`, `obj_name`,  `id_user`, `objblo_id` FROM `objectives` WHERE `obj_id` = ?",
        values: [req.params.obj_id],
    };
    db.query(query.sql, query.values, (err, data) => {
        if (err) {
            return res.json({ message: "Error retrieving objective", error: err });
        }
        return res.json(data);
    });
};

const updateObjective = (req, res) => {
    const query = {
        sql: "UPDATE `objectives` SET `obj_name` = ?,`id_user` = ?, `objblo_id` = ? WHERE `obj_id` = ?",
        values: [
            req.body.obj_name,
       
            req.body.id_user,
            req.body.objblo_id,
            req.params.obj_id,
        ],
    };
    db.query(query.sql, query.values, (err, data) => {
        if (err) {
            return res.json({ message: "Error updating objective", error: err });
        }
        return res.json({ message: "Objective updated successfully" });
    });
};



const updateObjectiveStatus = (req, res) => {
    const query = {
        sql: "UPDATE `objectives` SET  `obj_check` = ?,  `obj_at_time` = ?   WHERE `obj_id` = ?",
        values: [
           1,
            req.body.obj_at_time,
            req.body.obj_id,
        ],
    };
    db.query(query.sql, query.values, (err, data) => {
        if (err) {
            return res.json({ message: "Error updating objective", error: err });
        }
        return res.json({ message: "Objective updated successfully" });
    });
};



const deleteObjective = (req, res) => {
    const query = {
        sql: "DELETE FROM `objectives` WHERE `obj_id` = ?",
        values: [req.params.obj_id],
    };
    db.query(query.sql, query.values, (err, data) => {
        if (err) {
            return res.json({ message: "Error deleting objective", error: err });
        }
        return res.json({ message: "Objective deleted successfully" });
    });
};

export { 
    addObjective,
    getObjectives, 
    getObjectiveById, 
    updateObjectiveStatus,
    updateObjective,
    deleteObjective 
};
