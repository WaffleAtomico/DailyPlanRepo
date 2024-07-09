// Pomodoro_view.jsx
import React, { useState, useEffect } from 'react';
import BreakOverlay from './BreakOverlay';
import { GiTomato } from "react-icons/gi";
import '../../../styles/UI/Pomodoro/pomodoro.css';

const Pomodoro_view = () => {
    const [workTime, setWorkTime] = useState(25);
    const [shortBreak, setShortBreak] = useState(5);
    const [longBreak, setLongBreak] = useState(15);
    const [sound, setSound] = useState('');
    const [isBreak, setIsBreak] = useState(false);
    const [isLongBreak, setIsLongBreak] = useState(false);
    const [timeRemaining, setTimeRemaining] = useState(workTime * 60);
    const [completedCycles, setCompletedCycles] = useState(0);
    const [soundFile, setSoundFile] = useState(null);

    useEffect(() => {
        let timer;
        if (timeRemaining > 0) {
            timer = setInterval(() => setTimeRemaining(timeRemaining - 1), 1000);
        } else {
            if (isBreak) {
                setIsBreak(false);
                setTimeRemaining(workTime * 60);
                setCompletedCycles(prev => prev + 1);
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

    // Función para mostrar el nombre del archivo seleccionado
    const getFileName = () => {
        return soundFile ? soundFile.name : 'Seleccionar archivo .mp3';
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setTimeRemaining(workTime * 60);
        setCompletedCycles(0);
    };

    return (
        <div className="pomodoro-container">
            <div className="pomodoro-layout">
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
                        <input style={{width: "10rem"}}
                            type="file"
                            accept=".mp3"
                            onChange={handleSoundFileChange}
                        />
                    </label>
                    <span>{getFileName()}</span>
                    <button type="submit" className="pomodoro-boton-verde">Iniciar Pomodoro</button>
                </form>
                <div className="timer-display">
                    <div className="cycles-completed">
                        <GiTomato size={40} /> Ciclos completados: {completedCycles}
                    </div>
                    <div className="time-remaining">
                        {`${Math.floor(timeRemaining / 60)}:${('0' + timeRemaining % 60).slice(-2)}`}
                    </div>
                </div>
            </div>
            {isBreak && <BreakOverlay timeRemaining={timeRemaining} />}
        </div>
    );
};

export default Pomodoro_view;
