// useNotificationChecker.js
import { useState, useEffect, useRef } from 'react';
import { getUserNotifications } from '../../utils/validations/notification';
import { getAlarmsForUser } from '../../utils/validations/alarm';
import { getDaySelectedById } from '../../utils/validations/dayselected';
import { myPojo } from '../../utils/ShowNotifInfo';

const useNotificationChecker = (id) => {
  const [initialLoad, setInitialLoad] = useState(true);
  const displayedNotifs = useRef(new Set());

  useEffect(() => {
    const fetchNotifications = () => {
      userNotifications(id);
      alarmNotifications(id);
    };
    const intervalId = setInterval(fetchNotifications, 40000); // 120000ms = 2 minutos, 40000 = 40 segundos
    return () => clearInterval(intervalId);
  }, [id]);
  
  const userNotifications = (id) => {
    getUserNotifications(id).then(res => {
      if (res.status) {
        const notifs = res.data.map(item => ({
          id: item.notification_id,
          date: new Date(item.notification_date).toISOString().split('T')[0],
          name: item.notification_name,
          type: item.notification_type,
        }));
  
        if (!initialLoad) {
          notifs.forEach(newNotif => {
            if (newNotif.type === 1 && !displayedNotifs.current.has(newNotif.id)) {
              myPojo.setNotif("Cancelación", <>{newNotif.name}</>);
              displayedNotifs.current.add(newNotif.id); // Marcar la notificación como mostrada
            }
            //notificacion 7 es para el logro de Sintonía
            if (newNotif.type === 7 && !displayedNotifs.current.has(newNotif.id)) {
              myPojo.setNotif(`Cancelación ${newNotif.name}`, <>{newNotif.name}</>);
              displayedNotifs.current.add(newNotif.id); // Marcar la notificación como mostrada
            }
          });
        }
        setInitialLoad(false);
      }
    }).catch(err => { console.log(err) });
  };
  
  const alarmNotifications = (id) => {
    
    getAlarmsForUser(id).then(res => {
      if (res.status) {
        if (!initialLoad) {
          res.data.forEach(alarma => {
            getDaySelectedById(alarma.daysel_id).then(res_days => {
              const dayselResp = res_days.data[0];
              
              const date = new Date();
              const dias=["dom", "lun", "mar", "mie", "jue", "vie", "sab"];
  
              const day = dias[date.getDay()];
              const hour = String(date.getHours()).padStart(2, '0');
              const min = String(date.getMinutes()).padStart(2, '0');
  
              if (dayselResp.daysel_mon === 1 && day === "lun" && hour === alarma.alarm_hour && min === alarma.alarm_min) {
                myPojo.setNotif("Alarma", <>{alarma.alarm_name}</>);
                displayedNotifs.current.add(alarma.alarm_id); // Marcar la notificación como mostrada
              }
              if (dayselResp.daysel_tues === 1 && day === "mar" && hour === alarma.alarm_hour && min === alarma.alarm_min) {
                myPojo.setNotif("Alarma", <>{alarma.alarm_name}</>);
                displayedNotifs.current.add(alarma.alarm_id); // Marcar la notificación como mostrada
              }
              if (dayselResp.daysel_wed === 1 && day === "mie" && hour === alarma.alarm_hour && min === alarma.alarm_min) {
                myPojo.setNotif("Alarma", <>{alarma.alarm_name}</>);
                displayedNotifs.current.add(alarma.alarm_id); // Marcar la notificación como mostrada
              }
              if (dayselResp.daysel_thur === 1 && day === "jue" && hour === alarma.alarm_hour && min === alarma.alarm_min) {
                myPojo.setNotif("Alarma", <>{alarma.alarm_name}</>);
                displayedNotifs.current.add(alarma.alarm_id); // Marcar la notificación como mostrada
              }
              if (dayselResp.daysel_fri === 1 && day === "vie" && parseInt(hour) === alarma.alarm_hour && parseInt(min) === alarma.alarm_min) {
                myPojo.setNotif("Alarma", <>{alarma.alarm_name}</>);
                displayedNotifs.current.add(alarma.alarm_id); // Marcar la notificación como mostrada
              }
              if (dayselResp.daysel_sat === 1 && day === "sab" && hour === alarma.alarm_hour && min === alarma.alarm_min) {
                myPojo.setNotif("Alarma", <>{alarma.alarm_name}</>);
                displayedNotifs.current.add(alarma.alarm_id); // Marcar la notificación como mostrada
              }
              if (dayselResp.daysel_sun === 1 && day === "dom" && hour === alarma.alarm_hour && min === alarma.alarm_min) {
                myPojo.setNotif("Alarma", <>{alarma.alarm_name}</>);
                displayedNotifs.current.add(alarma.alarm_id); // Marcar la notificación como mostrada
              }
            }).catch(err => { console.log(err) });
          });
        }
        setInitialLoad(false);
      }
    }).catch(err => { console.log(err) });
  };

  return null;
}

export default useNotificationChecker;