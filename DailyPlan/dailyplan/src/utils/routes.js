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

const CREATE_ALL_TITLES = `${urlreference}/title-addAll`;
const GET_ALL_TITLES = `${urlreference}/title-getAll`;
const UPDATE_ONE_TITLE = `${urlreference}/title-updateone`;

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

const ADD_ALARMSHARE_URL = `${urlreference}/add-alarmshare`;
const GET_ALARMSHARES_URL = `${urlreference}/get-alarmshares`;
const GET_ALARMSHARE_BY_ID_URL = `${urlreference}/get-alarmshare`;
const UPDATE_ALARMSHARE_URL = `${urlreference}/update-alarmshare`;
const DELETE_ALARMSHARE_URL = `${urlreference}/delete-alarmshare`;

const ADD_DAYSELECTED_URL = `${urlreference}/add-dayselected`;
const GET_DAYSELECTEDS_URL = `${urlreference}/get-dayselecteds`;
const GET_DAYSELECTED_BY_ID_URL = `${urlreference}/get-dayselected`;
const UPDATE_DAYSELECTED_URL = `${urlreference}/update-dayselected`;
const DELETE_DAYSELECTED_URL = `${urlreference}/delete-dayselected`;

const ADD_INVITATION_URL = `${urlreference}/add-invitation`;
const GET_INVITATIONS_URL = `${urlreference}/get-invitations`;
const GET_INVITATION_BY_USER_URL = `${urlreference}/get-invitation-user`;
const GET_INVITATION_BY_ID_URL = `${urlreference}/get-invitation`;
const UPDATE_INVITATION_URL = `${urlreference}/update-invitation`;
const DELETE_INVITATION_URL = `${urlreference}/delete-invitation`;

const ADD_LOCATION_URL = `${urlreference}/add-location`;
const GET_LOCATIONS_URL = `${urlreference}/get-locations`;
const GET_LOCATION_BY_ID_URL = `${urlreference}/get-location`;
const UPDATE_LOCATION_URL = `${urlreference}/update-location`;
const DELETE_LOCATION_URL = `${urlreference}/delete-location`;

const ADD_OBJECTIVE_URL = `${urlreference}/add-objective`;
const GET_OBJECTIVES_URL = `${urlreference}/get-objectives`;
const GET_OBJECTIVE_BY_ID_URL = `${urlreference}/get-objective`;
const UPDATE_OBJECTIVE_URL = `${urlreference}/update-objective`;
const DELETE_OBJECTIVE_URL = `${urlreference}/delete-objective`;

const ADD_OBJECTIVES_BLOCK_URL = `${urlreference}/add-objectivesblock`;
const GET_OBJECTIVES_BLOCKS_URL = `${urlreference}/get-objectivesblocks`;
const GET_OBJECTIVES_BLOCK_BY_ID_URL = `${urlreference}/get-objectivesblock`;
const UPDATE_OBJECTIVES_BLOCK_URL = `${urlreference}/update-objectivesblock`;
const DELETE_OBJECTIVES_BLOCK_URL = `${urlreference}/delete-objectivesblock`;

const ADD_PERMISSION_URL = `${urlreference}/add-permission`;
const GET_PERMISSIONS_URL = `${urlreference}/get-permissions`;
const GET_PERMISSION_BY_ID_URL = `${urlreference}/get-permission`;
const UPDATE_PERMISSION_URL = `${urlreference}/update-permission`;
const DELETE_PERMISSION_URL = `${urlreference}/delete-permission`;

const ADD_POMODORO_URL = `${urlreference}/add-pomodoro`;
const GET_POMODOROS_URL = `${urlreference}/get-pomodoros`;
const GET_POMODORO_BY_ID_URL = `${urlreference}/get-pomodoro`;
const UPDATE_POMODORO_URL = `${urlreference}/update-pomodoro`;
const DELETE_POMODORO_URL = `${urlreference}/delete-pomodoro`;

