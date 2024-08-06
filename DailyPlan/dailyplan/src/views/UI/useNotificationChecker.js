import { useState, useEffect, useRef } from 'react';
import { getUserNotifications } from '../../utils/validations/notification';
import { getAlarmsForUser } from '../../utils/validations/alarm';
import { getDaySelectedById } from '../../utils/validations/dayselected';
import { myPojo } from '../../utils/ShowNotifInfo';
import { getUserReminders } from '../../utils/validations/reminders';
import { getSleepmodeById } from '../../utils/validations/sleep';
import { getSleepQualityById } from '../../utils/validations/sleepquality';
import { getToneById } from '../../utils/validations/tone';
import { playAlarm, playBlobAudio } from '../../utils/sounds';

const useNotificationChecker = (id) => {
  const [initialLoad, setInitialLoad] = useState(true);
  const displayedNotifs = useRef(new Set());
  const [alreadySurvey, setAlreadySurvey] = useState(false);

  useEffect(() => {
    const fetchNotifications = () => {

     userNotifications(id);
      alarmNotifications(id);
     
      blockPreparationNotifications(id);
      sleepNotifications(id);
      console.log("Se está llamando...");
    }; 
    const intervalId = setInterval(fetchNotifications, 20000); 
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
            // notificación 7 es para el logro de Sintonía
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
              const dias = ["dom", "lun", "mar", "mie", "jue", "vie", "sab"];

              const day = dias[date.getDay()];
              const hour = String(date.getHours()).padStart(2, '0');
              const min = String(date.getMinutes()).padStart(2, '0');

              if (
                (dayselResp.daysel_mon === 1 && day === "lun") ||
                (dayselResp.daysel_tues === 1 && day === "mar") ||
                (dayselResp.daysel_wed === 1 && day === "mie") ||
                (dayselResp.daysel_thur === 1 && day === "jue") ||
                (dayselResp.daysel_fri === 1 && day === "vie") ||
                (dayselResp.daysel_sat === 1  && day === "sab") ||
                (dayselResp.daysel_sun === 1 && day === "dom")
              ) {

                console.log("verificando.. hora:", hour, "minutos:", min, "valores de alarma hour:", alarma.alarm_hour, "min:", alarma.alarm_min);

                const hourInt = parseInt(hour, 10);
                const minInt = parseInt(min, 10);
                
                console.log(hourInt === alarma.alarm_hour && minInt === alarma.alarm_min);
                if (hourInt === alarma.alarm_hour && minInt === alarma.alarm_min) {
                  console.log("Mostrar alarma");
                  myPojo.setNotif("Alarma", <>{alarma.alarm_name}</>);

                  /*  Reproducir tono
                   */

                  getToneById(alarma.tone_id).then(response => {
                      console.log("Reproducir tono", response);
                    if(response.toneName === null)
                    {
                      playAlarm(alarma.alarm_rep_tone, alarma.alarm_sec );
                    }
                    else
                    {
                      playBlobAudio(response.toneBlob, alarma.alarm_rep_tone, alarma.alarm_sec);
                    }


                     // Marcar la notificación como mostrada
                  });
                  displayedNotifs.current.add(alarma.alarm_id);
                  
                }
              }
            }).catch(err => { console.log(err) });
          });
        }
        setInitialLoad(false);
      }
    }).catch(err => { console.log(err) });
  };

  
  const blockPreparationNotifications = (id) => {
    // Implement block preparation notifications
  };


const verifySleepForm = (id) => {

  const currentDate = new Date().toISOString().split('T')[0];
  getSleepQualityById({ quality_id: id, current_date: currentDate }).then(res => {

    return (res.data[0] != null);

    
    // Handle sleep quality
  }).catch(err => { console.log(err) });
};

const sleepNotifications = (id) => {
  getSleepmodeById(id).then(response => {
    if (!response.status) {
      console.log("No se procesó la solicitud");
      return;
    }

    response.data.forEach(sleep => {
      if (sleep.sleep_active === null || sleep.sleep_active === 0 || sleep.sleep_starthour === 0) {
        console.log("No se está activado. Esperando encontrar Sleep activo...");
        return;
      }

      // Calculate current time in minutes since midnight
      const now = new Date();
      const currentMinutes = now.getHours() * 60 + now.getMinutes();

      // Check if it's time to go to sleep
      if (currentMinutes === sleep.sleep_starthour && currentMinutes < sleep.sleep_endhour) {
        // If the user hasn't completed the sleep form
        if (!verifySleepForm()) {
          myPojo.setNotif("Dormir", <h1>¡Es hora de dormir!</h1>);
        }
      }

      // Check if it's time to wake up
      if (currentMinutes === sleep.sleep_endhour || currentMinutes < sleep.sleep_starthour) {
        myPojo.setNotif("Despertar", <h1>¡Es hora de despertar!</h1>);
      }
    });
  }).catch(err => {
    console.log(err);
  });
};

  return null;
};

export default useNotificationChecker;
