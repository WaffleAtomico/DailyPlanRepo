import { db } from '../config/connection.js';

const addSchedule = (req, res) => {

    console.log("Se agregó un recordatorio", req.body.schedule);
    const body = req.body.schedule;

    const query = {
        sql: "INSERT INTO `schedules`(`schedule_eventname`, `schedule_datetime`, `schedule_duration_hour`, `schedule_duration_min`,`user_id` ) VALUES (?, ?, ?, ?, ?)",
        values: [
            body.schedule_eventname,
            body.schedule_datetime,
            body.schedule_duration_hour,
            body.schedule_duration_min,
            body.user_id
        ],
    };
    db.query(query.sql, query.values, (err, data) => {
        if (err) {
            return res.json({ message: "Error adding schedule", error: err });
        }
        return res.json({ message: "Schedule added successfully" });
    });
};


const addPomodoroSchedule = (req, res) => {
    const body = req.body.schedule;
    const userId = body.user_id;
    const eventName = "Pomodoro";

    const checkQuery = {
        sql: "SELECT * FROM `schedules` WHERE `schedule_eventname` = ? AND `user_id` = ?",
        values: [eventName, userId],
    };

    db.query(checkQuery.sql, checkQuery.values, (err, data) => {
        if (err) {
            return res.json({ message: "Error checking schedule", error: err });
        }
        if (data.length > 0) {
            // Schedule exists, update it
            const updateQuery = {
                sql: "UPDATE `schedules` SET `schedule_datetime` = ?, `schedule_duration_hour` = ?, `schedule_duration_min` = ? WHERE `schedule_eventname` = ? AND `user_id` = ?",
                values: [
                    body.schedule_datetime,
                    body.schedule_duration_hour,
                    body.schedule_duration_min,
                    eventName,
                    userId
                ],
            };
            db.query(updateQuery.sql, updateQuery.values, (err, data) => {
                if (err) {
                    return res.json({ message: "Error updating schedule", error: err });
                }
                return res.json({ message: "Pomodoro schedule updated successfully" });
            });
        } else {
            // Schedule does not exist, add it
            const insertQuery = {
                sql: "INSERT INTO `schedules`(`schedule_eventname`, `schedule_datetime`, `schedule_duration_hour`, `schedule_duration_min`, `user_id` ) VALUES (?, ?, ?, ?, ?)",
                values: [
                    eventName,
                    body.schedule_datetime,
                    body.schedule_duration_hour,
                    body.schedule_duration_min,
                    userId
                ],
            };
            db.query(insertQuery.sql, insertQuery.values, (err, data) => {
                if (err) {
                    return res.json({ message: "Error adding schedule", error: err });
                }
                return res.json({ message: "Pomodoro schedule added successfully" });
            });
        }
    });
};

const addSleepSchedule = (req, res) => {
    const body = req.body.schedule;
    const userId = body.user_id;
    const eventName = "Sleep";
    
    const checkQuery = {
        sql: "SELECT * FROM `schedules` WHERE `schedule_eventname` = ? AND `user_id` = ?",
        values: [eventName, userId],
    };

    db.query(checkQuery.sql, checkQuery.values, (err, data) => {
        if (err) {
            return res.json({ message: "Error checking schedule", error: err });
        }
        if (data.length > 0) {
            // Schedule exists, update it
            const updateQuery = {
                sql: "UPDATE `schedules` SET `schedule_datetime` = ?, `schedule_duration_hour` = ?, `schedule_duration_min` = ? WHERE `schedule_eventname` = ? AND `user_id` = ?",
                values: [
                    body.schedule_datetime,
                    body.schedule_duration_hour,
                    body.schedule_duration_min,
                    eventName,
                    userId
                ],
            };
            db.query(updateQuery.sql, updateQuery.values, (err, data) => {
                if (err) {
                    return res.json({ message: "Error updating schedule", error: err });
                }
                return res.json({ message: "Sleep schedule updated successfully" });
            });
        } else {
            // Schedule does not exist, add it
            const insertQuery = {
                sql: "INSERT INTO `schedules`(`schedule_eventname`, `schedule_datetime`, `schedule_duration_hour`, `schedule_duration_min`, `user_id` ) VALUES (?, ?, ?, ?, ?)",
                values: [
                    eventName,
                    body.schedule_datetime,
                    body.schedule_duration_hour,
                    body.schedule_duration_min,
                    userId
                ],
            };
            db.query(insertQuery.sql, insertQuery.values, (err, data) => {
                if (err) {
                    return res.json({ message: "Error adding schedule", error: err });
                }
                return res.json({ message: "Sleep schedule added successfully" });
            });
        }
    });
};


