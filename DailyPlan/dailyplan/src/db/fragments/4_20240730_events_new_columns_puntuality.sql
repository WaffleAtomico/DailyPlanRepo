DROP EVENT IF EXISTS `WeeklyScoreCard`;
CREATE DEFINER=`root`@`localhost` EVENT `WeeklyScoreCard` ON SCHEDULE EVERY 1 WEEK STARTS '2024-07-28 18:00:00' ON COMPLETION PRESERVE ENABLE COMMENT 'Evento semanal, calcula el promedio de puntualidad' DO INSERT INTO `weeklyscorecard` (`user_id`, `punt_weekly_date`, `punt_value`, `punt_num_rem`, `punt_percent_rem`, `punt_num_alar`, `punt_percent_alar`, `punt_num_timer`, `punt_percent_timer`, `punt_num_chro`, `punt_percent_chro`)
    SELECT `user_id`, `punt_date`, AVG(`punt_value`), AVG(`punt_num_rem`), AVG(`punt_percent_rem`), AVG(`punt_num_alar`), AVG(`punt_percent_alar`), AVG(`punt_num_timer`), AVG(`punt_percent_timer`), AVG(`punt_num_chro`), AVG(`punt_percent_chro`)
    FROM `puntuality`
    WHERE (SELECT count(*) AS count FROM `puntuality` WHERE `punt_date` BETWEEN date_add(CURRENT_TIMESTAMP, INTERVAL -7 DAY) AND CURRENT_TIMESTAMP) > 0 AND `punt_date` BETWEEN date_add(CURRENT_TIMESTAMP, INTERVAL -7 DAY) AND CURRENT_TIMESTAMP
    GROUP BY `user_id`;

CREATE TRIGGER `delete_share_to_users` AFTER UPDATE ON `users` FOR EACH ROW BEGIN DELETE FROM `alarmshare` WHERE `ar_user_id_target` = (SELECT `user_id` FROM `users` WHERE `user_status` = 0); DELETE FROM `remindershare` WHERE `rs_user_id_target` = (SELECT `user_id` FROM `users` WHERE `user_status` = 0); DELETE FROM `usersblocked` WHERE `user_id_target` = (SELECT `user_id` FROM `users` WHERE `user_status` = 0); END;

ALTER TABLE `puntuality` ADD `streak` BOOLEAN NOT NULL DEFAULT FALSE AFTER `punt_percent_chro`, ADD `streak_start_date` DATE NULL AFTER `streak`; 