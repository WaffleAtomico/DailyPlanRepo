export const addAlarm = async (alarmData) => {
    try {
      const response = await axios.post(`${urllocalhost}/add-alarm`, alarmData);
    //   return response.data;
      return response;
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
  
  // Campos que se deben enviar en alarmData:
  // alarm_name, daysel_id, alarm_hour, alarm_min, alarm_sec, alarm_rep_tone, tone_id, alarm_days_suspended, alarm_active, alarm_imgage, alarm_desc, user_id
  export const getAlarmsForUser = async (userId) => {
    try {
      const response = await axios.post(`${urllocalhost}/get-user-alarms`, { user_id: userId });
    //   return response.data;
      return response;
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
  
  export const getAlarmById = async (alarmId) => {
    try {
      const response = await axios.post(`${urllocalhost}/get-alarm`, { alarm_id: alarmId });
    //   return response.data;
      return response;
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
  
  // Campos que se deben enviar en alarmData:
  // alarm_name, daysel_id, alarm_hour, alarm_min, alarm_sec, alarm_rep_tone, tone_id, alarm_days_suspended, alarm_active, alarm_imgage, alarm_desc, alarm_id
  export const updateAlarm = async (alarmData) => {
    try {
      const response = await axios.post(`${urllocalhost}/updatte-alarm`, alarmData);
    //   return response.data;
      return response;
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
  
  export const deleteAlarm = async (alarmId) => {
    try {
      const response = await axios.post(`${urllocalhost}/delete-alarm`, { alarm_id: alarmId });
    //   return response.data;
      return response;
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
  
  // Campos que se deben enviar en alarmInfo:
  // alarm_name, user_id
  export const isAlarmNameExistForUser = async (alarmInfo) => {
    try {
      const response = await axios.post(`${urllocalhost}/alarms-existsname`, alarmInfo);
    //   return response.data.exists;
      return response;
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
  
  // Campos que se deben enviar en userData:
  // user_id
  export const isUserAlarmLimitReached = async (userData) => {
    try {
      const response = await axios.post(`${urllocalhost}/alarms-limit-user`, userData);
    //   return response.data.isLimitReached;
      return response;
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
  