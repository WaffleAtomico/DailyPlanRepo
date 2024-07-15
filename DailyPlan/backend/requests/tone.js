import { db } from '../config/connection.js';


// Function to handle adding tone
const addTone = (req, res) => {
    const file = req.file;
    const { tone_name } = req.body;

    if (!file) {
        return res.status(400).json({ message: "File is required" });
    }

    // Convert the file buffer to a base64 string or save it directly to your database
    const tone_location = file.buffer.toString('base64'); // Example conversion to base64

    const query = {
        sql: "INSERT INTO `tones`(`tone_name`, `tone_location`) VALUES (?, ?)",
        values: [tone_name, tone_location],
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
