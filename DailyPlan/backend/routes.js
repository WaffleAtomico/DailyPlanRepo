const ROOT_URL = '/';

const SEND_MAIL_URL = '/send';
const SEND_MAILJT_URL = '/sendjt';

const CONN_URL = '/conn';

const LOGIN_URL = '/login';

const GET_USERS_URL = '/users';
const GET_USER_INFO_URL = '/get-userinfo';
const CREATE_USER_URL = '/users';
const UPDATE_USER_URL = '/users';
const DELETE_USER_URL = '/users';
const UPDATE_USER_PWD_URL = '/users-pwd';
const UPDATE_USER_NAME_URL = '/users-name';
const USER_EXISTS_URL = '/users-exist';
const USER_EXISTS_MAIL_URL = '/users-existmail';
const USER_EXISTS_NAME_URL = '/users-existname';
const USER_EXISTS_NUMBER_URL = '/users-existnumber';
const GET_USER_BY_MAIL_URL = '/user-bymail';
const GET_USER_BY_NUMBER_URL = '/user-bynumber';
const UPDATE_USER_TITLE_URL = '/user-updtitle';
const UPDATE_USER_STATUS_TO_ZERO_URL = '/update-user-status-to-zero';

const ADD_CLOCK_URL = '/clock-id';
const GET_CLOCK_URL = '/clock-byid';
const DELETE_CLOCK_URL = '/clock-iddel';
const CLOCK_EXISTS_ZONE_URL = '/clock-existzone';

const ADD_ALL_TITLES_URL = '/title-addAll';
const GET_USER_TITLES_URL = '/title-getAll';
const UPDATE_TITLE_STATUS_URL = '/title-updateone';

const ADD_USER_BLOCKED_URL = '/bloqusr';
const DELETE_USER_BLOCKED_URL = '/unbloq';
const GET_USERS_BLOCKED_URL = '/getusrbloq';
const CHECK_USER_BLOCKED_URL = '/check-user-blocked';

const ADD_ALARM_URL = '/add-alarm';
const GET_ALARMS_FOR_USER_URL = '/get-user-alarms';
const GET_ALARM_BY_ID_URL = '/get-alarm';
const UPDATE_ALARM_URL = '/updatte-alarm';
const DELETE_ALARM_URL = '/delete-alarm';
const ALARM_NAME_EXISTS_URL = '/alarms-existsname';
const USER_ALARM_LIMIT_REACHED_URL = '/alarms-limit-user';

const ADD_CHRONOMETER_URL = '/add-chronometer';
const GET_CHRONOMETERS_FOR_USER_URL = '/get-user-chronometers';
const GET_CHRONOMETER_BY_ID_URL = '/get-chronometer';
const UPDATE_CHRONOMETER_URL = '/update-chronometer';
const DELETE_CHRONOMETER_URL = '/delete-chronometer';

const ADD_TIMER_URL = '/add-timer';
const GET_TIMERS_FOR_USER_URL = '/get-user-timers';
const GET_TIMER_BY_ID_URL = '/get-timer';
const UPDATE_TIMER_URL = '/update-timer';
const DELETE_TIMER_URL = '/delete-timer';

const ADD_ALARMSHARE_URL = '/add-alarmshare';
const GET_ALARMSHARES_URL = '/get-alarmshares';
const GET_ALARMSHARE_BY_ID_URL = '/get-alarmshare';
const UPDATE_ALARMSHARE_URL = '/update-alarmshare';
const DELETE_ALARMSHARE_URL = '/delete-alarmshare';
const GET_USER_IDS_BY_ALARM_URL = '/get-user-ids-by-alarm';

const ADD_DAYSELECTED_URL = '/add-dayselected';
const GET_DAYSELECTEDS_URL = '/get-dayselecteds';
const GET_DAYSELECTED_BY_ID_URL = '/get-dayselected';
const UPDATE_DAYSELECTED_URL = '/update-dayselected';
const DELETE_DAYSELECTED_URL = '/delete-dayselected';

const ADD_INVITATION_URL = '/add-invitation';
const GET_INVITATIONS_URL = '/get-invitations';
const GET_INVITATION_BY_ID_URL = '/get-invitation';
const GET_INVITATION_BY_USER_URL = '/get-invitation-user';
const UPDATE_INVITATION_STATE_URL = '/update-invitation-state';
const UPDATE_INVITATION_REASON_URL = '/update-invitation-reason';
const UPDATE_INVITATION_URL = '/update-invitation';
const DELETE_INVITATION_URL = '/delete-invitation';

