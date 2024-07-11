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

export {
    timeFormatSec, timeFormatHHMMSS
}