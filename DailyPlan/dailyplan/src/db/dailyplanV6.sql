-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 10-07-2024 a las 00:09:59
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `dailyplan`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `alarms`
--

CREATE TABLE `alarms` (
  `alarm_id` int(11) NOT NULL,
  `alarm_name` varchar(30) DEFAULT NULL,
  `daysel_id` int(11) DEFAULT NULL,
  `alarm_hour` tinyint(4) DEFAULT NULL,
  `alarm_min` tinyint(4) DEFAULT NULL,
  `alarm_sec` tinyint(4) DEFAULT NULL,
  `alarm_rep_tone` text DEFAULT NULL,
  `tone_id` int(11) DEFAULT NULL,
  `alarm_days_suspended` tinyint(4) DEFAULT NULL,
  `alarm_active` tinyint(1) DEFAULT NULL,
  `alarm_imgage` text DEFAULT NULL,
  `alarm_desc` varchar(300) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `alarmshare`
--

CREATE TABLE `alarmshare` (
  `alarmsha_id` int(11) NOT NULL,
  `ar_user_id_target` int(11) DEFAULT NULL,
  `alarm_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `chronometers`
--

CREATE TABLE `chronometers` (
  `chrono_id` int(11) NOT NULL,
  `chrono_name` varchar(30) DEFAULT NULL,
  `chrono_hour` tinyint(4) DEFAULT NULL,
  `chrono_min` tinyint(4) DEFAULT NULL,
  `chrono_sec` tinyint(4) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clocks`
--

CREATE TABLE `clocks` (
  `clock_id` int(11) NOT NULL,
  `clock_name` varchar(40) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `clocks`
--

INSERT INTO `clocks` (`clock_id`, `clock_name`, `user_id`) VALUES
(3, 'Europe/Paris', 2),
(4, 'Europe/Paris', 3),
(11, 'Asia/Bangkok', 2),
(13, 'Australia/Broken_Hill', 2),
(14, 'Australia/Brisbane', 2),
(16, 'Europe/Andorra', 2),
(18, 'Africa/Abidjan', 13),
(19, 'Africa/Bangui', 13),
(20, 'Europe/Paris', 13),
(26, 'America/Montreal', 17),
(28, 'America/North_Dakota/Beulah', 17);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `dayselected`
--

CREATE TABLE `dayselected` (
  `daysel_id` int(11) NOT NULL,
  `daysel_mon` tinyint(1) DEFAULT NULL,
  `daysel_tues` tinyint(1) DEFAULT NULL,
  `daysel_wed` tinyint(1) DEFAULT NULL,
  `daysel_thur` tinyint(1) DEFAULT NULL,
  `daysel_fri` tinyint(1) DEFAULT NULL,
  `daysel_sat` tinyint(1) DEFAULT NULL,
  `daysel_sun` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `invitations`
--

CREATE TABLE `invitations` (
  `inv_id` int(11) NOT NULL,
  `reminder_id` int(11) DEFAULT NULL,
  `alarm_id` int(11) DEFAULT NULL,
  `user_id_owner` int(11) DEFAULT NULL,
  `user_id_target` int(11) DEFAULT NULL,
  `inv_state` tinyint(1) DEFAULT NULL,
  `inv_reason` varchar(250) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `locations`
--

CREATE TABLE `locations` (
  `location_id` int(11) NOT NULL,
  `location_x` double DEFAULT NULL,
  `location_y` double DEFAULT NULL,
  `location_type` tinyint(1) DEFAULT NULL,
  `reminder_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `objectives`
--

CREATE TABLE `objectives` (
  `obj_id` int(11) NOT NULL,
  `obj_name` varchar(30) DEFAULT NULL,
  `obj_duration_min` tinyint(4) DEFAULT NULL,
  `obj_durationreal_min` smallint(6) DEFAULT NULL,
  `obj_check` tinyint(1) DEFAULT NULL,
  `id_user` int(11) DEFAULT NULL,
  `objblo_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `objectivesblock`
--

CREATE TABLE `objectivesblock` (
  `objblo_id` int(11) NOT NULL,
  `reminder_id` int(11) DEFAULT NULL,
  `objblo_name` varchar(25) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `permisions`
--

CREATE TABLE `permisions` (
  `permision_id` int(11) NOT NULL,
  `permision_active` tinyint(1) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pomodoros`
--

CREATE TABLE `pomodoros` (
  `pomodoro_id` int(11) NOT NULL,
  `tpomodoro_hour_work` tinyint(4) DEFAULT NULL,
  `pomodoro_min_work` tinyint(4) DEFAULT NULL,
  `pomodoro_shortrest` tinyint(4) DEFAULT NULL,
  `pomodoro_longrest` tinyint(4) DEFAULT NULL,
  `tone_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `puntuality`
--

CREATE TABLE `puntuality` (
  `punt_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `punt_date` date DEFAULT NULL,
  `punt_value` tinyint(4) DEFAULT NULL,
  `punt_num_rem` tinyint(4) DEFAULT NULL,
  `punt_percent_rem` tinyint(4) DEFAULT NULL,
  `punt_num_alar` tinyint(4) DEFAULT NULL,
  `punt_percent_alar` tinyint(4) DEFAULT NULL,
  `punt_num_timer` tinyint(4) DEFAULT NULL,
  `punt_percent_timer` tinyint(4) DEFAULT NULL,
  `punt_num_chro` tinyint(4) DEFAULT NULL,
  `punt_percent_chro` tinyint(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reminders`
--

CREATE TABLE `reminders` (
  `reminder_id` int(11) NOT NULL,
  `reminder_name` varchar(30) DEFAULT NULL,
  `reminder_date` datetime DEFAULT NULL,
  `reminder_hour` tinyint(4) DEFAULT NULL,
  `reminder_min` tinyint(4) DEFAULT NULL,
  `reminder_active` tinyint(1) DEFAULT NULL,
  `repdays_id` int(11) DEFAULT NULL,
  `reminder_tone_duration_sec` tinyint(4) DEFAULT NULL,
  `reminder_advance_min` tinyint(4) DEFAULT NULL,
  `reminder_img` text DEFAULT NULL,
  `reminder_desc` varchar(300) DEFAULT NULL,
  `reminder_days_suspended` tinyint(4) DEFAULT NULL,
  `reminder_share` tinyint(1) DEFAULT NULL,
  `reminder_sourse_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `remindershare`
--

CREATE TABLE `remindershare` (
  `remindsha_id` int(11) NOT NULL,
  `rs_user_id_target` int(11) DEFAULT NULL,
  `reminder_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `repetitiondays`
--

CREATE TABLE `repetitiondays` (
  `repdays_id` int(11) NOT NULL,
  `repday_date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `schedules`
--

CREATE TABLE `schedules` (
  `schedule_id` int(11) NOT NULL,
  `schedule_eventname` varchar(50) DEFAULT NULL,
  `schedule_datetime` datetime DEFAULT NULL,
  `schedule_duration_hour` tinyint(4) DEFAULT NULL,
  `schedule_duration_min` tinyint(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sleepmode`
--

CREATE TABLE `sleepmode` (
  `sleep_id` int(11) NOT NULL,
  `sleep_starthour` tinyint(4) DEFAULT NULL,
  `sleep_endhour` tinyint(4) DEFAULT NULL,
  `sleep_active` tinyint(1) DEFAULT NULL,
  `sleep_rep` tinyint(4) DEFAULT NULL,
  `sleep_video_url` text DEFAULT NULL,
  `sleep_rep_stopped` tinyint(4) DEFAULT NULL,
  `tone_id` int(11) DEFAULT NULL,
  `quality_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sleepquality`
--

CREATE TABLE `sleepquality` (
  `quality_id` int(11) NOT NULL,
  `quality_good` tinyint(1) DEFAULT NULL,
  `quality_medium` tinyint(1) DEFAULT NULL,
  `quiality_bad` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `timers`
--

CREATE TABLE `timers` (
  `timer_id` int(11) NOT NULL,
  `timer_hour` tinyint(4) DEFAULT NULL,
  `timer_min` tinyint(4) DEFAULT NULL,
  `timer_sec` tinyint(4) DEFAULT NULL,
  `timer_duration` tinyint(4) DEFAULT NULL,
  `timer_name` varchar(30) DEFAULT NULL,
  `tone_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `titles`
--

CREATE TABLE `titles` (
  `title_id` int(11) NOT NULL,
  `title_name` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `titles`
--

INSERT INTO `titles` (`title_id`, `title_name`) VALUES
(1, 'Asegurado'),
(2, 'Planificador'),
(3, 'Liebre'),
(4, 'Reunión'),
(5, 'Consciente'),
(6, 'Rey de la colina'),
(7, 'Sintonía'),
(8, 'Tomatero'),
(9, 'Enlistado'),
(10, 'Todo en su lugar'),
(11, 'Ganando el tiempo al tiempo'),
(12, 'Organizador'),
(13, 'Titulado'),
(14, 'Mundial'),
(15, 'Relevos'),
(16, 'Rey del tiempo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tones`
--

CREATE TABLE `tones` (
  `tone_id` int(11) NOT NULL,
  `tone_name` varchar(30) DEFAULT NULL,
  `tone_location` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `user_mail` varchar(50) DEFAULT NULL,
  `user_name` varchar(20) DEFAULT NULL,
  `user_password` varchar(40) DEFAULT NULL,
  `user_number` varchar(10) DEFAULT NULL,
  `user_status` tinyint(1) DEFAULT NULL,
  `title_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`user_id`, `user_mail`, `user_name`, `user_password`, `user_number`, `user_status`, `title_id`) VALUES
(1, 'test@gmail.com', 'test', '123', '1234567891', NULL, NULL),
(2, 'test1@gmail.com', 'test', '123', '1234567899', 1, NULL),
(3, 'oscar@gmail.com', 'Oscar', '321', '3389123123', 1, NULL),
(13, 'testTitle@gmail.com', 'testTitle', '123', '3388121212', 1, NULL),
(14, 'penillaskakievichoscar@gmail.com', 'Alex', '123', '3357672312', 1, NULL),
(17, 'a20300701@ceti.mx', 'Ouscar', '123', '1320880123', 1, NULL),
(18, 'a20300701@ceti.com', 'Oscar', '123', '1230812780', 1, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usersblocked`
--

CREATE TABLE `usersblocked` (
  `userblocked_id` int(11) NOT NULL,
  `user_id_sourse` int(11) DEFAULT NULL,
  `user_id_target` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user_titles`
--

CREATE TABLE `user_titles` (
  `user_id` int(11) NOT NULL,
  `title_id` int(11) NOT NULL,
  `title_done` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `user_titles`
--

INSERT INTO `user_titles` (`user_id`, `title_id`, `title_done`) VALUES
(13, 1, 0),
(13, 2, 0),
(13, 3, 0),
(13, 4, 0),
(13, 5, 0),
(13, 6, 0),
(13, 7, 0),
(13, 8, 0),
(13, 9, 0),
(13, 10, 0),
(13, 11, 0),
(13, 12, 0),
(13, 13, 0),
(13, 14, 0),
(13, 15, 0),
(13, 16, 0),
(14, 1, 0),
(14, 2, 0),
(14, 3, 0),
(14, 4, 0),
(14, 5, 0),
(14, 6, 0),
(14, 7, 0),
(14, 8, 0),
(14, 9, 0),
(14, 10, 0),
(14, 11, 0),
(14, 12, 0),
(14, 13, 0),
(14, 14, 0),
(14, 15, 0),
(14, 16, 0),
(15, 1, 0),
(15, 2, 0),
(15, 3, 0),
(15, 4, 0),
(15, 5, 0),
(15, 6, 0),
(15, 7, 0),
(15, 8, 0),
(15, 9, 0),
(15, 10, 0),
(15, 11, 0),
(15, 12, 0),
(15, 13, 0),
(15, 14, 0),
(15, 15, 0),
(15, 16, 0),
(17, 1, 0),
(17, 2, 0),
(17, 3, 0),
(17, 4, 0),
(17, 5, 0),
(17, 6, 0),
(17, 7, 0),
(17, 8, 0),
(17, 9, 0),
(17, 10, 0),
(17, 11, 0),
(17, 12, 0),
(17, 13, 0),
(17, 14, 0),
(17, 15, 0),
(17, 16, 0),
(18, 1, 0),
(18, 2, 0),
(18, 3, 0),
(18, 4, 0),
(18, 5, 0),
(18, 6, 0),
(18, 7, 0),
(18, 8, 0),
(18, 9, 0),
(18, 10, 0),
(18, 11, 0),
(18, 12, 0),
(18, 13, 0),
(18, 14, 0),
(18, 15, 0),
(18, 16, 0);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `alarms`
--
ALTER TABLE `alarms`
  ADD PRIMARY KEY (`alarm_id`),
  ADD KEY `tone_id` (`tone_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indices de la tabla `alarmshare`
--
ALTER TABLE `alarmshare`
  ADD PRIMARY KEY (`alarmsha_id`),
  ADD KEY `alarm_id` (`alarm_id`),
  ADD KEY `ar_user_id_target` (`ar_user_id_target`);

--
-- Indices de la tabla `chronometers`
--
ALTER TABLE `chronometers`
  ADD PRIMARY KEY (`chrono_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indices de la tabla `clocks`
--
ALTER TABLE `clocks`
  ADD PRIMARY KEY (`clock_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indices de la tabla `dayselected`
--
ALTER TABLE `dayselected`
  ADD PRIMARY KEY (`daysel_id`);

--
-- Indices de la tabla `invitations`
--
ALTER TABLE `invitations`
  ADD PRIMARY KEY (`inv_id`),
  ADD KEY `user_id_owner` (`user_id_owner`),
  ADD KEY `user_id_target` (`user_id_target`),
  ADD KEY `alarm_id` (`alarm_id`),
  ADD KEY `reminder_id` (`reminder_id`);

--
-- Indices de la tabla `locations`
--
ALTER TABLE `locations`
  ADD PRIMARY KEY (`location_id`),
  ADD KEY `reminder_id` (`reminder_id`);

--
-- Indices de la tabla `objectives`
--
ALTER TABLE `objectives`
  ADD PRIMARY KEY (`obj_id`),
  ADD KEY `id_user` (`id_user`),
  ADD KEY `objblo_id` (`objblo_id`);

--
-- Indices de la tabla `objectivesblock`
--
ALTER TABLE `objectivesblock`
  ADD PRIMARY KEY (`objblo_id`),
  ADD KEY `reminder_id` (`reminder_id`);

--
-- Indices de la tabla `permisions`
--
ALTER TABLE `permisions`
  ADD PRIMARY KEY (`permision_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indices de la tabla `pomodoros`
--
ALTER TABLE `pomodoros`
  ADD PRIMARY KEY (`pomodoro_id`),
  ADD KEY `tone_id` (`tone_id`);

--
-- Indices de la tabla `puntuality`
--
ALTER TABLE `puntuality`
  ADD PRIMARY KEY (`punt_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indices de la tabla `reminders`
--
ALTER TABLE `reminders`
  ADD PRIMARY KEY (`reminder_id`),
  ADD KEY `reminder_sourse_id` (`reminder_sourse_id`);

--
-- Indices de la tabla `remindershare`
--
ALTER TABLE `remindershare`
  ADD PRIMARY KEY (`remindsha_id`),
  ADD KEY `reminder_id` (`reminder_id`),
  ADD KEY `rs_user_id_target` (`rs_user_id_target`);

--
-- Indices de la tabla `repetitiondays`
--
ALTER TABLE `repetitiondays`
  ADD PRIMARY KEY (`repdays_id`);

--
-- Indices de la tabla `schedules`
--
ALTER TABLE `schedules`
  ADD PRIMARY KEY (`schedule_id`);

--
-- Indices de la tabla `sleepmode`
--
ALTER TABLE `sleepmode`
  ADD PRIMARY KEY (`sleep_id`),
  ADD KEY `tone_id` (`tone_id`),
  ADD KEY `quality_id` (`quality_id`);

--
-- Indices de la tabla `sleepquality`
--
ALTER TABLE `sleepquality`
  ADD PRIMARY KEY (`quality_id`);

--
-- Indices de la tabla `timers`
--
ALTER TABLE `timers`
  ADD PRIMARY KEY (`timer_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `tone_id` (`tone_id`);

--
-- Indices de la tabla `titles`
--
ALTER TABLE `titles`
  ADD PRIMARY KEY (`title_id`);

--
-- Indices de la tabla `tones`
--
ALTER TABLE `tones`
  ADD PRIMARY KEY (`tone_id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- Indices de la tabla `usersblocked`
--
ALTER TABLE `usersblocked`
  ADD PRIMARY KEY (`userblocked_id`),
  ADD KEY `user_id_sourse` (`user_id_sourse`),
  ADD KEY `user_id_target` (`user_id_target`);

--
-- Indices de la tabla `user_titles`
--
ALTER TABLE `user_titles`
  ADD PRIMARY KEY (`user_id`,`title_id`) USING BTREE;

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `alarms`
--
ALTER TABLE `alarms`
  MODIFY `alarm_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `alarmshare`
--
ALTER TABLE `alarmshare`
  MODIFY `alarmsha_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `chronometers`
--
ALTER TABLE `chronometers`
  MODIFY `chrono_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `clocks`
--
ALTER TABLE `clocks`
  MODIFY `clock_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT de la tabla `dayselected`
--
ALTER TABLE `dayselected`
  MODIFY `daysel_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `invitations`
--
ALTER TABLE `invitations`
  MODIFY `inv_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `locations`
--
ALTER TABLE `locations`
  MODIFY `location_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `objectives`
--
ALTER TABLE `objectives`
  MODIFY `obj_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `objectivesblock`
--
ALTER TABLE `objectivesblock`
  MODIFY `objblo_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `permisions`
--
ALTER TABLE `permisions`
  MODIFY `permision_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `pomodoros`
--
ALTER TABLE `pomodoros`
  MODIFY `pomodoro_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `puntuality`
--
ALTER TABLE `puntuality`
  MODIFY `punt_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `reminders`
--
ALTER TABLE `reminders`
  MODIFY `reminder_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `remindershare`
--
ALTER TABLE `remindershare`
  MODIFY `remindsha_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `repetitiondays`
--
ALTER TABLE `repetitiondays`
  MODIFY `repdays_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `schedules`
--
ALTER TABLE `schedules`
  MODIFY `schedule_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `sleepmode`
--
ALTER TABLE `sleepmode`
  MODIFY `sleep_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `sleepquality`
--
ALTER TABLE `sleepquality`
  MODIFY `quality_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `timers`
--
ALTER TABLE `timers`
  MODIFY `timer_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `titles`
--
ALTER TABLE `titles`
  MODIFY `title_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT de la tabla `tones`
--
ALTER TABLE `tones`
  MODIFY `tone_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT de la tabla `usersblocked`
--
ALTER TABLE `usersblocked`
  MODIFY `userblocked_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `alarms`
--
ALTER TABLE `alarms`
  ADD CONSTRAINT `alarms_ibfk_1` FOREIGN KEY (`tone_id`) REFERENCES `tones` (`tone_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `alarms_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `alarmshare`
--
ALTER TABLE `alarmshare`
  ADD CONSTRAINT `alarmshare_ibfk_1` FOREIGN KEY (`alarm_id`) REFERENCES `alarms` (`alarm_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `alarmshare_ibfk_2` FOREIGN KEY (`ar_user_id_target`) REFERENCES `users` (`user_id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `chronometers`
--
ALTER TABLE `chronometers`
  ADD CONSTRAINT `chronometers_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `clocks`
--
ALTER TABLE `clocks`
  ADD CONSTRAINT `clocks_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `invitations`
--
ALTER TABLE `invitations`
  ADD CONSTRAINT `invitations_ibfk_1` FOREIGN KEY (`user_id_owner`) REFERENCES `users` (`user_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `invitations_ibfk_2` FOREIGN KEY (`user_id_target`) REFERENCES `users` (`user_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `invitations_ibfk_3` FOREIGN KEY (`alarm_id`) REFERENCES `alarms` (`alarm_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `invitations_ibfk_4` FOREIGN KEY (`reminder_id`) REFERENCES `reminders` (`reminder_id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `locations`
--
ALTER TABLE `locations`
  ADD CONSTRAINT `locations_ibfk_1` FOREIGN KEY (`reminder_id`) REFERENCES `reminders` (`reminder_id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `objectives`
--
ALTER TABLE `objectives`
  ADD CONSTRAINT `objectives_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`user_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `objectives_ibfk_2` FOREIGN KEY (`objblo_id`) REFERENCES `objectivesblock` (`objblo_id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `objectivesblock`
--
ALTER TABLE `objectivesblock`
  ADD CONSTRAINT `objectivesblock_ibfk_1` FOREIGN KEY (`reminder_id`) REFERENCES `reminders` (`reminder_id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `permisions`
--
ALTER TABLE `permisions`
  ADD CONSTRAINT `permisions_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `pomodoros`
--
ALTER TABLE `pomodoros`
  ADD CONSTRAINT `pomodoros_ibfk_1` FOREIGN KEY (`tone_id`) REFERENCES `tones` (`tone_id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `puntuality`
--
ALTER TABLE `puntuality`
  ADD CONSTRAINT `puntuality_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `reminders`
--
ALTER TABLE `reminders`
  ADD CONSTRAINT `reminders_ibfk_1` FOREIGN KEY (`reminder_sourse_id`) REFERENCES `reminders` (`reminder_id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `remindershare`
--
ALTER TABLE `remindershare`
  ADD CONSTRAINT `remindershare_ibfk_1` FOREIGN KEY (`reminder_id`) REFERENCES `reminders` (`reminder_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `remindershare_ibfk_2` FOREIGN KEY (`rs_user_id_target`) REFERENCES `users` (`user_id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `sleepmode`
--
ALTER TABLE `sleepmode`
  ADD CONSTRAINT `sleepmode_ibfk_1` FOREIGN KEY (`tone_id`) REFERENCES `tones` (`tone_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `sleepmode_ibfk_2` FOREIGN KEY (`quality_id`) REFERENCES `sleepquality` (`quality_id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `timers`
--
ALTER TABLE `timers`
  ADD CONSTRAINT `timers_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `timers_ibfk_2` FOREIGN KEY (`tone_id`) REFERENCES `tones` (`tone_id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `usersblocked`
--
ALTER TABLE `usersblocked`
  ADD CONSTRAINT `usersblocked_ibfk_1` FOREIGN KEY (`user_id_sourse`) REFERENCES `users` (`user_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `usersblocked_ibfk_2` FOREIGN KEY (`user_id_target`) REFERENCES `users` (`user_id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `user_titles`
--
ALTER TABLE `user_titles`
  ADD CONSTRAINT `user_titles_ibfk_1` FOREIGN KEY (`title_id`) REFERENCES `titles` (`title_id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
