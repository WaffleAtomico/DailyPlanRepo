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

    useEffect(() => {
        getSleepmodeById(props.id_user).then(res => {
            const sleepData = res.data[0];
            if (sleepData) {
                setTone(sleepData.tone_id);
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
        const fechaDormir = new Date(`2000-01-01T${start}`);
        const fechaDespertar = new Date(`2000-01-01T${end}`);
        let diferenciaMilisegundos = fechaDespertar - fechaDormir;
        if (diferenciaMilisegundos < 0) {
            diferenciaMilisegundos += 24 * 3600000;
        }
        const horas = Math.floor(diferenciaMilisegundos / 3600000);
        if (horas >= 10 || horas <= 4) {
            myPojo.setNotif("¡CUIDADO!", <div style={{ fontSize: "larger" }}>Dormir por demasiado tiempo o muy poco puede afectar tu rendimiento</div>);
        }
        return horas;
    };

    useEffect(() => {
        const interval = setInterval(() => {
            const horaActual = moment().format('HH:mm');
            const startHour = convertTimeToTinyInt(horaDormir);
            const endHour = convertTimeToTinyInt(horaDespertar);
            const currentTime = convertTimeToTinyInt(horaActual);
            if (isToggled) {
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

    const confirmarModoDeSueño = () => {
        let tone_id = null;
        if (soundFile != null) {
            const formData = {
                alarmTone: soundFile.base64,
                alarmToneName: soundFile.name,
                alarmToneType: soundFile.type
            };
            addTone(formData).then(response => {
                tone_id = response.tone_id;
                const sleepData = {
                    sleep_starthour: convertTimeToTinyInt(horaDormir),
                    sleep_endhour: convertTimeToTinyInt(horaDespertar),
                    sleep_active: isToggled ? 1 : 0,
                    sleep_rep: repValue,
                    sleep_video_url: mediaLink,
                    sleep_rep_stopped: null,
                    tone_id: tone_id,
                    sleep_id: props.id_user
                };
                updateSleepmode(sleepData).then(() => {
                    setHoradiff(calcularDiferenciaHoras(sleepData.sleep_starthour, sleepData.sleep_endhour));
                }).catch(err => { console.log(err); });
            }).catch(err => { console.log(err); });
        } else {
            const sleepData = {
                sleep_starthour: convertTimeToTinyInt(horaDormir),
                sleep_endhour: convertTimeToTinyInt(horaDespertar),
                sleep_active: isToggled ? 1 : 0,
                sleep_rep: repValue,
                sleep_video_url: mediaLink,
                sleep_rep_stopped: null,
                tone_id: null,
                sleep_id: props.id_user
            };
            updateSleepmode(sleepData).then(() => {
                setHoradiff(calcularDiferenciaHoras(sleepData.sleep_starthour, sleepData.sleep_endhour));
            }).catch(err => { console.log(err); });
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
                                <button className="sleep-confirm" onClick={confirmarModoDeSueño}>
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
                                    <MdBedtime/>
                                </div>
                                Horas<br />de<br />Sueño</label>
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
