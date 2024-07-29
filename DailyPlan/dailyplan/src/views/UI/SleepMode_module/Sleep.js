import React, { useState, useEffect } from 'react';
import ToggleButton from './togglebtn';
import ReactPlayer from 'react-player';
import moment from 'moment-timezone/builds/moment-timezone-with-data-10-year-range.js';
import SleepSurvey from './SleepForm';
import { myPojo } from '../../../utils/ShowNotifInfo';
import '../../../styles/UI/Sleep/Sleep.css';
import { getSleepmodeById, updateSleepmode } from '../../../utils/validations/sleep';
import { getSleepQualityById } from '../../../utils/validations/sleepquality';
import { addTone } from '../../../utils/validations/tone';
import { loadSchedulesFromLocalStorage, checkScheduleConflict, addSleepSchedule, addNewEvent, findConflictEvent, checkScheduleSleep, findConflictSleep } from '../../../utils/validations/schedule';
import { base64ToBlob, playAlarm, playBlobAudio, playRingtone } from '../../../utils/sounds';
import { MdBedtime, MdBedtimeOff } from 'react-icons/md';

export default function SleepAlarm(props) {
    const [isToggled, setIsToggled] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [horaActual, setHoraActual] = useState(moment().format('HH:mm:ss'));
    const [horaDormir, setHoraDormir] = useState('');
    const [horaDespertar, setHoraDespertar] = useState('');
    const [horadiff, setHoradiff] = useState();
    const [mediaLink, setMediaLink] = useState('');
    const [showSurvey, setShowSurvey] = useState(false);
    const [repValue, setRepValue] = useState(1);
    const [stopRepValue, setStopRepValue] = useState(0);
    const [alreadySurvey, setAlreadySurvey] = useState(null);
    const [tone, setTone] = useState(null);
    const [nameTone, setNameTone] = useState(null);
    const [dataTone, setDataTone] = useState(null);
    const [soundFile, setSoundFile] = useState(null);
    const [sleepRepIncr, setSleepRepIncr] = useState(0);

    useEffect(() => {
        getSleepmodeById(props.id_user).then(res => {
            const sleepData = res.data[0];
            if (sleepData) {
                setTone(sleepData.tone_id);
                setSleepRepIncr(sleepData.sleep_rep_incr);
                setNameTone(sleepData.tone_name);
                setDataTone(base64ToBlob(sleepData.tone_location, "audio/mpeg"));
                setHoraDormir(formatTimeFromTinyInt(sleepData.sleep_starthour));
                setHoraDespertar(formatTimeFromTinyInt(sleepData.sleep_endhour));
                setIsToggled(sleepData.sleep_active === 1);
                setRepValue(sleepData.sleep_rep || 1);
                setMediaLink(sleepData.sleep_video_url || '');
                if (sleepData.sleep_starthour && sleepData.sleep_endhour) {
                    setHoradiff(calcularDiferenciaHoras(sleepData.sleep_starthour, sleepData.sleep_endhour));
                }
            }
        }).catch(err => { console.log(err) });
    }, [props.id_user]);

    useEffect(() => {
        const currentDate = moment().format('YYYY-MM-DD');
        getSleepQualityById({ quality_id: props.id_user, current_date: currentDate }).then(res => {
            setAlreadySurvey(res.data[0] != null);
        }).catch(err => { console.log(err) });
    }, [props.id_user]);

    const handleMediaSubmit = (e) => {
        e.preventDefault();
        console.log('Media Link:', mediaLink);
    };

    const handleRepChange = (e) => {
        setRepValue(e.target.value);
    };

    const handleSoundFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result.split(',')[1];
                setSoundFile({
                    base64: base64String,
                    name: file.name,
                    type: file.type
                });
            };
            reader.readAsDataURL(file);
        }
    };

    const calcularDiferenciaHoras = (startHour, endHour) => {
        const start = formatTimeFromTinyInt(startHour);
        const end = formatTimeFromTinyInt(endHour);
        
        // Crear fechas ficticias con una fecha base para facilitar la comparación
        const fechaDormir = new Date(`2000-01-01T${start}`);
        const fechaDespertar = new Date(`2000-01-01T${end}`);
    
        // Si la hora de finalización es menor que la hora de inicio, se asume que es al día siguiente
        if (fechaDespertar < fechaDormir) {
            fechaDespertar.setDate(fechaDespertar.getDate() + 1);
        }
    
        // Calcular la diferencia en milisegundos
        const diferenciaMilisegundos = fechaDespertar - fechaDormir;
    
        // Convertir la diferencia en horas
        const horas = Math.floor(diferenciaMilisegundos / 3600000);
        
        // Mensaje de advertencia si la diferencia es mayor o igual a 10 horas o menor o igual a 4 horas
        if (horas >= 10 || horas <= 4) {
            myPojo.setNotif("¡CUIDADO!", <div style={{ fontSize: "larger" }}>Dormir por demasiado tiempo o muy poco puede afectar tu rendimiento</div>);
        }
        
        return horas;
    };
    
    const calcularDiferenciaHorasDirecta = (startHour, endHour) => {
        // Crear fechas ficticias con una fecha base para facilitar la comparación
        const fechaDormir = new Date(`2000-01-01T${startHour}`);
        const fechaDespertar = new Date(`2000-01-01T${endHour}`);
    
        // Si la hora de finalización es menor que la hora de inicio, se asume que es al día siguiente
        if (fechaDespertar < fechaDormir) {
            fechaDespertar.setDate(fechaDespertar.getDate() + 1);
        }
    
        // Calcular la diferencia en milisegundos
        const diferenciaMilisegundos = fechaDespertar - fechaDormir;
    
        // Convertir la diferencia en horas
        const horas = Math.floor(diferenciaMilisegundos / 3600000);
    
        // Mensaje de advertencia si la diferencia es mayor o igual a 10 horas o menor o igual a 4 horas
        if (horas >= 10 || horas <= 4) {
            myPojo.setNotif("¡CUIDADO!", <div style={{ fontSize: "larger" }}>Dormir por demasiado tiempo o muy poco puede afectar tu rendimiento</div>);
        }
    
        return horas;
    };
    

    const calculateSecondSleepTime = (startHour, endHour) => {
        const startHourInt = convertTimeToTinyInt(startHour);
        const endHourInt = convertTimeToTinyInt(endHour);
        const sleepDuration = endHourInt - startHourInt;
        
        // Ajustar para el caso de dormir de la noche a la mañana
        if (sleepDuration < 0) {
            sleepDuration += 1440; // 1440 minutos = 24 horas
        }
    
        // Calcular el tiempo de la segunda hora de dormir
        let secondSleepStartInt = endHourInt + 300; // Agregar 5 horas (300 minutos) después del tiempo de despertar
        let secondSleepEndInt = secondSleepStartInt + Math.min(sleepDuration, 120); // Duración máxima de 2 horas (120 minutos)
    
        // Ajustar si la segunda hora de dormir se extiende al siguiente día
        if (secondSleepEndInt >= 1440) { // 1440 minutos = 24 horas
            secondSleepEndInt -= 1440;
        }
    
        // Convertir a formato "HH:mm"
        const secondSleepStart = formatTimeFromTinyInt(secondSleepStartInt);
        const secondSleepEnd = formatTimeFromTinyInt(secondSleepEndInt);
    
        return {
            secondSleepStart,
            secondSleepEnd
        };
    };
    useEffect(() => {
        const interval = setInterval(() => {
            const horaActual = moment().format('HH:mm');
            const startHour = convertTimeToTinyInt(horaDormir);
            const endHour = convertTimeToTinyInt(horaDespertar);
            const currentTime = convertTimeToTinyInt(horaActual);
            if (isToggled) {
                if (!horaDespertar) {
                    setIsPlaying(false);
                    setShowSurvey(false);
                    return;
                }
                if ((currentTime >= startHour && currentTime < endHour) || (startHour > endHour && (currentTime >= startHour || currentTime < endHour))) {
                    setIsPlaying(true);
                } else {
                    if (alreadySurvey === null) return;
                    if (alreadySurvey) {
                        setShowSurvey(false);
                        return;
                    }
                    setShowSurvey(true);
                    if (repValue > 0) {
                        setRepValue(repValue - 1);
                        setStopRepValue(stopRepValue + 1);
                        if (tone === null) {
                            playAlarm();
                        } else {
                            playBlobAudio(dataTone);
                        }
                    }
                    setIsPlaying(false);
                }
            } else {
                setIsPlaying(false);
                setShowSurvey(false);
            }
            setHoraActual(horaActual);
        }, 1000);
        return () => clearInterval(interval);
    }, [horaDormir, horaDespertar, isToggled, alreadySurvey, repValue, stopRepValue, tone, dataTone]);

    const confirmarModoDeSueno = () => {
        const calculateSleepRep = () => {
            const repValueNumber = Number(repValue);
            const sleepRepIncrNumber = Number(sleepRepIncr);
            let sleepRep = repValueNumber + sleepRepIncrNumber;
    
            if (sleepRep > 10) {
                sleepRep = 10;
            } else if (sleepRep < 1) {
                sleepRep = 1;
            }
    
            return sleepRep;
        };
    
        const sleepRep = calculateSleepRep();
    
        const newEvent = {
            schedule_eventname: 'Sleep',
            schedule_datetime: `${moment().format('YYYY-MM-DD')} ${horaDormir}`,
            schedule_duration_hour: parseInt(horaDespertar.split(':')[0]) - parseInt(horaDormir.split(':')[0]),
            schedule_duration_min: parseInt(horaDespertar.split(':')[1]) - parseInt(horaDormir.split(':')[1]),
            user_id: props.id_user
        };
    
        const conflictingEvent = checkScheduleSleep(newEvent);
    
        if (conflictingEvent) {
            const { schedule_datetime, schedule_eventname } = findConflictSleep(newEvent);
    
            const titulo = "Conflicto con otro evento";
            const contenido = `Existe el evento ${schedule_eventname} a las ${schedule_datetime}`;
    
            myPojo.setNotif(titulo, contenido);
            return;
        }
    
        addSleepSchedule(newEvent);
        addNewEvent(newEvent);
        console.log("hora de dormir", horaDormir, "hora de despertar", horaDespertar);
        const horadiff = calcularDiferenciaHorasDirecta(horaDormir, horaDespertar);
    
        console.log("Las horas de diferencia son:", horadiff);
        // Validar la diferencia de horas para la recomendación
        if (horadiff < 7) {
            const { secondSleepStart, secondSleepEnd } = calculateSecondSleepTime(horaDormir, horaDespertar);
            myPojo.setNotif("Recomendación", `Se recomienda una segunda hora para dormir de ${secondSleepStart} hasta ${secondSleepEnd}.`);
        }
    
        const saveSleepData = (tones_id = null) => {
            const sleepData = {
                sleep_starthour: convertTimeToTinyInt(horaDormir),
                sleep_endhour: convertTimeToTinyInt(horaDespertar),
                sleep_active: isToggled ? 1 : 0,
                sleep_rep: sleepRep,
                sleep_video_url: mediaLink,
                sleep_rep_stopped: null,
                tone_id: tones_id,
                sleep_id: props.id_user
            };
            updateSleepmode(sleepData).then(() => {
                setHoradiff(horadiff);
            }).catch(err => {
                console.log(err);
            });
        };
    
        if (soundFile) {
            const formData = {
                alarmTone: soundFile.base64,
                alarmToneName: soundFile.name,
                alarmToneType: soundFile.type
            };
            addTone(formData).then(response => {
                const tones_id = response.tone_id;
                console.log("El tono agregado es:", tones_id);
                saveSleepData(tones_id);
            }).catch(err => {
                console.log(err);
            });
        } else {
            saveSleepData();
        }
    };
    
    const convertTimeToTinyInt = (time) => {
        const [hours, minutes] = time.split(':').map(Number);
        return hours * 60 + minutes;
    };

    const formatTimeFromTinyInt = (tinyInt) => {
        const hours = Math.floor(tinyInt / 60);
        const minutes = tinyInt % 60;
        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
    };

    return (
        <div className={mediaLink ? "sleep-body-link" : "sleep-body-nolink"}>
            <div className="sleep-content-wrapper">
                {showSurvey ? (
                    <SleepSurvey
                        onClose={() => setShowSurvey(false)}
                        user_id={props.id_user}
                        stopRep={stopRepValue}
                        setAlreadySurvey={setAlreadySurvey}
                    />
                ) : (
                    <div className="sleep-alarma">
                        <div className="sleep-alarma-container">
                            <div className="sleep-input-container">
                                Hora (24h) de dormir
                                <div className="sleep-time-input">
                                    <input
                                        className="sleep-input"
                                        type="time"
                                        placeholder="Hora para dormir"
                                        value={horaDormir}
                                        onChange={(e) => setHoraDormir(e.target.value)}
                                    />
                                </div>
                                Hora (24h) de despertar
                                <div className="sleep-time-input">
                                    <input
                                        className="sleep-input"
                                        type="time"
                                        placeholder="Hora para despertar"
                                        value={horaDespertar}
                                        onChange={(e) => setHoraDespertar(e.target.value)}
                                    />
                                </div>
                                Repeticiones de alarma: {repValue}
                                <div className="sleep-time-input">
                                    <input
                                        className="sleep-input"
                                        type="range"
                                        min="1"
                                        max="10"
                                        value={repValue}
                                        onChange={handleRepChange}
                                    />
                                </div>
                                Sonido:
                                <div className="sleep-time-input">
                                    <input
                                        type="file"
                                        accept=".mp3"
                                        onChange={handleSoundFileChange}
                                    />
                                </div>
                                <br />
                            </div>
                            <div className="sleep-confirmar-button-container">
                                <button className="sleep-confirm" onClick={confirmarModoDeSueno}>
                                    Confirmar hora de dormir
                                </button>
                            </div>
                        </div>
                        <div className="sleep-horas-container">
                            <label className='sleep-horas'>{isNaN(horadiff) ? "" : horadiff}</label>
                            <label className='sleep-texto'>
                                <div className="sleep-toggle-container">
                                    <MdBedtimeOff />
                                    <ToggleButton
                                        handleChange={() => setIsToggled(!isToggled)}
                                        isToggled={isToggled}
                                    />
                                    <MdBedtime />
                                </div>
                                Horas<br />de<br />Sueño
                            </label>
                        </div>
                    </div>
                )}
                <form onSubmit={handleMediaSubmit} className="sleep-media-form">
                    <input
                        className="sleep-input sleep-media-input"
                        type="text"
                        placeholder="Inserta un Link de Youtube o de Spotify para reproducirlo mientras duermes"
                        value={mediaLink}
                        onChange={(e) => setMediaLink(e.target.value)}
                    />
                </form>
                {mediaLink && (
                    <div className="sleep-media-container">
                        {mediaLink.includes('youtube.com') ? (
                            <ReactPlayer
                                url={mediaLink}
                                loop={true}
                                playing={isPlaying}
                                onEnded={() => setAlreadySurvey(true)} // Update survey state when media ends
                            />
                        ) : mediaLink.includes('spotify.com') ? (
                            <></>
                            // <SpotifyPlayer mediaLink={mediaLink} />
                        ) : (
                            <p>El enlace proporcionado no es válido</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
