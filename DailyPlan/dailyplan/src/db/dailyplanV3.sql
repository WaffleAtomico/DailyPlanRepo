CREATE TABLE `USERS` (
  `user_id` int AUTO_INCREMENT,
  `user_mail` varchar(50),
  `user_name` varchar(20),
  `user_password` varchar(40),
  `user_number` varchar(10),
  `user_status` boolean,
  PRIMARY KEY (`user_id`)
);

CREATE TABLE `TONES` (
  `tone_id` int AUTO_INCREMENT,
  `tone_name` varchar(30),
  `tone_location` text,
  PRIMARY KEY (`tone_id`)
);

CREATE TABLE `ALARMS` (
  `alarm_id` int AUTO_INCREMENT,
  `alarm_name` varchar(30),
  `daysel_id` int,
  `alarm_hour` tinyint,
  `alarm_min` tinyint,
  `alarm_sec` tinyint,
  `alarm_rep_tone` tinyint,
  `tone_id` int,
  `alarm_days_suspended` tinyint,
  `alarm_active` boolean,
  `alarm_imgage` text,
  `alarm_desc` varchar(300),
  `user_id` int,
  PRIMARY KEY (`alarm_id`),
  FOREIGN KEY (`tone_id`) REFERENCES `TONES`(`tone_id`) ON DELETE CASCADE,
  FOREIGN KEY (`user_id`) REFERENCES `USERS`(`user_id`) ON DELETE CASCADE
);

CREATE TABLE `REMINDERS` (
  `reminder_id` int AUTO_INCREMENT,
  `reminder_name` varchar(30),
  `reminder_date` datetime,
  `reminder_hour` tinyint,
  `reminder_min` tinyint,
  `reminder_active` boolean,
  `repdays_id` int,
  `reminder_tone_duration_sec` tinyint,
  `reminder_advance_min` tinyint,
  `reminder_img` text,
  `reminder_desc` varchar(300),
  `reminder_days_suspended` tinyint,
  `reminder_share` boolean,
  `reminder_sourse_id` int,
  PRIMARY KEY (`reminder_id`),
  FOREIGN KEY (`reminder_sourse_id`) REFERENCES `REMINDERS`(`reminder_id`) ON DELETE CASCADE
);

CREATE TABLE `INVITATIONS` (
  `inv_id` int AUTO_INCREMENT,
  `reminder_id` int,
  `alarm_id` int,
  `user_id_owner` int,
  `user_id_target` int,
  `inv_state` boolean,
  `inv_reason` varchar(250),
  PRIMARY KEY (`inv_id`),
  FOREIGN KEY (`user_id_owner`) REFERENCES `USERS`(`user_id`) ON DELETE CASCADE,
  FOREIGN KEY (`user_id_target`) REFERENCES `USERS`(`user_id`) ON DELETE CASCADE,
  FOREIGN KEY (`alarm_id`) REFERENCES `ALARMS`(`alarm_id`) ON DELETE CASCADE,
  FOREIGN KEY (`reminder_id`) REFERENCES `REMINDERS`(`reminder_id`) ON DELETE CASCADE
);

CREATE TABLE `DAYSELECTED` (
  `daysel_id` int AUTO_INCREMENT,
  `daysel_mon` boolean,
  `daysel_tues` boolean,
  `daysel_wed` boolean,
  `daysel_thur` boolean,
  `daysel_fri` boolean,
  `daysel_sat` boolean,
  `daysel_sun` boolean,
  PRIMARY KEY (`daysel_id`)
);

CREATE TABLE `CLOCKS` (
  `clock_id` int AUTO_INCREMENT,
  `clock_utm_id` text,
  `clock_name` varchar(40),
  `user_id` int,
  PRIMARY KEY (`clock_id`),
  FOREIGN KEY (`user_id`) REFERENCES `USERS`(`user_id`) ON DELETE CASCADE
);

