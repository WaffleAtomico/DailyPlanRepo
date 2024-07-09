const urllocal = "http://localhost:";
const PORT = "3001";
const urlserver = "https://dailyplan-api.javateam.mx";

//cambair depende del contexto
const urlreference = urllocal+PORT;
// const urlreference = urlserver;


const ADD_ALARM_URL = `${urlreference}/add-alarm`;
const GET_ALARMS_FOR_USER_URL = `${urlreference}/get-user-alarms`;
const GET_ALARM_BY_ID_URL = `${urlreference}/get-alarm`;
const UPDATE_ALARM_URL = `${urlreference}/updatte-alarm`;
const DELETE_ALARM_URL = `${urlreference}/delete-alarm`;
const ALARM_NAME_EXISTS_URL = `${urlreference}/alarms-existsname`;
const USER_ALARM_LIMIT_REACHED_URL = `${urlreference}/alarms-limit-user`;
const ADD_USER_BLOCKED_URL = `${urlreference}/bloqusr`;
const DELETE_USER_BLOCKED_URL = `${urlreference}/unbloq`;
const GET_USERS_BLOCKED_URL = `${urlreference}/getusrbloq`;
const ADD_CLOCK_URL = `${urlreference}/clock-id`;
const GET_CLOCK_URL = `${urlreference}/clock-byid`;
const DELETE_CLOCK_URL = `${urlreference}/clock-iddel`;
const CLOCK_EXISTS_ZONE_URL = `${urlreference}/clock-existzone`;
const CONN_URL = `${urlreference}/conn`;
const CREATE_USER_URL = `${urlreference}/users`;
const USER_EXISTS_URL = `${urlreference}/users-exist`;
const USER_EXISTS_MAIL_URL = `${urlreference}/users-existmail`;
const USER_EXISTS_NAME_URL = `${urlreference}/users-existname`;
const USER_EXISTS_NUMBER_URL = `${urlreference}/users-existnumber`;
const GET_USER_INFO_URL = `${urlreference}/get-userinfo`;
const GET_USER_BY_MAIL_URL = `${urlreference}/user-bymail`;
const SEND_MAIL_URL = `${urlreference}/send`;
const ADD_TIMER_URL = `${urlreference}/add-timer`;
const GET_TIMERS_FOR_USER_URL = `${urlreference}/get-user-timers`;
const GET_TIMER_BY_ID_URL = `${urlreference}/get-timer`;
const UPDATE_TIMER_URL = `${urlreference}/update-timer`;
const DELETE_TIMER_URL = `${urlreference}/delete-timer`;
const ADD_CHRONOMETER_URL = `${urlreference}/add-chronometer`;
const GET_CHRONOMETERS_FOR_USER_URL = `${urlreference}/get-user-chronometers`;
const GET_CHRONOMETER_BY_ID_URL = `${urlreference}/get-chronometer`;
const UPDATE_CHRONOMETER_URL = `${urlreference}/update-chronometer`;
const DELETE_CHRONOMETER_URL = `${urlreference}/delete-chronometer`;


export {
    urlreference,
    ADD_ALARM_URL,
    GET_ALARMS_FOR_USER_URL,
    GET_ALARM_BY_ID_URL,
    UPDATE_ALARM_URL,
    DELETE_ALARM_URL,
    ALARM_NAME_EXISTS_URL,
    USER_ALARM_LIMIT_REACHED_URL,
    ADD_USER_BLOCKED_URL,
    DELETE_USER_BLOCKED_URL,
    GET_USERS_BLOCKED_URL,
    ADD_CLOCK_URL,
    GET_CLOCK_URL,
    DELETE_CLOCK_URL,
    CLOCK_EXISTS_ZONE_URL,
    CONN_URL,
    CREATE_USER_URL,
    USER_EXISTS_URL,
    USER_EXISTS_MAIL_URL,
    USER_EXISTS_NAME_URL,
    USER_EXISTS_NUMBER_URL,
    GET_USER_INFO_URL,
    GET_USER_BY_MAIL_URL,
    SEND_MAIL_URL,
    ADD_TIMER_URL,
    GET_TIMERS_FOR_USER_URL,
    GET_TIMER_BY_ID_URL,
    UPDATE_TIMER_URL,
    DELETE_TIMER_URL,
    ADD_CHRONOMETER_URL,
    GET_CHRONOMETERS_FOR_USER_URL,
    GET_CHRONOMETER_BY_ID_URL,
    UPDATE_CHRONOMETER_URL,
    DELETE_CHRONOMETER_URL,
};
