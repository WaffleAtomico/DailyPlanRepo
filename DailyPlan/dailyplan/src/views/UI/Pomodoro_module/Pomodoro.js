import React, { useState, useEffect } from 'react';
import BreakOverlay from './BreakOverlay';
import { GiHolyGrail, GiTomato } from "react-icons/gi";
import '../../../styles/UI/Pomodoro/pomodoro.css';
import { playRingtone, base64ToBlob, playBlobAudio } from '../../../utils/sounds';
import { myPojo } from '../../../utils/ShowNotifInfo';
import { grantArchivement, isCompleted } from '../../../utils/archivements/grantArchivement';
import { getPomodoroById, updatePomodoro } from '../../../utils/validations/pomodoro';
import { addTone } from "../../../utils/validations/tone";
import { addPomodoroSchedule } from '../../../utils/validations/schedule';
import { checkScheduleConflict } from '../../../utils/validations/schedule';

const Pomodoro_view = (props) => {
    const [workTime, setWorkTime] = useState(25);
    const [minWorkTime, setMinWorkTime] = useState(0);
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
        confirmArchivement(props.id_user);
    }, [props.id_user]);

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
                                name: file.name.replace('.mp3', '.ogg'),
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

    return (
        <div className="main-container">
          <div className="UI-header">
            <PuntButton id_user={id} />
            <Ui_navbar
              handleOptionSelected={handleOptionSelected}
              selectedOption={selectedOption}
            />
            <button onClick={() => GoToProfileModule()} className="right-button">
              {" "}
              <FaUserClock /> {username}{" "}
            </button>
            <p style={{ marginTop: "3rem" }}>
              {selectedOption === 0 && "Calendario"}
              {selectedOption === 1 && "Alarma"}
              {selectedOption === 2 && "Cronometro"}
              {selectedOption === 3 && "Temporizador"}
              {selectedOption === 4 && "Relojes"}
              {selectedOption === 5 && "Invitaciones"}
              {selectedOption === 7 && "Modo de sueño"}
              {selectedOption === 8 && "Pomodoro"}
            </p>
            {(selectedOption === 1 ||
              selectedOption === 3 ||
              selectedOption === 7 ||
              selectedOption === 8) && (
              <button
                className="UI-btn-opption"
                onClick={() => handleSuboption(selectedOption)}
              >
                {selectedOption === 1 && "Modo de sueño"}
                {selectedOption === 3 && "Pomodoro"}
                {selectedOption === 7 && "Alarma"}
                {selectedOption === 8 && "Temporizador"}
              </button>
            )}
          </div>
    
          <div className="UI-background">
            {selectedOption === 0 && <Calendar user_id={id} />}
            {selectedOption === 1 && <Alarm user_id={id} />}
            {selectedOption === 2 && (
              <Chrono
                id_user={id}
                chronoTimeToChrono={chronoTime}
                chronoTimeSecond={secondsPassed}
                isRunningChrono={isRunning}
                handleStaStoChrono={handleStaSto}
                handleResetChrono={handleReset}
              />
            )}
            {selectedOption === 3 && <CountdownTimer user_id={id} />}
            {selectedOption === 4 && <Clock id_user={id} />}
            {selectedOption === 5 && <Invitation user_id={id} />}
            {selectedOption === 7 && <Sleep id_user={id} />}
            {selectedOption === 8 && <Pomodoro id_user={id} />}
            {selectedOption !== 2 && secondsPassed > 0 && (
              <ChronoIndicator
                chronoTimeToChrono={chronoTime}
                chronoTimeSecond={secondsPassed}
                handleStaStoToChrono={handleStaSto}
              />
            )}
          </div>
          
          {mostrarNotificacion && (
            <GeneralNotif
              mensaje={myPojo.HeadText}
              componente={myPojo.content}
            />
          )}
        </div>
      )};
    
export default Pomodoro_view;
