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

    //Now, with the correct range calculate a giatt level 9999.
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