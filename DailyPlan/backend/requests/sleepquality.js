import { db } from '../config/connection.js';
//este
const addSleepQuality = (req, res) => {

    const body = req.body.sleepQualityInfo;
    
    console.log("Guardando sleep quaility info", body);
    const query = {
        sql: "INSERT INTO `sleepquality`(`quality_good`, `quality_medium`, `quiality_bad`, `quality_date`, `sleep_rep_stopped`,  `sleep_id`) VALUES (?, ?, ?, ?, ?, ?)",
        values: [
            body.quality_good,
            body.quality_medium,
            body.quiality_bad,
            body.quality_date,
            body.sleep_rep_stopped,
            body.sleep_id,
        ],
    };
    db.query(query.sql, query.values, (err, data) => {
        if (err) {

            console.log("todo mal", err);
            return res.json({ message: "Error adding sleep quality", error: err });
        }
        console.log("todo bien");
        return res.json({ message: "Sleep quality added successfully" });
    });
};

const getSleepQualities = (req, res) => {
    const query = {
        sql: "SELECT `quality_id`, `quality_good`, `quality_medium`, `quiality_bad`, `quality_date`, `sleep_id` FROM `sleepquality` WHERE 1",
    };
    db.query(query.sql, (err, data) => {
        if (err) {
            return res.json({ message: "Error retrieving sleep qualities", error: err });
        }
        return res.json(data);
    });
};

const getSleepQualityById = (req, res) => {
    console.log("sleep quality by id", req.body);
    const query = {
        sql: "SELECT * FROM `sleepquality` WHERE `sleep_id` = ? AND `quality_date` = ? ORDER BY `quality_date` DESC LIMIT 1",
        values: [req.body.quality_id, req.body.current_date],
    };
    db.query(query.sql, query.values, (err, data) => {
        if (err) {
            return res.json({ message: "Error retrieving sleep quality", error: err });
        }
        return res.json(data);
    });
};

const getSleepQualityByUser = (req, res) => {
    console.log("sleep quality by user", req.body);
    const query = {
        sql: "SELECT * FROM `sleepquality` WHERE `sleep_id` = ?",
        values: [req.body.quality_id],
    };
    db.query(query.sql, query.values, (err, data) => {
        if (err) {
            return res.json({ message: "Error retrieving sleep quality", error: err });
        }
        return res.json(data);
    });
};

//este
const getSleepQualitiesByDateRange = (req, res) => {
    const startDate = req.params.startDate;  // Espera 'YYYY-MM-DD'
    const endDate = req.params.endDate;  // Espera 'YYYY-MM-DD'
    const userId = req.params.userId;
    const query = {
        sql: "SELECT `quality_good`, `quality_medium`, `quiality_bad` FROM `sleepquality` WHERE `quality_date` BETWEEN ? AND ? AND `sleep_id` = ?",
        values: [startDate, endDate, userId],
    };
    db.query(query.sql, query.values, (err, data) => {
        if (err) {
            return res.json({ message: "Error retrieving sleep qualities by date range", error: err });
        }
        return res.json(data);
    });
};


const updateSleepQuality = (req, res) => {



    const query = {
        sql: "UPDATE `sleepquality` SET `quality_good` = ?, `quality_medium` = ?, `quiality_bad` = ? WHERE `quality_id` = ?",
        values: [
            req.body.quality_good,
            req.body.quality_medium,
            req.body.quiality_bad,
            req.params.quality_id,
        ],
    };
    db.query(query.sql, query.values, (err, data) => {
        if (err) {
            return res.json({ message: "Error updating sleep quality", error: err });
        }
        return res.json({ message: "Sleep quality updated successfully" });
    });
};

const deleteSleepQuality = (req, res) => {
    const query = {
        sql: "DELETE FROM `sleepquality` WHERE `quality_id` = ?",
        values: [req.params.quality_id],
    };
    db.query(query.sql, query.values, (err, data) => {
        if (err) {
            return res.json({ message: "Error deleting sleep quality", error: err });
        }
        return res.json({ message: "Sleep quality deleted successfully" });
    });
};

const UpdateSleepRepIncr = (req, res) => {
    const { date, userId } = req.body;
    
    console.log('Request received with date:', date, 'and userId:', userId);

    // Query to get the sleep quality data for the given date and the previous two days
    const sleepQualityQuery = {
        sql: `
            SELECT 
                sq.quality_date,
                sq.sleep_rep_stopped,
                sm.sleep_rep
            FROM sleepquality sq
            INNER JOIN sleepmode sm ON sq.sleep_id = sm.sleep_id
            WHERE sq.quality_date BETWEEN DATE_SUB(?, INTERVAL 2 DAY) AND ?
            AND sq.sleep_id = ?
        `,
        values: [date, date, userId]
    };

    console.log('Executing sleep quality query:', sleepQualityQuery.sql, 'with values:', sleepQualityQuery.values);

    db.query(sleepQualityQuery.sql, sleepQualityQuery.values, (err, data) => {
        if (err) {
            console.error('Error retrieving sleep data:', err);
            return res.json({ message: "Error retrieving sleep data", error: err });
        }

        console.log('Sleep quality data retrieved:', data);

        if (data.length < 3) {
            console.log('Not enough continuous sleep quality data found for the specified date range');
            return res.json({ message: "Not enough continuous sleep quality data found for the specified date range" });
        }

        // Calculate the average of sleep_rep_stopped and check against sleep_rep
        const avgSleepRepStopped = data.reduce((sum, row) => sum + row.sleep_rep_stopped, 0) / data.length;
        const avgSleepRep = data.reduce((sum, row) => sum + row.sleep_rep, 0) / data.length;

        console.log('Average sleep_rep_stopped:', avgSleepRepStopped);
        console.log('Average sleep_rep:', avgSleepRep);

        const increment = avgSleepRepStopped > avgSleepRep ? 1 : -1;

        console.log('Increment value to be applied:', increment);

        // Update the sleep_rep_incr column for the given date and the previous two days
        const updateQuery = {
            sql: `
                UPDATE sleepmode
                SET sleep_rep_incr = sleep_rep_incr + ?
                WHERE sleep_id = ?
            `,
            values: [increment, userId]
        };

        console.log('Executing update query:', updateQuery.sql, 'with values:', updateQuery.values);

        db.query(updateQuery.sql, updateQuery.values, (updateErr, updateData) => {
            if (updateErr) {
                console.error('Error updating sleep quality increment:', updateErr);
                return res.json({ message: "Error updating sleep quality increment", error: updateErr });
            }

            console.log('Sleep quality increment updated successfully:', updateData);
            return res.json({ message: "Sleep quality increment updated successfully" });
        });
    });
};

export { 
    addSleepQuality,
    getSleepQualities,
    getSleepQualityById,
    updateSleepQuality,
  
    getSleepQualitiesByDateRange,
    UpdateSleepRepIncr,
    getSleepQualityByUser,
    deleteSleepQuality 
};
