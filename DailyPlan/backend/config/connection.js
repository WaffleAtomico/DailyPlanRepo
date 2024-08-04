import mysql from "mysql"

// const mysql = require('mysql');

const db = mysql.createConnection({
    host:'localhost', //luego cambiar a cuando sea la direccion del server
    // user: 'dailyplan',
    user: 'root',
    password: '',
    database: 'dailyplan',
    dialect: 'mysql',
}
);

db.connect((err) => {
    if (err) {
        console.error('Error connecting to database:', err);
        return;
    }
    console.log('Connected to database');
});

export { db };