const ADD_LOCATION_URL = '/add-location';
const GET_LOCATIONS_URL = '/get-locations';
const GET_LOCATION_BY_ID_URL = '/get-location';
const UPDATE_LOCATION_URL = '/update-location';
const DELETE_LOCATION_URL = '/delete-location';

const ADD_OBJECTIVE_URL = '/add-objective';
const GET_OBJECTIVES_URL = '/get-objectives';
const GET_OBJECTIVE_BY_ID_URL = '/get-objective';
const UPDATE_OBJECTIVE_URL = '/update-objective';
const UPDATE_OBJECTIVE_STATUS_URL = '/update-objective-status';
const DELETE_OBJECTIVE_URL = '/delete-objective';

const ADD_OBJECTIVESBLOCK_URL = '/add-objectivesblock';
const GET_OBJECTIVESBLOCKS_URL = '/get-objectivesblocks';
const GET_OBJECTIVESBLOCK_BY_ID_URL = '/get-objectivesblock';
const UPDATE_OBJECTIVESBLOCK_URL = '/update-objectivesblock';
const DELETE_OBJECTIVESBLOCK_URL = '/delete-objectivesblock';
const COMPLETE_OBJECTIVEBLOCK_URL = '/complete-objetivesblock';
const GET_OBJECTIVES_BLOCK_BY_REMINDER_ID_URL = '/get-objectives-block-by-reminder-id';


const ADD_PERMISSION_URL = '/add-permission';
const GET_PERMISSIONS_URL = '/get-permissions';
const GET_PERMISSION_BY_ID_URL = '/get-permission';
const UPDATE_PERMISSION_URL = '/update-permission';
const DELETE_PERMISSION_URL = '/delete-permission';

const ADD_POMODORO_URL = '/add-pomodoro';
const GET_POMODOROS_URL = '/get-pomodoros';
const GET_POMODORO_BY_ID_URL = '/get-pomodoro';
const UPDATE_POMODORO_URL = '/update-pomodoro';
const DELETE_POMODORO_URL = '/delete-pomodoro';

const ADD_PUNTUALITY_URL = '/add-puntuality';
const GET_PUNTUALITIES_URL = '/get-puntualities';
const GET_PUNTUALITY_BY_ID_URL = '/get-puntuality';
const UPDATE_PUNTUALITY_URL = '/update-puntuality';
const UPDATE_PUNTUALITY_STREAK_URL = '/update-puntuality-streak';
const DELETE_PUNTUALITY_URL = '/delete-puntuality';
const GET_PUNTUALITY_BY_USER_ID_AND_DATE_URL = '/getPuntualityByUserIdAndDate';


const ADD_REMINDER_URL = '/add-reminder';
const GET_REMINDERS_URL = '/get-reminders';
const DEACTIVATED_REMINDER_URL = '/deactivated-reminder';
const GET_REMINDERS_BY_MONTH_URL = '/get-reminders-by-month';
const GET_REMINDERS_BY_WEEK_URL = '/get-reminders-by-week';
const GET_REMINDER_BY_ID_URL = '/get-reminder';
const GET_REMINDER_BY_DAY_URL = '/get-reminders-by-day';
const UPDATE_REMINDER_URL = '/update-reminder';
const GET_COUNT_REMINDER_URL = '/get-count-reminder';
const DELETE_REMINDER_URL = '/delete-reminder';
const GET_REMINDER_BY_SOURCE_ID_AND_USER_ID_URL = '/get-reminder-by-source-id-and-user-id';


const ADD_REMINDERSHARE_URL = '/add-remindershare';
const GET_REMINDERSHARES_URL = '/get-remindershares';
const GET_REMINDERSHARE_BY_ID_URL = '/get-remindershare';
const UPDATE_REMINDERSHARE_URL = '/update-remindershare';
const DELETE_REMINDERSHARE_URL = '/delete-remindershare';
const GET_USER_IDS_BY_REMINDER_URL = '/get-user-ids-by-reminder';

const ADD_REPETITIONDAY_URL = '/add-repetitionday';
const GET_REPETITIONDAYS_URL = '/get-repetitiondays';
const GET_REPETITIONDAY_BY_ID_URL = '/get-repetitionday';
const UPDATE_REPETITIONDAY_URL = '/update-repetitionday';
const DELETE_REPETITIONDAY_URL = '/delete-repetitionday';

