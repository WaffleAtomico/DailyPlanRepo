import axios from 'axios';

import {
  
    ADD_SCHEDULE_SLEEP_URL,
    ADD_SCHEDULE_POMODORO_URL,
    DELETE_SCHEDULE_POMODORO_URL,
    DELETE_SCHEDULE_SLEEP_URL,
    ADD_SCHEDULE_URL,
    GET_SCHEDULES_URL,
    GET_SCHEDULE_BY_ID_URL,
    UPDATE_SCHEDULE_URL,
    DELETE_SCHEDULE_URL
} from '../routes';

// Add Pomodoro schedule
export const addPomodoroSchedule = async (schedule) => {
    try {
        const response = await axios.post(ADD_SCHEDULE_POMODORO_URL, { schedule });
        return response;
    } catch (error) {
        console.error('Error adding Pomodoro schedule:', error);
        throw error;
    }
};

// Add Sleep schedule
export const addSleepSchedule = async (schedule) => {
    try {
        const response = await axios.post(ADD_SCHEDULE_SLEEP_URL, { schedule });
        return response;
    } catch (error) {
        console.error('Error adding Sleep schedule:', error);
        throw error;
    }
};

// Delete Pomodoro schedule
export const deletePomodoroSchedule = async (user_id) => {
    try {
        const response = await axios.post(DELETE_SCHEDULE_POMODORO_URL, { user_id });
        return response;
    } catch (error) {
        console.error('Error deleting Pomodoro schedule:', error);
        throw error;
    }
};

// Delete Sleep schedule
export const deleteSleepSchedule = async (user_id) => {
    try {
        const response = await axios.post(DELETE_SCHEDULE_SLEEP_URL, { user_id });
        return response;
    } catch (error) {
        console.error('Error deleting Sleep schedule:', error);
        throw error;
    }
};

// Existing functions

// Add a schedule
export const addSchedule = async (schedule) => {
    try {
        const response = await axios.post(ADD_SCHEDULE_URL, { schedule });
        return response;
    } catch (error) {
        console.error('Error adding schedule:', error);
        throw error;
    }
};

// Get all schedules
export const getSchedules = async () => {
    try {
        const response = await axios.post(GET_SCHEDULES_URL);
        return response;
    } catch (error) {
        console.error('Error retrieving schedules:', error);
        throw error;
    }
};

// Get schedule by user ID
export const getScheduleById = async (user_id) => {
    try {
        const response = await axios.post(GET_SCHEDULE_BY_ID_URL, { user_id });
        return response;
    } catch (error) {
        console.error('Error retrieving schedule:', error);
        throw error;
    }
};

// Update a schedule
export const updateSchedule = async (schedule) => {
    try {
        const response = await axios.post(UPDATE_SCHEDULE_URL, { schedule });
        return response.data;
    } catch (error) {
        console.error('Error updating schedule:', error);
        throw error;
    }
};

// Delete a schedule
export const deleteSchedule = async (schedule_id) => {
    try {
        const response = await axios.post(DELETE_SCHEDULE_URL, { schedule_id });
        return response.data;
    } catch (error) {
        console.error('Error deleting schedule:', error);
        throw error;
    }
};







//__________________________________
//Utils
//__________________________________

// utils/scheduleUtils.js
export function loadSchedulesFromLocalStorage() {
    const schedules = localStorage.getItem("schedule");
    return schedules ? JSON.parse(schedules) : [];
};

export function checkScheduleConflict(newEvent) {
    const existingEvents = loadSchedulesFromLocalStorage();
    
    const newEventStart = new Date(newEvent.schedule_datetime);
    const newEventEnd = new Date(newEventStart);
    newEventEnd.setHours(newEventEnd.getHours() + newEvent.schedule_duration_hour);
    newEventEnd.setMinutes(newEventEnd.getMinutes() + newEvent.schedule_duration_min);

    return existingEvents.some(event => {
        const eventStart = new Date(event.schedule_datetime);
        const eventEnd = new Date(eventStart);
        eventEnd.setHours(eventEnd.getHours() + event.schedule_duration_hour);
        eventEnd.setMinutes(eventEnd.getMinutes() + event.schedule_duration_min);

        return (newEventStart >= eventStart && newEventStart < eventEnd) ||
               (newEventEnd > eventStart && newEventEnd <= eventEnd);
    });
};


