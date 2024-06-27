import { db } from "../server/connection.js";

const getUsersBlocked = (req, res) => {
  const user_id = req.body.user_id;
  const query = {
    sql: "SELECT ub.userblocked_id, ub.user_id_sourse, ub.user_id_target, u.user_mail " +
         "FROM `usersblocked` ub " +
         "LEFT JOIN `users` u ON (ub.user_id_target = u.user_id) " +
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
  const { user_id_sourse, user_id_target } = req.body;
  const query = {
    sql: "INSERT INTO `usersblocked`(`user_id_sourse`, `user_id_target`) VALUES (?, ?)",
    values: [user_id_sourse, user_id_target],
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

export { getUsersBlocked, addUserBlocked, delUserBlocked };
