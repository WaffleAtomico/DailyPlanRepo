-- Eliminar el trigger si ya existe
DELIMITER //
DROP TRIGGER IF EXISTS `delete_share_to_users` //
DELIMITER ;

-- Crear el trigger
DELIMITER //
CREATE TRIGGER `delete_share_to_users` 
AFTER UPDATE ON `users` 
FOR EACH ROW 
BEGIN 
    -- Eliminar registros de alarmshare
    DELETE FROM `alarmshare` 
    WHERE `ar_user_id_target` = (SELECT `user_id` FROM `users` WHERE `user_status` = 0); 

    -- Eliminar registros de remindershare
    DELETE FROM `remindershare` 
    WHERE `rs_user_id_target` = (SELECT `user_id` FROM `users` WHERE `user_status` = 0); 

    -- Eliminar registros de usersblocked
    DELETE FROM `usersblocked` 
    WHERE `user_id_target` = (SELECT `user_id` FROM `users` WHERE `user_status` = 0); 

    -- Eliminar invitaciones donde owner y target son usuarios con status 0
    DELETE FROM `invitations` 
    WHERE `user_id_owner` IN (SELECT `user_id` FROM `users` WHERE `user_status` = 0)
    OR `user_id_target` IN (SELECT `user_id` FROM `users` WHERE `user_status` = 0); 

    -- Eliminar recordatorios copias de los creados por usuarios con status 0
    DELETE FROM `reminders` 
    WHERE `reminder_sourse_id` IN (
        SELECT `reminder_id` 
        FROM `reminders` 
        WHERE `user_id` IN (SELECT `user_id` FROM `users` WHERE `user_status` = 0)
    );

    -- Eliminar alarmas copias de las creadas por usuarios con status 0
    DELETE FROM `alarms` 
    WHERE `alarm_sourse_id` IN (
        SELECT `alarm_id` 
        FROM `alarms` 
        WHERE `user_id` IN (SELECT `user_id` FROM `users` WHERE `user_status` = 0)
    );
END //
DELIMITER ;
