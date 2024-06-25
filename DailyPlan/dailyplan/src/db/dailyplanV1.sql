CREATE TABLE TONES (
  tone_id INT PRIMARY KEY,
  tone_name VARCHAR(30),
  tone_location TEXT
);

CREATE TABLE USERS (
  user_id INT PRIMARY KEY,
  user_mail VARCHAR(50),
  user_name VARCHAR(20),
  user_password VARCHAR(40),
  user_number VARCHAR(10)
);

CREATE TABLE ALARMS (
  alarm_id INT PRIMARY KEY,
  alarm_name VARCHAR(30),
  daysel_id INT,
  alarm_hour TINYINT,
  alarm_min TINYINT,
  alarm_sec TINYINT,
  alarm_rep_tone TINYINT,
  tone_id INT,
  alarm_days_suspended TINYINT,
  alarm_active BOOLEAN,
  alarm_imgage TEXT,
  alarm_desc VARCHAR(300),
  user_id INT,
  FOREIGN KEY (tone_id) REFERENCES TONES(tone_id),
  FOREIGN KEY (user_id) REFERENCES USERS(user_id)
);

CREATE TABLE ALARMSHARE (
  alarmsha_id INT PRIMARY KEY,
  ar_user_id_target INT,
  alarm_id INT,
  FOREIGN KEY (alarm_id) REFERENCES ALARMS(alarm_id),
  FOREIGN KEY (ar_user_id_target) REFERENCES USERS(user_id)
);

CREATE TABLE SCHEDULES (
  schedule_id INT PRIMARY KEY,
  schedule_eventname VARCHAR(50),
  schedule_datetime DATETIME,
  schedule_duration_hour TINYINT,
  schedule_duration_min TINYINT,
  user_id INT,
  FOREIGN KEY (schedule_id) REFERENCES USERS(user_id)
);

CREATE TABLE INVITATIONS (
  inv_id INT PRIMARY KEY,
  user_id INT
);

CREATE TABLE DAYSELECTED (
  daysel_id INT PRIMARY KEY,
  daysel_mon BOOLEAN,
  daysel_tues BOOLEAN,
  daysel_wed BOOLEAN,
  daysel_thur BOOLEAN,
  daysel_fri BOOLEAN,
  daysel_sat BOOLEAN,
  daysel_sun BOOLEAN
);

CREATE TABLE CLOCKS (
  clock_id INT PRIMARY KEY,
  clock_utm_id TEXT,
  clock_name VARCHAR(40),
  user_id INT,
  FOREIGN KEY (user_id) REFERENCES USERS(user_id)
);

CREATE TABLE LOCATIONS (
  location_id INT PRIMARY KEY,
  location_x DOUBLE,
  location_y DOUBLE
);

CREATE TABLE SLEEPMODE (
  sleep_id INT PRIMARY KEY,
  sleep_starthour TINYINT,
  sleep_endhour TINYINT,
  sleep_active BOOLEAN,
  sleep_rep TINYINT,
  sleep_video_url TEXT,
  sleep_rep_stopped TINYINT,
  tone_id INT,
  quality_id INT,
  FOREIGN KEY (tone_id) REFERENCES TONES(tone_id)
);

CREATE TABLE REMINDERS (
  reminder_id INT PRIMARY KEY,
  reminder_name VARCHAR(30),
  reminder_date DATETIME,
  reminder_hour TINYINT,
  reminder_min TINYINT,
  reminder_active BOOLEAN,
  repdays_id INT,
  reminder_tone_duration_sec TINYINT,
  reminder_advance_min TINYINT,
  location_exit_id INT,
  location_arrival_id INT,
  reminder_img TEXT,
  reminder_desc VARCHAR(300),
  reminder_days_suspended TINYINT,
  objlist_id INT,
  FOREIGN KEY (location_arrival_id) REFERENCES LOCATIONS(location_id),
  FOREIGN KEY (location_exit_id) REFERENCES LOCATIONS(location_id)
);

CREATE TABLE REMINDERSHARE (
  remindsha_id INT PRIMARY KEY,
  rs_user_id_target INT,
  reminder_id INT,
  FOREIGN KEY (reminder_id) REFERENCES REMINDERS(reminder_id),
  FOREIGN KEY (rs_user_id_target) REFERENCES USERS(user_id)
);

CREATE TABLE CHRONOMETERS (
  chrono_id INT PRIMARY KEY,
  chrono_name VARCHAR(30),
  chrono_hour TINYINT,
  chrono_min TINYINT,
  chrono_sec TINYINT,
  user_id INT,
  FOREIGN KEY (user_id) REFERENCES USERS(user_id)
);

CREATE TABLE REPETITIONDAYS (
  repdays_id INT PRIMARY KEY,
  repday_date DATETIME,
  FOREIGN KEY (repdays_id) REFERENCES REMINDERS(repdays_id)
);

CREATE TABLE MARKS (
  mark_id INT PRIMARY KEY,
  chrono_id INT,
  mark_hour TINYINT,
  mark_min TINYINT,
  mark_sec TINYINT,
  FOREIGN KEY (chrono_id) REFERENCES CHRONOMETERS(chrono_id)
);

CREATE TABLE PERMISIONS (
  permision_id INT PRIMARY KEY,
  permision_active BOOLEAN,
  user_id INT,
  FOREIGN KEY (user_id) REFERENCES USERS(user_id)
);

CREATE TABLE SLEEPQUALITY (
  quality_id INT PRIMARY KEY,
  quality_good BOOLEAN,
  quality_medium BOOLEAN,
  quality_bad BOOLEAN,
  FOREIGN KEY (quality_id) REFERENCES SLEEPMODE(quality_id)
);

CREATE TABLE OBJECTIVESLIST (
  objlist_id INT PRIMARY KEY,
  objlist_name VARCHAR(30),
  objlist_duration_min TINYINT,
  FOREIGN KEY (objlist_id) REFERENCES REMINDERS(objlist_id)
);

CREATE TABLE TIMERS (
  timer_id INT PRIMARY KEY,
  timer_hour TINYINT,
  timer_min TINYINT,
  timer_sec TINYINT,
  timer_duration TINYINT,
  timer_name VARCHAR(30),
  tone_id INT,
  user_id INT,
  FOREIGN KEY (user_id) REFERENCES USERS(user_id),
  FOREIGN KEY (tone_id) REFERENCES TONES(tone_id)
);

CREATE TABLE TITLES (
  title_id INT PRIMARY KEY,
  title_name VARCHAR(30)
);

CREATE TABLE POMODOROS (
  pomodoro_id INT PRIMARY KEY,
  pomodoro_hour_work TINYINT,
  pomodoro_min_work TINYINT,
  pomodoro_shortrest TINYINT,
  pomodoro_longrest TINYINT,
  tone_id INT,
  FOREIGN KEY (tone_id) REFERENCES TONES(tone_id)
);

CREATE TABLE USER_TITLES (
  user_id INT,
  title_id INT,
  title_done BOOLEAN,
  FOREIGN KEY (user_id) REFERENCES USERS(user_id),
  FOREIGN KEY (title_id) REFERENCES TITLES(title_id)
);
