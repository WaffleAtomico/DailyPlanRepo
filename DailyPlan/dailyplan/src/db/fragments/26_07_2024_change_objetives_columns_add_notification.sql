ALTER TABLE `objectives` DROP `obj_check`;

ALTER TABLE `objectives` DROP `obj_duration_min`;

ALTER TABLE `objectives` DROP `obj_durationreal_min`;


-- Agregar las nuevas columnas
ALTER TABLE `objectivesblock` ADD COLUMN `objblo_check` INT NULL;
ALTER TABLE `objectivesblock` ADD COLUMN `objblo_duration_min` INT NULL;
ALTER TABLE `objectivesblock` ADD COLUMN `objblo_durationreal_min` INT NULL;

CREATE TABLE `dailyplan`.`notifications` (`notification_id` INT NULL DEFAULT NULL , `notification_name` VARCHAR(255) NULL DEFAULT NULL , `notification_date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP , `notification_type` TINYINT NULL DEFAULT '0' , `user_id` INT NULL DEFAULT NULL , PRIMARY KEY (`notification_id`)) ENGINE = InnoDB; 


ALTER TABLE `notifications` ADD CONSTRAINT `notification_user_user_id` FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;



-- Cambio de valor por defecto de columna objblo_duration_min

ALTER TABLE `objectivesblock` CHANGE `objblo_duration_min` `objblo_duration_min` INT(11) NULL DEFAULT '5'; 