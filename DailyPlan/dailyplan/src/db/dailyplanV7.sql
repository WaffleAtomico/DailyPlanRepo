-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 11-07-2024 a las 20:37:09
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
  `user_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `alarms`
--

INSERT INTO `alarms` (`alarm_id`, `alarm_name`, `daysel_id`, `alarm_hour`, `alarm_min`, `alarm_sec`, `alarm_rep_tone`, `tone_id`, `alarm_days_suspended`, `alarm_active`, `alarm_image`, `alarm_desc`, `user_id`) VALUES
(1, 'Dusting', 1, 33, 55, 52, 'YXJlYQ==', 1, 4, 0, 'Zm9vIGltYWdlIGJhcg==', 'Intruder alarm activated in office F', 8),
(2, 'Call Mom', 2, 39, 13, 47, 'c2VjcmV0Zm9vZHM=', 2, 2, 0, 'bW9uZXkgaW1hZ2UgZm9yIGJhcg==', 'Gas leak alarm activated in lab I', 37),
(3, 'Pick Up Dry Cleaning', 3, 56, 11, 40, 'dG9uZXM=', 3, 2, 0, 'Zm9vIGltYWdlIGJhcg==', 'Power outage alarm detected in building H', 10),
(4, 'Pay Bills', 4, 37, 59, 4, 'bWVkaWE=', 4, 2, 0, 'bW9uZXkgaW1hZ2UgZm9yIGJhcg==', 'Gas leak alarm activated in lab I', 20),
(5, 'Call Grandma', 5, 34, 35, 58, 'c2VjcmV0Zm9vZHM=', 5, 1, 1, 'Zm9vIGltYWdlIGJhcg==', 'Security breach detected in area B', 24),
(6, 'Babysit Niece', 6, 10, 55, 17, 'YXJlYXN0', 6, 4, 0, 'dGVzdCBpbWFnZSBiYXI=', 'Fire alarm activated in building A', 3),
(7, 'Movie Night', 7, 55, 37, 51, 'dG9uZXM=', 7, 5, 1, 'aW1hZ2UgYmFyIGZvbw==', 'Water leak alarm activated in room E', 8),
(8, 'Water Plants', 8, 41, 36, 4, 'bWVkaWFyZWE=', 8, 2, 1, 'dGVzdCBpbWFnZSBiYXI=', 'Emergency exit alarm activated in store J', 3),
(9, 'Study Session', 9, 50, 26, 32, 'c2VjcmV0Zm9vZHM=', 9, 4, 1, 'Zm9vIGltYWdlIGJhcg==', 'Motion sensor alarm triggered in warehouse D', 49),
(10, 'Water Plants', 10, 19, 15, 44, 'c2VjcmV0YXJlYXN0', 10, 3, 1, 'c2FtcGxlIGltYWdlIGJhcjE=', 'Carbon monoxide alarm triggered in facility C', 12),
(11, 'Workout Time', 11, 21, 21, 29, 'c2VjcmV0YXJlYXN0', 11, 2, 0, 'c2FtcGxlIGltYWdlIGJhcjE=', 'Temperature alarm triggered in server room G', 49),
(12, 'Dinner Time', 12, 43, 27, 24, 'c2VjcmV0Zm9vZHM=', 12, 5, 0, 'Zm9vIGltYWdlIGJhcg==', 'Fire alarm activated in building A', 26),
(13, 'Self-care Time', 13, 38, 19, 37, 'YXJlYQ==', 13, 1, 0, 'Zm9vIGltYWdlIGJhcg==', 'Power outage alarm detected in building H', 9),
(14, 'Massage Appointment', 14, 21, 59, 47, 'bWVkaWE=', 14, 6, 1, 'Zm9vIGltYWdlIGJhcg==', 'Security breach detected in area B', 22),
(15, 'Massage Appointment', 15, 1, 37, 28, 'c2VjcmV0Zm9vZHM=', 15, 3, 0, 'bW9uZXkgaW1hZ2UgZm9yIGJhcg==', 'Gas leak alarm activated in lab I', 37),
(16, 'Organize Closet', 16, 30, 12, 51, 'c2VjcmV0YXJlYQ==', 16, 2, 1, 'bW9uZXkgaW1hZ2UgZm9yIGJhcg==', 'Emergency exit alarm activated in store J', 35),
(17, 'Call Mom', 17, 56, 39, 39, 'YXJlYQ==', 17, 6, 1, 'bW9uZXkgaW1hZ2UgZm9yIGJhcg==', 'Gas leak alarm activated in lab I', 30),
(18, 'Donate Clothes', 18, 22, 17, 4, 'bWVkaWE=', 18, 5, 0, 'Zm9vIGltYWdlIGJhcg==', 'Temperature alarm triggered in server room G', 43),
(19, 'Cat Feeding', 19, 25, 12, 39, 'c2VjcmV0YXJlYXN0', 19, 2, 1, 'c2FtcGxlIGltYWdlIGJhcg==', 'Carbon monoxide alarm triggered in facility C', 38),
(20, 'Recycling Day', 20, 28, 57, 19, 'c2VjcmV0YXJlYXN0', 20, 3, 1, 'aW1hZ2UgMTIzNDU2Nzg5', 'Fire alarm activated in building A', 47),
(21, 'Call Dad', 21, 5, 45, 19, 'YXJlYQ==', 21, 1, 1, 'bW9uZXkgaW1hZ2UgZm9yIGJhcg==', 'Carbon monoxide alarm triggered in facility C', 31),
(22, 'Coffee Break', 22, 22, 3, 23, 'c2VjcmV0bWVkaWFyZWE=', 22, 5, 1, 'aW1hZ2UgYmFyIGZvbw==', 'Intruder alarm activated in office F', 44),
(23, 'Babysit Niece', 23, 1, 29, 17, 'bWVkaWFyZWE=', 23, 5, 0, 'cGFyYWdvbGQgaW1hZ2UgYmFy', 'Water leak alarm activated in room E', 11),
(24, 'Lunch Break', 24, 15, 9, 30, 'c2VjcmV0', 24, 6, 1, 'dGVzdCBpbWFnZSBiYXI=', 'Carbon monoxide alarm triggered in facility C', 34),
(25, 'Vacuuming', 25, 12, 56, 2, 'dG9uZXM=', 25, 4, 0, 'Zm9vIGltYWdlIGJhcg==', 'Carbon monoxide alarm triggered in facility C', 6),
(26, 'Call Friend', 26, 35, 57, 13, 'c2VjcmV0YXJlYXN0', 26, 2, 0, 'aW1hZ2UgYmFyIGZvbw==', 'Temperature alarm triggered in server room G', 15),
(27, 'Call Dad', 27, 28, 58, 16, 'YXJlYQ==', 27, 1, 1, 'bW9uZXkgaW1hZ2UgZm9yIGJhcg==', 'Emergency exit alarm activated in store J', 6),
(28, 'Nature Walk', 28, 31, 34, 35, 'c2VjcmV0YXJlYXN0', 28, 5, 1, 'YmFyIGltYWdlIGJhcg==', 'Emergency exit alarm activated in store J', 22),
(29, 'Write in Journal', 29, 37, 11, 13, 'YXJlYXN0', 29, 2, 1, 'Zm9vIGltYWdlIGJhcg==', 'Fire alarm activated in building A', 13),
(30, 'Bedtime', 30, 12, 46, 38, 'c2VjcmV0bWVkaWFyZWE=', 30, 2, 1, 'YmFyIGltYWdlIGJhcg==', 'Fire alarm activated in building A', 18),
(31, 'Game Night', 31, 22, 6, 47, 'c2VjcmV0YXJlYXN0', 31, 1, 0, 'aW1hZ2UgMTIzNDU2Nzg5', 'Carbon monoxide alarm triggered in facility C', 11),
(32, 'Dog Walking', 32, 28, 10, 12, 'YXJlYQ==', 32, 5, 0, 'bW9uZXkgaW1hZ2UgZm9yIGJhcg==', 'Intruder alarm activated in office F', 38),
(33, 'Dusting', 33, 20, 39, 23, 'c2VjcmV0bWVkaWFyZWE=', 33, 5, 1, 'Zm9vIGltYWdlIGJhcg==', 'Motion sensor alarm triggered in warehouse D', 38),
(34, 'Call Mom', 34, 41, 58, 50, 'c2VjcmV0', 34, 5, 0, 'bW9uZXkgaW1hZ2UgZm9yIGJhcg==', 'Carbon monoxide alarm triggered in facility C', 5),
(35, 'Meditation Session', 35, 49, 10, 43, 'c2VjcmV0bWVkaWFyZWE=', 35, 2, 0, 'c2FtcGxlIGltYWdlIGJhcg==', 'Security breach detected in area B', 48),
(36, 'Self-care Time', 36, 4, 55, 21, 'c2VjcmV0Zm9vZHM=', 36, 4, 1, 'aW1hZ2UgMTIzNDU2Nzg5', 'Emergency exit alarm activated in store J', 29),
(37, 'Yoga Session', 37, 21, 53, 57, 'c2VjcmV0YXJlYXN0', 37, 2, 0, 'aW1hZ2UgYmFyIGZvbw==', 'Gas leak alarm activated in lab I', 48),
(38, 'Nature Walk', 38, 6, 30, 26, 'YXJlYXN0', 38, 3, 0, 'aW1hZ2UgMTIzNDU2Nzg5', 'Gas leak alarm activated in lab I', 18),
(39, 'Piano Practice', 39, 11, 12, 18, 'c2VjcmV0YXJlYQ==', 39, 6, 0, 'c2FtcGxlIGltYWdlIGJhcg==', 'Carbon monoxide alarm triggered in facility C', 19),
(40, 'Massage Appointment', 40, 20, 22, 37, 'c2VjcmV0Zm9vZHM=', 40, 6, 0, 'cGFyYWdvbGQgaW1hZ2UgYmFy', 'Carbon monoxide alarm triggered in facility C', 35),
(41, 'Meeting Reminder', 41, 24, 33, 44, 'c2VjcmV0Zm9vZHM=', 41, 1, 1, 'YmFyIGltYWdlIGJhcg==', 'Fire alarm activated in building A', 41),
(42, 'Meditation Session', 42, 37, 31, 44, 'c2VjcmV0', 42, 6, 0, 'c2FtcGxlIGltYWdlIGJhcg==', 'Intruder alarm activated in office F', 14),
(43, 'Dinner Time', 43, 14, 27, 6, 'c2VjcmV0YXJlYQ==', 43, 2, 0, 'c2FtcGxlIGltYWdlIGJhcg==', 'Motion sensor alarm triggered in warehouse D', 3),
(44, 'Piano Practice', 44, 45, 33, 9, 'YXJlYQ==', 44, 6, 1, 'cGFyYWdvbGQgaW1hZ2UgYmFy', 'Intruder alarm activated in office F', 47),
(45, 'Vacuuming', 45, 28, 48, 25, 'c2VjcmV0YXJlYQ==', 45, 2, 0, 'c2FtcGxlIGltYWdlIGJhcg==', 'Carbon monoxide alarm triggered in facility C', 45),
(46, 'Meeting Reminder', 46, 16, 55, 26, 'YXJlYXN0', 46, 6, 1, 'c2FtcGxlIGltYWdlIGJhcg==', 'Motion sensor alarm triggered in warehouse D', 31),
(47, 'Clean House', 47, 15, 34, 21, 'c2VjcmV0bWVkaWFyZWE=', 47, 5, 1, 'aW1hZ2UgMTIzNDU2Nzg5', 'Fire alarm activated in building A', 41),
(48, 'Organize Closet', 48, 59, 5, 37, 'bWVkaWE=', 48, 1, 0, 'c2FtcGxlIGltYWdlIGJhcjE=', 'Gas leak alarm activated in lab I', 23),
(49, 'Clean House', 49, 42, 17, 54, 'c2VjcmV0bWVkaWFyZWE=', 49, 5, 1, 'aW1hZ2UgYmFyIGZvbw==', 'Temperature alarm triggered in server room G', 10),
(50, 'Manicure Appointment', 50, 43, 45, 53, 'c2VjcmV0bWVkaWFyZWE=', 50, 1, 1, 'c2FtcGxlIGltYWdlIGJhcjE=', 'Water leak alarm activated in room E', 10);

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
-- Volcado de datos para la tabla `alarmshare`
--

INSERT INTO `alarmshare` (`alarmsha_id`, `ar_user_id_target`, `alarm_id`) VALUES
(1, 23, 8),
(2, 22, 22),
(3, 42, 47),
(4, 34, 45),
(5, 13, 11),
(6, 1, 43),
(7, 19, 10),
(8, 24, 14),
(9, 28, 30),
(10, 18, 20),
(11, 22, 4),
(12, 28, 4),
(13, 21, 33),
(14, 48, 37),
(15, 21, 37),
(16, 31, 47),
(17, 26, 33),
(18, 31, 42),
(19, 33, 45),
(20, 16, 28),
(21, 25, 36),
(22, 23, 46),
(23, 45, 49),
(24, 45, 22),
(25, 30, 41),
(26, 29, 12),
(27, 42, 32),
(28, 27, 40),
(29, 2, 46),
(30, 9, 27),
(31, 43, 25),
(32, 40, 2),
(33, 27, 32),
(34, 35, 1),
(35, 24, 26),
(36, 41, 2),
(37, 32, 33),
(38, 45, 24),
(39, 27, 44),
(40, 43, 15),
(41, 25, 48),
(42, 44, 25),
(43, 24, 39),
(44, 24, 24),
(45, 22, 40),
(46, 1, 4),
(47, 32, 49),
(48, 40, 47),
(49, 24, 12),
(50, 37, 20);

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

--
-- Volcado de datos para la tabla `chronometers`
--

INSERT INTO `chronometers` (`chrono_id`, `chrono_name`, `chrono_hour`, `chrono_min`, `chrono_sec`, `user_id`) VALUES
(1, 'Quebec', 5, 55, 31, 6),
(2, 'Quartz', 17, 30, 3, 7),
(3, 'Zulu', 51, 19, 57, 25),
(4, 'India', 58, 9, 42, 45),
(5, 'Whiskey', 9, 22, 47, 2),
(6, 'Oscar', 50, 1, 59, 17),
(7, 'Glimmer', 32, 20, 18, 33),
(8, 'Charlie', 55, 20, 13, 42),
(9, 'Quebec', 28, 22, 15, 6),
(10, 'Pulse', 58, 4, 55, 9),
(11, 'Mike', 56, 22, 33, 13),
(12, 'Aurora', 22, 17, 10, 34),
(13, 'Quebec', 7, 12, 54, 3),
(14, 'Nova', 50, 44, 15, 49),
(15, 'Ignite', 1, 15, 15, 19),
(16, 'Bravo', 10, 57, 38, 6),
(17, 'Zulu', 1, 24, 57, 7),
(18, 'Wavelength', 38, 33, 1, 44),
(19, 'Ignite', 48, 34, 44, 7),
(20, 'Foxtrot', 9, 56, 59, 7),
(21, 'Alpha', 27, 48, 8, 31),
(22, 'Mystic', 7, 4, 49, 2),
(23, 'Papa', 54, 2, 54, 42),
(24, 'Golf', 9, 12, 59, 47),
(25, 'Quartz', 10, 27, 16, 46),
(26, 'Glimmer', 35, 25, 24, 6),
(27, 'Aurora', 6, 15, 55, 40),
(28, 'Papa', 23, 37, 23, 46),
(29, 'Hotel', 54, 3, 44, 33),
(30, 'Hotel', 55, 51, 16, 22),
(31, 'Glimmer', 25, 6, 53, 27),
(32, 'Alpha', 36, 9, 59, 38),
(33, 'Zulu', 50, 33, 10, 42),
(34, 'Zulu', 49, 14, 35, 39),
(35, 'Oscar', 34, 51, 34, 11),
(36, 'Crimson', 39, 43, 26, 29),
(37, 'November', 27, 10, 9, 46),
(38, 'Radiant', 8, 38, 38, 22),
(39, 'Foxtrot', 5, 11, 28, 19),
(40, 'X-ray', 17, 36, 35, 49),
(41, 'Romeo', 18, 34, 15, 49),
(42, 'Mike', 47, 24, 35, 8),
(43, 'Lima', 57, 22, 44, 34),
(44, 'Aurora', 29, 59, 47, 37),
(45, 'Ember', 25, 32, 31, 29),
(46, 'Quartz', 42, 59, 51, 50),
(47, 'Pulse', 8, 59, 15, 50),
(48, 'X-ray', 26, 17, 3, 31),
(49, 'Yankee', 26, 39, 40, 36),
(50, 'Twilight', 41, 52, 37, 29);

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
(50, 0, 1, 1, 0, 0, 1, 0);

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
(2, 2, 2, 39, 2, 1, 'Item damaged during shipping'),
(4, 4, 4, 41, 4, 1, 'Item not as described'),
(17, 17, 17, 36, 17, 0, 'Item damaged during shipping'),
(21, 21, 21, 47, 21, 0, 'Item not as described'),
(23, 23, 23, 24, 23, 0, 'Item defective'),
(27, 27, 27, 16, 27, 1, 'Customer no longer wants'),
(35, 35, 35, 26, 35, 0, 'Customer changed mind');

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
(1, 129, 100, 0, 1),
(2, 117, 185, 0, 2),
(3, 170, 253, 1, 3),
(4, 164, 216, 0, 4),
(5, 86, 58, 1, 5),
(6, 180, 44, 0, 6),
(7, 81, 133, 0, 7),
(8, 234, 31, 1, 8),
(9, 48, 245, 0, 9),
(10, 119, 221, 0, 10),
(11, 226, 143, 0, 11),
(12, 75, 91, 0, 12),
(13, 53, 226, 1, 13),
(14, 229, 79, 1, 14),
(15, 20, 239, 0, 15),
(16, 22, 177, 1, 16),
(17, 14, 218, 0, 17),
(18, 43, 132, 1, 18),
(19, 6, 203, 0, 19),
(20, 210, 232, 1, 20),
(21, 75, 137, 1, 21),
(22, 184, 122, 1, 22),
(23, 176, 113, 1, 23),
(24, 181, 190, 1, 24),
(25, 241, 181, 1, 25),
(26, 243, 237, 0, 26),
(27, 166, 109, 0, 27),
(28, 207, 116, 0, 28),
(29, 143, 96, 0, 29),
(30, 53, 40, 0, 30),
(31, 223, 38, 0, 31),
(32, 106, 199, 0, 32),
(33, 73, 131, 1, 33),
(34, 83, 129, 1, 34),
(35, 16, 158, 1, 35),
(36, 231, 140, 1, 36),
(37, 171, 144, 1, 37),
(38, 211, 20, 1, 38),
(39, 195, 134, 0, 39),
(40, 139, 121, 1, 40),
(41, 197, 224, 0, 41),
(42, 99, 34, 0, 42),
(43, 106, 28, 1, 43),
(44, 241, 57, 1, 44),
(45, 228, 211, 1, 45),
(46, 115, 213, 0, 46),
(47, 216, 196, 0, 47),
(48, 149, 34, 0, 48),
(49, 155, 173, 0, 49),
(50, 206, 219, 0, 50);

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

--
-- Volcado de datos para la tabla `objectives`
--

INSERT INTO `objectives` (`obj_id`, `obj_name`, `obj_duration_min`, `obj_durationreal_min`, `obj_check`, `id_user`, `objblo_id`) VALUES
(1, 'Operation Eclipse', 33, 43, 1, 1, 1),
(2, 'Project Alpha', 42, 30, 1, 2, 2),
(3, 'Operation Avalanche', 53, 35, 1, 3, 3),
(4, 'Task Force Foxtrot', 32, 6, 1, 4, 4),
(5, 'Project Alpha', 48, 10, 1, 5, 5),
(6, 'Operation Midnight', 43, 58, 0, 6, 6),
(7, 'Operation Avalanche', 22, 39, 0, 7, 7),
(8, 'Task Force Delta', 9, 6, 0, 8, 8),
(9, 'Mission Griffin', 23, 36, 1, 9, 9),
(10, 'Task Force Spectre', 37, 32, 1, 10, 10),
(11, 'Operation Kraken', 51, 43, 0, 11, 11),
(12, 'Task Force Echo', 42, 49, 0, 12, 12),
(13, 'Task Force Warhawk', 55, 28, 1, 13, 13),
(14, 'Project Solaris', 59, 26, 0, 14, 14),
(15, 'Task Force Dragon', 7, 51, 0, 15, 15),
(16, 'Task Force Bravo', 8, 3, 1, 16, 16),
(17, 'Task Force Ghost', 34, 10, 0, 17, 17),
(18, 'Task Force Echo', 11, 41, 1, 18, 18),
(19, 'Task Force Spectre', 4, 57, 0, 19, 19),
(20, 'Project Chimera', 43, 13, 1, 20, 20),
(21, 'Operation Blizzard', 12, 19, 0, 21, 21),
(22, 'Task Force Echo', 54, 24, 0, 22, 22),
(23, 'Project Renegade', 7, 53, 1, 23, 23),
(24, 'Task Force Foxtrot', 49, 52, 0, 24, 24),
(25, 'Task Force Echo', 12, 45, 0, 25, 25),
(26, 'Mission Phoenix Rising', 35, 42, 1, 26, 26),
(27, 'Mission Nebula', 3, 40, 1, 27, 27),
(28, 'Operation Thunderbolt', 11, 13, 1, 28, 28),
(29, 'Operation Eclipse', 17, 25, 1, 29, 29),
(30, 'Project Chimera', 44, 32, 1, 30, 30),
(31, 'Operation Viper', 11, 45, 1, 31, 31),
(32, 'Mission Pegasus', 22, 42, 1, 32, 32),
(33, 'Operation Thunderbolt', 50, 56, 0, 33, 33),
(34, 'Project Titan', 41, 58, 1, 34, 34),
(35, 'Operation Eclipse', 32, 13, 1, 35, 35),
(36, 'Mission Cyclone', 37, 29, 0, 36, 36),
(37, 'Task Force Hydra', 57, 26, 0, 37, 37),
(38, 'Operation Thunderbolt', 43, 34, 0, 38, 38),
(39, 'Task Force Spectre', 47, 23, 1, 39, 39),
(40, 'Operation Viper', 30, 47, 1, 40, 40),
(41, 'Project Omega', 59, 56, 1, 41, 41),
(42, 'Project Omega', 7, 32, 1, 42, 42),
(43, 'Task Force Warhawk', 11, 9, 0, 43, 43),
(44, 'Project Inferno', 20, 1, 0, 44, 44),
(45, 'Mission Cyclone', 18, 10, 0, 45, 45),
(46, 'Project Leviathan', 34, 34, 0, 46, 46),
(47, 'Task Force Delta', 35, 40, 1, 47, 47),
(48, 'Task Force Bravo', 8, 35, 1, 48, 48),
(49, 'Mission Cyclone', 1, 38, 1, 49, 49),
(50, 'Project Solaris', 6, 19, 1, 50, 50);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `objectivesblock`
--

CREATE TABLE `objectivesblock` (
  `objblo_id` int(11) NOT NULL,
  `reminder_id` int(11) DEFAULT NULL,
  `objblo_name` varchar(25) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `objectivesblock`
--

INSERT INTO `objectivesblock` (`objblo_id`, `reminder_id`, `objblo_name`) VALUES
(1, 1, 'Mission Zeta'),
(2, 2, 'Project 7'),
(3, 3, 'Operation M'),
(4, 4, 'Objective 10'),
(5, 5, 'Goal Kappa'),
(6, 6, 'Strategy F'),
(7, 7, 'Operation Delta'),
(8, 8, 'Project Y'),
(9, 9, 'Assignment Bravo'),
(10, 10, 'Assignment 1'),
(11, 11, 'Operation M'),
(12, 12, 'Target G'),
(13, 13, 'Project 7'),
(14, 14, 'Strategy P'),
(15, 15, 'Assignment Bravo'),
(16, 16, 'Project N'),
(17, 17, 'Strategy F'),
(18, 18, 'Strategy 5'),
(19, 19, 'Goal I'),
(20, 20, 'Operation M'),
(21, 21, 'Project Alpha'),
(22, 22, 'Objective 10'),
(23, 23, 'Project D'),
(24, 24, 'Strategy Lambda'),
(25, 25, 'Objective A'),
(26, 26, 'Operation C'),
(27, 27, 'Project Y'),
(28, 28, 'Objective U'),
(29, 29, 'Assignment J'),
(30, 30, 'Task Omega'),
(31, 31, 'Strategy Lambda'),
(32, 32, 'Task B'),
(33, 33, 'Goal 2'),
(34, 34, 'Goal Kappa'),
(35, 35, 'Strategy F'),
(36, 36, 'Strategy 5'),
(37, 37, 'Mission Zeta'),
(38, 38, 'Assignment T'),
(39, 39, 'Operation 8'),
(40, 40, 'Plan R'),
(41, 41, 'Project Y'),
(42, 42, 'Operation Delta'),
(43, 43, 'Goal S'),
(44, 44, 'Goal Kappa'),
(45, 45, 'Target Theta'),
(46, 46, 'Goal Kappa'),
(47, 47, 'Target Theta'),
(48, 48, 'Operation M'),
(49, 49, 'Mission Zeta'),
(50, 50, 'Objective 10');

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
(1, 0, 1),
(2, 0, 2),
(3, 0, 3),
(4, 1, 4),
(5, 0, 5),
(6, 1, 6),
(7, 1, 7),
(8, 0, 8),
(9, 1, 9),
(10, 1, 10),
(11, 1, 11),
(12, 1, 12),
(13, 1, 13),
(14, 0, 14),
(15, 1, 15),
(16, 0, 16),
(17, 0, 17),
(18, 1, 18),
(19, 0, 19),
(20, 0, 20),
(21, 0, 21),
(22, 1, 22),
(23, 0, 23),
(24, 1, 24),
(25, 0, 25),
(26, 0, 26),
(27, 0, 27),
(28, 0, 28),
(29, 1, 29),
(30, 0, 30),
(31, 0, 31),
(32, 1, 32),
(33, 1, 33),
(34, 1, 34),
(35, 0, 35),
(36, 1, 36),
(37, 1, 37),
(38, 1, 38),
(39, 1, 39),
(40, 0, 40),
(41, 1, 41),
(42, 0, 42),
(43, 0, 43),
(44, 1, 44),
(45, 1, 45),
(46, 0, 46),
(47, 1, 47),
(48, 1, 48),
(49, 0, 49),
(50, 1, 50);

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
(1, 1, '2024-07-08', 70, 19, 81, 15, 56, 3, 80, 12, 45),
(2, 2, '2023-12-18', 91, 20, 37, 29, 43, 20, 51, 5, 76),
(3, 3, '2024-03-02', 17, 4, 19, 22, 44, 16, 36, 7, 83),
(4, 4, '2024-01-24', 45, 8, 99, 12, 30, 5, 13, 10, 81),
(5, 5, '2023-10-02', 11, 18, 49, 16, 51, 5, 63, 15, 79),
(6, 6, '2023-12-04', 43, 11, 56, 25, 97, 12, 21, 20, 16),
(7, 7, '2024-04-20', 80, 13, 42, 8, 84, 15, 32, 4, 39),
(8, 8, '2024-01-22', 72, 6, 65, 2, 54, 13, 76, 19, 100),
(9, 9, '2024-01-07', 1, 13, 36, 11, 51, 4, 80, 16, 72),
(10, 10, '2023-08-10', 84, 4, 64, 8, 17, 12, 19, 13, 54),
(11, 11, '2023-12-23', 16, 16, 83, 24, 10, 7, 12, 6, 82),
(12, 12, '2023-10-27', 7, 9, 100, 22, 40, 16, 48, 17, 61),
(13, 13, '2023-08-18', 69, 6, 38, 13, 56, 7, 55, 4, 4),
(14, 14, '2024-04-30', 87, 12, 6, 24, 97, 13, 45, 18, 94),
(15, 15, '2023-10-08', 86, 16, 40, 2, 49, 7, 4, 9, 11),
(16, 16, '2023-09-01', 25, 5, 12, 28, 41, 2, 93, 16, 93),
(17, 17, '2024-06-23', 79, 11, 19, 29, 73, 18, 25, 4, 46),
(18, 18, '2024-07-09', 43, 20, 96, 21, 4, 8, 34, 10, 26),
(19, 19, '2023-12-28', 67, 18, 92, 5, 81, 3, 58, 17, 16),
(20, 20, '2023-12-06', 65, 9, 99, 15, 74, 13, 46, 2, 34),
(21, 21, '2024-02-21', 22, 1, 86, 12, 25, 15, 52, 19, 1),
(22, 22, '2023-12-09', 82, 7, 73, 14, 2, 8, 17, 7, 89),
(23, 23, '2024-02-05', 45, 10, 3, 27, 5, 4, 72, 5, 70),
(24, 24, '2024-03-25', 22, 13, 28, 10, 61, 19, 54, 6, 47),
(25, 25, '2024-06-25', 64, 1, 69, 25, 34, 8, 86, 12, 36),
(26, 26, '2023-12-20', 12, 2, 87, 22, 97, 16, 3, 8, 73),
(27, 27, '2024-06-19', 17, 20, 42, 6, 40, 5, 98, 16, 17),
(28, 28, '2024-01-30', 53, 3, 67, 14, 99, 9, 68, 17, 10),
(29, 29, '2023-09-27', 59, 14, 48, 10, 94, 10, 84, 5, 10),
(30, 30, '2023-08-20', 41, 8, 97, 22, 38, 20, 40, 20, 74),
(31, 31, '2024-07-09', 6, 19, 96, 12, 96, 2, 10, 19, 66),
(32, 32, '2023-08-02', 33, 11, 30, 13, 6, 13, 88, 19, 87),
(33, 33, '2024-02-02', 8, 19, 7, 6, 29, 5, 64, 15, 97),
(34, 34, '2024-05-14', 72, 17, 36, 23, 47, 15, 39, 18, 44),
(35, 35, '2024-04-24', 1, 5, 5, 11, 81, 13, 82, 6, 48),
(36, 36, '2023-09-21', 59, 2, 10, 6, 53, 1, 98, 5, 11),
(37, 37, '2023-11-13', 13, 19, 42, 11, 25, 2, 9, 18, 86),
(38, 38, '2023-10-31', 68, 18, 90, 10, 50, 11, 34, 16, 37),
(39, 39, '2023-07-31', 20, 8, 30, 13, 37, 15, 10, 19, 100),
(40, 40, '2024-02-09', 22, 12, 16, 28, 68, 15, 72, 10, 72),
(41, 41, '2023-07-31', 44, 13, 22, 24, 85, 6, 93, 18, 48),
(42, 42, '2024-01-09', 24, 9, 50, 5, 57, 20, 35, 10, 30),
(43, 43, '2023-12-01', 85, 10, 96, 24, 80, 20, 14, 5, 84),
(44, 44, '2023-10-01', 34, 1, 37, 23, 89, 8, 83, 3, 86),
(45, 45, '2024-02-03', 16, 3, 48, 24, 65, 4, 58, 4, 49),
(46, 46, '2023-10-19', 61, 18, 85, 21, 79, 16, 34, 16, 96),
(47, 47, '2024-06-04', 80, 6, 69, 21, 69, 3, 79, 20, 35),
(48, 48, '2023-08-16', 81, 6, 71, 12, 67, 15, 5, 6, 57),
(49, 49, '2024-04-30', 31, 9, 6, 12, 85, 5, 27, 18, 19),
(50, 50, '2023-08-08', 45, 7, 25, 23, 17, 5, 59, 2, 54);

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

--
-- Volcado de datos para la tabla `reminders`
--

INSERT INTO `reminders` (`reminder_id`, `reminder_name`, `reminder_date`, `reminder_hour`, `reminder_min`, `reminder_active`, `repdays_id`, `reminder_tone_duration_sec`, `reminder_advance_min`, `reminder_img`, `reminder_desc`, `reminder_days_suspended`, `reminder_share`, `reminder_sourse_id`) VALUES
(1, 'Write thank you notes', '2024-07-23 01:16:04', 14, 41, 1, 1, 28, 2, 'http://example.com/image38.jpg', 'Go to the gym', 3, 0, 1),
(2, 'Explore new neighborhood', '2024-07-16 04:22:29', 5, 57, 1, 2, 26, 46, 'http://example.com/image5.jpg', 'Visit art museum', 5, 0, 2),
(3, 'Try new restaurant', '2024-07-13 18:47:57', 5, 10, 0, 3, 24, 28, 'http://example.com/image29.jpg', 'Go for a hike', 7, 0, 3),
(4, 'Learn coding', '2024-08-09 03:59:46', 23, 21, 0, 4, 13, 20, 'http://example.com/image34.jpg', 'Watch a movie', 5, 0, 4),
(5, 'Call mom', '2024-07-26 16:09:28', 13, 5, 1, 5, 4, 53, 'http://example.com/image11.jpg', 'Explore new neighborhood', 5, 1, 5),
(6, 'Pay bills', '2024-08-02 10:44:00', 3, 44, 0, 6, 4, 17, 'http://example.com/image32.jpg', 'Organize closet', 5, 1, 6),
(7, 'Plan weekend getaway', '2024-07-13 03:39:17', 1, 8, 0, 7, 19, 39, 'http://example.com/image28.jpg', 'Host a game night', 1, 0, 7),
(8, 'Call mom', '2024-07-30 05:01:10', 12, 34, 0, 8, 25, 22, 'http://example.com/image46.jpg', 'Plan vacation', 5, 0, 8),
(9, 'Join improv class', '2024-08-20 10:12:23', 17, 46, 1, 9, 13, 23, 'http://example.com/image47.jpg', 'Plan a surprise party', 1, 1, 9),
(10, 'Start journaling', '2024-07-29 21:54:17', 1, 32, 0, 10, 20, 25, 'http://example.com/image34.jpg', 'Finish report', 3, 0, 10),
(11, 'Read book', '2024-08-24 16:06:50', 8, 55, 1, 11, 16, 43, 'http://example.com/image36.jpg', 'Clean the house', 6, 1, 11),
(12, 'Pick up dry cleaning', '2024-08-14 09:17:06', 16, 42, 0, 12, 9, 43, 'http://example.com/image48.jpg', 'Host a game night', 2, 1, 12),
(13, 'Practice guitar', '2024-08-24 06:35:01', 21, 5, 0, 13, 3, 41, 'http://example.com/image47.jpg', 'Paint the living room', 5, 0, 13),
(14, 'Plant flowers', '2024-07-29 06:54:45', 22, 12, 1, 14, 13, 3, 'http://example.com/image20.jpg', 'Attend networking event', 4, 1, 14),
(15, 'Explore new neighborhood', '2024-08-09 04:46:51', 23, 38, 1, 15, 22, 48, 'http://example.com/image5.jpg', 'Pick up dry cleaning', 3, 0, 15),
(16, 'Volunteer at shelter', '2024-07-29 19:28:17', 15, 8, 0, 16, 24, 8, 'http://example.com/image37.jpg', 'Learn to play guitar', 4, 0, 16),
(17, 'Pay bills', '2024-08-19 11:08:15', 12, 43, 0, 17, 6, 12, 'http://example.com/image37.jpg', 'Watch a movie', 2, 1, 17),
(18, 'Send birthday card', '2024-08-26 06:53:02', 4, 6, 0, 18, 12, 26, 'http://example.com/image22.jpg', 'Go for a hike', 1, 1, 18),
(19, 'Take dance lessons', '2024-07-29 07:15:12', 15, 12, 1, 19, 10, 19, 'http://example.com/image31.jpg', 'Meal prep for the week', 4, 1, 19),
(20, 'Join improv class', '2024-08-08 13:35:02', 16, 25, 0, 20, 24, 5, 'http://example.com/image32.jpg', 'Try a new workout class', 2, 1, 20),
(21, 'Start journaling', '2024-08-04 08:28:58', 6, 21, 1, 21, 26, 46, 'http://example.com/image20.jpg', 'Practice meditation', 1, 0, 21),
(22, 'Finish report', '2024-08-21 20:46:26', 21, 56, 1, 22, 19, 43, 'http://example.com/image37.jpg', 'Join a book club', 2, 1, 22),
(23, 'Attend webinar', '2024-07-14 16:31:30', 5, 36, 0, 23, 19, 18, 'http://example.com/image3.jpg', 'Attend yoga class', 3, 0, 23),
(24, 'Buy groceries', '2024-08-15 10:04:27', 24, 1, 1, 24, 16, 27, 'http://example.com/image6.jpg', 'Paint the living room', 2, 1, 24),
(25, 'Join improv class', '2024-08-14 03:16:54', 4, 43, 0, 25, 28, 10, 'http://example.com/image8.jpg', 'Plan vacation', 7, 1, 25),
(26, 'Explore new neighborhood', '2024-07-22 19:16:03', 16, 14, 0, 26, 16, 22, 'http://example.com/image49.jpg', 'Take a photography class', 3, 1, 26),
(27, 'Try meditation', '2024-08-04 14:14:07', 16, 50, 1, 27, 14, 3, 'http://example.com/image7.jpg', 'Attend networking event', 5, 0, 27),
(28, 'Organize closet', '2024-07-21 12:16:42', 4, 11, 1, 28, 9, 42, 'http://example.com/image27.jpg', 'Plant a garden', 7, 0, 28),
(29, 'Attend cooking class', '2024-08-13 03:26:18', 10, 26, 0, 29, 16, 28, 'http://example.com/image26.jpg', 'Try a new workout class', 3, 1, 29),
(30, 'Join pottery workshop', '2024-08-18 12:13:53', 19, 26, 0, 30, 9, 20, 'http://example.com/image2.jpg', 'Study for exam', 5, 1, 30),
(31, 'Plant flowers', '2024-08-17 13:34:42', 16, 17, 1, 31, 2, 16, 'http://example.com/image10.jpg', 'Write in journal', 4, 0, 31),
(32, 'Update resume', '2024-08-13 18:31:54', 18, 16, 0, 32, 4, 12, 'http://example.com/image25.jpg', 'Explore new neighborhood', 7, 0, 32),
(33, 'Finish report', '2024-08-08 13:12:04', 5, 51, 0, 33, 26, 32, 'http://example.com/image20.jpg', 'Go for a hike', 5, 0, 33),
(34, 'Go to the beach', '2024-08-10 22:38:01', 11, 11, 1, 34, 22, 11, 'http://example.com/image5.jpg', 'Go for a hike', 1, 1, 34),
(35, 'Learn coding', '2024-08-17 02:10:58', 10, 40, 0, 35, 19, 29, 'http://example.com/image16.jpg', 'Visit art museum', 2, 1, 35),
(36, 'Take dance lessons', '2024-07-15 14:14:56', 14, 17, 1, 36, 1, 35, 'http://example.com/image16.jpg', 'Take a day trip', 7, 0, 36),
(37, 'Try meditation', '2024-08-08 05:25:02', 16, 45, 0, 37, 27, 31, 'http://example.com/image34.jpg', 'Schedule dentist appointment', 3, 0, 37),
(38, 'Try new restaurant', '2024-08-09 08:16:17', 11, 21, 0, 38, 7, 26, 'http://example.com/image40.jpg', 'Meal prep for the week', 1, 1, 38),
(39, 'Renew gym membership', '2024-08-13 16:17:21', 15, 28, 1, 39, 27, 39, 'http://example.com/image16.jpg', 'Schedule dentist appointment', 2, 0, 39),
(40, 'Join pottery workshop', '2024-08-14 00:11:46', 8, 43, 0, 40, 5, 38, 'http://example.com/image46.jpg', 'Finish report', 5, 1, 40),
(41, 'Renew gym membership', '2024-07-24 09:41:08', 12, 36, 0, 41, 9, 13, 'http://example.com/image2.jpg', 'Learn a new recipe', 4, 1, 41),
(42, 'Water plants', '2024-07-15 20:58:28', 6, 25, 1, 42, 18, 7, 'http://example.com/image48.jpg', 'Go to a comedy show', 4, 0, 42),
(43, 'Call mom', '2024-08-28 05:02:59', 18, 16, 1, 43, 20, 1, 'http://example.com/image33.jpg', 'Explore new neighborhood', 6, 1, 43),
(44, 'Join book club', '2024-07-16 12:51:48', 22, 10, 0, 44, 26, 24, 'http://example.com/image45.jpg', 'Host a game night', 1, 1, 44),
(45, 'Organize closet', '2024-07-27 23:32:54', 5, 54, 1, 45, 19, 25, 'http://example.com/image34.jpg', 'Attend concert', 5, 1, 45),
(46, 'Learn photography', '2024-08-29 15:48:41', 18, 36, 0, 46, 3, 58, 'http://example.com/image1.jpg', 'Go to a sports game', 1, 0, 46),
(47, 'Start journaling', '2024-07-12 18:24:21', 16, 36, 0, 47, 25, 35, 'http://example.com/image17.jpg', 'Meal prep for the week', 6, 1, 47),
(48, 'Write thank you notes', '2024-07-25 05:15:42', 12, 8, 0, 48, 24, 56, 'http://example.com/image49.jpg', 'Read a book', 2, 0, 48),
(49, 'Painting class', '2024-07-24 21:36:34', 11, 14, 1, 49, 8, 25, 'http://example.com/image41.jpg', 'Watch a movie', 1, 0, 49),
(50, 'Clean the house', '2024-08-23 18:24:59', 24, 55, 1, 50, 9, 56, 'http://example.com/image18.jpg', 'Attend networking event', 3, 0, 50);

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
(1, 1, 1),
(2, 2, 2),
(3, 3, 3),
(4, 4, 4),
(5, 5, 5),
(6, 6, 6),
(7, 7, 7),
(8, 8, 8),
(9, 9, 9),
(10, 10, 10),
(11, 11, 11),
(12, 12, 12),
(13, 13, 13),
(14, 14, 14),
(15, 15, 15),
(16, 16, 16),
(17, 17, 17),
(18, 18, 18),
(19, 19, 19),
(20, 20, 20),
(21, 21, 21),
(22, 22, 22),
(23, 23, 23),
(24, 24, 24),
(25, 25, 25),
(26, 26, 26),
(27, 27, 27),
(28, 28, 28),
(29, 29, 29),
(30, 30, 30),
(31, 31, 31),
(32, 32, 32),
(33, 33, 33),
(34, 34, 34),
(35, 35, 35),
(36, 36, 36),
(37, 37, 37),
(38, 38, 38),
(39, 39, 39),
(40, 40, 40),
(41, 41, 41),
(42, 42, 42),
(43, 43, 43),
(44, 44, 44),
(45, 45, 45),
(46, 46, 46),
(47, 47, 47),
(48, 48, 48),
(49, 49, 49),
(50, 50, 50);

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
  `schedule_duration_min` tinyint(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `schedules`
--

INSERT INTO `schedules` (`schedule_id`, `schedule_eventname`, `schedule_datetime`, `schedule_duration_hour`, `schedule_duration_min`) VALUES
(1, 'schedule_eventname', '0000-00-00 00:00:00', 0, 0),
(2, 'Project Status Update Meeting', '2025-02-05 06:05:10', 7, 52),
(3, 'Job Fair Recruitment Event', '2025-11-26 14:11:00', 1, 23),
(4, 'Company Anniversary Celebration', '2025-03-03 22:31:21', 3, 46),
(5, 'Team Outing to Escape Room', '2025-04-18 07:15:13', 8, 52),
(6, 'Client Dinner', '2025-06-01 04:31:23', 4, 34),
(7, 'Coffee Chat with HR', '2025-12-17 23:08:13', 7, 14),
(8, 'Networking Lunch with Industry Professionals', '2025-08-28 14:44:23', 7, 25),
(9, 'Coffee Chat with CEO', '2025-09-10 00:28:54', 8, 44),
(10, 'Training Workshop on Diversity and Inclusion', '2025-04-02 05:30:25', 3, 38),
(11, 'Project Debrief Meeting', '2025-05-04 16:53:42', 7, 55),
(12, 'Training Workshop on Conflict Resolution', '2024-09-27 02:18:43', 1, 26),
(13, 'Monthly Review Meeting', '2025-03-29 07:06:27', 1, 17),
(14, 'Training Session on Sales Techniques', '2025-08-21 02:34:17', 3, 39),
(15, 'Monthly Review Meeting', '2025-06-21 11:17:37', 3, 33),
(16, 'Hackathon Event', '2025-03-30 19:32:07', 8, 36),
(17, 'Company Holiday Party', '2024-08-06 11:49:22', 7, 42),
(18, 'Team Outing to Escape Room', '2025-07-14 10:34:03', 3, 27),
(19, 'Coffee Break with New Hires', '2025-06-02 03:41:36', 3, 3),
(20, 'Panel Discussion on Innovation', '2024-11-04 07:43:00', 6, 48),
(21, 'Webinar on Sales Strategies', '2025-09-19 03:46:11', 1, 51),
(22, 'Networking Lunch with Industry Professionals', '2025-06-14 04:13:09', 7, 53),
(23, 'Team Retreat', '2025-03-17 16:45:26', 2, 47),
(24, 'Team Building Scavenger Hunt', '2025-06-30 13:42:33', 6, 15),
(25, 'Lunch with Colleague', '2025-09-03 07:05:37', 2, 38),
(26, 'Project Debrief Meeting', '2025-02-20 10:45:14', 4, 33),
(27, 'Training Session on Communication Skills', '2025-05-28 12:48:10', 6, 37),
(28, 'Monthly Review Meeting', '2025-11-01 21:10:54', 1, 19),
(29, 'Networking Breakfast with Business Partners', '2025-02-26 10:40:42', 1, 58),
(30, 'Presentation for Client X', '2025-02-09 06:50:43', 6, 33),
(31, 'Coffee Break with Interns', '2024-09-19 05:56:46', 2, 49),
(32, 'Company Town Hall Meeting', '2025-11-12 10:11:27', 3, 22),
(33, 'Monthly Review Meeting', '2024-10-21 02:17:57', 3, 45),
(34, 'Lunch and Learn Session', '2025-03-13 18:04:13', 2, 35),
(35, 'Panel Discussion on Innovation', '2024-12-31 03:42:23', 7, 14),
(36, 'Networking Event at Conference', '2024-09-02 00:14:47', 5, 45),
(37, 'Hackathon Competition', '2025-08-12 19:32:10', 1, 10),
(38, 'Networking Breakfast with Business Partners', '2024-11-02 08:29:07', 4, 21),
(39, 'Training Session on Sales Techniques', '2024-07-28 22:28:37', 1, 6),
(40, 'Team Retreat', '2025-05-05 01:10:17', 3, 51),
(41, 'Presentation for Client X', '2024-11-09 14:41:47', 2, 57),
(42, 'Happy Hour with Coworkers', '2025-01-14 20:46:52', 3, 14),
(43, 'Happy Hour Mixer', '2025-10-09 12:32:16', 4, 57),
(44, 'Lunch and Learn Session', '2025-04-18 09:26:50', 4, 40),
(45, 'Hackathon Competition', '2025-12-07 08:51:22', 5, 53),
(46, 'Client Dinner', '2025-06-07 03:40:25', 6, 5),
(47, 'Project Status Update Meeting', '2025-10-21 08:14:25', 1, 56),
(48, 'Panel Discussion on Innovation', '2024-07-25 15:58:01', 2, 29),
(49, 'Seminar on Leadership Skills', '2024-10-17 13:46:36', 7, 44),
(50, 'Team Outing to Escape Room', '2025-04-17 00:45:04', 8, 33);

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

--
-- Volcado de datos para la tabla `sleepmode`
--

INSERT INTO `sleepmode` (`sleep_id`, `sleep_starthour`, `sleep_endhour`, `sleep_active`, `sleep_rep`, `sleep_video_url`, `sleep_rep_stopped`, `tone_id`, `quality_id`) VALUES
(1, 9, 8, 1, 6, 'https://www.youtube.com/watch?v=jkl567', 1, 29, 1),
(2, 23, 22, 0, 2, 'https://www.youtube.com/watch?v=bcx567', 1, 36, 2),
(3, 16, 15, 1, 1, 'https://www.youtube.com/watch?v=stu678', 0, 9, 3),
(4, 18, 17, 1, 7, 'https://www.youtube.com/watch?v=def567', 0, 48, 4),
(5, 20, 21, 0, 3, 'https://www.youtube.com/watch?v=vwx678', 0, 18, 5),
(6, 14, 13, 0, 4, 'https://www.youtube.com/watch?v=jkl567', 1, 39, 6),
(7, 2, 1, 0, 4, 'https://www.youtube.com/watch?v=bcx567', 0, 25, 7),
(8, 3, 2, 1, 2, 'https://www.youtube.com/watch?v=ghi567', 0, 26, 8),
(9, 20, 21, 1, 3, 'https://www.youtube.com/watch?v=def234', 1, 1, 9),
(10, 11, 10, 0, 1, 'https://www.youtube.com/watch?v=vwx345', 0, 25, 10),
(11, 18, 17, 1, 7, 'https://www.youtube.com/watch?v=mno012', 0, 9, 11),
(12, 13, 14, 1, 4, 'https://www.youtube.com/watch?v=pqr789', 0, 23, 12),
(13, 10, 9, 1, 1, 'https://www.youtube.com/watch?v=def123', 0, 29, 13),
(14, 23, 22, 1, 6, 'https://www.youtube.com/watch?v=def123', 1, 50, 14),
(15, 20, 19, 1, 1, 'https://www.youtube.com/watch?v=bcx901', 0, 20, 15),
(16, 6, 5, 1, 3, 'https://www.youtube.com/watch?v=def123', 1, 23, 16),
(17, 6, 5, 1, 2, 'https://www.youtube.com/watch?v=ghi234', 0, 26, 17),
(18, 8, 7, 0, 1, 'https://www.youtube.com/watch?v=bcx678', 1, 33, 18),
(19, 5, 4, 1, 7, 'https://www.youtube.com/watch?v=abc123', 1, 26, 19),
(20, 12, 11, 1, 2, 'https://www.youtube.com/watch?v=stu012', 1, 15, 20),
(21, 22, 21, 0, 1, 'https://www.youtube.com/watch?v=jkl567', 1, 31, 21),
(22, 9, 8, 1, 7, 'https://www.youtube.com/watch?v=yza567', 0, 41, 22),
(23, 4, 3, 1, 3, 'https://www.youtube.com/watch?v=stu345', 0, 25, 23),
(24, 9, 8, 0, 7, 'https://www.youtube.com/watch?v=pqr789', 0, 30, 24),
(25, 17, 18, 1, 5, 'https://www.youtube.com/watch?v=vwx901', 1, 18, 25),
(26, 17, 16, 0, 1, 'https://www.youtube.com/watch?v=yza567', 1, 18, 26),
(27, 9, 8, 1, 4, 'https://www.youtube.com/watch?v=def901', 1, 26, 27),
(28, 7, 6, 1, 2, 'https://www.youtube.com/watch?v=ghi789', 1, 50, 28),
(29, 5, 4, 1, 2, 'https://www.youtube.com/watch?v=bcx890', 1, 29, 29),
(30, 21, 20, 0, 1, 'https://www.youtube.com/watch?v=jkl456', 1, 48, 30),
(31, 7, 6, 0, 2, 'https://www.youtube.com/watch?v=ghi789', 1, 23, 31),
(32, 14, 15, 1, 4, 'https://www.youtube.com/watch?v=stu901', 0, 38, 32),
(33, 11, 10, 0, 5, 'https://www.youtube.com/watch?v=pqr678', 0, 35, 33),
(34, 3, 2, 0, 2, 'https://www.youtube.com/watch?v=jkl789', 0, 5, 34),
(35, 8, 7, 0, 5, 'https://www.youtube.com/watch?v=def567', 0, 31, 35),
(36, 18, 17, 1, 2, 'https://www.youtube.com/watch?v=stu789', 1, 29, 36),
(37, 18, 17, 1, 6, 'https://www.youtube.com/watch?v=stu678', 1, 1, 37),
(38, 8, 7, 0, 1, 'https://www.youtube.com/watch?v=pqr345', 1, 18, 38),
(39, 5, 4, 1, 6, 'https://www.youtube.com/watch?v=def123', 0, 20, 39),
(40, 23, 22, 0, 1, 'https://www.youtube.com/watch?v=yza901', 1, 29, 40),
(41, 11, 10, 0, 3, 'https://www.youtube.com/watch?v=mno345', 1, 11, 41),
(42, 13, 14, 0, 6, 'https://www.youtube.com/watch?v=ghi234', 1, 32, 42),
(43, 2, 1, 0, 2, 'https://www.youtube.com/watch?v=pqr678', 1, 6, 43),
(44, 6, 5, 0, 7, 'https://www.youtube.com/watch?v=yza345', 0, 19, 44),
(45, 14, 15, 0, 5, 'https://www.youtube.com/watch?v=yza567', 1, 43, 45),
(46, 19, 18, 1, 7, 'https://www.youtube.com/watch?v=vwx012', 1, 39, 46),
(47, 7, 6, 1, 3, 'https://www.youtube.com/watch?v=pqr678', 1, 18, 47),
(48, 23, 22, 1, 1, 'https://www.youtube.com/watch?v=vwx678', 1, 34, 48),
(49, 23, 22, 0, 7, 'https://www.youtube.com/watch?v=def456', 0, 18, 49),
(50, 7, 6, 1, 6, 'https://www.youtube.com/watch?v=mno345', 1, 29, 50);

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

--
-- Volcado de datos para la tabla `sleepquality`
--

INSERT INTO `sleepquality` (`quality_id`, `quality_good`, `quality_medium`, `quiality_bad`) VALUES
(1, 0, 0, 1),
(2, 0, 0, 0),
(3, 0, 1, 0),
(4, 0, 0, 1),
(5, 1, 0, 0),
(6, 1, 0, 0),
(7, 0, 1, 0),
(8, 0, 1, 0),
(9, 0, 0, 1),
(10, 1, 0, 0),
(11, 1, 0, 0),
(12, 1, 0, 0),
(13, 0, 1, 0),
(14, 0, 0, 1),
(15, 0, 1, 0),
(16, 0, 1, 0),
(17, 1, 0, 0),
(18, 0, 1, 0),
(19, 0, 1, 0),
(20, 0, 1, 0),
(21, 1, 0, 0),
(22, 1, 0, 0),
(23, 1, 0, 0),
(24, 0, 0, 0),
(25, 0, 0, 1),
(26, 0, 1, 0),
(27, 1, 0, 0),
(28, 1, 0, 0),
(29, 1, 0, 0),
(30, 0, 1, 0),
(31, 1, 0, 0),
(32, 0, 1, 0),
(33, 0, 1, 0),
(34, 0, 0, 1),
(35, 0, 0, 0),
(36, 0, 1, 0),
(37, 1, 0, 0),
(38, 0, 1, 0),
(39, 0, 1, 0),
(40, 1, 0, 0),
(41, 1, 0, 0),
(42, 0, 0, 1),
(43, 1, 0, 0),
(44, 0, 1, 0),
(45, 0, 0, 1),
(46, 0, 0, 1),
(47, 1, 0, 0),
(48, 1, 0, 0),
(49, 0, 0, 1),
(50, 1, 0, 0),
(51, 0, 0, 0);

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

--
-- Volcado de datos para la tabla `timers`
--

INSERT INTO `timers` (`timer_id`, `timer_hour`, `timer_min`, `timer_sec`, `timer_duration`, `timer_name`, `tone_id`, `user_id`) VALUES
(1, 5, 49, 11, 10, 'Cooking Timer', 40, 34),
(2, 18, 55, 2, 18, 'Task Timer', 10, 46),
(3, 33, 25, 19, 3, 'Interval Timer', 4, 39),
(4, 9, 21, 31, 17, 'Workout Timer', 16, 46),
(5, 49, 29, 52, 2, 'Task Timer', 42, 10),
(6, 6, 9, 28, 29, 'Study Timer', 31, 38),
(7, 18, 32, 14, 18, 'Interval Timer', 50, 21),
(8, 11, 23, 9, 23, 'Meeting Timer', 34, 9),
(9, 26, 3, 23, 29, 'Meeting Timer', 48, 47),
(10, 25, 35, 37, 17, 'Workout Timer', 27, 8),
(11, 23, 21, 27, 20, 'Relaxation Timer', 46, 32),
(12, 31, 24, 9, 25, 'Study Timer', 28, 14),
(13, 56, 34, 22, 10, 'Countdown Timer', 18, 11),
(14, 21, 50, 52, 14, 'Workout Timer', 18, 20),
(15, 14, 26, 23, 16, 'Workout Timer', 5, 40),
(16, 20, 26, 59, 18, 'Relaxation Timer', 28, 44),
(17, 56, 57, 45, 21, 'Workout Timer', 27, 9),
(18, 56, 29, 35, 13, 'Workout Timer', 10, 3),
(19, 13, 55, 53, 21, 'Event Timer', 23, 26),
(20, 28, 36, 53, 10, 'Meeting Timer', 33, 36),
(21, 45, 41, 40, 22, 'Event Timer', 25, 11),
(22, 18, 33, 54, 3, 'Meeting Timer', 42, 6),
(23, 53, 40, 27, 2, 'Relaxation Timer', 49, 1),
(24, 4, 51, 23, 18, 'Interval Timer', 28, 2),
(25, 32, 25, 8, 9, 'Interval Timer', 34, 5),
(26, 24, 18, 9, 29, 'Meeting Timer', 41, 25),
(27, 35, 11, 47, 8, 'Task Timer', 8, 37),
(28, 24, 22, 18, 29, 'Task Timer', 26, 28),
(29, 21, 45, 41, 7, 'Relaxation Timer', 9, 31),
(30, 9, 49, 6, 23, 'Interval Timer', 44, 40),
(31, 44, 28, 7, 30, 'Task Timer', 49, 33),
(32, 34, 13, 52, 6, 'Cooking Timer', 21, 38),
(33, 21, 36, 40, 18, 'Task Timer', 45, 50),
(34, 49, 5, 29, 6, 'Task Timer', 26, 18),
(35, 48, 16, 43, 23, 'Study Timer', 7, 21),
(36, 41, 12, 42, 14, 'Task Timer', 33, 7),
(37, 44, 51, 33, 20, 'Workout Timer', 6, 6),
(38, 7, 58, 59, 11, 'Workout Timer', 5, 48),
(39, 40, 47, 36, 22, 'Workout Timer', 2, 7),
(40, 22, 10, 15, 30, 'Interval Timer', 2, 2),
(41, 29, 44, 59, 8, 'Task Timer', 20, 5),
(42, 11, 56, 34, 13, 'Event Timer', 39, 3),
(43, 19, 18, 43, 20, 'Relaxation Timer', 41, 13),
(44, 46, 3, 53, 22, 'Meeting Timer', 1, 16),
(45, 10, 45, 48, 27, 'Pomodoro Timer', 47, 1),
(46, 19, 13, 18, 7, 'Event Timer', 25, 3),
(47, 32, 27, 39, 21, 'Interval Timer', 43, 20),
(48, 39, 52, 34, 17, 'Relaxation Timer', 1, 24),
(49, 20, 5, 15, 11, 'Relaxation Timer', 24, 35),
(50, 28, 23, 58, 5, 'Event Timer', 50, 42);

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
(4, 'adioniso3@tiny.cc', 'kveldens3', 'mS1`5,J9LqfBuP', '174-750-72', 0, 12),
(5, 'jkacheler4@npr.org', 'areach4', 'dD2\'V.`_T&xIO', '373-426-12', 0, 8),
(6, 'fjennery5@businesswire.com', 'bbolding5', 'tE8_WlHW{\'_E', '236-149-42', 0, 10),
(7, 'jcollinette6@pinterest.com', 'msisse6', 'cV5}2%zl0>Z', '367-441-47', 0, 6),
(8, 'jwaleworke7@google.com.au', 'jbreinlein7', 'jT9)@c$vn8m\"l+<', '435-223-93', 0, 6),
(9, 'bdeverehunt8@omniture.com', 'wteggart8', 'iG6.a&X\"', '294-910-00', 0, 10),
(10, 'idable9@abc.net.au', 'fheindl9', 'fY3}$5VX0Uu', '537-386-46', 0, 9),
(11, 'dtrulockea@bbb.org', 'fserotskya', 'sV5@uU{`k>U', '771-962-47', 0, 7),
(12, 'adibdenb@imgur.com', 'vmaciasb', 'sV6`c3HImB7', '630-874-55', 0, 15),
(13, 'testTitle@gmail.com', 'testTitle', '123', '3388121212', 1, NULL),
(14, 'penillaskakievichoscar@gmail.com', 'Alex', '123', '3357672312', 1, NULL),
(15, 'fboydelle@buzzfeed.com', 'vmcgrowthere', 'fM8?0t*Dw', '728-696-06', 0, 2),
(16, 'vhurichf@skyrock.com', 'iwombwellf', 'mM3|2Lw.#RlRS', '346-407-08', 0, 9),
(17, 'a20300701@ceti.mx', 'Ouscar', '123', '1320880123', 1, NULL),
(18, 'a20300701@ceti.com', 'Oscar', '123', '1230812780', 1, NULL),
(19, 'user_mail', 'user_name', 'user_password', 'user_numbe', 0, 0),
(20, 'mharrisj@google.nl', 'bhubbardj', 'lL4`)rQMFj?f8\'t', '437-893-66', 0, 1),
(21, 'sdimariak@latimes.com', 'vbinfordk', 'vO3_mnMf2L&.)', '517-734-34', 0, 1),
(22, 'mstickingsl@gov.uk', 'mglanvilll', 'kG1&%+)hGp=0m', '260-617-90', 0, 1),
(23, 'wmossmanm@blinklist.com', 'dalleburtonm', 'oP6?c\"b67|fe', '285-466-15', 0, 8),
(24, 'ephippinn@phoca.cz', 'lblaxleyn', 'gM5)`#4O+E9_MO5', '982-529-97', 0, 12),
(25, 'lvanderveldeno@columbia.edu', 'msimionio', 'vT7<R>&r\\ko', '341-273-05', 0, 12),
(26, 'lalvaradop@vistaprint.com', 'fdonhardtp', 'wR1+\"_>Emu4Z', '796-296-80', 0, 11),
(27, 'bgreenhallq@dagondesign.com', 'lgroucockq', 'jG6`7kr`', '360-584-21', 0, 2),
(28, 'cshearstoner@mlb.com', 'kcafferyr', 'pX1#\\&S,c', '376-844-07', 0, 10),
(29, 'cmurrs@techcrunch.com', 'rwears', 'bZ4\\gKZ!', '898-441-98', 0, 13),
(30, 'hcuerdalet@icq.com', 'lcroalt', 'lE8=x3HXFV>', '200-324-10', 0, 1),
(31, 'tinnesu@cnn.com', 'ablucheru', 'xT3~(U%Z{d4BzpeV', '698-402-84', 0, 11),
(32, 'ragdahlv@instagram.com', 'ibristonv', 'cY7@S`Kxpa4E,13', '499-852-77', 0, 11),
(33, 'ldittsonw@statcounter.com', 'tsleneyw', 'tF2_A=@VhJx', '597-529-13', 0, 3),
(34, 'hroadknightx@homestead.com', 'tteresix', 'rX5&d&R!=/?Z\"5y', '816-179-26', 0, 3),
(35, 'mtromansy@reference.com', 'ystrittony', 'yS2~_zv}*>!9', '725-811-24', 0, 4),
(36, 'mbalasiniz@dagondesign.com', 'drolyz', 'iQ1.k%?u.', '467-665-05', 0, 11),
(37, 'mriquet10@netlog.com', 'rlorkins10', 'nB9+f+P#N1Ksf', '531-772-98', 0, 11),
(38, 'bleahey11@flavors.me', 'gbelmont11', 'pD7+%K\\erZq&Id=', '116-185-27', 0, 8),
(39, 'mubank12@freewebs.com', 'dsurmeyer12', 'aM7\'K1Ft?MRsrbG', '884-370-93', 0, 7),
(40, 'oheijnen13@hud.gov', 'ptaylor13', 'rN2#6I)i1\'?D', '454-582-44', 0, 6),
(41, 'adurtnall14@macromedia.com', 'bwilliamson14', 'bC9$B!Anj`$1$)', '194-982-20', 0, 13),
(42, 'kpolglaze15@istockphoto.com', 'egoodson15', 'tQ2|3|vy', '251-881-56', 0, 12),
(43, 'mparkin16@techcrunch.com', 'lgutsell16', 'wP9<>l)x', '657-907-82', 0, 8),
(44, 'rlyard17@answers.com', 'chabert17', 'wI5>s6w!vKCI', '715-441-29', 0, 1),
(45, 'kjurries18@msn.com', 'gmccarlie18', 'bL7~uA(W', '488-204-98', 0, 9),
(46, 'pdohmer19@cbc.ca', 'lbarszczewski19', 'rB2}sOxE{', '239-573-53', 0, 9),
(47, 'hmacgorley1a@flavors.me', 'wantcliff1a', 'uQ6<@EJZB\"JB', '912-613-51', 0, 11),
(48, 'emattia1b@networksolutions.com', 'mmaccosty1b', 'nZ6(+OwHJzBB5J\\J', '867-477-26', 0, 2),
(49, 'pklimt1c@psu.edu', 'cmcgeouch1c', 'vY6(H?E{v', '900-639-81', 0, 2),
(50, 'rsummerskill1d@hc360.com', 'vivankin1d', 'lB6?=g\"PX5h', '757-486-36', 0, 14);

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
  ADD KEY `reminder_sourse_id` (`reminder_sourse_id`),
  ADD KEY `reminder_ibfk_2` (`repdays_id`);

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
  ADD PRIMARY KEY (`user_id`,`title_id`) USING BTREE,
  ADD KEY `user_titles_ibfk_1` (`title_id`);

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
  MODIFY `chrono_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT de la tabla `clocks`
--
ALTER TABLE `clocks`
  MODIFY `clock_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT de la tabla `dayselected`
