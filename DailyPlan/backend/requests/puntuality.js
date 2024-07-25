import { db } from '../config/connection.js';

const addPuntuality = (req, res) => {
    const query = {
        sql: "INSERT INTO `puntuality`(`user_id`, `punt_date`, `punt_value`, `punt_num_rem`, `punt_percent_rem`, `punt_num_alar`, `punt_percent_alar`, `punt_num_timer`, `punt_percent_timer`, `punt_num_chro`, `punt_percent_chro`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        values: [
            req.body.user_id,
            req.body.punt_date,
            req.body.punt_value,
            req.body.punt_num_rem,
            req.body.punt_percent_rem,
            req.body.punt_num_alar,
            req.body.punt_percent_alar,
            req.body.punt_num_timer,
            req.body.punt_percent_timer,
            req.body.punt_num_chro,
            req.body.punt_percent_chro,
        ],
    };
    db.query(query.sql, query.values, (err, data) => {
        if (err) {
            return res.json({ message: "Error adding puntuality", error: err });
        }
        return res.json({ message: "Puntuality added successfully" });
    });
};

const getPuntuality = (req, res) => {
    const query = {
        sql: "SELECT `punt_id`, `user_id`, `punt_date`, `punt_value`, `punt_num_rem`, `punt_percent_rem`, `punt_num_alar`, `punt_percent_alar`, `punt_num_timer`, `punt_percent_timer`, `punt_num_chro`, `punt_percent_chro` FROM `puntuality` WHERE 1",
    };
    db.query(query.sql, (err, data) => {
        if (err) {
            return res.json({ message: "Error retrieving puntuality", error: err });
        }
        return res.json(data);
    });
};

const getPuntualityById = (req, res) => {
    // console.log("En back puntById",req.body.user_id);
    const query = {
        sql: "SELECT `punt_id`, `user_id`, `punt_date`, `punt_value`, `punt_num_rem`, `punt_percent_rem`, `punt_num_alar`, `punt_percent_alar`, `punt_num_timer`, `punt_percent_timer`, `punt_num_chro`, `punt_percent_chro` FROM `puntuality` WHERE `user_id` = ?",
        values: [req.body.user_id],
    };
    db.query(query.sql, query.values, (err, data) => {
        if (err) {
            console.log("error");
            return res.json({ message: "Error retrieving puntuality", error: err });
        }
        // console.log("info obtenida", data);
        return res.json(data);
    });
};

const updatePuntuality = (req, res) => {

    console.log("Se manda a actualizar:", req.body.puntualityInfo);

    const query = {
        sql: "UPDATE `puntuality` SET `user_id` = ?, `punt_date` = ?, `punt_value` = ?, `punt_num_rem` = ?, `punt_percent_rem` = ?, `punt_num_alar` = ?, `punt_percent_alar` = ?, `punt_num_timer` = ?, `punt_percent_timer` = ?, `punt_num_chro` = ?, `punt_percent_chro` = ? WHERE `punt_id` = ?",
        values: [
            req.body.puntualityInfo.user_id,
            req.body.puntualityInfo.punt_date,
            req.body.puntualityInfo.punt_value,
            req.body.puntualityInfo.punt_num_rem,
            req.body.puntualityInfo.punt_percent_rem,
            req.body.puntualityInfo.punt_num_alar,
            req.body.puntualityInfo.punt_percent_alar,
            req.body.puntualityInfopunt_num_timer,
            req.body.puntualityInfo.punt_percent_timer,
            req.body.puntualityInfo.punt_num_chro,
            req.body.puntualityInfo.punt_percent_chro,
            req.body.puntualityInfo.punt_id,
        ],
    };
    db.query(query.sql, query.values, (err, data) => {
        if (err) {
            return res.json({ message: "Error updating puntuality", error: err });
        }
        return res.json({ message: "Puntuality updated successfully" });
    });
};

const deletePuntuality = (req, res) => {
    const query = {
        sql: "DELETE FROM `puntuality` WHERE `punt_id` = ?",

        values: [req.body.punt_id],

    };
    db.query(query.sql, query.values, (err, data) => {
        if (err) {
            return res.json({ message: "Error deleting puntuality", error: err });
        }
        return res.json({ message: "Puntuality deleted successfully" });
    });
};

export { 
    addPuntuality,
    getPuntuality,
    getPuntualityById,
    updatePuntuality,
    deletePuntuality 
};
