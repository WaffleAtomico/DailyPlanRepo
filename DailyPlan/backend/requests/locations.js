import { db } from '../config/connection.js';

const addLocation = (req, res) => {

    const body = req.body.locationInfo;

    const query = {
        sql: "INSERT INTO `locations`(`location_x`, `location_y`, `location_type`, `reminder_id`) VALUES (?, ?, ?, ?)",
        values: [
            body.location_x,
            body.location_y,
            body.location_type,
            body.reminder_id,
        ],
    };
    db.query(query.sql, query.values, (err, data) => {
        if (err) {
            return res.json({ message: "Error adding location", error: err });
        }
        return res.json({ message: "Location added successfully" });
    });
};

const getLocations = (req, res) => {
    const query = {
        sql: "SELECT `location_id`, `location_x`, `location_y`, `location_type`, `reminder_id` FROM `locations` WHERE 1",
    };
    db.query(query.sql, (err, data) => {
        if (err) {
            return res.json({ message: "Error retrieving locations", error: err });
        }
        return res.json(data);
    });
};

const getLocationById = (req, res) => {
    const query = {
        sql: "SELECT `location_id`, `location_x`, `location_y`, `location_type`, `reminder_id` FROM `locations` WHERE `location_id` = ?",
        values: [req.params.location_id],
    };
    db.query(query.sql, query.values, (err, data) => {
        if (err) {
            return res.json({ message: "Error retrieving location", error: err });
        }
        return res.json(data);
    });
};

const updateLocation = (req, res) => {
    const query = {
        sql: "UPDATE `locations` SET `location_x` = ?, `location_y` = ?, `location_type` = ?, `reminder_id` = ? WHERE `location_id` = ?",
        values: [
            req.body.location_x,
            req.body.location_y,
            req.body.location_type,
            req.body.reminder_id,
            req.params.location_id,
        ],
    };
    db.query(query.sql, query.values, (err, data) => {
        if (err) {
            return res.json({ message: "Error updating location", error: err });
        }
        return res.json({ message: "Location updated successfully" });
    });
};

const deleteLocation = (req, res) => {
    const query = {
        sql: "DELETE FROM `locations` WHERE `location_id` = ?",
        values: [req.params.location_id],
    };
    db.query(query.sql, query.values, (err, data) => {
        if (err) {
            return res.json({ message: "Error deleting location", error: err });
        }
        return res.json({ message: "Location deleted successfully" });
    });
};

export { 
    addLocation,
    getLocations, 
    getLocationById, 
    updateLocation,
    deleteLocation 
};