const ADD_SCHEDULE_URL = '/add-schedule';
const ADD_SCHEDULE_POMODORO_URL = '/add-schedule-pomodoro';
const ADD_SCHEDULE_SLEEP_URL = '/add-schedule-sleep';
const GET_SCHEDULES_URL = '/get-schedules';
const GET_SCHEDULE_BY_ID_URL = '/get-schedule';
const UPDATE_SCHEDULE_URL = '/update-schedule';
const DELETE_SCHEDULE_URL = '/delete-schedule';
const DELETE_SCHEDULE_POMODORO_URL = '/delete-schedule-pomodoro';
const DELETE_SCHEDULE_SLEEP_URL = '/delete-schedule-sleep';
const ADD_SLEEP_MODE_URL = '/add-sleepmode';
const GET_SLEEP_MODES_URL = '/get-sleepmodes';
const GET_SLEEP_MODE_BY_ID_URL = '/get-sleepmode';
const UPDATE_SLEEP_MODE_URL = '/update-sleepmode';
const UPDATE_SLEEP_MODE_REP_URL = '/update-sleepmode-rep'
const DELETE_SLEEP_MODE_URL = '/delete-sleepmode';

const ADD_SLEEP_QUALITY_URL = '/add-sleepquality';
const GET_SLEEP_QUALITIES_URL = '/get-sleepqualities';
const GET_SLEEPQUALITIES_BY_DATE_RANGE_URL = '/get-sleepqualities-by-date-range'
const GET_SLEEPQUALITIES_BY_USER_URL = '/get-sleepqualities-by-user'
const GET_SLEEP_QUALITY_BY_ID_URL = '/get-sleepquality';
const UPDATE_SLEEP_QUALITY_URL = '/update-sleepquality';
const UPDATE_SLEEP_REP_INCR_URL = '/update-sleepquality-rep';
const DELETE_SLEEP_QUALITY_URL = '/delete-sleepquality';

const ADD_TONE_URL = '/add-tone';
const GET_TONES_URL = '/get-tones';
const GET_TONE_BY_ID_URL = '/get-tone';
const UPDATE_TONE_URL = '/update-tone';
const DELETE_TONE_URL = '/delete-tone';

/*-------------------------------weeklyscorecard-------------------------*/
const GET_WEEKLY_SCORECARD_URL = '/get-weekly-scorecards';
const GET_WEEKLY_SCORECARD_BY_ID_URL = '/get-weekly-scorecard';
const GET_WEEKLY_SCORECARD_FOR_USER_URL = '/get-weekly-scorecard-by-user';
const GET_IS_USER_WEEKLY_SCORECARD_URL = '/get-is-weekly-scorecard';
const UPD_TITLE_USER = '/upd-title-user';

const ADD_NOTIFICATION_URL = '/add-notification';
const GET_USER_NOTIFICATIONS_URL = '/get-user-notifications';


