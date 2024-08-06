DROP TRIGGER IF EXISTS `after_alarmshare_insert`;
CREATE DEFINER=`root`@`localhost` TRIGGER `after_alarmshare_insert` AFTER INSERT ON `alarmshare` FOR EACH ROW BEGIN DECLARE new_alarm_id INT; 
-- Clone the alarm
INSERT INTO alarms (alarm_name, daysel_id, alarm_hour, alarm_min, alarm_sec, alarm_rep_tone, tone_id, alarm_days_suspended, alarm_active, alarm_image, alarm_desc, user_id) 
SELECT alarm_name, daysel_id, alarm_hour, alarm_min, alarm_sec, alarm_rep_tone, tone_id, alarm_days_suspended, alarm_active, alarm_image, alarm_desc, NEW.ar_user_id_target 
FROM alarms WHERE alarm_id = NEW.alarm_id; SET new_alarm_id = LAST_INSERT_ID(); END 



DROP TRIGGER IF EXISTS `after_alarmshare_delete`;
CREATE DEFINER=`root`@`localhost` TRIGGER `after_alarmshare_delete` AFTER DELETE ON `alarmshare` FOR EACH ROW BEGIN 
-- Delete the cloned alarm
DELETE FROM alarms WHERE user_id = OLD.ar_user_id_target AND alarm_id = OLD.alarm_id; END 