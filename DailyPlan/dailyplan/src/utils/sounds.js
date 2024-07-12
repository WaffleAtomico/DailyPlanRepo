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

export function base64ToBlob(base64, contentType) {
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



export function playBlobAudio(blob, repetitions = 1, durationInSeconds = 1, repeatIntervalInSeconds = 1) {
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

  audio.onloadedmetadata = () => {
    const totalDurationInSeconds = repetitions * durationInSeconds;
    const totalAudioDurationInSeconds = audio.duration;

    if (totalDurationInSeconds > totalAudioDurationInSeconds) {
      const requiredRepetitions = totalDurationInSeconds / totalAudioDurationInSeconds;
      repetitions = Math.ceil(requiredRepetitions);
    }

    playAudio();
  };

  audio.onerror = (e) => {
    console.error("Error playing audio:", e);
  };
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
