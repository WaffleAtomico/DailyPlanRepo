//--------------------------------------------------------
//CRUD Operations
import axios from 'axios';
import {
    ADD_PUNTUALITY_URL,
   GET_PUNTUALITIES_URL,
   GET_PUNTUALITY_BY_ID_URL,
    UPDATE_PUNTUALITY_URL,
    DELETE_PUNTUALITY_URL
} from '../routes';

// Function to add punctuality
export const addPuntuality = async (puntualityInfo) => {
    try {
        const response = await axios.post(ADD_PUNTUALITY_URL, puntualityInfo);
        return response;
    } catch (err) {
        console.log("Error adding punctuality:", err);
        return "Error adding punctuality";
    }
};

// Function to get all punctualities
export const getPuntuality = async () => {
    try {
        const response = await axios.get(GET_PUNTUALITIES_URL);
        return response;
    } catch (err) {
        console.log("Error retrieving punctualities:", err);
        return "Error retrieving punctualities";
    }
};

// Function to get punctuality by ID
export const getPuntualityById = async (punt_id) => {
    try {
        const response = await axios.get(`${GET_PUNTUALITY_BY_ID_URL}/${punt_id}`);
        return response;
    } catch (err) {
        console.log("Error retrieving punctuality:", err);
        return "Error retrieving punctuality";
    }
};

// Function to update punctuality
export const updatePuntuality = async (punt_id, puntualityInfo) => {
    try {
        const response = await axios.put(`${UPDATE_PUNTUALITY_URL}/${punt_id}`, puntualityInfo);
        return response;
    } catch (err) {
        console.log("Error updating punctuality:", err);
        return "Error updating punctuality";
    }
};

// Function to delete punctuality
export const deletePuntuality = async (punt_id) => {
    try {
        const response = await axios.delete(`${DELETE_PUNTUALITY_URL}/${punt_id}`);
        return response;
    } catch (err) {
        console.log("Error deleting punctuality:", err);
        return "Error deleting punctuality";
    }
};












//------------------------------------------------------------
//Calculate the range and percent 
export function calculatePunctuality(timeInMinutes) {

    //if it great than 60 minutes, it's equal to 0%
    if (timeInMinutes > 60) {
        return 0;
    }

    //Dictoinary, all the ranges
    const punctualityRanges = [
        { min: 0, max: 5, percentageMin: 90, percentageMax: 100 },
        { min: 5.01, max: 10, percentageMin: 70, percentageMax: 89 },
        { min: 10.01, max: 20, percentageMin: 40, percentageMax: 69 },
        { min: 20.01, max: 30, percentageMin: 10, percentageMax: 39 },
        { min: 30.01, max: 60, percentageMin: 0, percentageMax: 9 },
    ];


    //find the correct range of the punctuality.
    const range = punctualityRanges.find(r => timeInMinutes >= r.min && timeInMinutes <= r.max);

    //if it doesn't find a correct range, just 0 bro.
    if (!range) {
        return 0;
    }

   
    const { min, max, percentageMin, percentageMax } = range;

    //Calculate the time
    const timeInDecimal = (timeInMinutes - min) / (max - min);

    //finally, his punctuality
    const punctuality = ((timeInDecimal * (percentageMax - percentageMin)) - (percentageMax - percentageMin)) + percentageMin;

    return punctuality;
}

//Method to calculate the percent of improve of the user
export function percentImprove(approx, exact) {
    return Math.abs(approx - exact) / exact * 100;
}

//Method to calculate if the user have a penalty with the punctuality with the difference of time.
export function applyLatePenalty(punctuality, timeDifferenceInMinutes) {
    if (timeDifferenceInMinutes > 10) {
        return punctuality * 0.95; // Subtract 5% of the punctuality
    }
    return punctuality;
}

//Method to get the percentage of all the marks
export const getPercentages = (expectedTimes, actualTimes) => {
    const differences = expectedTimes.map((expectedTime, index) => 
        calculateDifferenceInSeconds(expectedTime, actualTimes[index])
    );


    const averageDifference = getAverageDifference(differences);

    const  percentages = differences.map(difference => (Math.abs(difference) / averageDifference) * 100);

    return percentages;

};



//-----------------------
//Private methods
//-------------------------


//Method to calculate the difference in second of the expected time and the actual time
const calculateDifferenceInSeconds = (expectedTime, actualTime) => {
    const [expectedHours, expectedMinutes, expectedSeconds] = expectedTime.split(":").map(Number);
    const expectedTotalSeconds = expectedHours * 3600 + expectedMinutes * 60 + expectedSeconds;
    const actualTotalSeconds = Math.floor(actualTime);
    return actualTotalSeconds - expectedTotalSeconds;
};


//Get the average of all the diferences.
const getAverageDifference = (differences) => {
    const totalDifference = differences.reduce((sum, diff) => sum + Math.abs(diff), 0);
    return totalDifference / differences.length;
};

