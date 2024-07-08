import React, { useState, useEffect } from "react";
import Timer from "./Timer";
import '../../../styles/UI/Countdowntimer/countdown.css';

export default function CountdownTimer() {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [milliseconds, setMilliseconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const [showEndScreen, setShowEndScreen] = useState({
    show: false,
    message: "Tiempo agotado",
  });

  const [ringDuration, setRingDuration] = useState(1);
  const [ringRepetitions, setRingRepetitions] = useState(1);

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

  const changeSeconds = (e) => {
    setSeconds(Number(e.target.value));
  };

  const changeMinutes = (e) => {
    setMinutes(Number(e.target.value));
  };

  const changeHours = (e) => {
    setHours(Number(e.target.value));
  };

  const handleRingDurationChange = (e) => {
    setRingDuration(Number(e.target.value));
  };

  const handleRingRepetitionsChange = (e) => {
    setRingRepetitions(Number(e.target.value));
  };

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
        <div className="count-d-flex flex-column">
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
        </div>
      </div>
      <br />
      {/* Estos hay que cambiarlos */}
      {!isRunning && (
        <button className="count-btn count-btn-accept count-btn-lg" onClick={startTimer}>
          Iniciar
        </button>
      ) }
      {isRunning && (
        <button className="count-btn count-btn-warning count-btn-lg" onClick={pauseTimer}>
          Pausa
        </button>
      )}
      <button className="count-btn count-btn-danger count-btn-lg" onClick={stopTimer}>
        Detener
      </button>
      <br />
      <button className="count-btn count-btn-lg count-temporizadores">
        TEMPORIZADORES
      </button>
    </div>
  );
}
