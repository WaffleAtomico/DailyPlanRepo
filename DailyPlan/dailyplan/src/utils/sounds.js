import dinding from "./sound/din-ding-89718.mp3";
import ringtone from "./sound/ringtone-193209.mp3"
import tap from "./sound/tap-notification.mp3"

export function playRingtone(repetitions = 1, durationInSeconds = 1, repeatIntervalInSeconds = 1) {
  const audio = new Audio(tap);

  let currentTime = 0;
  let currentRepetitions = 0;

  const playAudio = () => {
    audio.currentTime = 0;
    audio.play();
    currentRepetitions++;

    if (currentRepetitions < repetitions) {
      setTimeout(playAudio, repeatIntervalInSeconds * 1000);
    }
  };

  const totalDurationInSeconds = repetitions * durationInSeconds;
  const totalAudioDurationInSeconds = audio.duration;

  if (totalDurationInSeconds > totalAudioDurationInSeconds) {
    const requiredRepetitions = totalDurationInSeconds / totalAudioDurationInSeconds;
    repetitions = Math.ceil(requiredRepetitions);
  }

  playAudio();
}

//alarm for sleep
export function playAlarm(repetitions = 1, durationInSeconds = 3, repeatIntervalInSeconds = 1) {
  const audio = new Audio(ringtone);

  return new Promise((resolve) => {
    let currentRepetitions = 0;
    const playAudio = () => {
      audio.currentTime = 0;
      audio.play();
      currentRepetitions++;

      if (currentRepetitions < repetitions) {
        setTimeout(playAudio, repeatIntervalInSeconds * 1000);
      } else {
        resolve();
      }
    };

    audio.onended = () => {
      if (currentRepetitions >= repetitions) {
        resolve();
      }
    };

    playAudio();
  });
}

//method to split the string in various chunks
export function  splitBase64 (base64String, chunkSize = 1000)  {
  const chunks = [];
  for (let i = 0; i < base64String.length; i += chunkSize) {
      chunks.push(base64String.substring(i, i + chunkSize));
  }
  return chunks;
};


export function playBase64Audio(base64Audio, contentType, repetitions = 1, durationInSeconds = 1, repeatIntervalInSeconds = 1) {
  const blob = base64ToBlob(base64Audio, contentType);
  const audioURL = URL.createObjectURL(blob);
  const audio = new Audio(audioURL);

  let currentRepetitions = 0;

  const playAudio = () => {
    audio.currentTime = 0;
    audio.play();
    currentRepetitions++;

    if (currentRepetitions < repetitions) {
      setTimeout(playAudio, repeatIntervalInSeconds * 1000);
    }
  };

  const totalDurationInSeconds = repetitions * durationInSeconds;
  const totalAudioDurationInSeconds = audio.duration;

  if (totalDurationInSeconds > totalAudioDurationInSeconds) {
    const requiredRepetitions = totalDurationInSeconds / totalAudioDurationInSeconds;
    repetitions = Math.ceil(requiredRepetitions);
  }

  playAudio();
}
export function playBlobAudio(blob, repetitions = 1, durationInSeconds = 1, repeatIntervalInSeconds = 1) {
  const audioURL = URL.createObjectURL(blob);
  const audio = new Audio(audioURL);

  return new Promise((resolve) => {
    let currentRepetitions = 0;

    const playAudio = () => {
      audio.currentTime = 0;
      audio.play();
      currentRepetitions++;

      if (currentRepetitions < repetitions) {
        setTimeout(playAudio, repeatIntervalInSeconds * 1000);
      } else {
        resolve();
      }
    };

    audio.onloadedmetadata = () => {
      const totalDurationInSeconds = repetitions * durationInSeconds;
      const totalAudioDurationInSeconds = audio.duration;

      if (totalDurationInSeconds > totalAudioDurationInSeconds) {
        const requiredRepetitions = totalDurationInSeconds / totalAudioDurationInSeconds;
        repetitions = Math.ceil(requiredRepetitions);
      }

      playAudio();
    };

    audio.onended = () => {
      if (currentRepetitions >= repetitions) {
        resolve();
      }
    };
  });
}


//Function to translate the base64 to a file
export function base64ToFile (base64String, filename, mimeType)  {
  const byteString = atob(base64String);
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
  }
  return new File([ab], filename, { type: mimeType });
};

export function base64ToBlob(base64, mime) {
  const byteCharacters = atob(base64);
  const byteNumbers = new Array(byteCharacters.length);

  for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
  }

  const byteArray = new Uint8Array(byteNumbers);
  return new Blob([byteArray], { type: mime });
};




// Ejemplo de uso
const base64Audio = "TU_BASE64_STRING_AQUÍ"; // Reemplaza esta cadena con tu audio en base64
const contentType = "audio/mp3"; // Reemplaza esto con el tipo de contenido adecuado para tu audio
// playBase64Audio(base64Audio, contentType, 3, 2, 1); // Reproduce el audio 3 veces, con una duración de 2 segundos cada vez, y un intervalo de 1 segundo entre repeticiones
