import { db } from '../server/connection.js';

const addAllTitles = (req, res) => {
    const userId = req.body.user_id;
    const titles = Array.from({ length: 16 }, (_, i) => ({
        user_id: userId,
        title_id: i + 1,
        title_done: 0, 
    }));
    for (const title of titles) {
        const query = {
            sql: 'INSERT INTO `user_titles` (`user_id`, `title_id`, `title_done`) VALUES (?, ?, ?)',
            values: [title.user_id, title.title_id, title.title_done],
        };
        db.query(query.sql, query.values, (err, data) => {
            if (err) {
                console.error('Error adding title:', err);
            } else {
                console.log('Title added successfully:', title.title_id);
            }
        });
    }

    return res.json({ message: 'Titles are being added' });
};



// const getUserTitles = (req, res) => {
//     const userId = req.body.user_id;
//     const query = {
//         sql: 'SELECT * FROM `user_titles` WHERE `user_id` = ?',
//         values: [userId],
//     };
//     db.query(query.sql, query.values, (err, data) => {
//         if (err) {
//             return res.json({ message: 'Error fetching titles', error: err });
//         }
//         return res.json({ titles: data });
//     });
// };

const getUserTitles = (req, res) => {
    const user_id = req.body.user_id;
    const query = {
        sql: `SELECT t.title_name, ut.title_done FROM user_titles AS ut JOIN titles AS t ON ut.title_id = t.title_id WHERE ut.user_id = ?`,
        values: [user_id],
    };
    db.query(query.sql, query.values, (err, data) => {
        if (err) {
            return res.json({ message: 'Error fetching titles', error: err });
        }
        return res.json({ titles: data });
    });
}


const updateTitleStatus = (req, res) => {
    // const userId = req.body.user_id;
    // const titleIdToUpdate = req.body.title_id; 
    const query = {
        sql: 'UPDATE `user_titles` SET `title_done` = 1 WHERE `user_id` = ? AND `title_id` = ?',
        values: [req.body.user_id, req.body.title_id],
    };
    db.query(query.sql, query.values, (err, data) => {
        if (err) {
            return res.json({ message: 'Error updating title status', error: err });
        }
        return res.json({ message: 'Title status updated successfully' });
    });
};


export {
    addAllTitles,
    getUserTitles,
    updateTitleStatus
    };