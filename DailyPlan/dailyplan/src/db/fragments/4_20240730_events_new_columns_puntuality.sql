DROP EVENT IF EXISTS `WeeklyScoreCard`;
CREATE DEFINER=`root`@`localhost` EVENT `WeeklyScoreCard` ON SCHEDULE EVERY 1 WEEK STARTS '2024-07-28 18:00:00' ON COMPLETION PRESERVE ENABLE COMMENT 'Evento semanal, calcula el promedio de puntualidad' DO INSERT INTO `weeklyscorecard` (`user_id`, `punt_weekly_date`, `punt_value`, `punt_num_rem`, `punt_percent_rem`, `punt_num_alar`, `punt_percent_alar`, `punt_num_timer`, `punt_percent_timer`, `punt_num_chro`, `punt_percent_chro`)
    SELECT `user_id`, `punt_date`, AVG(`punt_value`), AVG(`punt_num_rem`), AVG(`punt_percent_rem`), AVG(`punt_num_alar`), AVG(`punt_percent_alar`), AVG(`punt_num_timer`), AVG(`punt_percent_timer`), AVG(`punt_num_chro`), AVG(`punt_percent_chro`)
    FROM `puntuality`
    WHERE (SELECT count(*) AS count FROM `puntuality` WHERE `punt_date` BETWEEN date_add(CURRENT_TIMESTAMP, INTERVAL -7 DAY) AND CURRENT_TIMESTAMP) > 0 AND `punt_date` BETWEEN date_add(CURRENT_TIMESTAMP, INTERVAL -7 DAY) AND CURRENT_TIMESTAMP
    GROUP BY `user_id`;

