import React, { useState, useEffect } from 'react';

import { GiHolyGrail, GiTomato } from "react-icons/gi";
import '../../../styles/UI/Pomodoro/pomodoro.css';

import { playRingtone, base64ToBlob, playBlobAudio } from '../../../utils/sounds';
import { myPojo } from '../../../utils/ShowNotifInfo';
import { grantArchivement, isCompleted } from '../../../utils/archivements/grantArchivement';
import { getPomodoroById, updatePomodoro } from '../../../utils/validations/pomodoro';
import { addTone } from "../../../utils/validations/tone";
import { addPomodoroSchedule } from '../../../utils/validations/schedule';
import { checkScheduleConflict } from '../../../utils/validations/schedule';
import BreakOverlay from './BreakOverlay';
import { getDistanceMatrix } from '../../../utils/validations/services/distanceMatrixClient';

const Pomodoro_view = (props) => {
    const [workTime, setWorkTime] = useState(25);
    const [minWorkTime, setMinWorkTime] = useState(1);
    const [hourWorkTime, setHourWorkTime] = useState(0);
    const [shortBreak, setShortBreak] = useState(5);
    const [longBreak, setLongBreak] = useState(15);
    const [sound, setSound] = useState('');
    const [isBreak, setIsBreak] = useState(false);
    const [isLongBreak, setIsLongBreak] = useState(false);
    const [timeRemaining, setTimeRemaining] = useState(0);
    const [completedCycles, setCompletedCycles] = useState(0);
    const [soundFile, setSoundFile] = useState(null);
    const [isCompletedArchivement, setIsCompletedArchivement] = useState(true);
    const [isTimerRunning, setIsTimerRunning] = useState(false);
    const [pomodoro, setPomodoro] = useState(null);

    useEffect(() => {
        getPomodoroById(props.id_user)
            .then(response => {
                const data = response.data[0];
                setPomodoro(data);
                const [hours, minutes] = convertMinutesToHours(data.tpomodoro_hour_work);
                setHourWorkTime(hours);
                setMinWorkTime(minutes);
                setShortBreak(data.pomodoro_shortrest);
                setLongBreak(data.pomodoro_longrest);
                const blob = base64ToBlob(data.tone_location, 'audio/mpeg');
                setSoundFile(blob);
            })
            .catch(error => {
                console.log(error);
            });
            confirmArchivement(props.id_user);
    }, [props.id_user]);

    const confirmArchivement = (user_id) => {
        const grant_title_id = 7;
        isCompleted(user_id, grant_title_id).then(response => {
            if (response === false) {
                setIsCompletedArchivement(response);
            }
        }).catch(error => {
            console.error("Error confirming achievement: ", error);
        });
    }

    const grant8Archivement = (user_id) => {
        const grant_title_id = 8;
        if (!isCompletedArchivement) {
            grantArchivement(user_id, grant_title_id).then(res => {
                myPojo.setNotif("Logro: TOMATERO", <GiTomato size={220} />);
            }).catch(error => {
                console.error("Error granting achievement:", error);
            });
        }
    };

    useEffect(() => {
        if (completedCycles === 1) {
            grant8Archivement(props.id_user);
        }
    }, [completedCycles, props.id_user]);

    useEffect(() => {
        let timer;
        if (isTimerRunning && timeRemaining > 0) {
            timer = setInterval(() => setTimeRemaining(timeRemaining - 1), 1000);
        } else if (timeRemaining === 0 && isTimerRunning) {
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
    }, [timeRemaining, isBreak, isTimerRunning, workTime, shortBreak, longBreak, isLongBreak]);

    const playSound = () => {
        if (soundFile) {
            playBlobAudio(soundFile);
        } else {
            playRingtone();
        }
    };

    const handleSoundFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.type === 'audio/mpeg' && file.size <= 5 * 1024 * 1024) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    const audio = new Audio(reader.result);
                    audio.addEventListener('loadedmetadata', () => {
                        if (audio.duration <= 30) {
                            const base64String = reader.result.split(',')[1];
                            const convertedSound = {
                                base64: base64String,
                                name: file.name.replace('.mp3'),
                                type: 'audio/mpeg'
                            };
                            setSoundFile(convertedSound);
                            addToneToDatabase(convertedSound);
                        } else {
                            alert('El archivo no debe exceder 30 segundos.');
                        }
                    });
                };
                reader.readAsDataURL(file);
            } else {
                alert('El archivo debe ser formato .mp3 y no debe exceder 5 MB.');
            }
        }
    };

    const addToneToDatabase = (sound) => {
        const formData = {
            alarmTone: sound.base64,
            alarmToneName: sound.name,
            alarmToneType: sound.type
        };
        addTone(formData).then(response => {
            console.log('Tone added with ID:', response.tone_id);
        }).catch(error => {
            console.error('Error adding tone:', error);
        });
    };

    const getFileName = () => {
        return soundFile ? soundFile.name : 'Seleccionar archivo .mp3';
    };

    const convertMinutesToHours = (minutes) => {
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;
        return [hours, remainingMinutes];
    };

    const convertHoursToMinutes = (hours, minutes) => {
        return (hours * 60) + minutes;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const workMinutes = convertHoursToMinutes(hourWorkTime, minWorkTime);

        const updatedPomodoro = {
            ...pomodoro,
            tpomodoro_hour_work: workMinutes,
            pomodoro_shortrest: shortBreak,
            pomodoro_longrest: longBreak
        };

        const now = new Date();
        const eventPomodoro = {
            schedule_eventname: "Pomodoro",
            schedule_datetime: now,
            schedule_duration_hour: Math.floor(workMinutes / 60),
            schedule_duration_min: workMinutes % 60,
            user_id: props.id_user
        };

        if (checkScheduleConflict(eventPomodoro)) {
            alert("Hay un conflicto con otro evento en el mismo horario.");
            return;
        }

        addPomodoroSchedule(eventPomodoro)
            .then(() => {
                updatePomodoro(updatedPomodoro)
                    .then(response => {
                        setTimeRemaining(workMinutes * 60);
                        setCompletedCycles(0);
                        setIsBreak(false);
                        setIsLongBreak(false);
                        setIsTimerRunning(true);
                        console.log("Pomodoro actualizado:", updatedPomodoro);
                    })
                    .catch(error => {
                        console.log("No se pudo actualizar el pomodoro");
                    });
            })
            .catch(error => {
                console.log("Error al actualizar el pomodoro");
            });
    };

    function formatTime(totalSeconds) {
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
      
        let formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
      
        if (hours > 0) {
          formattedTime = `${hours.toString().padStart(2, '0')}:${formattedTime}`;
        }
      
        return formattedTime;
      }
      

    return (
        <div className="pomodoro-container">
            <div className="pomodoro-layout">
                <form onSubmit={handleSubmit} className="pomodoro-form">
                    <label >
                        <div style={{fontSize: "small"}}>Tiempo de trabajo (HH/mm):</div>
                        <input type="number"
                            min={0}
                            max={8}
                            value={hourWorkTime}
                            onChange={(e) => setHourWorkTime(
                                Number(e.target.value) <= 8 ? Number(e.target.value) :
                                8
                                )} />
                        <input type="number"
                            min={1}
                            max={59}
                            value={minWorkTime}
                            onChange={(e) => setMinWorkTime(
                                Number(e.target.value)
                                
                                )} />
                    </label>
                   
                    <label>
                        Descanso corto (min):
                        <input type="number"
                            min='0'
                            max='5'
                            value={shortBreak}
                            onChange={(e) => setShortBreak(Number(e.target.value))} />
                    </label>
                    <label>
                        Descanso largo (min):
                        <input type="number"
                            min='15'
                            max='40'
                            value={longBreak}
                            onChange={(e) => setLongBreak(Number(e.target.value))} />
                    </label>
                    <label>
                        Sonido:
                        <input style={{ width: "10rem" }}
                            type="file"
                            accept=".mp3"
                            onChange={handleSoundFileChange} />
                    </label>
                    <span>{getFileName()}</span>
                    <button type="submit" className="pomodoro-boton-verde">Iniciar Pomodoro</button>
                </form>
                <div className="timer-display">
                    <div className="cycles-completed">
                        <GiTomato size={40} /> Ciclos completados: {completedCycles}
                    </div>
                    <div className="time-remaining">
                        {formatTime(timeRemaining)}
                    </div>
                </div>
            </div>
            {isBreak && <BreakOverlay timeRemaining={timeRemaining} />}
        </div>
    )
};

export default Pomodoro_view;
