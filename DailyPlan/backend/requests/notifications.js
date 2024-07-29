import { db } from '../config/connection.js';

const addNotification = (req, res) => {
    console.log(req.body);
    const query = {
        sql: "INSERT INTO `notifications`(`notification_name` , `notification_type`, `user_id`) VALUES (?, ?, ?)",
        values: [
            req.body.notification_name,
            req.body.notification_type,
            req.body.user_id,
        ],
    };
    db.query(query.sql, query.values, (err, data) => {
        if (err) {
            return res.json({ message: "Error adding notification", error: err });
        }
        return res.json({ message: "Notification added successfully" });
    });
};

const getUserNotifications = (req, res) => {
    const query = {
        sql: "SELECT `notification_id`, `notification_name`, `notification_date`, `notification_type`, `user_id` FROM `notifications` WHERE `user_id` = ?",
        values: [req.body.user_id],
    };
    db.query(query.sql, query.values, (err, data) => {
        if (err) {
            return res.json({ message: "Error retrieving notifications", error: err });
        }
        return res.json(data);
    });
};

export { 
    addNotification, 
    getUserNotifications 
};