export {
    ROOT_URL,
    SEND_MAIL_URL,
    SEND_MAILJT_URL,
    CONN_URL,
    LOGIN_URL,
    GET_USERS_URL,
    GET_USER_INFO_URL,
    CREATE_USER_URL,
    UPDATE_USER_URL,
    DELETE_USER_URL,
    UPDATE_USER_PWD_URL,
    USER_EXISTS_URL,
    USER_EXISTS_MAIL_URL,
    USER_EXISTS_NAME_URL,
    USER_EXISTS_NUMBER_URL,
    UPDATE_USER_TITLE_URL,
    UPDATE_USER_NAME_URL,
    GET_USER_BY_MAIL_URL,
    GET_USER_BY_NUMBER_URL,
    UPDATE_USER_STATUS_TO_ZERO_URL,
    ADD_CLOCK_URL,
    GET_CLOCK_URL,
    DELETE_CLOCK_URL,
    CLOCK_EXISTS_ZONE_URL,
    ADD_ALL_TITLES_URL,
    GET_USER_TITLES_URL,
    UPDATE_TITLE_STATUS_URL,
    ADD_USER_BLOCKED_URL,
    DELETE_USER_BLOCKED_URL,
    GET_USERS_BLOCKED_URL,
    CHECK_USER_BLOCKED_URL,
    ADD_ALARM_URL,
    GET_ALARMS_FOR_USER_URL,
    GET_ALARM_BY_ID_URL,
    UPDATE_ALARM_URL,
    DELETE_ALARM_URL,
    ALARM_NAME_EXISTS_URL,
    USER_ALARM_LIMIT_REACHED_URL,
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
    GET_USER_IDS_BY_ALARM_URL,

    ADD_DAYSELECTED_URL,
    GET_DAYSELECTEDS_URL,
    GET_DAYSELECTED_BY_ID_URL,
    UPDATE_DAYSELECTED_URL,
    DELETE_DAYSELECTED_URL,
    ADD_INVITATION_URL,
    GET_INVITATIONS_URL,
    GET_INVITATION_BY_ID_URL,
    GET_INVITATION_BY_USER_URL,
    UPDATE_INVITATION_STATE_URL,
    UPDATE_INVITATION_REASON_URL,
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
    ADD_OBJECTIVESBLOCK_URL,
    GET_OBJECTIVESBLOCKS_URL,
    GET_OBJECTIVESBLOCK_BY_ID_URL,
    UPDATE_OBJECTIVESBLOCK_URL,
    DELETE_OBJECTIVESBLOCK_URL,
    COMPLETE_OBJECTIVEBLOCK_URL,
    GET_OBJECTIVES_BLOCK_BY_REMINDER_ID_URL,
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
    UPDATE_PUNTUALITY_STREAK_URL,
    DELETE_PUNTUALITY_URL,
    GET_PUNTUALITY_BY_USER_ID_AND_DATE_URL,
    ADD_REMINDER_URL,
    GET_REMINDERS_URL,
    GET_REMINDERS_BY_MONTH_URL,
    GET_REMINDERS_BY_WEEK_URL,
    GET_REMINDER_BY_DAY_URL,
    GET_REMINDER_BY_ID_URL,
    UPDATE_REMINDER_URL,
    DEACTIVATED_REMINDER_URL,
    DELETE_REMINDER_URL,
    GET_REMINDER_BY_SOURCE_ID_AND_USER_ID_URL,
    
    ADD_REMINDERSHARE_URL,
    GET_REMINDERSHARES_URL,
    GET_REMINDERSHARE_BY_ID_URL,
    UPDATE_REMINDERSHARE_URL,
    DELETE_REMINDERSHARE_URL,
    GET_COUNT_REMINDER_URL,
    GET_USER_IDS_BY_REMINDER_URL,

    ADD_REPETITIONDAY_URL,
    GET_REPETITIONDAYS_URL,
    UPDATE_SLEEP_MODE_REP_URL,
    GET_REPETITIONDAY_BY_ID_URL,
    UPDATE_REPETITIONDAY_URL,
    DELETE_REPETITIONDAY_URL,
    ADD_SCHEDULE_URL,
    GET_SCHEDULES_URL,
    GET_SCHEDULE_BY_ID_URL,
    UPDATE_SCHEDULE_URL,
    DELETE_SCHEDULE_URL,
    ADD_SCHEDULE_POMODORO_URL,
    ADD_SCHEDULE_SLEEP_URL,
    DELETE_SCHEDULE_POMODORO_URL,
    DELETE_SCHEDULE_SLEEP_URL,

    ADD_SLEEP_MODE_URL,
    GET_SLEEP_MODES_URL,
    GET_SLEEP_MODE_BY_ID_URL,
    UPDATE_SLEEP_MODE_URL,
    DELETE_SLEEP_MODE_URL,

    ADD_SLEEP_QUALITY_URL,
    GET_SLEEP_QUALITIES_URL,
    GET_SLEEPQUALITIES_BY_DATE_RANGE_URL,
    GET_SLEEP_QUALITY_BY_ID_URL,
    GET_SLEEPQUALITIES_BY_USER_URL,
    UPDATE_SLEEP_QUALITY_URL,
    UPDATE_SLEEP_REP_INCR_URL,
    DELETE_SLEEP_QUALITY_URL,

    ADD_TONE_URL,
    GET_TONES_URL,
    GET_TONE_BY_ID_URL,
    UPDATE_TONE_URL,
    DELETE_TONE_URL,

    /*---weeklyscorecard---*/
    GET_WEEKLY_SCORECARD_URL,
    GET_WEEKLY_SCORECARD_BY_ID_URL,
    GET_WEEKLY_SCORECARD_FOR_USER_URL,
    GET_IS_USER_WEEKLY_SCORECARD_URL,
    UPD_TITLE_USER,

    ADD_NOTIFICATION_URL,
    GET_USER_NOTIFICATIONS_URL,
    UPDATE_OBJECTIVE_STATUS_URL,
};
