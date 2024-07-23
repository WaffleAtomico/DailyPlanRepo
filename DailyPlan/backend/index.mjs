import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import bodyParser from "body-parser";
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
  updateUserPwd,
  userExists,
  userExistsByEmail,
  userExistsByName,
  userExistsByNumber,
  getUserByMail,
  getUserByNumber,
  updateUserTitle
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

import {
  addTimer,
  getTimersForUser,
  getTimerById,
  updateTimer,
  deleteTimer

} from './requests/timer.js'


import { 
  addChronometer,
  getChronometersForUser, 
  getChronometerById, 
  updateChronometer,
  deleteChronometer 
} from './requests/chrono.js'

import {
  addAlarmShare,
  getAlarmShares,
  getAlarmShareById,
  updateAlarmShare,
  deleteAlarmShare
} from './requests/alarmShare.js';

import {
  addDayselected,
  getDayselecteds,
  getDayselectedById,
  updateDayselected,
  deleteDayselected
} from './requests/dayselected.js';

import {
  addInvitation,
  getInvitations,
  getInvitationById,
  getInvitationByUser,
  updateInvitationState,
  updateInvitationReason,
  updateInvitation,
  deleteInvitation
} from './requests/invitations.js';

import {
  addLocation,
  getLocations,
  getLocationById,
  updateLocation,
  deleteLocation
} from './requests/locations.js';

import {
  addObjective,
  getObjectives,
  getObjectiveById,
  updateObjective,
  deleteObjective
} from './requests/objectives.js';

import {
  addObjectivesBlock,
  getObjectivesBlocks,
  getObjectivesBlockById,
  updateObjectivesBlock,
  deleteObjectivesBlock
} from './requests/objectivesblock.js';

import {
  addPermision,
  getPermisions,
  getPermisionById,
  updatePermision,
  deletePermision
} from './requests/permissions.js';

import {
  addPomodoro,
  getPomodoros,
  getPomodoroById,
  updatePomodoro,
  deletePomodoro
} from './requests/pomodoro.js';

import {
  addPuntuality,
  getPuntuality,
  getPuntualityById,
  updatePuntuality,
  deletePuntuality 
} from './requests/puntuality.js'

import {
  addReminder,
  getReminders,
  getRemindersByMonth,
  getRemindersByWeek,
  getReminderById,
  updateReminder,
  deleteReminder
} from './requests/reminder.js';

import {
  addReminderShare,
  getReminderShares,
  getReminderShareById,
  updateReminderShare,
  deleteReminderShare
} from './requests/remindershare.js';

import {
  addRepetitionDay,
  getRepetitionDays,
  getRepetitionDayById,
  updateRepetitionDay,
  deleteRepetitionDay
} from './requests/repetitionsdays.js';

import {
  addSchedule,
  addPomodoroSchedule,
  addSleepSchedule,
  getSchedules,
  getScheduleById,
  updateSchedule,
  deleteSchedule,
  deleteSleepSchedule,
  deletePomodoroSchedule
} from './requests/schedule.js';

import {
  addSleepmode,
  getSleepmodes,
  getSleepmodeById,
  updateSleepRepStopped,
  updateSleepmode,
  deleteSleepmode
} from './requests/sleepmode.js';

import {
  addSleepQuality,
  getSleepQualities,
  getSleepQualitiesByDateRange,
  getSleepQualityById,
getSleepQualityByUser,
  updateSleepQuality,
  
  deleteSleepQuality,
  UpdateSleepRepIncr
} from './requests/sleepquality.js';

import {
  addTone,
  getTones,
  getToneById,
  updateTone,
  deleteTone
} from './requests/tone.js';



import { sendMailrest, sendMailrestjt } from "./requests/mail.js";

const app = express();

app.use(express.json());
app.use(cors());


//---------------------------Setting-------------------------//

// Aumenta el límite de tamaño de la carga útil
// Posible solucion, fragmentar lo que se vaya a enviar
/*Lo ignora completamente */

