import { db } from "../server/connection.js";

/*
{
"clock_name": "Africa/Abidjan",
"user_id":"2"
}
*/
const addClock = (req, res) => {
  const query = {
    sql: "INSERT INTO `clocks`( `clock_name`, `user_id`) VALUES (?)",
    values: [[req.body.clock_name, req.body.user_id]],
  };
  db.query(query.sql, query.values, (err, data) => {
    if (err) {
      return res.json({ message: "Error adding clock info", error: err });
    }
    return res.json({ message: "Clock info added successfully" });
  });
};

/*
{
"user_id":"2"
}
*/

const getClock = (req, res) => {
  const query = {
    sql: "SELECT * FROM `clocks` WHERE `user_id` = ?",
    values: [req.body.user_id],
  };
  // console.log("userid from clocks.js (back): "+ req.body.user_id);
  db.query(query.sql, query.values, (err, data) => {
    if (err) return res.json(err);
    // console.log("Data obtenida: " + JSON.stringify(data, null, 2));
    // console.log(Array.isArray(data));
    console.log(data);
    return res.json(data);
    // return res.json(JSON.stringify(data, null, 2));
  });
};

const delClock = (req, res) => {
  const query = {
    sql: "DELETE FROM `clocks` WHERE `clock_id` = ?",
    values: [req.body.clock_id],
  };
  console.log("clockid from del clocks.js (back): " + req.body.clock_id);
  db.query(query.sql, query.values, (err, data) => {
    if (err) {
      return res.json({ message: "Error deleting clock info", error: err });
    }
    return res.json({ message: "Clock info deleted successfully" });
  });
};

const ClockExistsInUser = (req, res) => {
  console.log(req.body);
  const query = {
    sql: "SELECT * FROM `clocks` WHERE `clock_name` = ? AND `user_id` = ?",
    values: [req.body.clock_name, req.body.user_id],
  };

  db.query(query.sql, query.values, (err, data) => {
    if (err) {
      return res.json({
        message: "Error verifying clockzone in user",
        error: err,
      });
    }
    if (data.length > 0) {
      return res.json({ exists: true });
    } else {
      return res.json({ exists: false });
    }
  });
};

export { addClock, getClock, delClock, ClockExistsInUser };