CREATE TABLE `SLEEPQUALITY` (
  `quality_id` int AUTO_INCREMENT,
  `quality_good` boolean,
  `quality_medium` boolean,
  `quiality_bad` boolean,
  PRIMARY KEY (`quality_id`)
);

CREATE TABLE `SLEEPMODE` (
  `sleep_id` int AUTO_INCREMENT,
  `sleep_starthour` tinyint,
  `sleep_endhour` tinyint,
  `sleep_active` boolean,
  `sleep_rep` tinyint,
  `sleep_video_url` text,
  `sleep_rep_stopped` tinyint,
  `tone_id` int,
  `quality_id` int,
  PRIMARY KEY (`sleep_id`),
  FOREIGN KEY (`tone_id`) REFERENCES `TONES`(`tone_id`) ON DELETE CASCADE,
  FOREIGN KEY (`quality_id`) REFERENCES `SLEEPQUALITY`(`quality_id`) ON DELETE CASCADE
);

CREATE TABLE `REMINDERSHARE` (
  `remindsha_id` int AUTO_INCREMENT,
  `rs_user_id_target` int,
  `reminder_id` int,
  PRIMARY KEY (`remindsha_id`),
  FOREIGN KEY (`reminder_id`) REFERENCES `REMINDERS`(`reminder_id`) ON DELETE CASCADE,
  FOREIGN KEY (`rs_user_id_target`) REFERENCES `USERS`(`user_id`) ON DELETE CASCADE
);

CREATE TABLE `CHRONOMETERS` (
  `chrono_id` int AUTO_INCREMENT,
  `chrono_name` varchar(30),
  `chrono_hour` tinyint,
  `chrono_min` tinyint,
  `chrono_sec` tinyint,
  `user_id` int,
  PRIMARY KEY (`chrono_id`),
  FOREIGN KEY (`user_id`) REFERENCES `USERS`(`user_id`) ON DELETE CASCADE
);

CREATE TABLE `PERMISIONS` (
  `permision_id` int AUTO_INCREMENT,
  `permision_active` boolean,
  `user_id` int,
  PRIMARY KEY (`permision_id`),
  FOREIGN KEY (`user_id`) REFERENCES `USERS`(`user_id`) ON DELETE CASCADE
);

CREATE TABLE `OBJECTIVESBLOCK` (
  `objblo_id` int AUTO_INCREMENT,
  `reminder_id` int,
  `objblo_name` varchar(25),
  PRIMARY KEY (`objblo_id`),
  FOREIGN KEY (`reminder_id`) REFERENCES `REMINDERS`(`reminder_id`) ON DELETE CASCADE
);

CREATE TABLE `OBJECTIVES` (
  `obj_id` int AUTO_INCREMENT,
  `obj_name` varchar(30),
  `obj_duration_min` tinyint,
  `obj_durationreal_min` smallint,
  `obj_check` boolean,
  `id_user` int,
  `objblo_id` int,
  PRIMARY KEY (`obj_id`),
  FOREIGN KEY (`id_user`) REFERENCES `USERS`(`user_id`) ON DELETE CASCADE,
  FOREIGN KEY (`objblo_id`) REFERENCES `OBJECTIVESBLOCK`(`objblo_id`) ON DELETE CASCADE
);

CREATE TABLE `TITLES` (
  `title_id` int AUTO_INCREMENT,
  `title_name` varchar(30),
  PRIMARY KEY (`title_id`)
);

CREATE TABLE `ALARMSHARE` (
  `alarmsha_id` int AUTO_INCREMENT,
  `ar_user_id_target` int,
  `alarm_id` int,
  PRIMARY KEY (`alarmsha_id`),
  FOREIGN KEY (`alarm_id`) REFERENCES `ALARMS`(`alarm_id`) ON DELETE CASCADE,
  FOREIGN KEY (`ar_user_id_target`) REFERENCES `USERS`(`user_id`) ON DELETE CASCADE
);

