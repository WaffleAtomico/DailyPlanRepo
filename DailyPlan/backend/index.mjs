import express from "express";
import cors from "cors";
// import mysql from "mysql"
// import { db } from './server/connection.js';

import { getUsers, getConn, getUser, createUser, updateUser, deleteUser, userExists, userExistsByEmail, 
    userExistsByName, userExistsByNumber } from './requests/users.js';

import { addClock, getClock, delClock, ClockExistsInUser} from './requests/clocks.js';

import { addAllTitles, getUserTitles, updateTitleStatus } from './requests/archivements.js';

import {  getUsersBlocked, addUserBlocked, delUserBlocked } from './requests/userbloqued.js';

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req,res) => {
    res.json("Hello this is the backend");
});

//You could make a const with the name of PORT

app.listen(3001, () =>
{
    console.log("Connected to backend! on port 3001")
});


/*-------------------------- Conn --------------------------*/


app.get("/conn", getConn);

/*-------------------------- Users --------------------------*/


app.get("/users", getUsers);

app.post("/get-userinfo" , getUser);

/*
{
    "user_mail": "test@gmail.com",
    "user_name": "test",
    "user_password": "123",
    "user_number": "3312345678"
}
*/
app.post("/users", createUser);

/* 
{
    "user_id": 1,
    "user_mail": "testupdated@gmail.com",
    "user_name": "testupdated",
    "user_password": "221",
    "user_number": "3312345678"
}
*/
app.put("/users", updateUser); //cambiar a post

/* 
{
    "user_id": 1
}
*/
app.delete("/users", deleteUser); //cambiar a post

/* 
{
    "user_mail": testuser@gmail.com,
    "user_password": 123
}
*/
app.post("/users-exist", userExists);

/* 
{
    "user_mail": "test@gmail.com"
}
*/
app.post("/users-existmail", userExistsByEmail);

/* 
{
    "user_name": "test"
}
*/
app.post("/users-existname", userExistsByName);

/* 
{
    "user_number": "3312345678"
}
*/
app.post("/users-existnumber", userExistsByNumber);


/*-------------------------- Clocks --------------------------*/

app.post("/clock-id", addClock);

app.post("/clock-byid", getClock);

app.post("/clock-iddel", delClock);

app.post("/clock-existzone", ClockExistsInUser);

/*-------------------------- Titles -------------------------- */

app.post("/title-addAll", addAllTitles);

app.post("/title-getAll", getUserTitles);

app.post("/title-updateOne", updateTitleStatus);


/*-------------------------- BloqUSR --------------------------  */

app.post("/bloqusr", addUserBlocked);

app.post("/unbloq", delUserBlocked);

app.post("/getusrbloq", getUsersBlocked);

