-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 17-07-2024 a las 01:37:51
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
  `alarm_image` text DEFAULT NULL,
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
  `tone_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sleepquality`
--

CREATE TABLE `sleepquality` (
  `quality_id` int(11) NOT NULL,
  `quality_good` tinyint(1) DEFAULT NULL,
  `quality_medium` tinyint(1) DEFAULT NULL,
  `quiality_bad` tinyint(1) DEFAULT NULL,
  `quality_date` date NOT NULL DEFAULT current_timestamp(),
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
(53, 'a20300701@ceti.mx', 'testuser', '123', '3319191818', 1, NULL);

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
(53, 13, 0),
(53, 14, 0),
(53, 15, 0),
(53, 16, 0);

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
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=54;

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
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
