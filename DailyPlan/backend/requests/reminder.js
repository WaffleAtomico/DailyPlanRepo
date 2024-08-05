import { db } from '../config/connection.js';

const addReminder = (req, res) => {

    console.log("EL cuerpo de recordatorio:", req.body);
    const body = req.body.reminderInfo;

    const query = {
        sql: "INSERT INTO `reminders`(`reminder_name`, `reminder_date`, `reminder_hour`, `reminder_min`, `reminder_active`, `repdays_id`, `reminder_tone_duration_sec`, `reminder_advance_min`, `reminder_img`, `reminder_desc`, `reminder_days_suspended`, `reminder_share`,  `tone_id`,`user_id`, `reminder_travel_time`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?)",
        values: [
            body.reminder_name,
            body.reminder_date,
            body.reminder_hour,
            body.reminder_min,
            body.reminder_active,
            body.repdays_id,
            body.reminder_tone_duration_sec,
            body.reminder_advance_min,
            body.reminder_img,
            body.reminder_desc,
            body.reminder_days_suspended,
            body.reminder_share,
            
           
            body.tone_id,
            body.user_id,
            body.reminder_travel_time
        ],
    };

    db.query(query.sql, query.values, (err, result) => {
        if (err) {
            return res.status(500).json({ message: "Error adding reminder", error: err });
        }
        return res.status(200).json({ message: "Reminder added successfully", reminder_id: result.insertId });
    });
};
const getReminders = (req, res) => {
    const query = {
        sql: "SELECT `reminder_id`, `reminder_name`, `reminder_date`, `reminder_hour`, `reminder_min`, `reminder_active`, `repdays_id`, `reminder_tone_duration_sec`, `reminder_advance_min`, `reminder_img`, `reminder_desc`, `reminder_days_suspended`, `reminder_share`, `reminder_sourse_id` FROM `reminders` WHERE 1",
    };
    db.query(query.sql, (err, data) => {
        if (err) {
            return res.json({ message: "Error retrieving reminders", error: err });
        }
        return res.json(data);
    });
};

const getRemindersByMonth = (req, res) => {


    console.log("Se está pidiendo el mes por medio de: ", req.body);
    const month = req.body.month;  // Espera 'YYYY-MM'
    const userId = req.body.user_id;  // Espera el ID del usuario
    const query = {
        sql: "SELECT `reminder_name`, `reminder_date`, `reminder_hour`, `reminder_min` FROM `reminders` WHERE `user_id` = ? AND `reminder_date` BETWEEN ? AND ? ORDER BY `reminder_date`, `reminder_hour`",
        values: [userId, `${month}-01`, `${month}-31`],
    };
    db.query(query.sql, query.values, (err, data) => {
        if (err) {
            return res.json({ message: "Error retrieving reminders for month", error: err });
        }
        return res.json(data);
    });
};


const getRemindersByWeek = (req, res) => {

    // console.log("Se quiere obtener los recordatorios:", req.body);
    const startDate = req.body.startDate;  // Expects 'YYYY-MM-DD'
    const endDate = req.body.endDate;  // Expects 'YYYY-MM-DD'
    const user_id = req.body.user_id;  // Expects the user ID

    const query = {
        sql: `SELECT reminder_id, reminder_name, reminder_hour, reminder_date, reminder_min, reminder_travel_time
            FROM 
                reminders
            WHERE 
                user_id = ? 
                AND reminder_date BETWEEN ? AND ?
            ORDER BY 
                reminder_date, 
                reminder_hour`,
        values: [user_id, startDate, endDate],
    };

    db.query(query.sql, query.values, (err, data) => {
        if (err) {
            return res.json({ message: "Error retrieving reminders for week", error: err });
        }
        
        return res.json(data);
    });
};

