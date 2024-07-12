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

function base64ToBlob(base64, contentType) {
  const byteCharacters = atob(base64);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += 512) {
    const slice = byteCharacters.slice(offset, offset + 512);
    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  return new Blob(byteArrays, { type: contentType });
}


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

// Ejemplo de uso
const base64Audio = "TU_BASE64_STRING_AQUÍ"; // Reemplaza esta cadena con tu audio en base64
const contentType = "audio/mp3"; // Reemplaza esto con el tipo de contenido adecuado para tu audio
// playBase64Audio(base64Audio, contentType, 3, 2, 1); // Reproduce el audio 3 veces, con una duración de 2 segundos cada vez, y un intervalo de 1 segundo entre repeticiones