--
ALTER TABLE `dayselected`
  MODIFY `daysel_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT de la tabla `invitations`
--
ALTER TABLE `invitations`
  MODIFY `inv_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT de la tabla `locations`
--
ALTER TABLE `locations`
  MODIFY `location_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT de la tabla `objectives`
--
ALTER TABLE `objectives`
  MODIFY `obj_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT de la tabla `objectivesblock`
--
ALTER TABLE `objectivesblock`
  MODIFY `objblo_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT de la tabla `permisions`
--
ALTER TABLE `permisions`
  MODIFY `permision_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT de la tabla `pomodoros`
--
ALTER TABLE `pomodoros`
  MODIFY `pomodoro_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT de la tabla `puntuality`
--
ALTER TABLE `puntuality`
  MODIFY `punt_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=784;

--
-- AUTO_INCREMENT de la tabla `reminders`
--
ALTER TABLE `reminders`
  MODIFY `reminder_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;

--
-- AUTO_INCREMENT de la tabla `remindershare`
--
ALTER TABLE `remindershare`
  MODIFY `remindsha_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT de la tabla `repetitiondays`
--
ALTER TABLE `repetitiondays`
  MODIFY `repdays_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT de la tabla `schedules`
--
ALTER TABLE `schedules`
  MODIFY `schedule_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT de la tabla `sleepmode`
--
ALTER TABLE `sleepmode`
  MODIFY `sleep_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

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
  MODIFY `tone_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

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
  ADD CONSTRAINT `reminder_ibfk_2` FOREIGN KEY (`repdays_id`) REFERENCES `repetitiondays` (`repdays_id`) ON DELETE CASCADE,
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
