-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 30-07-2024 a las 22:40:00
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

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
  `alarm_image` text DEFAULT NULL,
  `alarm_desc` varchar(300) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `alarm_sourse_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Disparadores `alarms`
--
DELIMITER $$
CREATE TRIGGER `after_alarm_update` AFTER UPDATE ON `alarms` FOR EACH ROW BEGIN
    -- Update the existing cloned alarm for all users sharing the alarm
    UPDATE alarms
    SET alarm_name = NEW.alarm_name,
        daysel_id = NEW.daysel_id,
        alarm_hour = NEW.alarm_hour,
        alarm_min = NEW.alarm_min,
        alarm_sec = NEW.alarm_sec,
        alarm_rep_tone = NEW.alarm_rep_tone,
        tone_id = NEW.tone_id,
        alarm_days_suspended = NEW.alarm_days_suspended,
        alarm_active = NEW.alarm_active,
        alarm_image = NEW.alarm_image,
        alarm_desc = NEW.alarm_desc
    WHERE alarm_sourse_id = OLD.alarm_id;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `alarmshare`
--

CREATE TABLE `alarmshare` (
  `alarmsha_id` int(11) NOT NULL,
  `ar_user_id_target` int(11) DEFAULT NULL,
  `alarm_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Disparadores `alarmshare`
--
DELIMITER $$
CREATE TRIGGER `after_alarmshare_delete` AFTER DELETE ON `alarmshare` FOR EACH ROW BEGIN
    -- Delete the cloned alarm
    DELETE FROM alarm
    WHERE user_id = OLD.ar_user_id_target AND alarm_id = OLD.alarm_id;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `after_alarmshare_insert` AFTER INSERT ON `alarmshare` FOR EACH ROW BEGIN
    DECLARE new_alarm_id INT;

    -- Clone the alarm
    INSERT INTO alarm (alarm_name, daysel_id, alarm_hour, alarm_min, alarm_sec, alarm_rep_tone, tone_id, alarm_days_suspended, alarm_active, alarm_image, alarm_desc, user_id)
    SELECT alarm_name, daysel_id, alarm_hour, alarm_min, alarm_sec, alarm_rep_tone, tone_id, alarm_days_suspended, alarm_active, alarm_image, alarm_desc, NEW.ar_user_id_target
    FROM alarm
    WHERE alarm_id = NEW.alarm_id;

    SET new_alarm_id = LAST_INSERT_ID();
END
$$
DELIMITER ;

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

--
-- Volcado de datos para la tabla `dayselected`
--

INSERT INTO `dayselected` (`daysel_id`, `daysel_mon`, `daysel_tues`, `daysel_wed`, `daysel_thur`, `daysel_fri`, `daysel_sat`, `daysel_sun`) VALUES
(1, 0, 0, 0, 0, 0, 0, 0),
(2, 0, 0, 0, 1, 0, 1, 1),
(3, 1, 1, 1, 1, 0, 0, 1),
(4, 0, 1, 1, 1, 1, 1, 0),
(5, 0, 1, 1, 0, 1, 1, 1),
(6, 1, 0, 0, 0, 1, 0, 1),
(7, 0, 1, 1, 1, 0, 0, 1),
(8, 0, 1, 1, 1, 0, 1, 0),
(9, 1, 1, 1, 1, 0, 1, 0),
(10, 0, 0, 1, 0, 0, 0, 0),
(11, 1, 1, 0, 0, 0, 1, 0),
(12, 0, 0, 1, 0, 0, 1, 1),
(13, 1, 1, 1, 0, 1, 1, 1),
(14, 0, 1, 1, 0, 0, 1, 0),
(15, 1, 1, 1, 0, 1, 0, 0),
(16, 1, 1, 0, 0, 0, 1, 0),
(17, 0, 1, 0, 1, 1, 0, 1),
(18, 0, 1, 0, 1, 0, 1, 0),
(19, 0, 0, 0, 1, 1, 1, 1),
(20, 1, 0, 1, 1, 0, 1, 1),
(21, 1, 1, 0, 0, 0, 1, 1),
(22, 1, 1, 1, 0, 0, 1, 0),
(23, 0, 1, 0, 1, 0, 1, 1),
(24, 1, 1, 1, 0, 1, 1, 0),
(25, 1, 0, 0, 1, 0, 0, 0),
(26, 0, 0, 0, 0, 0, 0, 0),
(27, 0, 0, 0, 1, 0, 1, 0),
(28, 1, 0, 0, 0, 1, 0, 0),
(29, 1, 0, 1, 1, 0, 1, 0),
(30, 0, 1, 0, 0, 0, 1, 1),
(31, 1, 0, 1, 1, 1, 1, 1),
(32, 0, 0, 1, 0, 1, 1, 1),
(33, 0, 0, 1, 1, 0, 0, 0),
(34, 1, 0, 1, 1, 1, 0, 0),
(35, 1, 1, 1, 0, 1, 1, 0),
(36, 0, 0, 1, 0, 0, 0, 1),
(37, 1, 0, 1, 1, 0, 0, 0),
(38, 1, 0, 1, 1, 1, 1, 0),
(39, 0, 1, 1, 0, 0, 1, 0),
(40, 0, 1, 1, 1, 0, 1, 1),
(41, 1, 0, 0, 1, 0, 1, 1),
(42, 1, 1, 1, 1, 0, 1, 1),
(43, 1, 0, 0, 1, 0, 1, 0),
(44, 1, 0, 0, 0, 0, 1, 1),
(45, 0, 1, 0, 0, 0, 1, 1),
(46, 1, 1, 1, 1, 1, 1, 1),
(47, 0, 0, 0, 1, 0, 1, 0),
(48, 0, 1, 0, 0, 1, 0, 1),
(49, 1, 0, 1, 0, 1, 0, 0),
(50, 0, 1, 1, 0, 0, 1, 0),
(51, NULL, NULL, NULL, NULL, NULL, NULL, NULL);

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

