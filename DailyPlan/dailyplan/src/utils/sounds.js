/*
    Name:sounds
    use: Manage the sounds of differents effects
*/
import { Howl } from "howler";

//Play the sound N repetitions assigned. 
export const playAudio = (src, repetitions) => 
    {
        console.log('playAudio called with src:', src, 'and repetitions:', repetitions);
        
        const sound = new Howl({
            loop: false,
          
            src: [src],
            
        });
    
        console.log('Howl object state', sound.state());
    
        let playCount = 0;
    
        sound.on('end', () => {
            playCount += 1;
            console.log('Sound ended, playCount:', playCount);
            if (playCount < repetitions) {
                console.log('Replaying sound');
                sound.play();
            } else {
                console.log('Finished all repetitions');
            }
        });
        console.log('Howl object state', sound.state());
    
        sound.play();
        console.log('Sound started playing');
    }