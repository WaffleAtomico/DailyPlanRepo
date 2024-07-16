import { db } from '../config/connection.js';

const addSleepQuality = (req, res) => {
    const query = {
        sql: "INSERT INTO `sleepquality`(`quality_good`, `quality_medium`, `quiality_bad`, `quality_date`, `sleep_id`) VALUES (?, ?, ?, ?, ?)",
        values: [
            req.body.quality_good,
            req.body.quality_medium,
            req.body.quiality_bad,
            req.body.quality_date,
            req.body.sleep_id,
        ],
    };
    db.query(query.sql, query.values, (err, data) => {
        if (err) {
            return res.json({ message: "Error adding sleep quality", error: err });
        }
        return res.json({ message: "Sleep quality added successfully" });
    });
};

const getSleepQualities = (req, res) => {
    const query = {
        sql: "SELECT `quality_id`, `quality_good`, `quality_medium`, `quiality_bad`, `quality_date`, `sleep_id` FROM `sleepquality` WHERE 1",
    };
    db.query(query.sql, (err, data) => {
        if (err) {
            return res.json({ message: "Error retrieving sleep qualities", error: err });
        }
        return res.json(data);
    });
};

const getSleepQualityById = (req, res) => {
    const query = {
        sql: "SELECT `quality_id`, `quality_good`, `quality_medium`, `quiality_bad`, `quality_date`, `sleep_id` FROM `sleepquality` WHERE `sleep_id` = ?",
        values: [req.params.quality_id],
    };
    db.query(query.sql, query.values, (err, data) => {
        if (err) {
            return res.json({ message: "Error retrieving sleep quality", error: err });
        }
        return res.json(data);
    });
};

const getSleepQualitiesByDateRange = (req, res) => {
    const startDate = req.params.startDate;  // Espera 'YYYY-MM-DD'
    const endDate = req.params.endDate;  // Espera 'YYYY-MM-DD'
    const userId = req.params.userId;
    const query = {
        sql: "SELECT `quality_good`, `quality_medium`, `quiality_bad` FROM `sleepquality` WHERE `quality_date` BETWEEN ? AND ? AND `sleep_id` = ?",
        values: [startDate, endDate, userId],
    };
    db.query(query.sql, query.values, (err, data) => {
        if (err) {
            return res.json({ message: "Error retrieving sleep qualities by date range", error: err });
        }
        return res.json(data);
    });
};

/*Estas ya no son necesarias, pero las dejare por si las dudas */
const updateSleepQuality = (req, res) => {
    const query = {
        sql: "UPDATE `sleepquality` SET `quality_good` = ?, `quality_medium` = ?, `quiality_bad` = ? WHERE `quality_id` = ?",
        values: [
            req.body.quality_good,
            req.body.quality_medium,
            req.body.quiality_bad,
            req.params.quality_id,
        ],
    };
    db.query(query.sql, query.values, (err, data) => {
        if (err) {
            return res.json({ message: "Error updating sleep quality", error: err });
        }
        return res.json({ message: "Sleep quality updated successfully" });
    });
};

const deleteSleepQuality = (req, res) => {
    const query = {
        sql: "DELETE FROM `sleepquality` WHERE `quality_id` = ?",
        values: [req.params.quality_id],
    };
    db.query(query.sql, query.values, (err, data) => {
        if (err) {
            return res.json({ message: "Error deleting sleep quality", error: err });
        }
        return res.json({ message: "Sleep quality deleted successfully" });
    });
};

export { 
    addSleepQuality,
    getSleepQualities,
    getSleepQualityById,
    getSleepQualitiesByDateRange,
    updateSleepQuality,
    deleteSleepQuality 
};
