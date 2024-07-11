import { db } from '../config/connection.js';

const addPermision = (req, res) => {
    // Cuando se crea debe de estar en 0
    const query = {
        sql: "INSERT INTO `permisions`(`permision_active`, `user_id`) VALUES (?, ?)",
        values: [
            req.body.permision_active,
            req.body.user_id,
        ],
    };
    db.query(query.sql, query.values, (err, data) => {
        if (err) {
            return res.json({ message: "Error adding permision", error: err });
        }
        return res.json({ message: "Permision added successfully" });
    });
};

const getPermisions = (req, res) => {
    const query = {
        sql: "SELECT `permision_id`, `permision_active`, `user_id` FROM `permisions` WHERE 1",
    };
    db.query(query.sql, (err, data) => {
        if (err) {
            return res.json({ message: "Error retrieving permissions", error: err });
        }
        return res.json(data);
    });
};

const getPermisionById = (req, res) => {
    const query = {
        sql: "SELECT `permision_id`, `permision_active`, `user_id` FROM `permisions` WHERE `permision_id` = ?",
        values: [req.params.permision_id],
    };
    db.query(query.sql, query.values, (err, data) => {
        if (err) {
            return res.json({ message: "Error retrieving permission", error: err });
        }
        return res.json(data);
    });
};

const updatePermision = (req, res) => {
    const query = {
        sql: "UPDATE `permisions` SET `permision_active` = ? WHERE `permision_id` = ?",
        values: [
            req.body.permision_active,
            req.params.permision_id,
        ],
    };
    db.query(query.sql, query.values, (err, data) => {
        if (err) {
            return res.json({ message: "Error updating permission", error: err });
        }
        return res.json({ message: "Permission updated successfully" });
    });
};

const deletePermision = (req, res) => {
    const query = {
        sql: "DELETE FROM `permisions` WHERE `permision_id` = ?",
        values: [req.params.permision_id],
    };
    db.query(query.sql, query.values, (err, data) => {
        if (err) {
            return res.json({ message: "Error deleting permission", error: err });
        }
        return res.json({ message: "Permission deleted successfully" });
    });
};

export { 
    addPermision,
    getPermisions,
    getPermisionById,
    updatePermision,
    deletePermision 
};
