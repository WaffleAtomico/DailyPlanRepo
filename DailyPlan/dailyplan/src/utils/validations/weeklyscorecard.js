import axios from 'axios';
import {
    GET_WEEKLY_SCORECARD_URL,
    GET_WEEKLY_SCORECARD_BY_ID_URL,
    GET_WEEKLY_SCORECARD_FOR_USER_URL,
    GET_IS_USER_WEEKLY_SCORECARD_URL,
    UPD_TITLE_USER
} from '../routes';

export const getWeeklyScorecard = async () => {
    try {
        const response = await axios.post(GET_WEEKLY_SCORECARD_URL);
        //   return response.data;
        return response;
    } catch (err) {
        console.log(err);
        throw err;
    }
};

export const getWeeklyScorecardById = async (weeklyScorecardId) => {
    try {
        const response = await axios.post(GET_WEEKLY_SCORECARD_BY_ID_URL, { weeklyscorecard_id: weeklyScorecardId });
        //   return response.data;
        return response;
    } catch (err) {
        console.log(err);
        throw err;
    }
};

export const getWeeklyScorecardForUser = async (userId) => {
    try {
        const response = await axios.post(GET_WEEKLY_SCORECARD_FOR_USER_URL, { user_id: userId });
        //   return response.data;
        return response;
    } catch (err) {
        console.log(err);
        throw err;
    }
};

export const isUserWeeklyScorecard = async (userId) => {
    try {
        const response = await axios.post(GET_IS_USER_WEEKLY_SCORECARD_URL, { user_id: userId });
        //   return response.data;
        return response;
    } catch (err) {
        console.log(err);
        throw err;
    }
};

export const updateTitleUser = async (titleDone, userId, titleId) => {
    try {
        const response = await axios.post(UPD_TITLE_USER, { title_done: titleDone, user_id: userId, title_id: titleId });
        //   return response.data;
        return response;
    } catch (err) {
        console.log(err);
        throw err;
    }
};