const getRemindersByDay = (req, res) => {

    // console.log("Se quiere obtener los recordatorios:", req.body);
    console.log("Se mando:", req.body.date);
    const date = req.body.date;  // Expects 'YYYY-MM-DD'
    const user_id = req.body.user_id;  // Expects the user ID

    const query = {
        sql: `SELECT r.reminder_id, r.reminder_name, r.reminder_hour, r.reminder_date, r.reminder_min, r.tone_id,
        r.reminder_active,
         r.reminder_travel_time, ob.objblo_id, ob.objblo_name, ob.objblo_check, ob.objblo_duration_min, 
         ob.objblo_durationreal_min, o.obj_id, o.obj_name, o.id_user, o.obj_check, o.obj_at_time
            FROM 
                reminders r
            INNER JOIN 
                objectivesblock ob ON r.reminder_id = ob.reminder_id
            INNER JOIN 
                objectives o ON ob.objblo_id = o.objblo_id
            WHERE 
                r.user_id = ? 
                AND r.reminder_date = ?
            ORDER BY 
                r.reminder_date, 
                r.reminder_hour`,
        values: [user_id, date],
    };

    db.query(query.sql, query.values, (err, data) => {
        if (err) {
            console.log("Error al tomar los recordatorios del día", err);
            return res.json({ message: "Error retrieving reminders for the day", error: err });
        }
        console.log("Recordatorios del día:", data);
        return res.json(data);
    });
};



const getReminderById = (req, res) => {
    const query = {
        sql: "SELECT `reminder_id`, `reminder_name`, `reminder_date`, `reminder_hour`, `reminder_min`, `reminder_active`, `repdays_id`, `reminder_tone_duration_sec`, `reminder_advance_min`, `reminder_img`, `reminder_desc`, `reminder_days_suspended`, `reminder_share`, `reminder_sourse_id` FROM `reminders` WHERE `reminder_id` = ?",
        values: [req.body.reminder_id],
    };
    db.query(query.sql, query.values, (err, data) => {
        if (err) {
            return res.json({ message: "Error retrieving reminder", error: err });
        }
        return res.json(data);
    });
};

const updateReminder = (req, res) => {
    const query = {
        sql: "UPDATE `reminders` SET `reminder_name` = ?, `reminder_date` = ?, `reminder_hour` = ?, `reminder_min` = ?, `reminder_active` = ?, `repdays_id` = ?, `reminder_tone_duration_sec` = ?, `reminder_advance_min` = ?, `reminder_img` = ?, `reminder_desc` = ?, `reminder_days_suspended` = ?, `reminder_share` = ?, `reminder_sourse_id` = ? WHERE `reminder_id` = ?",
        values: [
            req.body.reminder_name,
            req.body.reminder_date,
            req.body.reminder_hour,
            req.body.reminder_min,
            req.body.reminder_active,
            req.body.repdays_id,
            req.body.reminder_tone_duration_sec,
            req.body.reminder_advance_min,
            req.body.reminder_img,
            req.body.reminder_desc,
            req.body.reminder_days_suspended,
            req.body.reminder_share,
            req.body.reminder_sourse_id,
            req.body.reminder_id,
        ],
    };
    db.query(query.sql, query.values, (err, data) => {
        if (err) {
            return res.json({ message: "Error updating reminder", error: err });
        }
        return res.json({ message: "Reminder updated successfully" });
    });
};

const deleteReminder = (req, res) => {
    const query = {
        sql: "DELETE FROM `reminders` WHERE `reminder_id` = ?",
        values: [req.body.reminder_id],
    };
    db.query(query.sql, query.values, (err, data) => {
        if (err) {
            return res.json({ message: "Error deleting reminder", error: err });
        }
        return res.json({ message: "Reminder deleted successfully" });
    });
};



const getReminderBySourceIdAndUserId = (req, res) => {
    const query = {
        sql: "SELECT `reminder_id`, `reminder_name`, `reminder_create`, `reminder_date`, `reminder_hour`, `reminder_min`, `reminder_active`, `repdays_id`, `reminder_tone_duration_sec`, `reminder_advance_min`, `reminder_img`, `reminder_desc`, `reminder_days_suspended`, `reminder_share`, `reminder_sourse_id`, `user_id`, `tone_id`, `reminder_travel_time` FROM `reminders` WHERE `reminder_sourse_id` = ? AND `user_id` = ?",
        values: [req.body.reminder_sourse_id, req.body.user_id],
    };
    db.query(query.sql, query.values, (err, data) => {
        if (err) {
            return res.json({ message: "Error retrieving reminder", error: err });
        }
        return res.json(data);
    });
};

export { 
    addReminder,
    getReminders,
    getRemindersByMonth,
    getRemindersByWeek,
    getReminderById,
    updateReminder,
    deleteReminder,
    getRemindersByDay,
    getReminderBySourceIdAndUserId,
};
