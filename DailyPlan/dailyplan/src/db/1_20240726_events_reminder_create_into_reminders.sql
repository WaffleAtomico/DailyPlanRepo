DROP EVENT IF EXISTS `WeeklyScoreCard`;
CREATE DEFINER=`root`@`localhost` EVENT `WeeklyScoreCard` ON SCHEDULE EVERY 1 WEEK STARTS '2024-07-28 18:00:00' ON COMPLETION PRESERVE ENABLE COMMENT 'Evento semanal, calcula el promedio de puntualidad' DO INSERT INTO `weeklyscorecard` (`user_id`, `punt_weekly_date`, `punt_value`, `punt_num_rem`, `punt_percent_rem`, `punt_num_alar`, `punt_percent_alar`, `punt_num_timer`, `punt_percent_timer`, `punt_num_chro`, `punt_percent_chro`)
    SELECT `user_id`, `punt_date`, AVG(`punt_value`), AVG(`punt_num_rem`), AVG(`punt_percent_rem`), AVG(`punt_num_alar`), AVG(`punt_percent_alar`), AVG(`punt_num_timer`), AVG(`punt_percent_timer`), AVG(`punt_num_chro`), AVG(`punt_percent_chro`)
    FROM `puntuality`
    WHERE (SELECT count(*) AS count FROM `puntuality` WHERE `punt_date` BETWEEN date_add(CURRENT_TIMESTAMP, INTERVAL -7 DAY) AND CURRENT_TIMESTAMP) > 0 AND `punt_date` BETWEEN date_add(CURRENT_TIMESTAMP, INTERVAL -7 DAY) AND CURRENT_TIMESTAMP
    GROUP BY `user_id`

DROP EVENT IF EXISTS `DailyPuntuality`;
CREATE DEFINER=`root`@`localhost` EVENT `DailyPuntuality` ON SCHEDULE EVERY 1 DAY STARTS '2024-07-26 00:00:00' ON COMPLETION PRESERVE ENABLE COMMENT 'Se genera entrada en puntualidad cada día a media noche' DO INSERT INTO `puntuality` (`user_id`, `punt_date`, `punt_value`, `punt_num_rem`, `punt_percent_rem`, `punt_num_alar`, `punt_percent_alar`, `punt_num_timer`, `punt_percent_timer`, `punt_num_chro`, `punt_percent_chro`) SELECT `user_id`, CURRENT_TIMESTAMP, 0, 0, 0, 0, 0, 0, 0, 0, 0 FROM `users`;

ALTER TABLE `reminders` ADD `reminder_create` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP AFTER `reminder_name`;

DROP EVENT IF EXISTS `ReminderCancel`;
CREATE DEFINER=`root`@`localhost` EVENT `ReminderCancel` ON SCHEDULE EVERY 1 MINUTE STARTS '2024-07-25 00:00:00' ON COMPLETION PRESERVE ENABLE COMMENT 'Cancela el recordatorio si supero el 80% de tiempo antes de verl' DO UPDATE `reminders` SET `reminder_active` = 0 WHERE ROUND(( DATEDIFF(`reminder_create`, `reminder_date`) / DATEDIFF(`reminder_create`, CURRENT_DATE) * 100 ),2) >= 80 AND `reminder_active` = 1; 