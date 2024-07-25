import { db } from '../config/connection.js';

const addPermision = (req, res) => {

  console.log("Se trata de agregar un permiso:", req.body.permissionInfo);

    const { user_id, permision_active } = req.body.permissionInfo;
  
    // Check if a permission record exists for the user
    const checkQuery = {
      sql: "SELECT * FROM `permisions` WHERE `user_id` = ?",
      values: [user_id],
    };
  
    db.query(checkQuery.sql, checkQuery.values, (checkErr, checkData) => {
      if (checkErr) {
        return res.json({ message: "Error checking permission", error: checkErr });
      }
  
      if (checkData.length > 0) {
        // If the record exists, update it
        const updateQuery = {
          sql: "UPDATE `permisions` SET `permision_active` = ? WHERE `user_id` = ?",
          values: [permision_active, user_id],
        };
  
        db.query(updateQuery.sql, updateQuery.values, (updateErr, updateData) => {
          if (updateErr) {
            return res.json({ message: "Error updating permission", error: updateErr });
          }
          return res.json({ message: "Permission updated successfully" });
        });
      } else {
        // If the record does not exist, insert a new one
        const insertQuery = {
          sql: "INSERT INTO `permisions`(`permision_active`, `user_id`) VALUES (?, ?)",
          values: [permision_active, user_id],
        };
  
        db.query(insertQuery.sql, insertQuery.values, (insertErr, insertData) => {
          if (insertErr) {
            return res.json({ message: "Error adding permission", error: insertErr });
          }
          return res.json({ message: "Permission added successfully" });
        });
      }
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
        sql: "SELECT `permision_id`, `permision_active`, `user_id` FROM `permisions` WHERE `user_id` = ?",
        values: [req.body.permissionId],
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
