import { db } from '../config/connection.js';
//este
const addSleepmode = (req, res) => {

    

    const query = {
        sql: "INSERT INTO `sleepmode`(`sleep_id`, `sleep_starthour`, `sleep_endhour`, `sleep_active`, `sleep_rep`, `sleep_video_url`, `sleep_rep_stopped`, `sleep_rep_incr` , `tone_id`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
        values: [
            req.body.sleep_id,
            req.body.sleep_starthour,
            req.body.sleep_endhour,
            req.body.sleep_active,
            req.body.sleep_rep,
            req.body.sleep_video_url,
            req.body.sleep_rep_stopped,
            req.body.sleep_rep_incr,
            req.body.tone_id,
        ],
    };
    db.query(query.sql, query.values, (err, data) => {
        if (err) {
            return res.json({ message: "Error adding sleep mode", error: err });
        }
        return res.json({ message: "Sleep mode added successfully" });
    });
};

const getSleepmodes = (req, res) => {
    const query = {
        sql: "SELECT * FROM `sleepmode`",
    };
    db.query(query.sql, (err, data) => {
        if (err) {
            return res.json({ message: "Error retrieving sleep modes", error: err });
        }
        return res.json(data);
    });
};
//este
const getSleepmodeById = (req, res) => {
    const query = {
        sql: `
            SELECT sm.*, t.tone_location , t.tone_name
            FROM sleepmode sm
            LEFT JOIN tones t ON sm.tone_id = t.tone_id
            WHERE sm.sleep_id = ?
        `,
        values: [req.body.sleep_id],
    };
    db.query(query.sql, query.values, (err, data) => {
        if (err) {
            return res.json({ message: "Error retrieving sleep mode", error: err });
        }
        return res.json(data);
    });
};

//este
const updateSleepmode = (req, res) => {
    
    const query = {
        sql: "UPDATE `sleepmode` SET `sleep_starthour` = ?, `sleep_endhour` = ?, `sleep_active` = ?, `sleep_rep` = ?, `sleep_video_url` = ?, `sleep_rep_stopped` = ?, `tone_id` = ? WHERE `sleep_id` = ?",
        values: [
            req.body.sleep_starthour,
            req.body.sleep_endhour,
            req.body.sleep_active,
            req.body.sleep_rep,
            req.body.sleep_video_url,
            req.body.sleep_rep_stopped,
            req.body.tone_id,
            req.body.sleep_id, //id user
        ],
    };
    db.query(query.sql, query.values, (err, data) => {
        if (err) {
            return res.json({ message: "Error updating sleep mode", error: err });
        }
        return res.json({ message: "Sleep mode updated successfully" });
    });
};

const updateSleepRepStopped = (req, res) => {


    console.log("Se mando a actualizar las repeticiones", req.body);
    const query = {
        sql: "UPDATE `sleepmode` SET `sleep_rep_stopped` = ? WHERE `sleep_id` = ?",
        values: [req.body.sleep_rep_stopped, req.body.sleep_id],
    };
    db.query(query.sql, query.values, (err, data) => {
        if (err) {
            return res.json({ message: "Error updating sleep mode", error: err });
        }
        return res.json({ message: "Sleep mode updated successfully" });
    });
};

const deleteSleepmode = (req, res) => {
    const query = {
        sql: "DELETE FROM `sleepmode` WHERE `sleep_id` = ?",
        values: [req.body.sleep_id],
    };
    db.query(query.sql, query.values, (err, data) => {
        if (err) {
            return res.json({ message: "Error deleting sleep mode", error: err });
        }
        return res.json({ message: "Sleep mode deleted successfully" });
    });
};

export {
    addSleepmode,
    getSleepmodes,
    getSleepmodeById,
    updateSleepmode,
    deleteSleepmode,
    updateSleepRepStopped
};
