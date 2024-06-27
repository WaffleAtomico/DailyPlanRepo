import { db } from '../server/connection.js';
import jwt from "jsonwebtoken";

const SECRET_KEY = 'Xu$UW$z)555419G:f+iuZ';

const loginUser = (req, res) => {
    console.log("req.body" + req.body.user_mail);
    const query = {
        sql: 'SELECT * FROM users WHERE `user_mail` = ? AND `user_password` = ?  AND `user_status` = 1',
        values: [req.body.user_mail, req.body.user_password]
    };
    db.query(query.sql, query.values, (err, data) => {
        if (err) {
            return res.json({ message: 'Error al verificar usuario', error: err });
        }

        if (data){
            console.log("data" + data + data.length);
            if (data.length > 0) {
                const token = jwt.sign({
                    data: data[0].user_id
                }, SECRET_KEY, { expiresIn: 60 * 60 });
                return res.json({ token });
            } else {
                return res.status(401).json({ error: 'Credenciales inválidas' });
            }
        }
    });
};

export { loginUser };