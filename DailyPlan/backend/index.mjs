import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";

import * as urls from './routes.js'

import {
  loginUser
} from "./requests/app.js";

import {
  getUsers,
  getConn,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  userExists,
  userExistsByEmail,
  userExistsByName,
  userExistsByNumber,
  getUserByMail,
  getUserByNumber
} from './requests/users.js';

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

import {
  addAlarm,
  getAlarmById,
  updateAlarm,
  deleteAlarm,
  getAlarmsForUser,
  isAlarmNameExistForUser,
  isUserAlarmLimitReached,
} from './requests/alarm.js';


import { sendMailrest } from "./requests/mail.js";

const app = express();

app.use(express.json());
app.use(cors());

app.get(urls.ROOT_URL, (req, res) => {
  res.json("Hello this is the backend");
});

app.listen(3001, () => {
  console.log("Connected to backend! on port 3001")
});

/**--------------------- MAIL ------------------ */
/*
export const transporter = nodemailer.createTransport({
  pool: true,
  host: "mail.javateam.com.mx",
  port: 587,
  secure: false, // use TLS
  auth: {
    user: "dailyplan@javateam.com.mx",
    pass: "d4i1yp!an2024",
  },
  tls: {
    ciphers: 'SSLv3'
  }
});

export var mailsender = '"DailyPlan" <dailyplan@javateam.com.mx>';
*/

export const transporter = nodemailer.createTransport({
  pool: true,
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "109a3dc47f4611",
    pass: "a260cce7f16e7a",
  }
});

export var mailsender = '"DailyPlan" <109a3dc47f4611@inbox.mailtrap.io>';

/*
// async..await is not allowed in global scope, must use a wrapper
async function main() {
  // send mail with defined transport object
  const infoJ = await transporter.sendMail({
    from: '"DailyPlan" <dailyplan@javateam.com.mx>', // sender address
    to: "openilla@javateam.com.mx", // list of receivers
    subject: "Hello", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  });

  const infom = await transporter.sendMail({
    from: '"DailyPlan" <109a3dc47f4611@inbox.mailtrap.io>', // sender address
    to: "openilla@javateam.com.mx", // list of receivers
    subject: "Hello", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
}
//prueba de envio de correo
main().catch(console.error);
*/

/*-------------------------- Envio de correo --------------------------*/
app.post(urls.SEND_MAIL_URL, sendMailrest);

/*-------------------------- Conn --------------------------*/
app.get(urls.CONN_URL, getConn);

/*-------------------------- Login --------------------------*/
app.post(urls.LOGIN_URL, loginUser);

/*-------------------------- Users --------------------------*/
app.get(urls.GET_USERS_URL, getUsers);
app.post(urls.GET_USER_INFO_URL, getUser);
app.post(urls.CREATE_USER_URL, createUser);
app.post(urls.UPDATE_USER_URL, updateUser);
app.post(urls.DELETE_USER_URL, deleteUser);
app.post(urls.USER_EXISTS_URL, userExists);
app.post(urls.USER_EXISTS_MAIL_URL, userExistsByEmail);
app.post(urls.USER_EXISTS_NAME_URL, userExistsByName);
app.post(urls.USER_EXISTS_NUMBER_URL, userExistsByNumber);
app.post(urls.GET_USER_BY_MAIL_URL, getUserByMail);
app.post(urls.GET_USER_BY_NUMBER_URL, getUserByNumber);

/*-------------------------- Clocks --------------------------*/
app.post(urls.ADD_CLOCK_URL, addClock);
app.post(urls.GET_CLOCK_URL, getClock);
app.post(urls.DELETE_CLOCK_URL, delClock);
app.post(urls.CLOCK_EXISTS_ZONE_URL, ClockExistsInUser);

/*-------------------------- Titles -------------------------- */
app.post(urls.ADD_ALL_TITLES_URL, addAllTitles);
app.post(urls.GET_USER_TITLES_URL, getUserTitles);
app.post(urls.UPDATE_TITLE_STATUS_URL, updateTitleStatus);

/*-------------------------- BloqUSR --------------------------  */
app.post(urls.ADD_USER_BLOCKED_URL, addUserBlocked);
app.post(urls.DELETE_USER_BLOCKED_URL, delUserBlocked);
app.post(urls.GET_USERS_BLOCKED_URL, getUsersBlocked);

/*-------------------------------Alarm------------------------- */
app.post(urls.ADD_ALARM_URL, addAlarm);
app.get(urls.GET_ALARMS_FOR_USER_URL, getAlarmsForUser);
app.get(urls.GET_ALARM_BY_ID_URL, getAlarmById);
app.post(urls.UPDATE_ALARM_URL, updateAlarm);
app.post(urls.DELETE_ALARM_URL, deleteAlarm);
app.post(urls.ALARM_NAME_EXISTS_URL, isAlarmNameExistForUser);
app.post(urls.USER_ALARM_LIMIT_REACHED_URL, isUserAlarmLimitReached);




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