CREATE TABLE `SCHEDULES` (
  `schedule_id` int AUTO_INCREMENT,
  `schedule_eventname` varchar(50),
  `schedule_datetime` datetime,
  `schedule_duration_hour` tinyint,
  `schedule_duration_min` tinyint,
  PRIMARY KEY (`schedule_id`)
);

CREATE TABLE `LOCATIONS` (
  `location_id` int AUTO_INCREMENT,
  `location_x` double,
  `location_y` double,
  `location_type` boolean,
  `reminder_id` int,
  PRIMARY KEY (`location_id`),
  FOREIGN KEY (`reminder_id`) REFERENCES `REMINDERS`(`reminder_id`) ON DELETE CASCADE
);

CREATE TABLE `REPETITIONDAYS` (
  `repdays_id` int AUTO_INCREMENT,
  `repday_date` datetime,
  PRIMARY KEY (`repdays_id`)
);

CREATE TABLE `chrono_id` (
  `mark_id` int AUTO_INCREMENT,
  `chrono_id` varchar(30),
  `mark_hout` tinyint,
  `mark_min` tinyint,
  `mark_sec` tinyint,
  PRIMARY KEY (`mark_id`)
);

CREATE TABLE `TIMERS` (
  `timer_id` int AUTO_INCREMENT,
  `timer_hour` tinyint,
  `timer_min` tinyint,
  `timer_sec` tinyint,
  `timer_duration` tinyint,
  `timer_name` varchar(30),
  `tone_id` int,
  `user_id` int,
  PRIMARY KEY (`timer_id`),
  FOREIGN KEY (`user_id`) REFERENCES `USERS`(`user_id`) ON DELETE CASCADE,
  FOREIGN KEY (`tone_id`) REFERENCES `TONES`(`tone_id`) ON DELETE CASCADE
);

CREATE TABLE `POMODOROS` (
  `pomodoro_id` int AUTO_INCREMENT,
  `tpomodoro_hour_work` tinyint,
  `pomodoro_min_work` tinyint,
  `pomodoro_shortrest` tinyint,
  `pomodoro_longrest` tinyint,
  `tone_id` int,
  PRIMARY KEY (`pomodoro_id`),
  FOREIGN KEY (`tone_id`) REFERENCES `TONES`(`tone_id`) ON DELETE CASCADE
);

CREATE TABLE `USER_TITLES` (
  `user_id` int AUTO_INCREMENT,
  `title_id` int,
  `title_done` boolean,
  PRIMARY KEY (`user_id`),
  FOREIGN KEY (`title_id`) REFERENCES `TITLES`(`title_id`) ON DELETE CASCADE
);

CREATE TABLE `USERSBLOCKED` (
  `userblocked_id` int AUTO_INCREMENT,
  `user_id_sourse` int,
  `user_id_target` int,
  PRIMARY KEY (`userblocked_id`),
  FOREIGN KEY (`user_id_sourse`) REFERENCES `USERS`(`user_id`) ON DELETE CASCADE,
  FOREIGN KEY (`user_id_target`) REFERENCES `USERS`(`user_id`) ON DELETE CASCADE
);

CREATE TABLE `PUNTUALITY` (
  `punt_id` int AUTO_INCREMENT,
  `user_id` int,
  `punt_date` date,
  `punt_value` tinyint,
  `punt_num_rem` tinyint,
  `punt_percent_rem` tinyint,
  `punt_num_alar` tinyint,
  `punt_percent_alar` tinyint,
  `punt_num_timer` tinyint,
  `punt_percent_timer` tinyint,
  `punt_num_chro` tinyint,
  `punt_percent_chro` tinyint,
  PRIMARY KEY (`punt_id`),
  FOREIGN KEY (`user_id`) REFERENCES `USERS`(`user_id`) ON DELETE CASCADE
);