const ADD_PUNTUALITY_URL = `${urlreference}/add-puntuality`;
const GET_PUNTUALITIES_URL = `${urlreference}/get-puntualities`;
const GET_PUNTUALITY_BY_ID_URL = `${urlreference}/get-puntuality`;
const UPDATE_PUNTUALITY_URL = `${urlreference}/update-puntuality`;
const DELETE_PUNTUALITY_URL = `${urlreference}/delete-puntuality`;


const GET_REMINDERS_URL = `${urlreference}/get-reminders`;
const ADD_REMINDER_URL = `${urlreference}/add-reminder`;
const GET_REMINDERS_FOR_USER_URL = `${urlreference}/get-user-reminders`;
const GET_REMINDER_BY_ID_URL = `${urlreference}/get-reminder`;
const UPDATE_REMINDER_URL = `${urlreference}/update-reminder`;
const DELETE_REMINDER_URL = `${urlreference}/delete-reminder`;
const GET_REMINDERS_BY_MONTH_URL = `${urlreference}/get-reminders-by-month`;
const GET_REMINDERS_BY_WEEK_URL = `${urlreference}/get-reminders-by-week`;

const ADD_REMINDERSHARE_URL = `${urlreference}/add-remindershare`;
const GET_REMINDERSHARES_FOR_USER_URL = `${urlreference}/get-user-remindershares`;
const GET_REMINDERSHARE_BY_ID_URL = `${urlreference}/get-remindershare`;
const UPDATE_REMINDERSHARE_URL = `${urlreference}/update-remindershare`;
const DELETE_REMINDERSHARE_URL = `${urlreference}/delete-remindershare`;
const GET_REMINDERSHARES_URL = `${urlreference}/get-remindershares`;


const ADD_REPETITIONDAY_URL = `${urlreference}/add-repetitionday`;
const GET_REPETITIONDAYS_URL = `${urlreference}/get-repetitiondays`;
const GET_REPETITIONDAY_BY_ID_URL = `${urlreference}/get-repetitionday`;
const UPDATE_REPETITIONDAY_URL = `${urlreference}/update-repetitionday`;
const DELETE_REPETITIONDAY_URL = `${urlreference}/delete-repetitionday`;

const ADD_SCHEDULE_URL = `${urlreference}/add-schedule`;
const GET_SCHEDULES_URL = `${urlreference}/get-schedules`;
const GET_SCHEDULE_BY_ID_URL = `${urlreference}/get-schedule`;
const UPDATE_SCHEDULE_URL = `${urlreference}/update-schedule`;
const DELETE_SCHEDULE_URL = `${urlreference}/delete-schedule`;

const ADD_SLEEP_MODE_URL = `${urlreference}/add-sleepmode`;
const GET_SLEEP_MODES_URL = `${urlreference}/get-sleepmodes`;
const GET_SLEEP_MODE_BY_ID_URL = `${urlreference}/get-sleepmode`;
const UPDATE_SLEEP_MODE_URL = `${urlreference}/update-sleepmode`;
const DELETE_SLEEP_MODE_URL = `${urlreference}/delete-sleepmode`;

const ADD_SLEEP_QUALITY_URL = `${urlreference}/add-sleepquality`;
const GET_SLEEP_QUALITIES_URL = `${urlreference}/get-sleepqualities`;
const GET_SLEEP_QUALITY_BY_ID_URL = `${urlreference}/get-sleepquality`;
const GET_SLEEPQUALITIES_BY_DATE_RANGE_URL = `${urlreference}/get-sleepqualities-by-date-range`;
const UPDATE_SLEEP_QUALITY_URL = `${urlreference}/update-sleepquality`;
const DELETE_SLEEP_QUALITY_URL = `${urlreference}/delete-sleepquality`;