--
-- Volcado de datos para la tabla `invitations`
--

INSERT INTO `invitations` (`inv_id`, `reminder_id`, `alarm_id`, `user_id_owner`, `user_id_target`, `inv_state`, `inv_reason`) VALUES
(36, 55, NULL, 53, 54, 0, NULL);

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

--
-- Volcado de datos para la tabla `locations`
--

INSERT INTO `locations` (`location_id`, `location_x`, `location_y`, `location_type`, `reminder_id`) VALUES
(51, 20.66431670844856, -103.34775732439383, 0, 52),
(52, 20.6848759, -103.3801491, NULL, 52),
(53, 20.678610981592048, -103.36783922252353, 0, 55),
(54, 20.6848696, -103.3801785, NULL, 55);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `notifications`
--

CREATE TABLE `notifications` (
  `notification_id` int(11) NOT NULL,
  `notification_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `notification_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `notification_type` tinyint(4) NOT NULL DEFAULT 0,
  `user_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `objectives`
--

CREATE TABLE `objectives` (
  `obj_id` int(11) NOT NULL,
  `obj_name` varchar(30) DEFAULT NULL,
  `obj_check` tinyint(1) DEFAULT NULL,
  `obj_at_time` tinyint(1) DEFAULT NULL,
  `id_user` int(11) DEFAULT NULL,
  `objblo_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `objectives`
--

INSERT INTO `objectives` (`obj_id`, `obj_name`, `obj_check`, `obj_at_time`, `id_user`, `objblo_id`) VALUES
(51, 'Tarea 1', NULL, NULL, 53, 51),
(52, 'Tarea 2', NULL, NULL, 53, 51),
(53, 'Tarea 3', NULL, NULL, 53, 51),
(54, 'Bailar ', NULL, NULL, 53, 52),
(55, 'Barrer', NULL, NULL, 53, 52),
(56, 'Limpiar', NULL, NULL, 53, 52),
(57, 'Estrenar', NULL, NULL, 53, 52),
(58, 'echarle cal', NULL, NULL, 53, 53),
(59, 'fumar ', NULL, NULL, 53, 53),
(60, 'hacerse wey', NULL, NULL, 53, 54),
(61, 'Tarea 1', NULL, NULL, 54, 55),
(62, 'Tarea 2', NULL, NULL, 54, 55),
(63, 'Tarea 3', NULL, NULL, 54, 55),
(64, 'Bailar ', NULL, NULL, 54, 56),
(65, 'Barrer', NULL, NULL, 54, 56),
(66, 'Limpiar', NULL, NULL, 54, 56),
(67, 'Estrenar', NULL, NULL, 54, 56);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `objectivesblock`
--

CREATE TABLE `objectivesblock` (
  `objblo_id` int(11) NOT NULL,
  `reminder_id` int(11) DEFAULT NULL,
  `objblo_name` varchar(25) DEFAULT NULL,
  `objblo_check` int(11) DEFAULT NULL,
  `objblo_duration_min` int(11) DEFAULT 5,
  `objblo_durationreal_min` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `objectivesblock`
--

INSERT INTO `objectivesblock` (`objblo_id`, `reminder_id`, `objblo_name`, `objblo_check`, `objblo_duration_min`, `objblo_durationreal_min`) VALUES
(51, 52, 'Bloque 1', 1, 6, 0),
(52, 52, 'Bloq 2', 1, 6, 0),
(53, 55, 'Tarea 1', 0, 6, 0),
(54, 55, 'Tarea 2', 0, 10, 0),
(55, 57, 'Bloque 1', 1, 6, 0),
(56, 57, 'Bloq 2', 1, 6, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `permisions`
--

CREATE TABLE `permisions` (
  `permision_id` int(11) NOT NULL,
  `permision_active` tinyint(1) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `permisions`
--

INSERT INTO `permisions` (`permision_id`, `permision_active`, `user_id`) VALUES
(51, 1, 53);

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

--
-- Volcado de datos para la tabla `pomodoros`
--

INSERT INTO `pomodoros` (`pomodoro_id`, `tpomodoro_hour_work`, `pomodoro_min_work`, `pomodoro_shortrest`, `pomodoro_longrest`, `tone_id`) VALUES
(1, 4, 12, 47, 49, 1),
(2, 6, 28, 1, -2, 2),
(3, 1, 22, 8, 5, 3),
(4, 4, 49, 28, 30, 4),
(5, 2, 52, 34, 36, 5),
(6, 4, 29, 45, 47, 6),
(7, 3, 51, 31, 28, 7),
(8, 3, 31, 9, 6, 8),
(9, 1, 19, 49, 51, 9),
(10, 4, 40, 55, 57, 10),
(11, 8, 41, 24, 21, 11),
(12, 7, 17, 53, 55, 12),
(13, 6, 11, 39, 36, 13),
(14, 8, 3, 38, 40, 14),
(15, 7, 37, 16, 18, 15),
(16, 5, 17, 29, 31, 16),
(17, 5, 8, 51, 53, 17),
(18, 7, 12, 24, 26, 18),
(19, 7, 39, 30, 32, 19),
(20, 2, 17, 25, 27, 20),
(21, 6, 11, 34, 31, 21),
(22, 6, 2, 37, 34, 22),
(23, 1, 17, 11, 8, 23),
(24, 4, 13, 11, 8, 24),
(25, 8, 10, 49, 51, 25),
(26, 6, 1, 51, 53, 26),
(27, 7, 26, 27, 29, 27),
(28, 5, 52, 32, 34, 28),
(29, 5, 13, 4, 1, 29),
(30, 8, 2, 4, 1, 30),
(31, 8, 29, 43, 45, 31),
(32, 6, 29, 5, 2, 32),
(33, 2, 34, 37, 39, 33),
(34, 6, 17, 3, 0, 34),
(35, 7, 55, 45, 47, 35),
(36, 5, 16, 41, 38, 36),
(37, 5, 7, 43, 45, 37),
(38, 5, 27, 22, 19, 38),
(39, 8, 54, 48, 50, 39),
(40, 3, 47, 15, 12, 40),
(41, 8, 14, 19, 21, 41),
(42, 1, 50, 31, 28, 42),
(43, 4, 10, 31, 28, 43),
(44, 1, 29, 40, 37, 44),
(45, 4, 57, 24, 21, 45),
(46, 1, 32, 11, 8, 46),
(47, 6, 40, 7, 4, 47),
(48, 2, 51, 37, 39, 48),
(49, 4, 44, 48, 50, 49),
(50, 5, 38, 53, 55, 50);

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

--
-- Volcado de datos para la tabla `puntuality`
--

INSERT INTO `puntuality` (`punt_id`, `user_id`, `punt_date`, `punt_value`, `punt_num_rem`, `punt_percent_rem`, `punt_num_alar`, `punt_percent_alar`, `punt_num_timer`, `punt_percent_timer`, `punt_num_chro`, `punt_percent_chro`) VALUES
(784, 53, '2024-07-25', 0, 0, 0, 0, 0, 0, 0, 0, 0),
(785, 54, '2024-07-25', 0, 0, 0, 0, 0, 0, 0, 0, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reminders`
--

CREATE TABLE `reminders` (
  `reminder_id` int(11) NOT NULL,
  `reminder_name` varchar(30) DEFAULT NULL,
  `reminder_create` timestamp NOT NULL DEFAULT current_timestamp(),
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
  `reminder_sourse_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `tone_id` int(11) DEFAULT NULL,
  `reminder_travel_time` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `reminders`
--

INSERT INTO `reminders` (`reminder_id`, `reminder_name`, `reminder_create`, `reminder_date`, `reminder_hour`, `reminder_min`, `reminder_active`, `repdays_id`, `reminder_tone_duration_sec`, `reminder_advance_min`, `reminder_img`, `reminder_desc`, `reminder_days_suspended`, `reminder_share`, `reminder_sourse_id`, `user_id`, `tone_id`, `reminder_travel_time`) VALUES
(52, 'Viajesito', '2024-07-23 06:00:00', '2024-08-05 00:00:00', 16, 0, 1, NULL, 15, 1, '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', 'Viajesito', 1, 0, NULL, 53, 51, 1230),
(55, 'test40', '2024-07-22 06:00:00', '2024-07-30 00:00:00', 4, 0, 1, NULL, 10, NULL, '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', 'Recordatorio', 1, 0, NULL, 53, 52, 445),
(57, 'Viajesito', '2024-07-29 22:42:19', '2024-07-29 00:00:00', 16, 0, 1, NULL, 15, 1, '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', 'Viajesito', 1, 0, NULL, 54, 51, 1230);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `remindershare`
--

CREATE TABLE `remindershare` (
  `remindsha_id` int(11) NOT NULL,
  `rs_user_id_target` int(11) DEFAULT NULL,
  `reminder_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `remindershare`
--

INSERT INTO `remindershare` (`remindsha_id`, `rs_user_id_target`, `reminder_id`) VALUES
(55, 54, 52);

--
-- Disparadores `remindershare`
--
DELIMITER $$
CREATE TRIGGER `after_remindershare_delete` AFTER DELETE ON `remindershare` FOR EACH ROW BEGIN
    -- Delete the cloned reminder and its associated data
    DELETE    FROM reminders 
    WHERE reminders.user_id = OLD.rs_user_id_target AND reminders.reminder_sourse_id = OLD.reminder_id;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `after_remindershare_insert` AFTER INSERT ON `remindershare` FOR EACH ROW BEGIN
    DECLARE done INT DEFAULT 0;
    DECLARE old_objblo_id INT;
    DECLARE new_reminder_id INT;
    DECLARE new_objblo_id INT;
    
    -- Declare a cursor to iterate over the objectives blocks
    DECLARE objblo_cursor CURSOR FOR
    SELECT objblo_id FROM objectivesblock WHERE reminder_id = NEW.reminder_id;

    -- Declare a handler for the cursor
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = 1;

    -- Clone the reminder
    INSERT INTO reminders (reminder_name, reminder_create, reminder_date, reminder_hour, reminder_min, reminder_active, repdays_id, reminder_tone_duration_sec, reminder_advance_min, reminder_img, reminder_desc, reminder_days_suspended, reminder_share, reminder_sourse_id, user_id, tone_id, reminder_travel_time)
    SELECT reminder_name, reminder_create, reminder_date, reminder_hour, reminder_min, reminder_active, repdays_id, reminder_tone_duration_sec, reminder_advance_min, reminder_img, reminder_desc, reminder_days_suspended, reminder_share, NEW.reminder_id, NEW.rs_user_id_target, tone_id, reminder_travel_time
    FROM reminders
    WHERE reminder_id = NEW.reminder_id;

    SET new_reminder_id = LAST_INSERT_ID();

    -- Open the cursor
    OPEN objblo_cursor;

    -- Loop through each objectives block
    objblo_loop: LOOP
        FETCH objblo_cursor INTO old_objblo_id;
        IF done THEN
            LEAVE objblo_loop;
        END IF;

        -- Clone the objectives block
        INSERT INTO objectivesblock (reminder_id, objblo_name, objblo_check, objblo_duration_min, objblo_durationreal_min)
        SELECT new_reminder_id, objblo_name, objblo_check, objblo_duration_min, objblo_durationreal_min
        FROM objectivesblock
        WHERE objblo_id = old_objblo_id;

        SET new_objblo_id = LAST_INSERT_ID();

        -- Clone the objectives for the current objectives block
        INSERT INTO objectives (obj_name, obj_check, obj_at_time, id_user, objblo_id)
        SELECT obj_name, obj_check, obj_at_time, NEW.rs_user_id_target, new_objblo_id
        FROM objectives
        WHERE objblo_id = old_objblo_id;

    END LOOP objblo_loop;

    -- Close the cursor
    CLOSE objblo_cursor;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `repetitiondays`
--

CREATE TABLE `repetitiondays` (
  `repdays_id` int(11) NOT NULL,
  `repday_date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `repetitiondays`
--

INSERT INTO `repetitiondays` (`repdays_id`, `repday_date`) VALUES
(1, '0000-00-00 00:00:00'),
(2, '2025-12-06 04:28:03'),
(3, '2025-07-14 18:48:37'),
(4, '2025-04-18 14:32:28'),
(5, '2025-06-25 20:38:23'),
(6, '2024-09-02 06:54:43'),
(7, '2025-03-05 04:24:04'),
(8, '2025-07-03 09:10:40'),
(9, '2025-11-06 14:17:40'),
(10, '2025-05-27 05:37:38'),
(11, '2025-02-24 04:53:05'),
(12, '2024-11-12 14:33:37'),
(13, '2025-05-26 00:53:36'),
(14, '2024-08-15 20:21:52'),
(15, '2025-12-10 15:29:13'),
(16, '2024-09-25 08:18:42'),
(17, '2024-07-21 23:15:52'),
(18, '2025-01-20 08:19:29'),
(19, '2024-12-22 21:09:12'),
(20, '2025-12-26 18:37:40'),
(21, '2024-11-12 02:04:41'),
(22, '2025-03-11 05:39:42'),
(23, '2025-01-31 01:35:46'),
(24, '2025-02-09 08:09:39'),
(25, '2025-04-22 22:50:49'),
(26, '2025-08-19 21:07:15'),
(27, '2024-12-14 18:55:06'),
(28, '2025-12-02 02:14:19'),
(29, '2024-08-17 20:48:31'),
(30, '2025-03-15 21:01:14'),
(31, '2024-07-28 12:36:35'),
(32, '2025-03-02 10:25:27'),
(33, '2024-08-26 07:32:53'),
(34, '2025-03-20 21:18:08'),
(35, '2024-09-04 18:47:03'),
(36, '2024-07-30 14:47:53'),
(37, '2025-09-18 11:35:42'),
(38, '2025-04-23 02:46:00'),
(39, '2025-09-08 06:04:55'),
(40, '2024-12-13 22:12:53'),
(41, '2025-07-27 19:52:47'),
(42, '2025-07-17 09:04:53'),
(43, '2025-07-12 11:19:46'),
(44, '2024-10-22 12:06:33'),
(45, '2024-09-27 12:32:03'),
(46, '2024-10-23 05:36:24'),
(47, '2025-09-21 21:38:04'),
(48, '2025-12-01 14:54:42'),
(49, '2024-12-11 00:43:27'),
(50, '2025-01-06 15:50:05');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `schedules`
--

CREATE TABLE `schedules` (
  `schedule_id` int(11) NOT NULL,
  `schedule_eventname` varchar(50) DEFAULT NULL,
  `schedule_datetime` datetime DEFAULT NULL,
  `schedule_duration_hour` tinyint(4) DEFAULT NULL,
  `schedule_duration_min` tinyint(4) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `schedules`
--

INSERT INTO `schedules` (`schedule_id`, `schedule_eventname`, `schedule_datetime`, `schedule_duration_hour`, `schedule_duration_min`, `user_id`) VALUES
(1, 'schedule_eventname', '0000-00-00 00:00:00', 0, 0, NULL),
(2, 'Project Status Update Meeting', '2025-02-05 06:05:10', 7, 52, NULL),
(3, 'Job Fair Recruitment Event', '2025-11-26 14:11:00', 1, 23, NULL),
(4, 'Company Anniversary Celebration', '2025-03-03 22:31:21', 3, 46, NULL),
(5, 'Team Outing to Escape Room', '2025-04-18 07:15:13', 8, 52, NULL),
(6, 'Client Dinner', '2025-06-01 04:31:23', 4, 34, NULL),
(7, 'Coffee Chat with HR', '2025-12-17 23:08:13', 7, 14, NULL),
(8, 'Networking Lunch with Industry Professionals', '2025-08-28 14:44:23', 7, 25, NULL),
(9, 'Coffee Chat with CEO', '2025-09-10 00:28:54', 8, 44, NULL),
(10, 'Training Workshop on Diversity and Inclusion', '2025-04-02 05:30:25', 3, 38, NULL),
(11, 'Project Debrief Meeting', '2025-05-04 16:53:42', 7, 55, NULL),
(12, 'Training Workshop on Conflict Resolution', '2024-09-27 02:18:43', 1, 26, NULL),
(13, 'Monthly Review Meeting', '2025-03-29 07:06:27', 1, 17, NULL),
(14, 'Training Session on Sales Techniques', '2025-08-21 02:34:17', 3, 39, NULL),
(15, 'Monthly Review Meeting', '2025-06-21 11:17:37', 3, 33, NULL),
(16, 'Hackathon Event', '2025-03-30 19:32:07', 8, 36, NULL),
(17, 'Company Holiday Party', '2024-08-06 11:49:22', 7, 42, NULL),
(18, 'Team Outing to Escape Room', '2025-07-14 10:34:03', 3, 27, NULL),
(19, 'Coffee Break with New Hires', '2025-06-02 03:41:36', 3, 3, NULL),
(20, 'Panel Discussion on Innovation', '2024-11-04 07:43:00', 6, 48, NULL),
(21, 'Webinar on Sales Strategies', '2025-09-19 03:46:11', 1, 51, NULL),
(22, 'Networking Lunch with Industry Professionals', '2025-06-14 04:13:09', 7, 53, NULL),
(23, 'Team Retreat', '2025-03-17 16:45:26', 2, 47, NULL),
(24, 'Team Building Scavenger Hunt', '2025-06-30 13:42:33', 6, 15, NULL),
(25, 'Lunch with Colleague', '2025-09-03 07:05:37', 2, 38, NULL),
(26, 'Project Debrief Meeting', '2025-02-20 10:45:14', 4, 33, NULL),
(27, 'Training Session on Communication Skills', '2025-05-28 12:48:10', 6, 37, NULL),
(28, 'Monthly Review Meeting', '2025-11-01 21:10:54', 1, 19, NULL),
(29, 'Networking Breakfast with Business Partners', '2025-02-26 10:40:42', 1, 58, NULL),
(30, 'Presentation for Client X', '2025-02-09 06:50:43', 6, 33, NULL),
(31, 'Coffee Break with Interns', '2024-09-19 05:56:46', 2, 49, NULL),
(32, 'Company Town Hall Meeting', '2025-11-12 10:11:27', 3, 22, NULL),
(33, 'Monthly Review Meeting', '2024-10-21 02:17:57', 3, 45, NULL),
(34, 'Lunch and Learn Session', '2025-03-13 18:04:13', 2, 35, NULL),
(35, 'Panel Discussion on Innovation', '2024-12-31 03:42:23', 7, 14, NULL),
(36, 'Networking Event at Conference', '2024-09-02 00:14:47', 5, 45, NULL),
(37, 'Hackathon Competition', '2025-08-12 19:32:10', 1, 10, NULL),
(38, 'Networking Breakfast with Business Partners', '2024-11-02 08:29:07', 4, 21, NULL),
(39, 'Training Session on Sales Techniques', '2024-07-28 22:28:37', 1, 6, NULL),
(40, 'Team Retreat', '2025-05-05 01:10:17', 3, 51, NULL),
(41, 'Presentation for Client X', '2024-11-09 14:41:47', 2, 57, NULL),
(42, 'Happy Hour with Coworkers', '2025-01-14 20:46:52', 3, 14, NULL),
(43, 'Happy Hour Mixer', '2025-10-09 12:32:16', 4, 57, NULL),
(44, 'Lunch and Learn Session', '2025-04-18 09:26:50', 4, 40, NULL),
(45, 'Hackathon Competition', '2025-12-07 08:51:22', 5, 53, NULL),
(46, 'Client Dinner', '2025-06-07 03:40:25', 6, 5, NULL),
(47, 'Project Status Update Meeting', '2025-10-21 08:14:25', 1, 56, NULL),
(48, 'Panel Discussion on Innovation', '2024-07-25 15:58:01', 2, 29, NULL),
(49, 'Seminar on Leadership Skills', '2024-10-17 13:46:36', 7, 44, NULL),
(50, 'Team Outing to Escape Room', '2025-04-17 00:45:04', 8, 33, NULL),
(51, 'Viajesito', '2024-07-29 00:00:00', 16, 0, 53),
(52, 'test40', '2024-07-30 00:00:00', 4, 0, 53);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sleepmode`
--

CREATE TABLE `sleepmode` (
  `sleep_id` int(11) NOT NULL,
  `sleep_starthour` mediumint(9) DEFAULT NULL,
  `sleep_endhour` mediumint(9) DEFAULT NULL,
  `sleep_active` tinyint(1) DEFAULT NULL,
  `sleep_rep` tinyint(4) DEFAULT NULL,
  `sleep_video_url` text DEFAULT NULL,
  `sleep_rep_stopped` tinyint(4) DEFAULT NULL,
  `tone_id` int(11) DEFAULT NULL,
  `sleep_rep_incr` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `sleepmode`
--

INSERT INTO `sleepmode` (`sleep_id`, `sleep_starthour`, `sleep_endhour`, `sleep_active`, `sleep_rep`, `sleep_video_url`, `sleep_rep_stopped`, `tone_id`, `sleep_rep_incr`) VALUES
(54, 1021, 1439, 1, 2, '', NULL, NULL, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sleepquality`
--

CREATE TABLE `sleepquality` (
  `quality_id` int(11) NOT NULL,
  `quality_good` tinyint(1) DEFAULT NULL,
  `quality_medium` tinyint(1) DEFAULT NULL,
  `quiality_bad` tinyint(1) DEFAULT NULL,
  `quality_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `sleep_id` int(11) NOT NULL
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

--
-- Volcado de datos para la tabla `tones`
--

INSERT INTO `tones` (`tone_id`, `tone_name`, `tone_location`) VALUES
(1, 'tone_name', 'tone_file'),
(2, 'whoosh', 'tone_file_4.mp3'),
(3, 'thud', 'tone_file_4.mp3'),
(4, 'thud', 'tone_file_2.mp3'),
(5, 'chime', 'tone_file_5.mp3'),
(6, 'rumble', 'tone_file_4.mp3'),
(7, 'crackle', 'tone_file_4.mp3'),
(8, 'whisper', 'tone_file_4.mp3'),
(9, 'whoosh', 'tone_file_4.mp3'),
(10, 'hiss', 'tone_file_1.mp3'),
(11, 'hiss', 'tone_file_1.mp3'),
(12, 'whoosh', 'tone_file_2.mp3'),
(13, 'rumble', 'tone_file_1.mp3'),
(14, 'clang', 'tone_file_5.mp3'),
(15, 'hiss', 'tone_file_3.mp3'),
(16, 'chime', 'tone_file_1.mp3'),
(17, 'chime', 'tone_file_3.mp3'),
(18, 'chime', 'tone_file_5.mp3'),
(19, 'hiss', 'tone_file_4.mp3'),
(20, 'whoosh', 'tone_file_5.mp3'),
(21, 'ping', 'tone_file_1.mp3'),
(22, 'ping', 'tone_file_3.mp3'),
(23, 'buzz', 'tone_file_3.mp3'),
(24, 'rumble', 'tone_file_3.mp3'),
(25, 'buzz', 'tone_file_2.mp3'),
(26, 'whoosh', 'tone_file_5.mp3'),
(27, 'buzz', 'tone_file_3.mp3'),
(28, 'chime', 'tone_file_4.mp3'),
(29, 'ping', 'tone_file_2.mp3'),
(30, 'hiss', 'tone_file_5.mp3'),
(31, 'crackle', 'tone_file_2.mp3'),
(32, 'clang', 'tone_file_5.mp3'),
(33, 'rumble', 'tone_file_5.mp3'),
(34, 'clang', 'tone_file_1.mp3'),
(35, 'whoosh', 'tone_file_1.mp3'),
(36, 'whisper', 'tone_file_4.mp3'),
(37, 'ping', 'tone_file_3.mp3'),
(38, 'ping', 'tone_file_5.mp3'),
(39, 'chime', 'tone_file_2.mp3'),
(40, 'crackle', 'tone_file_5.mp3'),
(41, 'whisper', 'tone_file_1.mp3'),
(42, 'rumble', 'tone_file_3.mp3'),
(43, 'whisper', 'tone_file_5.mp3'),
(44, 'rumble', 'tone_file_5.mp3'),
(45, 'chime', 'tone_file_4.mp3'),
(46, 'buzz', 'tone_file_2.mp3'),
(47, 'buzz', 'tone_file_4.mp3'),
(48, 'rumble', 'tone_file_5.mp3'),
(49, 'whoosh', 'tone_file_4.mp3'),
(50, 'ping', 'tone_file_4.mp3');
INSERT INTO `tones` (`tone_id`, `tone_name`, `tone_location`) VALUES
(51, 'ascent-braam-magma-brass-d-cin', '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');
INSERT INTO `tones` (`tone_id`, `tone_name`, `tone_location`) VALUES
(52, 'ascent-braam-magma-brass-d-cin', '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');

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
(53, 'a20300701@ceti.mx', 'testuser41', '123', '3319191818', 1, 13),
(54, 'testsleep@gmail.com', 'testsleep', '123', '9919121212', 1, NULL);

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
(13, 1, 1),
(13, 2, 1),
(13, 3, 0),
(13, 4, 0),
(13, 5, 0),
(13, 6, 0),
(13, 7, 0),
(13, 8, 1),
(13, 9, 0),
(13, 10, 0),
(13, 11, 0),
(13, 12, 0),
(13, 13, 0),
(13, 14, 1),
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
(17, 14, 1),
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
(18, 16, 0),
(53, 1, 1),
(53, 2, 1),
(53, 3, 0),
(53, 4, 0),
(53, 5, 0),
(53, 6, 0),
(53, 7, 0),
(53, 8, 0),
(53, 9, 0),
(53, 10, 0),
(53, 11, 0),
(53, 12, 0),
(53, 13, 1),
(53, 14, 0),
(53, 15, 0),
(53, 16, 0),
(54, 1, 1),
(54, 2, 1),
(54, 3, 0),
(54, 4, 0),
(54, 5, 0),
(54, 6, 0),
(54, 7, 0),
(54, 8, 0),
(54, 9, 0),
(54, 10, 0),
(54, 11, 0),
(54, 12, 0),
(54, 13, 0),
(54, 14, 0),
(54, 15, 0),
(54, 16, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `weeklyscorecard`
--

CREATE TABLE `weeklyscorecard` (
  `weeklyscorecard_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `punt_weekly_date` timestamp NULL DEFAULT NULL,
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

--
-- Volcado de datos para la tabla `weeklyscorecard`
--

INSERT INTO `weeklyscorecard` (`weeklyscorecard_id`, `user_id`, `punt_weekly_date`, `punt_value`, `punt_num_rem`, `punt_percent_rem`, `punt_num_alar`, `punt_percent_alar`, `punt_num_timer`, `punt_percent_timer`, `punt_num_chro`, `punt_percent_chro`) VALUES
(18, 53, '2024-07-25 21:38:00', 10, 10, 10, 10, 10, 10, 10, 10, 10);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `alarms`
--
ALTER TABLE `alarms`
  ADD PRIMARY KEY (`alarm_id`),
  ADD KEY `tone_id` (`tone_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `alarms_ibfk_3` (`alarm_sourse_id`);

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
-- Indices de la tabla `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`notification_id`),
  ADD KEY `notification_user_user_id` (`user_id`);

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
  ADD KEY `reminder_sourse_id` (`reminder_sourse_id`),
  ADD KEY `reminder_ibfk_2` (`repdays_id`),
  ADD KEY `reminders_ibfk_3` (`user_id`),
  ADD KEY `reminders_ibfk_4` (`tone_id`);

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
  ADD PRIMARY KEY (`schedule_id`),
  ADD KEY `constraint_ibfk1_user` (`user_id`);

--
-- Indices de la tabla `sleepmode`
--
ALTER TABLE `sleepmode`
  ADD PRIMARY KEY (`sleep_id`),
  ADD KEY `tone_id` (`tone_id`),
  ADD KEY `sleep_id` (`sleep_id`);

--
-- Indices de la tabla `sleepquality`
--
ALTER TABLE `sleepquality`
  ADD PRIMARY KEY (`quality_id`),
  ADD KEY `sleep_id` (`sleep_id`);

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
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `title_id` (`title_id`) USING BTREE;

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
  ADD PRIMARY KEY (`user_id`,`title_id`) USING BTREE,
  ADD KEY `user_titles_ibfk_1` (`title_id`);

--
-- Indices de la tabla `weeklyscorecard`
--
ALTER TABLE `weeklyscorecard`
  ADD PRIMARY KEY (`weeklyscorecard_id`),
  ADD KEY `user_id` (`user_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `alarms`
--
ALTER TABLE `alarms`
  MODIFY `alarm_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT de la tabla `alarmshare`
--
ALTER TABLE `alarmshare`
  MODIFY `alarmsha_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT de la tabla `chronometers`
--
ALTER TABLE `chronometers`
  MODIFY `chrono_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;

--
-- AUTO_INCREMENT de la tabla `clocks`
--
ALTER TABLE `clocks`
  MODIFY `clock_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=97;

--
-- AUTO_INCREMENT de la tabla `dayselected`
--
ALTER TABLE `dayselected`
  MODIFY `daysel_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;

--
-- AUTO_INCREMENT de la tabla `invitations`
--
ALTER TABLE `invitations`
  MODIFY `inv_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT de la tabla `locations`
--
ALTER TABLE `locations`
  MODIFY `location_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=55;

--
-- AUTO_INCREMENT de la tabla `notifications`
--
ALTER TABLE `notifications`
  MODIFY `notification_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `objectives`
--
ALTER TABLE `objectives`
  MODIFY `obj_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=71;

--
-- AUTO_INCREMENT de la tabla `objectivesblock`
--
ALTER TABLE `objectivesblock`
  MODIFY `objblo_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=57;

--
-- AUTO_INCREMENT de la tabla `permisions`
--
ALTER TABLE `permisions`
  MODIFY `permision_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;

--
-- AUTO_INCREMENT de la tabla `pomodoros`
--
ALTER TABLE `pomodoros`
  MODIFY `pomodoro_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT de la tabla `puntuality`
--
ALTER TABLE `puntuality`
  MODIFY `punt_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=786;

--
-- AUTO_INCREMENT de la tabla `reminders`
--
ALTER TABLE `reminders`
  MODIFY `reminder_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=58;

--
-- AUTO_INCREMENT de la tabla `remindershare`
--
ALTER TABLE `remindershare`
  MODIFY `remindsha_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=56;

--
-- AUTO_INCREMENT de la tabla `repetitiondays`
--
ALTER TABLE `repetitiondays`
  MODIFY `repdays_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT de la tabla `schedules`
--
ALTER TABLE `schedules`
  MODIFY `schedule_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;

--
-- AUTO_INCREMENT de la tabla `sleepquality`
--
ALTER TABLE `sleepquality`
  MODIFY `quality_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;

--
-- AUTO_INCREMENT de la tabla `timers`
--
ALTER TABLE `timers`
  MODIFY `timer_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT de la tabla `titles`
--
ALTER TABLE `titles`
  MODIFY `title_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT de la tabla `tones`
--
ALTER TABLE `tones`
  MODIFY `tone_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=55;

--
-- AUTO_INCREMENT de la tabla `usersblocked`
--
ALTER TABLE `usersblocked`
  MODIFY `userblocked_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `weeklyscorecard`
--
ALTER TABLE `weeklyscorecard`
  MODIFY `weeklyscorecard_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `alarms`
--
ALTER TABLE `alarms`
  ADD CONSTRAINT `alarms_ibfk_1` FOREIGN KEY (`tone_id`) REFERENCES `tones` (`tone_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `alarms_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `alarms_ibfk_3` FOREIGN KEY (`alarm_sourse_id`) REFERENCES `alarms` (`alarm_id`) ON DELETE CASCADE ON UPDATE CASCADE;

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
-- Filtros para la tabla `notifications`
--
ALTER TABLE `notifications`
  ADD CONSTRAINT `notification_user_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `objectives`
--
ALTER TABLE `objectives`
  ADD CONSTRAINT `objectives_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `objectives_ibfk_2` FOREIGN KEY (`objblo_id`) REFERENCES `objectivesblock` (`objblo_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `objectivesblock`
--
ALTER TABLE `objectivesblock`
  ADD CONSTRAINT `objectivesblock_ibfk_1` FOREIGN KEY (`reminder_id`) REFERENCES `reminders` (`reminder_id`) ON DELETE CASCADE ON UPDATE CASCADE;

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
  ADD CONSTRAINT `reminder_ibfk_2` FOREIGN KEY (`repdays_id`) REFERENCES `repetitiondays` (`repdays_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `reminders_ibfk_1` FOREIGN KEY (`reminder_sourse_id`) REFERENCES `reminders` (`reminder_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `reminders_ibfk_3` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `reminders_ibfk_4` FOREIGN KEY (`tone_id`) REFERENCES `tones` (`tone_id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `remindershare`
--
ALTER TABLE `remindershare`
  ADD CONSTRAINT `remindershare_ibfk_1` FOREIGN KEY (`reminder_id`) REFERENCES `reminders` (`reminder_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `remindershare_ibfk_2` FOREIGN KEY (`rs_user_id_target`) REFERENCES `users` (`user_id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `schedules`
--
ALTER TABLE `schedules`
  ADD CONSTRAINT `constraint_ibfk1_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `sleepmode`
--
ALTER TABLE `sleepmode`
  ADD CONSTRAINT `sleepmode_ibfk_1` FOREIGN KEY (`tone_id`) REFERENCES `tones` (`tone_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `sleepmode_ibfk_3` FOREIGN KEY (`sleep_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `sleepquality`
--
ALTER TABLE `sleepquality`
  ADD CONSTRAINT `sleepquality_ibfk_1` FOREIGN KEY (`sleep_id`) REFERENCES `sleepmode` (`sleep_id`);

--
-- Filtros para la tabla `timers`
--
ALTER TABLE `timers`
  ADD CONSTRAINT `timers_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `timers_ibfk_2` FOREIGN KEY (`tone_id`) REFERENCES `tones` (`tone_id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`title_id`) REFERENCES `titles` (`title_id`);

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

--
-- Filtros para la tabla `weeklyscorecard`
--
ALTER TABLE `weeklyscorecard`
  ADD CONSTRAINT `weeklyscorecard_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE;

DELIMITER $$
--
-- Eventos
--
CREATE DEFINER=`root`@`localhost` EVENT `WeeklyScoreCard` ON SCHEDULE EVERY 1 WEEK STARTS '2024-07-28 18:00:00' ON COMPLETION PRESERVE ENABLE COMMENT 'Evento semanal, calcula el promedio de puntualidad' DO INSERT INTO `weeklyscorecard` (`user_id`, `punt_weekly_date`, `punt_value`, `punt_num_rem`, `punt_percent_rem`, `punt_num_alar`, `punt_percent_alar`, `punt_num_timer`, `punt_percent_timer`, `punt_num_chro`, `punt_percent_chro`)
    SELECT `user_id`, AVG(`punt_date`), AVG(`punt_value`), AVG(`punt_num_rem`), AVG(`punt_percent_rem`), AVG(`punt_num_alar`), AVG(`punt_percent_alar`), AVG(`punt_num_timer`), AVG(`punt_percent_timer`), AVG(`punt_num_chro`), AVG(`punt_percent_chro`)
    FROM `puntuality`
    WHERE (SELECT count(*) AS count FROM `puntuality` WHERE `punt_date` BETWEEN date_add(CURRENT_TIMESTAMP, INTERVAL -7 DAY) AND CURRENT_TIMESTAMP) > 0 AND `punt_date` BETWEEN date_add(CURRENT_TIMESTAMP, INTERVAL -7 DAY) AND CURRENT_TIMESTAMP
    GROUP BY `user_id`$$

CREATE DEFINER=`root`@`localhost` EVENT `DailyPuntuality` ON SCHEDULE EVERY 1 DAY STARTS '2024-07-26 00:00:00' ON COMPLETION PRESERVE ENABLE COMMENT 'Se genera entrada en puntualidad cada día a media noche' DO INSERT INTO `puntuality` (`user_id`, `punt_date`, `punt_value`, `punt_num_rem`, `punt_percent_rem`, `punt_num_alar`, `punt_percent_alar`, `punt_num_timer`, `punt_percent_timer`, `punt_num_chro`, `punt_percent_chro`) SELECT `user_id`, CURRENT_TIMESTAMP, 0, 0, 0, 0, 0, 0, 0, 0, 0 FROM `users`$$

CREATE DEFINER=`root`@`localhost` EVENT `ReminderCancel` ON SCHEDULE EVERY 1 MINUTE STARTS '2024-07-25 00:00:00' ON COMPLETION PRESERVE DISABLE COMMENT 'Cancela el recordatorio si supero el 80% de tiempo antes de verl' DO UPDATE `reminders` SET `reminder_active` = 0 WHERE ROUND(( DATEDIFF(`reminder_create`, `reminder_date`) / DATEDIFF(`reminder_create`, CURRENT_DATE) * 100 ),2) >= 80 AND `reminder_active` = 1$$

CREATE DEFINER=`root`@`localhost` EVENT `InvitationCancel` ON SCHEDULE EVERY 1 MINUTE STARTS '2024-07-01 14:21:57' ON COMPLETION PRESERVE ENABLE DO -- Update invitations associated with reminders that match the specified conditions
    UPDATE invitations
    SET inv_state = 0
    WHERE reminder_id IN (
        SELECT reminder_id
        FROM reminders
        WHERE reminder_active = 1
        AND DATEDIFF(reminder_date, reminder_create) > 0
        AND ROUND((DATEDIFF(CURRENT_DATE, reminder_create) / DATEDIFF(reminder_date, reminder_create) * 100), 2) >= 80
    )
    AND inv_state is NULL$$

DELIMITER ;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
