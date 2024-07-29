import { db } from "../config/connection.js";

const getWeeklyScorecard = async (req, res) => {
  const query = {
    sql: "SELECT `weeklyscorecard_id`, `user_id`, `punt_weekly_date`, `punt_value`, `punt_num_rem`, `punt_percent_rem`, `punt_num_alar`, `punt_percent_alar`, `punt_num_timer`, `punt_percent_timer`, `punt_num_chro`, `punt_percent_chro` FROM `weeklyscorecard`"
  };

  try {
    const data = await db.query(query.sql);
    return res.json(data);
  } catch (err) {
    return res.status(500).json({ message: "Error getting weeklyscorecard", error: err });
  }
};

const getWeeklyScorecardById = async (req, res) => {
  const query = {
    sql: "SELECT `weeklyscorecard_id`, `user_id`, `punt_weekly_date`, `punt_value`, `punt_num_rem`, `punt_percent_rem`, `punt_num_alar`, `punt_percent_alar`, `punt_num_timer`, `punt_percent_timer`, `punt_num_chro`, `punt_percent_chro` FROM `weeklyscorecard` WHERE `weeklyscorecard_id` = ?",
    values: [req.params.weeklyscorecard_id],
  };

  try {
    const data = await db.query(query.sql, query.values);
    return res.json(data[0]);
  } catch (err) {
    return res.status(500).json({ message: "Error getting weeklyscorecard", error: err });
  }
};

const getWeeklyScorecardForUser = async (req, res) => {
  const query = {
    sql: "SELECT `weeklyscorecard_id`, `user_id`, `punt_weekly_date`, `punt_value`, `punt_num_rem`, `punt_percent_rem`, `punt_num_alar`, `punt_percent_alar`, `punt_num_timer`, `punt_percent_timer`, `punt_num_chro`, `punt_percent_chro` FROM `weeklyscorecard` WHERE `user_id` = ? ORDER BY `punt_weekly_date` DESC",
    values: [req.params.user_id],
  };

  try {
    const data = await db.query(query.sql, query.values);
    return res.json(data);
  } catch (err) {
    return res.status(500).json({ message: "Error getting weeklyscorecard for user", error: err });
  }
};
  
const isUserWeeklyScorecard = async (req, res) => {
  const query = {
    sql: "SELECT COUNT(*) as count FROM `weeklyscorecard` WHERE `user_id` = ?",
    values: [req.body.user_id],
  };

  try {
    const data = await db.query(query.sql, query.values);
    return res.json({ isLimitReached: data[0].count > 0 });
  } catch (err) {
    return res.status(500).json({ message: "Error checking weeklyscorecard limit", error: err });
  }
};

export {
    getWeeklyScorecard,
    getWeeklyScorecardById,
    getWeeklyScorecardForUser,
    isUserWeeklyScorecard
}