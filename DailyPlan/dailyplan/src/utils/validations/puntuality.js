//--------------------------------------------------------
//CRUD Operations
import axios from 'axios';
import {
    ADD_PUNTUALITY_URL,
   GET_PUNTUALITIES_URL,
   GET_PUNTUALITY_BY_ID_URL,
   GET_PUNTUALITY_BY_USER_ID_AND_DATE_URL,
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
        const response = await axios.post(GET_PUNTUALITIES_URL);
        return response;
    } catch (err) {
        console.log("Error retrieving punctualities:", err);
        return "Error retrieving punctualities";
    }
};

// Function to get punctuality by ID
export const getPuntualityById = async (user_id) => {
    try {
        const response = await axios.post(GET_PUNTUALITY_BY_ID_URL, { user_id });
        // console.log(response.data[0]);
        return response;
    } catch (err) {
        console.log("Error retrieving punctuality:", err);
        return "Error retrieving punctuality";
    }
};

// Function to get punctuality by user ID and date
export const getPuntualityByUserIdAndDate = async (user_id, date) => {
    try {
        const response = await axios.post(GET_PUNTUALITY_BY_USER_ID_AND_DATE_URL, { user_id, date });
        return response.data;
    } catch (err) {
        console.log("Error retrieving punctuality by date:", err);
        return "Error retrieving punctuality by date";
    }
};

// Function to update punctuality
export const updatePuntuality = async ( puntualityInfo) => {

    console.log("actualizar lol" ,puntualityInfo);
    
    try {
        const response = await axios.post(UPDATE_PUNTUALITY_URL, {puntualityInfo});
        return response;
    } catch (err) {
        console.log("Error updating punctuality:", err);
        return "Error updating punctuality";
    }
};

// Function to delete punctuality
export const deletePuntuality = async (punt_id) => {
    try {
        const response = await axios.delete(DELETE_PUNTUALITY_URL, {punt_id});
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
        if(punctuality - 5 < 0){
            punctuality = 0;
        }else
        {
            punctuality =- 5; // Subtract 5% of the punctuality
        }
        return punctuality; 
    }
    return punctuality;
}

//Method to get the percentage of all the marks
//Method to get the percentage of all the marks
export const getPercentages = (expectedTimes, actualTimes) => {
    if (expectedTimes.length !== actualTimes.length) {
        throw new Error("The length of expectedTimes and actualTimes must be the same.");
    }

    console.log("La info de las marcas:", expectedTimes);
    console.log("La info de las marcas:", actualTimes);

    const differences = expectedTimes.map((expectedTime, index) => 
        calculateDifferenceInSeconds(expectedTime, actualTimes[index])
    );

    console.log("La diferencia:", differences);

    const totalDifference = differences.reduce((sum, difference) => sum + Math.abs(difference), 0);
    const averageDifference = totalDifference / differences.length;

    if (averageDifference === 0) {
        console.error("Average difference is zero, cannot calculate percentage.");
        return 0; // Return 0 if averageDifference is zero
    }

    console.log("El promedio es:", averageDifference);

    // Calculate the percentage based on total and average differences
    const percentage = (totalDifference / averageDifference) * 10; // Adjusted to a more appropriate scale

    console.log("percentage final:", percentage);

    return percentage;
};
 
// Private methods



//-----------------------
//Private methods
//-------------------------


// Method to calculate the difference in second of the expected time and the actual time

const calculateDifferenceInSeconds = (expectedTime, actualTime) => {
    console.log("los tiempos ", actualTime, expectedTime);
    const [expectedHours, expectedMinutes, expectedSeconds] = expectedTime.split(":").map(Number);
    const expectedTotalSeconds = expectedHours * 3600 + expectedMinutes * 60 + expectedSeconds;
    const actualTotalSeconds = Math.floor(actualTime);

    const difference = actualTotalSeconds - expectedTotalSeconds;
    console.log("La diferencia es:", difference);
    return difference;
};

// Get the average of all the differences.
const getAverageDifference = (differences) => {
    const totalDifference = differences.reduce((sum, diff) => sum + Math.abs(diff), 0);
    return totalDifference / differences.length;
};