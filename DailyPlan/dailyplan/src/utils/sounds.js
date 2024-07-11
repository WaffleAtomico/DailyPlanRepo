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



// import { Howl } from "howler";

// //Play the sound N repetitions assigned. 
// export const playAudio = (src, repetitions) => 
//     {
//         console.log('playAudio called with src:', src, 'and repetitions:', repetitions);
        
//         const sound = new Howl({
//             loop: false,
          
//             src: [src],
            
//         });
    
//         console.log('Howl object state', sound.state());
    
//         let playCount = 0;
    
//         sound.on('end', () => {
//             playCount += 1;
//             console.log('Sound ended, playCount:', playCount);
//             if (playCount < repetitions) {
//                 console.log('Replaying sound');
//                 sound.play();
//             } else {
//                 console.log('Finished all repetitions');
//             }
//         });
//         console.log('Howl object state', sound.state());
    
//         sound.play();
//         console.log('Sound started playing');
//     }
