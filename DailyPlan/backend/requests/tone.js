import { db } from '../config/connection.js';

//global variables
const tones = {};


// Function to handle adding tone
const addTone = (req, res) => {
    console.log("Se recibió un chunk");
    const { tone_name, tone_location_chunk, tone_type, chunk_index, total_chunks, tone_id } = req.body;

    if (!tone_name || !tone_location_chunk || chunk_index === undefined || !total_chunks || !tone_id) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    if (!tones[tone_id]) {
        tones[tone_id] = {
            tone_name: tone_name,
            tone_type: tone_type,
            chunks: new Array(total_chunks).fill(undefined)
        };
    }

    tones[tone_id].chunks[chunk_index] = tone_location_chunk;

    // Check if all chunks are received
    if (tones[tone_id].chunks.every(chunk => chunk !== undefined)) {
        const completeToneLocation = tones[tone_id].chunks.join('');
        console.log("Se recibieron todos los chunks");
        const query = {
            sql: "INSERT INTO `tones`(`tone_name`, `tone_location`) VALUES (?, ?)",
            values: [tone_name, completeToneLocation]
        };

        db.query(query.sql, query.values, (err, result) => {
            if (err) {
                return res.status(500).json({ message: "Error adding tone", error: err });
            }
            delete tones[tone_id]; // Clean up in-memory storage
            return res.status(200).json({ message: "Tone added successfully", tone_id: result.insertId });
        });
    } else {
        return res.status(200).json({ message: `Chunk ${chunk_index + 1} of ${total_chunks} received` });
    }
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


// Function to retrieve tone chunks
const  getToneById = (req, res) => {
    const { tone_id } = req.body;
    
    if (!tone_id) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    const query = {
        sql: "SELECT `tone_name`, `tone_location` FROM `tones` WHERE `tone_id` = ?",
        values: [tone_id]
    };

    db.query(query.sql, query.values, (err, data) => {
        if (err) {
            return res.status(500).json({ message: "Error retrieving tone", error: err });
        }

        if (data.length === 0) {
            return res.status(404).json({ message: "Tone not found" });
        }

        const tone = data[0];
        const base64Chunks = splitBase64(tone.tone_location);

        return res.json({
            tone_id: tone_id,
            tone_name: tone.tone_name,
            tone_type: "audio/mp3", // Assuming mp3, modify if needed
            total_chunks: base64Chunks.length,
            chunks: base64Chunks
        });
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



//utils
const splitBase64 = (base64String, chunkSize = 2000) => {
 
    const chunks = [];
    for (let i = 0; i < base64String.length; i += chunkSize) {
        chunks.push(base64String.substring(i, i + chunkSize));
    }
    return chunks;
};


export { 
    addTone,
    getTones,
    getToneById,
    updateTone,
    deleteTone 
};
