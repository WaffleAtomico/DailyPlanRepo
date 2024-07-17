import { db } from '../config/connection.js';

// Function to handle adding tone
const addTone = (req, res) => {


    

    const { tone_name, tone_location } = req.body;

    if (!tone_name || !tone_location) {
        return res.status(400).json({ message: "Tone name and location are required" });
    }

    const query = {
        sql: "INSERT INTO `tones`(`tone_name`, `tone_location`) VALUES (?, ?)",
        values: [tone_name, tone_location]
    };

    db.query(query.sql, query.values, (err, result) => {
        if (err) {
            return res.status(500).json({ message: "Error adding tone", error: err });
        }
        return res.status(200).json({ message: "Tone added successfully", tone_id: result.insertId });
    });
};


const getTones = (req, res) => {
    const query = {
        sql: "SELECT `tone_id`, `tone_name`, `tone_location` FROM `tones` WHERE 1",
    };
    db.query(query.sql, (err, data) => {
        if (err) {
            return res.json({ message: "Error retrieving tones", error: err });
        }
        return res.json(data);
    });
};

const getToneById = (req, res) => {
    const query = {
        sql: "SELECT `tone_id`, `tone_name`, `tone_location` FROM `tones` WHERE `tone_id` = ?",
        values: [req.params.tone_id],
    };
    db.query(query.sql, query.values, (err, data) => {
        if (err) {
            return res.json({ message: "Error retrieving tone", error: err });
        }
        return res.json(data);
    });
};

const updateTone = (req, res) => {
    const query = {
        sql: "UPDATE `tones` SET `tone_name` = ?, `tone_location` = ? WHERE `tone_id` = ?",
        values: [
            req.body.tone_name,
            req.body.tone_location,
            req.params.tone_id,
        ],
    };
    db.query(query.sql, query.values, (err, data) => {
        if (err) {
            return res.json({ message: "Error updating tone", error: err });
        }
        return res.json({ message: "Tone updated successfully" });
    });
};

const deleteTone = (req, res) => {
    const query = {
        sql: "DELETE FROM `tones` WHERE `tone_id` = ?",
        values: [req.params.tone_id],
    };
    db.query(query.sql, query.values, (err, data) => {
        if (err) {
            return res.json({ message: "Error deleting tone", error: err });
        }
        return res.json({ message: "Tone deleted successfully" });
    });
};

export { 
    addTone,
    getTones,
    getToneById,
    updateTone,
    deleteTone 
};
