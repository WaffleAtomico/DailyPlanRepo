import React, { useState, useEffect } from "react";
import Timer from "./Timer";
import '../../../styles/UI/Countdowntimer/countdown.css';
import { addTimer, getTimersForUser } from "../../../utils/validations/timer";

export default function CountdownTimer(props) {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [milliseconds, setMilliseconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [sound, setSound] = useState('');
  const [soundFile, setSoundFile] = useState(null);

  const [showEndScreen, setShowEndScreen] = useState({
    show: false,
    message: "Tiempo agotado",
  });

  const [ringDuration, setRingDuration] = useState(1);
  const [ringRepetitions, setRingRepetitions] = useState(1);
  const [timers, setTimer] = useState([]);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        if (milliseconds > 0) {
          setMilliseconds((ms) => ms - 1);
        } else if (seconds > 0) {
          setSeconds((sec) => sec - 1);
          setMilliseconds(99);
        } else if (minutes > 0) {
          setMinutes((min) => min - 1);
          setSeconds(59);
          setMilliseconds(99);
        } else if (hours > 0) {
          setHours((hr) => hr - 1);
          setMinutes(59);
          setSeconds(59);
          setMilliseconds(99);
        }
      }, 10);
    }

    if (hours === 0 && minutes === 0 && seconds === 0 && milliseconds === 1) {
      setShowEndScreen({ ...showEndScreen, show: true });
      resetTimer();
    }

    return () => clearInterval(interval);
  }, [milliseconds, seconds, minutes, hours, isRunning, showEndScreen]);

  function startTimer() {
    if (hours > 0 || minutes > 0 || seconds > 0 || milliseconds > 0) {
      setShowEndScreen({ ...showEndScreen, show: false });
      setIsRunning(true);
    } else {
      window.alert("Ingresa el tiempo deseado");
    }
  }

  function pauseTimer() {
    setIsRunning(false);
  }

  function stopTimer() {
    resetTimer();
  }

  function resetTimer() {
    setIsRunning(false);
    setMilliseconds(0);
    setSeconds(0);
    setMinutes(0);
    setHours(0);
  }

  const playSound = () => {
    const audio = new Audio(sound);
    audio.play();
  };

  // const changeMilliseconds = (e) => {
  //   let value = Number(e.target.value);
  //   if (value < 0) value = 0;
  //   if (value > 59) value = 59;
  //   setMilliseconds(value);
  // };
  
  const changeSeconds = (e) => {
    let value = Number(e.target.value);
    if (value < 0) value = 0;
    if (value > 59) value = 59;
    setSeconds(value);
  };
  
  const changeMinutes = (e) => {
    let value = Number(e.target.value);
    if (value < 0) value = 0;
    if (value > 59) value = 59;
    setMinutes(value);
  };
  
  const changeHours = (e) => {
    let value = Number(e.target.value);
    if (value < 0) value = 0;
    if (value > 99) value = 99;
    setHours(value);
  };
  

  const handleRingDurationChange = (e) => {
    setRingDuration(Number(e.target.value));
  };

  const handleRingRepetitionsChange = (e) => {
    setRingRepetitions(Number(e.target.value));
  };

  const handleSoundFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type === 'audio/mp3' && file.size <= 5 * 1024 * 1024) { // Verifica que sea .mp3 y no exceda 5 MB
        const reader = new FileReader();
        reader.onloadend = () => {
          // Simulamos la conversión a .ogg
          const convertedSound = {
            name: file.name.replace('.mp3', '.ogg'),
            type: 'audio/ogg',
            size: file.size, // Aquí deberías ajustar el tamaño real después de la conversión
            data: reader.result,
          };
          setSoundFile(convertedSound);
        };
        reader.readAsDataURL(file);
      } else {
        alert('El archivo debe ser formato .mp3 y no debe exceder 5 MB.');
      }
    }
  };
  
  const getFileName = () => {
    return soundFile ? soundFile.name : 'Seleccionar archivo .mp3';
  };




  //save a timer
  const handleSaveTimer = () => {


    const timer = 
    {
        time_hour: hours,
        timer_min: minutes,
        timer_sec: seconds,
        timer_duration: ringDuration,
        tone_id: 1,
        user_id: props.user_id

    }


    addTimer(timer).then(() => {console.log("Exito")})
    .catch(error => {console.log("fallo lol.")})



  };



  //load the timers that the user have
  const handleLoadTimer = () => 
  {
    getTimersForUser(props.user_id).then((data) => {setTimer(data)})
    .catch(error => {console.log("Fallo")})



  }


  return (
    <div className="count-container">
      {showEndScreen.show && (
        <h1 className="count-title count-text-dark">{showEndScreen.message}</h1>
      )}
      <Timer
        milliseconds={milliseconds}
        seconds={seconds}
        minutes={minutes}
        hours={hours}
        changeSeconds={changeSeconds}
        changeMinutes={changeMinutes}
        changeHours={changeHours}
      />
      <div className="count-input-range">
        <div className="count-d-flex flex-column">
          <label className="count-label">Duración de timbre (segundos)</label>
          <input
            className="count-input-range"
            type="range"
            min="1"
            max="30"
            value={ringDuration}
            onChange={handleRingDurationChange}
          />
          <span>{ringDuration}</span>
        </div>
        {/* <div className="count-d-flex flex-column">
          <label className="count-label">Repeticiones de timbre</label>
          <input
            className="count-input-range"
            type="range"
            min="1"
            max="20"
            value={ringRepetitions}
            onChange={handleRingRepetitionsChange}
          />
          <span>{ringRepetitions}</span>
        </div> */}
        <div className="count-d-flex flex-column">
          <label className="count-label">
            Sonido:
            <br />
            <input style={{ width: "40rem" }}
              type="file"
              accept=".mp3"
              onChange={handleSoundFileChange}
            />
          </label>
          <span>{getFileName()}</span>
        </div>
      </div>
      <br />
      {/* Estos hay que cambiarlos */}
      {!isRunning && (
        <button className="count-btn count-btn-accept count-btn-lg" onClick={startTimer}>
          Iniciar
        </button>
      )}
      {isRunning && (
        <button className="count-btn count-btn-warning count-btn-lg" onClick={pauseTimer}>
          Pausa
        </button>
      )}
      <button className="count-btn count-btn-danger count-btn-lg" onClick={stopTimer}>
        Detener
      </button>
      <button className="count-btn count-btn-save count-btn-lg" >
        Guardar
      </button>
      <br />
      <button className="count-btn count-btn-lg count-temporizadores" >
        Guardar
      </button>
      
      <button className="count-btn count-btn-lg count-temporizadores" >
        Cargar
      </button>
    </div>
  );
}
