import React, { useState, useEffect } from "react";
import Timer from "./Timer";
import '../../../styles/UI/Countdowntimer/countdown.css';
import { addTimer, getTimerById, getTimersForUser } from "../../../utils/validations/timer";
import { base64ToBlob, playBlobAudio } from "../../../utils/sounds";
import { addTone } from "../../../utils/validations/tone";

const splitBase64 = (base64) => {
    const chunkSize = 1024 * 1024; // 1 MB
    const chunks = [];
    for (let i = 0; i < base64.length; i += chunkSize) {
        chunks.push(base64.slice(i, i + chunkSize));
    }
    return chunks;
};

export default function CountdownTimer(props) {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [milliseconds, setMilliseconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [soundFile, setSoundFile] = useState(null);
  const [showEndScreen, setShowEndScreen] = useState({
    show: false,
    message: "Tiempo agotado",
  });

  const [ringDuration, setRingDuration] = useState(1);
  const [ringRepetitions, setRingRepetitions] = useState(1);
  const [timers, setTimer] = useState([]);
  const [showSaveForm, setShowSaveForm] = useState(false);
  const [timerName, setTimerName] = useState("");
  const [showTableTimer, setShowTableTimer] = useState(false);

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
      if (soundFile) {
        playBlobAudio(soundFile, ringRepetitions, ringDuration, ringDuration);
      }
    }

    return () => clearInterval(interval);
  }, [milliseconds, seconds, minutes, hours, isRunning, showEndScreen, soundFile]);

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

  const handleSoundFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result.split(',')[1];
        console.log(`File name: ${file.name}`);
        console.log(`File type: ${file.type}`);
        console.log(`Base64 string: ${base64String}`);
        setSoundFile({
          base64: base64String,
          name: file.name,
          type: file.type
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const getFileName = () => {
    return soundFile ? soundFile.name : 'Seleccionar archivo .mp3';
  };

  const showSaveTimerForm = () => {
    setShowSaveForm(true);
  };

  const hideSaveTimerForm = () => {
    setShowSaveForm(false);
  };

  const showTimerTables = () => {
    setShowTableTimer(true);
  };

  const hideTableTimer = () => {
    setShowTableTimer(false);
  };

  const handleSaveTimer = async () => {
    try {
      let tone_id = null;
      if (!soundFile) return;

        const formData = {
          alarmTone: soundFile.base64,
          alarmToneName: soundFile.name,
          alarmToneType: soundFile.type
        };
         addTone(formData).then(response => {

         const tone_id = response.tone_id;

  
         const timer = {
          timer_name: timerName,
          timer_hour: hours,
          timer_min: minutes,
          timer_sec: seconds,
          timer_duration: ringDuration,
          tone_id: tone_id,
          user_id: parseInt(props.user_id, 10)
        };
  
         addTimer(timer).then(response => {});
        hideSaveTimerForm(); // Hide the form after saving
        handleLoadTimer(); // Reload timers after saving

        }).catch(error => {console.error("El error:", error)});


      
      
    
    } catch (error) {
      console.log(error);
    }
  };

  const handleLoadTimer = () => {
    getTimersForUser(parseInt(props.user_id, 10))
      .then(response => {

        console.log("Los timers:", response.data);
        setTimer(response.data);
      })
      .catch(error => {
        console.log("Fallo");
      });
    showTimerTables();
  };


  const handleRowClick = (timer) => {
            const blob = base64ToBlob(timer.tone_location,'audio/mpeg');
            setSoundFile(blob);
            
            // Optionally, play the sound immediately
            ///playBlobAudio(blob, ringRepetitions, ringDuration, ringDuration);
     

    setHours(timer.timer_hour || 0);
    setMinutes(timer.timer_min);
    setSeconds(timer.timer_sec);
};


  return (
    <div className="count-container">
      <div className="main-content">
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
          <div className="count-d-flex flex-column">
            <label className="count-label">
              Sonido:
              <br />
              <input
                style={{ width: "40rem" }}
                type="file"
                accept=".mp3"
                onChange={handleSoundFileChange}
              />
            </label>
            <span>{getFileName()}</span>
          </div>
        </div>
        <br />
        {!isRunning && (
          <button
            className="count-btn count-btn-accept count-btn-lg"
            onClick={startTimer}
          >
            Iniciar
          </button>
        )}
        {isRunning && (
          <button
            className="count-btn count-btn-warning count-btn-lg"
            onClick={pauseTimer}
          >
            Pausa
          </button>
        )}
        <button
          className="count-btn count-btn-danger count-btn-lg"
          onClick={stopTimer}
        >
          Detener
        </button>
        <button
          className="count-btn count-btn-save count-btn-lg"
          onClick={showSaveTimerForm}
        >
          Guardar
        </button>
        <br />
        <button
          className="count-btn count-btn-lg count-temporizadores"
          onClick={handleLoadTimer}
        >
          Cargar
        </button>
  
        {showSaveForm && (
          <div className="save-timer-form">
            <h2>Guardar Temporizador</h2>
            <label>
              Nombre:
              <input
                type="text"
                value={timerName}
                onChange={(e) => setTimerName(e.target.value)}
              />
            </label>
            <button
              className="count-btn count-btn-save count-btn-lg"
              onClick={handleSaveTimer}
            >
              Guardar
            </button>
            <button
              className="count-btn count-btn-danger count-btn-lg"
              onClick={hideSaveTimerForm}
            >
              Cancelar
            </button>
          </div>
        )}
      </div>
  
      {showTableTimer && (
        <div className="timer-table">
          <h2>Temporizadores Guardados</h2>
          <table>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Hora</th>
                <th>Minuto</th>
                <th>Segundo</th>
                <th>Duración</th>
                <th>Sonido</th>
              </tr>
            </thead>
            <tbody>
              {timers.map((timer, index) => (
                <tr key={index} onClick={() => handleRowClick(timer)}>
                  <td>{timer.timer_name}</td>
                  <td>{timer.timer_hour}</td>
                  <td>{timer.timer_min}</td>
                  <td>{timer.timer_sec}</td>
                  <td>{timer.timer_duration}</td>
                  <td>{timer.tone_name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
