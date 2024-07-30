// useNotificationChecker.js
import { useState, useEffect, useRef } from 'react';
import { getUserNotifications } from '../../utils/validations/notification';
import { myPojo } from '../../utils/ShowNotifInfo';

const useNotificationChecker = (id) => {
  const [initialLoad, setInitialLoad] = useState(true);
  const displayedNotifs = useRef(new Set());

  useEffect(() => {
    const fetchNotifications = () => {
      getUserNotifications(id).then(res => {
        // console.log("Me ejecute");
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
            });
          }
          setInitialLoad(false);
        }
      }).catch(err => { console.log(err) });
    };
    const intervalId = setInterval(fetchNotifications, 10000); // 120000ms = 2 minutos
    return () => clearInterval(intervalId);
  }, [id]);

  return null; 
};

export default useNotificationChecker;
