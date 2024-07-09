import { db } from "../config/connection.js";

const addAlarm = async (req, res) => {
    const query = {
      sql: "INSERT INTO `alarms`(`alarm_name`, `daysel_id`, `alarm_hour`, `alarm_min`, `alarm_sec`, `alarm_rep_tone`, `tone_id`, `alarm_days_suspended`, `alarm_active`, `alarm_imgage`, `alarm_desc`, `user_id`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      values: [
        req.body.alarm_name,
        req.body.daysel_id,
        req.body.alarm_hour,
        req.body.alarm_min,
        req.body.alarm_sec,
        req.body.alarm_rep_tone,
        req.body.tone_id,
        req.body.alarm_days_suspended,
        req.body.alarm_active,
        req.body.alarm_imgage,
        req.body.alarm_desc,
        req.body.user_id,
      ],
    };
  
    try {
      const data = await db.query(query.sql, query.values);
      return res.json({ message: "Alarm added successfully", data: data });
    } catch (err) {
      return res.status(500).json({ message: "Error adding alarm", error: err });
    }
  };
  
  const getAlarms = async (req, res) => {
    const query = {
      sql: "SELECT `alarm_id`, `alarm_name`, `daysel_id`, `alarm_hour`, `alarm_min`, `alarm_sec`, `alarm_rep_tone`, `tone_id`, `alarm_days_suspended`, `alarm_active`, `alarm_imgage`, `alarm_desc`, `user_id` FROM `alarms` WHERE `user_id` = ?",
      values: [req.params.user_id],
    };
  
    try {
      const data = await db.query(query.sql, query.values);
      return res.json(data);
    } catch (err) {
      return res.status(500).json({ message: "Error getting alarms", error: err });
    }
  };
  
  const getAlarmById = async (req, res) => {
    const query = {
      sql: "SELECT `alarm_id`, `alarm_name`, `daysel_id`, `alarm_hour`, `alarm_min`, `alarm_sec`, `alarm_rep_tone`, `tone_id`, `alarm_days_suspended`, `alarm_active`, `alarm_imgage`, `alarm_desc`, `user_id` FROM `alarms` WHERE `alarm_id` = ?",
      values: [req.params.alarm_id],
    };
  
    try {
      const data = await db.query(query.sql, query.values);
      return res.json(data[0]);
    } catch (err) {
      return res.status(500).json({ message: "Error getting alarm", error: err });
    }
  };
  
  const updateAlarm = async (req, res) => {
    const query = {
      sql: "UPDATE `alarms` SET `alarm_name` = ?, `daysel_id` = ?, `alarm_hour` = ?, `alarm_min` = ?, `alarm_sec` = ?, `alarm_rep_tone` = ?, `tone_id` = ?, `alarm_days_suspended` = ?, `alarm_active` = ?, `alarm_imgage` = ?, `alarm_desc` = ? WHERE `alarm_id` = ?",
      values: [
        req.body.alarm_name,
        req.body.daysel_id,
        req.body.alarm_hour,
        req.body.alarm_min,
        req.body.alarm_sec,
        req.body.alarm_rep_tone,
        req.body.tone_id,
        req.body.alarm_days_suspended,
        req.body.alarm_active,
        req.body.alarm_imgage,
        req.body.alarm_desc,
        req.params.alarm_id,
      ],
    };
  
    try {
      await db.query(query.sql, query.values);
      return res.json({ message: "Alarm updated successfully" });
    } catch (err) {
      return res.status(500).json({ message: "Error updating alarm", error: err });
    }
  };
  
  const deleteAlarm = async (req, res) => {
    const query = {
      sql: "DELETE FROM `alarms` WHERE `alarm_id` = ?",
      values: [req.params.alarm_id],
    };
  
    try {
      await db.query(query.sql, query.values);
      return res.json({ message: "Alarm deleted successfully" });
    } catch (err) {
      return res.status(500).json({ message: "Error deleting alarm", error: err });
    }
  };
  
  // Additional Functions
  const getAlarmsForUser = async (req, res) => {
    const query = {
      sql: "SELECT `alarm_id`, `alarm_name`, `daysel_id`, `alarm_hour`, `alarm_min`, `alarm_sec`, `alarm_rep_tone`, `tone_id`, `alarm_days_suspended`, `alarm_active`, `alarm_imgage`, `alarm_desc`, `user_id` FROM `alarms` WHERE `user_id` = ?",
      values: [req.params.user_id],
    };
  
    try {
      const data = await db.query(query.sql, query.values);
      return res.json(data);
    } catch (err) {
      return res.status(500).json({ message: "Error getting alarms for user", error: err });
    }
  };
  
  const isAlarmNameExistForUser = async (req, res) => {
    const query = {
      sql: "SELECT COUNT(*) as count FROM `alarms` WHERE `alarm_name` = ? AND `user_id` = ?",
      values: [req.body.alarm_name, req.body.user_id],
    };
  
    try {
      const data = await db.query(query.sql, query.values);
      return res.json({ exists: data[0].count > 0 });
    } catch (err) {
      return res.status(500).json({ message: "Error checking alarm name existence", error: err });
    }
  };
  
  const isUserAlarmLimitReached = async (req, res) => {
    const query = {
      sql: "SELECT COUNT(*) as count FROM `alarms` WHERE `user_id` = ?",
      values: [req.body.user_id],
    };
  
    try {
      const data = await db.query(query.sql, query.values);
      return res.json({ isLimitReached: data[0].count >= 50 });
    } catch (err) {
      return res.status(500).json({ message: "Error checking alarm limit", error: err });
    }
  };
 
export {
    addAlarm,
    getAlarmById,
    updateAlarm,
    deleteAlarm,
    getAlarmsForUser,
    isAlarmNameExistForUser,
    isUserAlarmLimitReached,
}