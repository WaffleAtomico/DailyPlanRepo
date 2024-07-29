function timeFormatSec(seconds){
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    if (seconds < 60) {
        return `${seconds.toFixed(2)} segundos`;
    } else if (seconds < 3600) {
        return `${minutes} minutos y ${(seconds % 60).toFixed(2)} segundos`;
    } else {
        return `${hours} horas, ${minutes % 60} minutos y ${(seconds % 60).toFixed(2)} segundos`;
    }
}

const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based, so add 1
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};


function timeFormatHHMMSS(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60); 
    const secs = seconds % 60;

    return {
        hours: hours,
        minutes: minutes,
        seconds: secs
    };
}

function timeFormatHHMMSSString(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    // Format each component to be two digits
    const formattedHours = hours.toString().padStart(2, '0');
    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedSeconds = secs.toString().padStart(2, '0');

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}


const calculateWeekRange = () => {
    const today = new Date();
    const dayOfWeek = today.getDay(); // Sunday - Saturday : 0 - 6

    // Calculate start of the week (Monday)
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1));

    // Calculate end of the week (Sunday)
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);

    const formatDate = (date) => date.toISOString().split('T')[0];

    return {
        startDate: formatDate(startOfWeek),
        endDate: formatDate(endOfWeek),
    };
};


export {
    timeFormatSec, timeFormatHHMMSS, calculateWeekRange, formatDate, timeFormatHHMMSSString
}