//function to delete 
const deleteSleepSchedule = (req, res) => {
    const userId = req.body.user_id;
    const eventName = "Sleep";

    const deleteQuery = {
        sql: "DELETE FROM `schedules` WHERE `schedule_eventname` = ? AND `user_id` = ?",
        values: [eventName, userId],
    };

    db.query(deleteQuery.sql, deleteQuery.values, (err, data) => {
        if (err) {
            return res.json({ message: "Error deleting schedule", error: err });
        }
        if (data.affectedRows === 0) {
            return res.json({ message: "No Sleep schedule found for this user" });
        }
        return res.json({ message: "Sleep schedule deleted successfully" });
    });
};



const getSchedules = (req, res) => {
    const query = {
        sql: "SELECT `schedule_id`, `schedule_eventname`, `schedule_datetime`, `schedule_duration_hour`, `schedule_duration_min`, `user_id`  FROM `schedules` WHERE 1",
    };
    db.query(query.sql, (err, data) => {
        if (err) {
            return res.json({ message: "Error retrieving schedules", error: err });
        }
        return res.json(data);
    });
};

const getScheduleById = (req, res) => {
    console.log("Se llamo el schedule", req.body);
    const query = {
        sql: "SELECT `schedule_id`, `schedule_eventname`, `schedule_datetime`, `schedule_duration_hour`, `schedule_duration_min` FROM `schedules` WHERE `user_id` = ?",
        values: [req.body.user_id],
    };
    db.query(query.sql, query.values, (err, data) => {
        if (err) {
            return res.json({ message: "Error retrieving schedule", error: err });
        }
        console.log("Se obtuvo", data);
        return res.json(data);
    });
};

const updateSchedule = (req, res) => {

    console.log("Se actualizó una tarea", req.body.schedule);

        const body = req.body.schedule;

    const query = {
        sql: "UPDATE `schedules` SET `schedule_eventname` = ?, `schedule_datetime` = ?, `schedule_duration_hour` = ?, `schedule_duration_min` = ? WHERE `schedule_id` = ?",
        values: [
            body.schedule_eventname,
            body.schedule_datetime,
            body.schedule_duration_hour,
            body.schedule_duration_min,
            body.schedule_id,
        ],
    };
    db.query(query.sql, query.values, (err, data) => {
        if (err) {
            return res.json({ message: "Error updating schedule", error: err });
        }
        return res.json({ message: "Schedule updated successfully" });
    });
};

const deletePomodoroSchedule = (req, res) => {
    const userId = req.body.user_id;
    const eventName = "Pomodoro";

    const deleteQuery = {
        sql: "DELETE FROM `schedules` WHERE `schedule_eventname` = ? AND `user_id` = ?",
        values: [eventName, userId],
    };

    db.query(deleteQuery.sql, deleteQuery.values, (err, data) => {
        if (err) {
            return res.json({ message: "Error deleting schedule", error: err });
        }
        if (data.affectedRows === 0) {
            return res.json({ message: "No Pomodoro schedule found for this user" });
        }
        return res.json({ message: "Pomodoro schedule deleted successfully" });
    });
};


const deleteSchedule = (req, res) => {
    const query = {
        sql: "DELETE FROM `schedules` WHERE `schedule_id` = ?",
        values: [req.params.schedule_id],
    };
    db.query(query.sql, query.values, (err, data) => {
        if (err) {
            return res.json({ message: "Error deleting schedule", error: err });
        }
        return res.json({ message: "Schedule deleted successfully" });
    });
};

export { 
    addSchedule,
    addPomodoroSchedule,
    addSleepSchedule,
    getSchedules,
    getScheduleById,
    updateSchedule,
    deleteSchedule,
    deleteSleepSchedule,
    deletePomodoroSchedule
    
    
};