// app.use(bodyParser.json({ limit: '50mb' }));
// app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// app.use(express.json({ limit: '50mb' }));
// app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.get(urls.ROOT_URL, (req, res) => {
  res.json("Hello this is the backend");
});

app.listen(3001, () => {
  console.log("Connected to backend! on port 3001")
});

/**--------------------- MAIL ------------------ */

export const transporterjt = nodemailer.createTransport({
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

export var mailsenderjt = '"DailyPlan" <dailyplan@javateam.com.mx>';


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
app.post(urls.SEND_MAILJT_URL, sendMailrestjt);

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
app.post(urls.UPDATE_USER_PWD_URL, updateUserPwd);
app.post(urls.USER_EXISTS_URL, userExists);
app.post(urls.USER_EXISTS_MAIL_URL, userExistsByEmail);
app.post(urls.USER_EXISTS_NAME_URL, userExistsByName);
app.post(urls.USER_EXISTS_NUMBER_URL, userExistsByNumber);
app.post(urls.GET_USER_BY_MAIL_URL, getUserByMail);
app.post(urls.GET_USER_BY_NUMBER_URL, getUserByNumber);
app.post(urls.UPDATE_USER_TITLE_URL, updateUserTitle);

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
app.post(urls.GET_ALARMS_FOR_USER_URL, getAlarmsForUser);
app.post(urls.GET_ALARM_BY_ID_URL, getAlarmById);
app.post(urls.UPDATE_ALARM_URL, updateAlarm);
app.post(urls.DELETE_ALARM_URL, deleteAlarm);
app.post(urls.ALARM_NAME_EXISTS_URL, isAlarmNameExistForUser);
app.post(urls.USER_ALARM_LIMIT_REACHED_URL, isUserAlarmLimitReached);

/*-------------------------------Timer------------------------- */
app.post(urls.ADD_TIMER_URL, addTimer);
app.post(urls.GET_TIMERS_FOR_USER_URL, getTimersForUser);
app.post(urls.GET_TIMER_BY_ID_URL, getTimerById);
app.post(urls.UPDATE_TIMER_URL, updateTimer);
app.post(urls.DELETE_TIMER_URL, deleteTimer);

/*-------------------------------Chrono-----------------------------*/
app.post(urls.ADD_CHRONOMETER_URL, addChronometer);
app.post(urls.GET_CHRONOMETERS_FOR_USER_URL, getChronometersForUser);
app.post(urls.GET_CHRONOMETER_BY_ID_URL, getChronometerById);
app.post(urls.UPDATE_CHRONOMETER_URL, updateChronometer);
app.post(urls.DELETE_CHRONOMETER_URL, deleteChronometer);

/*-------------------------------AlarmShare-------------------------*/
app.post(urls.ADD_ALARMSHARE_URL, addAlarmShare);
app.post(urls.GET_ALARMSHARES_URL, getAlarmShares);
app.post(urls.GET_ALARMSHARE_BY_ID_URL, getAlarmShareById);
app.post(urls.UPDATE_ALARMSHARE_URL, updateAlarmShare);
app.post(urls.DELETE_ALARMSHARE_URL, deleteAlarmShare);

/*-------------------------------Dayselected-------------------------*/
app.post(urls.ADD_DAYSELECTED_URL, addDayselected);
app.post(urls.GET_DAYSELECTEDS_URL, getDayselecteds);
app.post(urls.GET_DAYSELECTED_BY_ID_URL, getDayselectedById);
app.post(urls.UPDATE_DAYSELECTED_URL, updateDayselected);
app.post(urls.DELETE_DAYSELECTED_URL, deleteDayselected);

/*-------------------------------Invitations-------------------------*/
app.post(urls.ADD_INVITATION_URL, addInvitation);
app.post(urls.GET_INVITATIONS_URL, getInvitations);
app.post(urls.GET_INVITATION_BY_ID_URL, getInvitationById);
app.post(urls.GET_INVITATION_BY_USER_URL, getInvitationByUser);
app.post(urls.UPDATE_INVITATION_STATE_URL, updateInvitationState);
app.post(urls.UPDATE_INVITATION_REASON_URL, updateInvitationReason);
app.post(urls.UPDATE_INVITATION_URL, updateInvitation);
app.post(urls.DELETE_INVITATION_URL, deleteInvitation);

/*-------------------------------Locations-------------------------*/
app.post(urls.ADD_LOCATION_URL, addLocation);
app.post(urls.GET_LOCATIONS_URL, getLocations);
app.post(urls.GET_LOCATION_BY_ID_URL, getLocationById);
app.post(urls.UPDATE_LOCATION_URL, updateLocation);
app.post(urls.DELETE_LOCATION_URL, deleteLocation);

/*-------------------------------Objectives-------------------------*/
app.post(urls.ADD_OBJECTIVE_URL, addObjective);
app.post(urls.GET_OBJECTIVES_URL, getObjectives);
app.post(urls.GET_OBJECTIVE_BY_ID_URL, getObjectiveById);
app.post(urls.UPDATE_OBJECTIVE_URL, updateObjective);
app.post(urls.DELETE_OBJECTIVE_URL, deleteObjective);

/*-------------------------------ObjectivesBlock-------------------------*/
app.post(urls.ADD_OBJECTIVESBLOCK_URL, addObjectivesBlock);
app.post(urls.GET_OBJECTIVESBLOCKS_URL, getObjectivesBlocks);
app.post(urls.GET_OBJECTIVESBLOCK_BY_ID_URL, getObjectivesBlockById);
app.post(urls.UPDATE_OBJECTIVESBLOCK_URL, updateObjectivesBlock);
app.post(urls.DELETE_OBJECTIVESBLOCK_URL, deleteObjectivesBlock);

/*-------------------------------Permissions-------------------------*/
app.post(urls.ADD_PERMISSION_URL, addPermision);
app.post(urls.GET_PERMISSIONS_URL, getPermisions);
app.post(urls.GET_PERMISSION_BY_ID_URL, getPermisionById);
app.post(urls.UPDATE_PERMISSION_URL, updatePermision);
app.post(urls.DELETE_PERMISSION_URL, deletePermision);

/*-------------------------------Pomodoros-------------------------*/
app.post(urls.ADD_POMODORO_URL, addPomodoro);
app.post(urls.GET_POMODOROS_URL, getPomodoros);
app.post(urls.GET_POMODORO_BY_ID_URL, getPomodoroById);
app.post(urls.UPDATE_POMODORO_URL, updatePomodoro);
app.post(urls.DELETE_POMODORO_URL, deletePomodoro);

/*-------------------------------Puntuality-------------------------*/
app.post(urls.ADD_PUNTUALITY_URL, addPuntuality);
app.post(urls.GET_PUNTUALITIES_URL, getPuntuality);
app.post(urls.GET_PUNTUALITY_BY_ID_URL, getPuntualityById);
app.post(urls.UPDATE_PUNTUALITY_URL, updatePuntuality);
app.post(urls.DELETE_PUNTUALITY_URL, deletePuntuality);

/*-------------------------------Reminders-------------------------*/
app.post(urls.ADD_REMINDER_URL, addReminder);
app.post(urls.GET_REMINDERS_URL, getReminders);
app.post(urls.GET_REMINDERS_BY_MONTH_URL, getRemindersByMonth);
app.post(urls.GET_REMINDERS_BY_WEEK_URL, getRemindersByWeek);
app.post(urls.GET_REMINDER_BY_ID_URL, getReminderById);
app.post(urls.UPDATE_REMINDER_URL, updateReminder);
app.post(urls.DELETE_REMINDER_URL, deleteReminder);

/*-------------------------------ReminderShare-------------------------*/
app.post(urls.ADD_REMINDERSHARE_URL, addReminderShare);
app.post(urls.GET_REMINDERSHARES_URL, getReminderShares);
app.post(urls.GET_REMINDERSHARE_BY_ID_URL, getReminderShareById);
app.post(urls.UPDATE_REMINDERSHARE_URL, updateReminderShare);
app.post(urls.DELETE_REMINDERSHARE_URL, deleteReminderShare);


/*-------------------------------RepetitionDay-------------------------*/
app.post(urls.ADD_REPETITIONDAY_URL, addRepetitionDay);
app.post(urls.GET_REPETITIONDAYS_URL, getRepetitionDays);
app.post(urls.GET_REPETITIONDAY_BY_ID_URL, getRepetitionDayById);
app.post(urls.UPDATE_REPETITIONDAY_URL, updateRepetitionDay);
app.post(urls.DELETE_REPETITIONDAY_URL, deleteRepetitionDay);

/*-------------------------------Schedules-------------------------*/
app.post(urls.ADD_SCHEDULE_URL, addSchedule);
app.post(urls.GET_SCHEDULES_URL, getSchedules);
app.post(urls.GET_SCHEDULE_BY_ID_URL, getScheduleById);
app.post(urls.UPDATE_SCHEDULE_URL, updateSchedule);
app.post(urls.DELETE_SCHEDULE_URL, deleteSchedule);
app.post(urls.ADD_SCHEDULE_POMODORO_URL, addPomodoroSchedule);
app.post(urls.ADD_SCHEDULE_SLEEP_URL, addSleepSchedule);
app.post(urls.DELETE_SCHEDULE_POMODORO_URL, deletePomodoroSchedule);
app.post(urls.DELETE_SCHEDULE_SLEEP_URL, deleteSleepSchedule);
  

/*-------------------------------SleepMode-------------------------*/
app.post(urls.ADD_SLEEP_MODE_URL, addSleepmode);
app.post(urls.GET_SLEEP_MODES_URL, getSleepmodes);
app.post(urls.GET_SLEEP_MODE_BY_ID_URL, getSleepmodeById);
app.post(urls.UPDATE_SLEEP_MODE_REP_URL, updateSleepRepStopped);
app.post(urls.UPDATE_SLEEP_MODE_URL, updateSleepmode);
app.post(urls.DELETE_SLEEP_MODE_URL, deleteSleepmode);


/*-------------------------------SleepQuality-------------------------*/
app.post(urls.ADD_SLEEP_QUALITY_URL, addSleepQuality);
app.post(urls.GET_SLEEP_QUALITIES_URL, getSleepQualities);
app.post(urls.GET_SLEEPQUALITIES_BY_DATE_RANGE_URL ,getSleepQualitiesByDateRange);
app.post(urls.GET_SLEEPQUALITIES_BY_USER_URL, getSleepQualityByUser)
app.post(urls.GET_SLEEP_QUALITY_BY_ID_URL, getSleepQualityById);
app.post(urls.UPDATE_SLEEP_QUALITY_URL, updateSleepQuality);
app.post(urls.DELETE_SLEEP_QUALITY_URL, deleteSleepQuality);
app.post(urls.UPDATE_SLEEP_REP_INCR_URL, UpdateSleepRepIncr);


/*-------------------------------Tones-------------------------*/
app.post(urls.ADD_TONE_URL, addTone);
app.post(urls.GET_TONES_URL, getTones);
app.post(urls.GET_TONE_BY_ID_URL, getToneById);
app.post(urls.UPDATE_TONE_URL, updateTone);
app.post(urls.DELETE_TONE_URL, deleteTone);




/*-------------------------------spotify------------------------- */

const CLIENT_ID = 'b8a02610f9414e06875e2a1ab33695a6';
const CLIENT_SECRET = 'ece004e5f2d44a9e9f4ad4b80140532e';
const REDIRECT_URI = 'http://localhost:3000/callback';


/*-------------------------------Google Maps Platform---------------------------*/

const CLIENT_ID_MAP = 'AIzaSyABWa3p-_7ZFIh7eOEUPLD8r7vKDn3KHfE';
const CLIENT_SECRET_MAP = 'z-ucHPnSDWcMh7R_mNuqnsZG5c0=';

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