const ADD_TONE_URL = `${urlreference}/add-tone`;
const GET_TONES_URL = `${urlreference}/get-tones`;
const GET_TONE_BY_ID_URL = `${urlreference}/get-tone`;
const UPDATE_TONE_URL = `${urlreference}/update-tone`;
const DELETE_TONE_URL = `${urlreference}/delete-tone`;
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
    ADD_ALARMSHARE_URL,
    GET_ALARMSHARES_URL,
    GET_ALARMSHARE_BY_ID_URL,
    UPDATE_ALARMSHARE_URL,
    DELETE_ALARMSHARE_URL,
    ADD_DAYSELECTED_URL,
    GET_DAYSELECTEDS_URL,
    GET_DAYSELECTED_BY_ID_URL,
    UPDATE_DAYSELECTED_URL,
    DELETE_DAYSELECTED_URL,
    ADD_INVITATION_URL,
    GET_INVITATIONS_URL,
    GET_INVITATION_BY_USER_URL,
    GET_INVITATION_BY_ID_URL,
    UPDATE_INVITATION_URL,
    DELETE_INVITATION_URL,
    ADD_LOCATION_URL,
    GET_LOCATIONS_URL,
    GET_LOCATION_BY_ID_URL,
    UPDATE_LOCATION_URL,
    DELETE_LOCATION_URL,
    ADD_OBJECTIVE_URL,
    GET_OBJECTIVES_URL,
    GET_OBJECTIVE_BY_ID_URL,
    UPDATE_OBJECTIVE_URL,
    DELETE_OBJECTIVE_URL,
    ADD_OBJECTIVES_BLOCK_URL,
    GET_OBJECTIVES_BLOCKS_URL,
    GET_OBJECTIVES_BLOCK_BY_ID_URL,
    UPDATE_OBJECTIVES_BLOCK_URL,
    DELETE_OBJECTIVES_BLOCK_URL,
    ADD_PERMISSION_URL,
    GET_PERMISSIONS_URL,
    GET_PERMISSION_BY_ID_URL,
    UPDATE_PERMISSION_URL,
    DELETE_PERMISSION_URL,
    ADD_POMODORO_URL,
    GET_POMODOROS_URL,
    GET_POMODORO_BY_ID_URL,
    UPDATE_POMODORO_URL,
    DELETE_POMODORO_URL,
    ADD_PUNTUALITY_URL,
    GET_PUNTUALITIES_URL,
    GET_PUNTUALITY_BY_ID_URL,
    UPDATE_PUNTUALITY_URL,
    DELETE_PUNTUALITY_URL,
    ADD_REMINDER_URL,
    GET_REMINDERS_URL,
    GET_REMINDERS_FOR_USER_URL,
    GET_REMINDER_BY_ID_URL,
    UPDATE_REMINDER_URL,
    DELETE_REMINDER_URL,
    GET_REMINDERS_BY_MONTH_URL,
    GET_REMINDERS_BY_WEEK_URL,
    ADD_REMINDERSHARE_URL,
    GET_REMINDERSHARES_URL,
    GET_REMINDERSHARES_FOR_USER_URL,
    GET_REMINDERSHARE_BY_ID_URL,
    UPDATE_REMINDERSHARE_URL,
    DELETE_REMINDERSHARE_URL,
  
    ADD_REPETITIONDAY_URL,
    GET_REPETITIONDAYS_URL,
    GET_REPETITIONDAY_BY_ID_URL,
    UPDATE_REPETITIONDAY_URL,
    DELETE_REPETITIONDAY_URL,
    ADD_SCHEDULE_URL,
    GET_SCHEDULES_URL,
    GET_SCHEDULE_BY_ID_URL,
    UPDATE_SCHEDULE_URL,
    DELETE_SCHEDULE_URL,
    ADD_SLEEP_MODE_URL,
    GET_SLEEP_MODES_URL,
    GET_SLEEP_MODE_BY_ID_URL,
    UPDATE_SLEEP_MODE_URL,
    DELETE_SLEEP_MODE_URL,
    ADD_SLEEP_QUALITY_URL,
    GET_SLEEP_QUALITIES_URL,
    GET_SLEEP_QUALITY_BY_ID_URL,
    GET_SLEEPQUALITIES_BY_DATE_RANGE_URL,
    UPDATE_SLEEP_QUALITY_URL,
    DELETE_SLEEP_QUALITY_URL,
    ADD_TONE_URL,
    GET_TONES_URL,
    GET_TONE_BY_ID_URL,
    UPDATE_TONE_URL,
    DELETE_TONE_URL,

    CREATE_ALL_TITLES,
    GET_ALL_TITLES,
    UPDATE_ONE_TITLE,
};