import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";

import { loginUser } from "./requests/app.js";
import { getUsers, getConn, getUser, createUser, updateUser, deleteUser, userExists, userExistsByEmail, 
    userExistsByName, userExistsByNumber, getUserByMail, getUserByNumber } from './requests/users.js';

import {
  addClock,
  getClock,
  delClock,
  ClockExistsInUser,
} from "./requests/clocks.js";

import {
  addAllTitles,
  getUserTitles,
  updateTitleStatus,
} from "./requests/archivements.js";

import {
  getUsersBlocked,
  addUserBlocked,
  delUserBlocked,
} from "./requests/userbloqued.js";

import { sendMailrest } from "./requests/mail.js";

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json("Hello this is the backend");
});

app.listen(3001, () =>
{
    console.log("Connected to backend! on port 3001")
});

/**--------------------- MAIL ------------------ */

export const transporter = nodemailer.createTransport({
    pool: true,
    host: "mail.javateam.com.mx",
    port: 587,
    secure: false, // use TLS
    auth: {
      user: "dailyplan@javateam.com.mx",
      pass: "d4i1yp!an2024",
    },
    tls:{
      ciphers:'SSLv3'
    }
  });
  
  // async..await is not allowed in global scope, must use a wrapper
  async function main() {
    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: '"DailyPlan" <dailyplan@javateam.com.mx>', // sender address
      to: "openilla@javateam.com.mx", // list of receivers
      subject: "Hello", // Subject line
      text: "Hello world?", // plain text body
      html: "<b>Hello world?</b>", // html body
    });
  
    console.log("Message sent: %s", info.messageId);
    // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
  }
  //prueba de envio de correo
  //main().catch(console.error);

/*-------------------------- Envio de correo --------------------------*/
app.post('/send', sendMailrest);

/*-------------------------- Conn --------------------------*/

app.get("/conn", getConn);

/*-------------------------- Login --------------------------*/
app.post("/login", loginUser);

/*-------------------------- Users --------------------------*/

app.get("/users", getUsers);

app.post("/get-userinfo", getUser);

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

/* 
{
    "user_mail": "testTitle@gmail.com"
}
*/
app.post("/user-bymail", getUserByMail);

/* 
{
    "user_number": "3312345678"
}
*/
app.post("/user-bynumber", getUserByNumber);


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

/*-------------------------------spotify------------------------- */

const CLIENT_ID = 'b8a02610f9414e06875e2a1ab33695a6';
const CLIENT_SECRET = 'ece004e5f2d44a9e9f4ad4b80140532e';
const REDIRECT_URI = 'http://localhost:3000/callback';


app.get('/auth-url', (req, res) => {
    const scopes = [
        'user-modify-playback-state',
        'user-read-playback-state',
    ];
    const authUrl = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${REDIRECT_URI}&scope=${scopes.join('%20')}`;
    res.send({ url: authUrl });
});

app.post('/get-token', async (req, res) => {
    const { code } = req.body;

    try {
        const response = await axios.post('https://accounts.spotify.com/api/token', new URLSearchParams({
            grant_type: 'authorization_code',
            code,
            redirect_uri: REDIRECT_URI,
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
        }));

        res.send(response.data);
    } catch (error) {
        res.status(500).send({ error: 'Failed to fetch access token' });
    }
});
