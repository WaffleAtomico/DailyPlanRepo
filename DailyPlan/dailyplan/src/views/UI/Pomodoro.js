import React, { useState, useEffect } from 'react';
import BreakOverlay from '../../components/pomodoro/BreakOverlay';
import '../../styles/UI/Pomodoro/pomodoro.css';

const Pomodoro_view = () => {
    const [workTime, setWorkTime] = useState(25);
    const [shortBreak, setShortBreak] = useState(5);
    const [longBreak, setLongBreak] = useState(15);
    const [sound, setSound] = useState('');
    const [isBreak, setIsBreak] = useState(false);
    const [isLongBreak, setIsLongBreak] = useState(false);
    const [timeRemaining, setTimeRemaining] = useState(workTime * 60);

    useEffect(() => {
        let timer;
        if (timeRemaining > 0) {
            timer = setInterval(() => setTimeRemaining(timeRemaining - 1), 1000);
        } else {
            if (isBreak) {
                setIsBreak(false);
                setTimeRemaining(workTime * 60);
                playSound();
            } else {
                setIsBreak(true);
                setTimeRemaining(isLongBreak ? longBreak * 60 : shortBreak * 60);
                playSound();
            }
        }
        return () => clearInterval(timer);
    }, [timeRemaining, isBreak, workTime, shortBreak, longBreak, isLongBreak]);

    const playSound = () => {
        const audio = new Audio(sound);
        audio.play();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setTimeRemaining(workTime * 60);
    };

    return (
        <div className="pomodoro-container">
           
            <form onSubmit={handleSubmit} className="pomodoro-form">
                <label>
                    Tiempo de trabajo (min):
                    <input type="number" value={workTime} onChange={(e) => setWorkTime(e.target.value)} />
                </label>
                <label>
                    Descanso corto (min):
                    <input type="number" value={shortBreak} onChange={(e) => setShortBreak(e.target.value)} />
                </label>
                <label>
                    Descanso largo (min):
                    <input type="number" value={longBreak} onChange={(e) => setLongBreak(e.target.value)} />
                </label>
                <label>
                    Sonido:
                    <input type="text" value={sound} onChange={(e) => setSound(e.target.value)} />
                </label>
                <button type="submit">Iniciar Pomodoro</button>
            </form>
            <div className="timer-display">
                {`${Math.floor(timeRemaining / 60)}:${('0' + timeRemaining % 60).slice(-2)}`}
            </div>
            {isBreak && <BreakOverlay timeRemaining={timeRemaining} />}
        </div>
    );
};

export default Pomodoro_view;