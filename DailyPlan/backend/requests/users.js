import { db } from "../config/connection.js";

const getUsers = (req, res) => {
  const q = "SELECT * FROM users";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
};

const getConn = (req, res) => {
  const query = {
    sql: "SELECT 1",
  };
  db.query(query.sql, (err, data) => {
    if (err) {
      return res.json({ connected: false });
    }
    return res.json({ connected: true });
  });
};

const getUser = (req, res) => {
  // console.log("(getUser)En back el id: " + req.body.user_id);
  const query = {
    sql: "SELECT * FROM users WHERE `user_id` = ?",
    values: [req.body.user_id],
  };
  db.query(query.sql, query.values, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
};

/* json para postman
{
    "user_mail": "test@gmail.com",
    "user_name": "test",
    "user_password": "123",
    "user_number": "3312345678"
}
*/

// Función para insertar un usuario
const createUser = (req, res) => {
  const query = {
    sql: "INSERT INTO users (`user_mail`, `user_name`, `user_password`, `user_number`, `user_status`) VALUE (?)",
    values: [
      [
        req.body.user_mail,
        req.body.user_name,
        req.body.user_password,
        req.body.user_number,
        req.body.user_status,
      ],
    ],
  };
  db.query(query.sql, query.values, (err, data) => {
    if (err) {
      return res.json({ message: "Error creating user", error: err });
    }
    return res.json({ message: "User created successfully" });
  });
};

/* json para postman
{
    "user_mail": "testupdated@gmail.com",
    "user_name": "testupdated",
    "user_password": "221",
    "user_number": "3312345678",
    "user_id": 1
}
*/

// Función para actualizar un usuario
const updateUser = (req, res) => {
  const query = {
    sql: "UPDATE `users` SET `user_mail` = ?, `user_name` = ?, `user_password` = ?, `user_number` = ?, `user_status` = ?, `title_id` = ? WHERE `user_id` = ?",
    values: [
      req.body.user_mail,
      req.body.user_name,
      req.body.user_password,
      req.body.user_number,
      req.body.user_id,
      req.body.user_status,
    ],
  };
  //cuando los valores son pasados unitariamente   a=? b=?   se maneja []
  //cuando son pasados todos juntos   (?)   se maneja [[]]
  db.query(query.sql, query.values, (err, data) => {
    if (err) {
      return res.json({ message: "Error updating user", error: err });
    }
    return res.json({ message: "User updated successfully" });
  });
};

/* json para postman
{
    "user_password": "221",
    "user_id": 1
}
*/

// Función para actualizar un usuario
const updateUserPwd = (req, res) => {
  const query = {
    sql: "UPDATE `users` SET `user_password` = ? WHERE `user_id` = ?",
    values: [
      req.body.user_password,
      req.body.user_id,
    ],
  };
  //cuando los valores son pasados unitariamente   a=? b=?   se maneja []
  //cuando son pasados todos juntos   (?)   se maneja [[]]
  db.query(query.sql, query.values, (err, data) => {
    if (err) {
      return res.json({ result:false, message: "Error updating user password", error: err });
    }
    return res.json({ result:true, message: "User password updated successfully" });
  });
};

/* json para postman
{
    "user_id": 1
}
*/

const updateUserTitle = (req, res) => {
  const query = {
    sql: "UPDATE `users` SET `title_id` = ? WHERE `user_id` = ?",
    values: [
      req.body.title_id,
    ],
  };
  db.query(query.sql, query.values, (err, data) => {
    if (err) {
      return res.json({ message: "Error updating userTitle", error: err });
    }
    return res.json({ message: "Usertitle updated successfully" });
  });
};


// Función para eliminar un usuario
const deleteUser = (req, res) => {
  const query = {
    sql: "DELETE FROM `users` WHERE `user_id` = ?",
    values: [req.body.user_id],
  };

  db.query(query.sql, query.values, (err, data) => {
    if (err) {
      return res.json({ message: "Error deleting user", error: err });
    }
    return res.json({ message: "User deleted successfully" });
  });
};

// Función para verificar si un usuario existe
const userExists = (req, res) => {
  const query = {
    sql: "SELECT user_id FROM users WHERE `user_mail` = ? AND `user_password` = ?  AND `user_status` = 1",
    values: [req.body.user_mail, req.body.user_password],
  };
  db.query(query.sql, query.values, (err, data) => {
    if (err) {
      return res.json({ message: "Error verifying user", error: err });
    }
    if (data.length > 0) {
      return res.json({ id: data[0].user_id });
    } else {
      return res.json({ id: -1 });
    }
  });
};

const userExistsByEmail = (req, res) => {
  // console.log(req.body);
  const query = {
    sql: "SELECT * FROM users WHERE user_mail = ? AND `user_status` = 1",
    values: [req.body.user_mail],
  };

  db.query(query.sql, query.values, (err, data) => {
    if (err) {
      return res.json({ message: "Error verifying user by email", error: err });
    }
    if (data.length > 0) {
      return res.json({ exists: true });
    } else {
      return res.json({ exists: false });
    }
  });
};

// Función para verificar si un usuario existe por nombre
const userExistsByName = (req, res) => {
  const query = {
    sql: "SELECT * FROM users WHERE `user_name` = ? AND `user_status` = 1",
    values: [req.body.user_name],
  };
  db.query(query.sql, query.values, (err, data) => {
    if (err) {
      return res.json({ message: "Error verifying user by name", error: err });
    }
    if (data.length > 0) {
      return res.json({ exists: true });
    } else {
      return res.json({ exists: false });
    }
  });
};

// Función para verificar si un usuario existe por número de teléfono
const userExistsByNumber = (req, res) => {
  const query = {
    sql: "SELECT * FROM users WHERE `user_number` = ? AND `user_status` = 1",
    values: [req.body.user_number],
  };

  db.query(query.sql, query.values, (err, data) => {
    if (err) {
      return res.json({
        message: "Error verifying user by number",
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

const getUserByMail = (req, res) => {
    // console.log("En back el correo: " + req.body.user_mail);
    const query = {
        sql: "SELECT * FROM users WHERE `user_status` = 1 AND `user_mail` = ?",
        values: [req.body.user_mail],
    };
    db.query(query.sql, query.values, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
};

const getUserByNumber = (req, res) => {
    console.log("En back el telefono: " + req.body.user_number);
    const query = {
        sql: "SELECT * FROM users WHERE `user_number` = ? AND `user_status` = 1",
        values: [req.body.user_number],
    };
    db.query(query.sql, query.values, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
};

export { getUsers,
        getConn,
        getUser,
        createUser,
        updateUser,
        deleteUser,
        updateUserPwd,
        userExists,
        userExistsByEmail,
        userExistsByName,
        userExistsByNumber,
        getUserByMail,
        getUserByNumber,
        updateUserTitle
        };
