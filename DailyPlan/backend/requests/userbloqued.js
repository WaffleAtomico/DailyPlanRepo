import { db } from "../config/connection.js";

const getUsersBlocked = (req, res) => {
  const user_id = req.body.user_id;
  const query = {
    sql: "SELECT ub.userblocked_id, ub.user_id_sourse, ub.user_id_target, u.user_mail " +
         "FROM `usersblocked` AS ub " +
         "LEFT JOIN `users` AS u ON (ub.user_id_target = u.user_id) " +
         "WHERE ub.`user_id_sourse` = ?",
    values: [user_id],
  };
  db.query(query.sql, query.values, (err, data) => {
    if (err) {
      return res.json({
        message: "Error retrieving blocked users",
        error: err,
      });
    }
    return res.json(data);
  });
};

const addUserBlocked = (req, res) => {
  const query = {
    sql: "INSERT INTO `usersblocked`(`user_id_sourse`, `user_id_target`) VALUES (?, ?)",
    values: [req.body.user_id_sourse, req.body.user_id_target],
  };
  db.query(query.sql, query.values, (err, data) => {
    if (err) {
      return res.json({ message: "Error adding user blocked", error: err });
    }
    return res.json({ message: "User blocked added successfully" });
  });
};

const delUserBlocked = (req, res) => {
  const { userblocked_id } = req.body;
  const query = {
    sql: "DELETE FROM `usersblocked` WHERE `userblocked_id` = ?",
    values: [userblocked_id],
  };
  db.query(query.sql, query.values, (err, data) => {
    if (err) {
      return res.json({ message: "Error deleting user blocked", error: err });
    }
    return res.json({ message: "User blocked deleted successfully" });
  });
};

const isUserBlocked = (req, res) => {
  const query = {
    sql: "SELECT COUNT(*) AS count FROM `usersblocked` WHERE `user_id_sourse` = ? AND `user_id_target` = ?",
    values: [req.body.user_id_sourse, req.body.user_id_target],
  };
  db.query(query.sql, query.values, (err, data) => {
    if (err) {
      return res.json({ message: "Error checking user blocked status", error: err });
    }
    const isBlocked = data[0].count > 0;
    return res.json({ isBlocked });
  });
};

export { getUsersBlocked, addUserBlocked, delUserBlocked, isUserBlocked };
