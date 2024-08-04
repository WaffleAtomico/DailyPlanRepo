import { db } from '../config/connection.js';

const addAlarmShare = (req, res) => {

    const body = req.body.alarmShareInfo;
    
    const query = {
        sql: "INSERT INTO `alarmshare`(`ar_user_id_target`, `alarm_id`) VALUES (?,?)",
        //    INSERT INTO `alarmshare`(`ar_user_id_target`, `alarm_id`) VALUES (?,?)
        values: [
            body.ar_user_id_target,
            body.alarm_id,
        ],
    };
    // console.log(query);
    db.query(query.sql, query.values, (err, result) => {
        console.log(result);
        if (err) {
            return res.status(500).json({ message: "Error adding alarm share", error: err });
        }
        return res.status(200).json({ message: "alarm share added successfully", alarmsha_id: result.insertId });
    });
};

const getAlarmShares = (req, res) => {
    const query = {
        sql: "SELECT `alarmsha_id`, `ar_user_id_target`, `alarm_id` FROM `alarmshare` WHERE 1",
    };
    db.query(query.sql, (err, data) => {
        if (err) {
            return res.json({ message: "Error retrieving alarm shares", error: err });
        }
        return res.json(data);
    });
};

const getAlarmShareById = (req, res) => {
    const query = {
        sql: "SELECT `alarmsha_id`, `ar_user_id_target`, `alarm_id` FROM `alarmshare` WHERE `alarm_id` = ?",
        values: [req.body.alarm_id],
    };
    db.query(query.sql, query.values, (err, data) => {
        if (err) {
            return res.json({ message: "Error retrieving alarm share", error: err });
        }
        return res.json(data);
    });
};

const updateAlarmShare = (req, res) => {
    const query = {
        sql: "UPDATE `alarmshare` SET `ar_user_id_target` = ?, `alarm_id` = ? WHERE `alarmsha_id` = ?",
        values: [
            req.body.ar_user_id_target,
            req.body.alarm_id,
            req.body.alarmsha_id,
        ],
    };
    db.query(query.sql, query.values, (err, data) => {
        if (err) {
            return res.json({ message: "Error updating alarm share", error: err });
        }
        return res.json({ message: "Alarm share updated successfully" });
    });
};

const deleteAlarmShare = (req, res) => {
    const query = {
        sql: "DELETE FROM `alarmshare` WHERE `ar_user_id_target`= ? AND `alarm_id`= ?",
        values: [req.body.ar_user_id_target, req.body.alarm_id],
    };
    db.query(query.sql, query.values, (err, data) => {
        if (err) {
            return res.json({ message: "Error deleting alarm share", error: err });
        }
        return res.json({ message: "Alarm share deleted successfully" });
    });
};

const getUserIdsByAlarm = (req, res) => {
    const query = {
        sql: "SELECT `ar_user_id_target` FROM `alarmshare` WHERE `alarm_id` = ?",
        values: [req.body.alarm_id],
    };
    db.query(query.sql, query.values, (err, data) => {
        if (err) {
            return res.json({ message: "Error retrieving user IDs", error: err });
        }
        return res.json(data);
    });
};

export { 
    addAlarmShare,
    getAlarmShares, 
    getAlarmShareById, 
    updateAlarmShare,
    deleteAlarmShare,
    getUserIdsByAlarm,
    
};
