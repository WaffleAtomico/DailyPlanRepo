import { db } from "../config/connection.js";

// Agregar alarma
const addAlarm = (req, res) => {

  console.log("Agregar una alarma:", req.body);
  const body = req.body.alarmData;

  const query = {
    sql: "INSERT INTO `alarms`(`alarm_name`, `daysel_id`, `alarm_hour`, `alarm_min`, `alarm_sec`, `alarm_rep_tone`, `tone_id`, `alarm_days_suspended`, `alarm_active`, `alarm_image`, `alarm_desc`, `user_id`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
    values: [
      body.alarm_name,
      body.daysel_id,
      body.alarm_hour,
      body.alarm_min,
      body.alarm_sec,
      body.alarm_rep_tone,
      body.tone_id,
      body.alarm_days_suspended,
      body.alarm_active,
      body.alarm_imgage,
      body.alarm_desc,
      body.user_id,
    ],
  };

  db.query(query.sql, query.values, (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Error adding Alarm", error: err });
    }
    return res.status(200).json({ message: "Alarm added successfully", alarm_id: result.insertId });
  });
};

// Obtener todas las alarmas para un usuario
const getAlarms = (req, res) => {
  const query = {
    sql: "SELECT `alarm_id`, `alarm_name`, `daysel_id`, `alarm_hour`, `alarm_min`, `alarm_sec`, `alarm_rep_tone`, `tone_id`, `alarm_days_suspended`, `alarm_active`, `alarm_image`, `alarm_desc`, `user_id` FROM `alarms` WHERE `user_id` = ?",
    values: [req.body.user_id],
  };

  db.query(query.sql, query.values, (err, data) => {
    if (err) {
      return res.status(500).json({ message: "Error getting alarms", error: err });
    }
    return res.json(data);
  });
};

// Obtener una alarma por ID
const getAlarmById = (req, res) => {
  const query = {
    sql: "SELECT `alarm_id`, `alarm_name`, `daysel_id`, `alarm_hour`, `alarm_min`, `alarm_sec`, `alarm_rep_tone`, `tone_id`, `alarm_days_suspended`, `alarm_active`, `alarm_image`, `alarm_desc`, `user_id` FROM `alarms` WHERE `alarm_id` = ?",
    values: [req.body.alarm_id],
  };
  db.query(query.sql, query.values, (err, data) => {
    if (err) {
      return res.status(500).json({ message: "Error getting alarm", error: err });
    }
    // console.log("Data sin alterar ",data);
    return res.json(data[0]);
  });
};

// Actualizar alarma
const updateAlarm = (req, res) => {
  const query = {
    sql: "UPDATE `alarms` SET `alarm_name` = ?, `daysel_id` = ?, `alarm_hour` = ?, `alarm_min` = ?, `alarm_sec` = ?, `alarm_rep_tone` = ?, `tone_id` = ?, `alarm_days_suspended` = ?, `alarm_active` = ?, `alarm_image` = ?, `alarm_desc` = ? WHERE `alarm_id` = ?",
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
      req.body.alarm_id,
    ],
  };

  db.query(query.sql, query.values, (err) => {
    if (err) {
      return res.status(500).json({ message: "Error updating alarm", error: err });
    }
    return res.json({ message: "Alarm updated successfully" });
  });
};

// Eliminar alarma
const deleteAlarm = (req, res) => {
  const query = {
    sql: "DELETE FROM `alarms` WHERE `alarm_id` = ?",
    values: [req.body.alarm_id],
  };

  db.query(query.sql, query.values, (err) => {
    if (err) {
      return res.status(500).json({ message: "Error deleting alarm", error: err });
    }
    return res.json({ message: "Alarm deleted successfully" });
  });
};

// Obtener todas las alarmas para un usuario
const getAlarmsForUser = (req, res) => {
  const query = {
    sql: "SELECT `alarm_id`, `alarm_name`, `daysel_id`, `alarm_hour`, `alarm_min`, `alarm_sec`, `alarm_rep_tone`, `tone_id`, `alarm_days_suspended`, `alarm_active`, `alarm_image`, `alarm_desc`, `user_id` FROM `alarms` WHERE `user_id` = ?",
    values: [req.body.user_id],
  };

  db.query(query.sql, query.values, (err, data) => {
    if (err) {
      return res.status(500).json({ message: "Error getting alarms for user", error: err });
    }
    return res.json(data);
  });
};

// Verificar si el nombre de la alarma existe para un usuario
const isAlarmNameExistForUser = (req, res) => {
  const query = {
    sql: "SELECT COUNT(*) as count FROM `alarms` WHERE `alarm_name` = ? AND `user_id` = ?",
    values: [req.body.alarm_name, req.body.user_id],
  };

  db.query(query.sql, query.values, (err, data) => {
    if (err) {
      return res.status(500).json({ message: "Error checking alarm name existence", error: err });
    }
    return res.json({ exists: data[0].count > 0 });
  });
};

// Verificar si el límite de alarmas del usuario ha sido alcanzado
const isUserAlarmLimitReached = (req, res) => {
  const query = {
    sql: "SELECT COUNT(*) as count FROM `alarms` WHERE `user_id` = ?",
    values: [req.body.user_id],
  };

  db.query(query.sql, query.values, (err, data) => {
    if (err) {
      return res.status(500).json({ message: "Error checking alarm limit", error: err });
    }
    return res.json({ isLimitReached: data[0].count >= 50 });
  });
};

export {
  addAlarm,
  getAlarms,
  getAlarmById,
  updateAlarm,
  deleteAlarm,
  getAlarmsForUser,
  isAlarmNameExistForUser,
  isUserAlarmLimitReached
};
