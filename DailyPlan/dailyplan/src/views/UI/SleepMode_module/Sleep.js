import React, { useState, useEffect } from 'react';
import ToggleButton from './togglebtn';
import ReactPlayer from 'react-player';
import moment from 'moment-timezone/builds/moment-timezone-with-data-10-year-range.js';
import SleepSurvey from './SleepForm'; // Importa el componente SleepSurvey
// import SpotifyPlayer from '../../components/alarm/SpoRepro';
import { myPojo } from '../../../utils/ShowNotifInfo';
import '../../../styles/UI/Sleep/Sleep.css';
import { getSleepmodeById, updateSleepmode } from '../../../utils/validations/sleep';
import { getSleepQualityById } from '../../../utils/validations/sleepquality';
import { addTone } from '../../../utils/validations/tone';
import { base64ToBlob, playAlarm, playBlobAudio, playRingtone } from '../../../utils/sounds';

export default function SleepAlarm(props) {
    const [isToggled, setIsToggled] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [horaActual, setHoraActual] = useState(moment().format('HH:mm:ss'));
    const [horaDormir, setHoraDormir] = useState('');
    const [horaDespertar, setHoraDespertar] = useState('');
    const [horadiff, setHoradiff] = useState();
    const [mediaLink, setMediaLink] = useState('');
    const [showSurvey, setShowSurvey] = useState(false); // Estado para mostrar la encuesta
    const [repValue, setRepValue] = useState(1);
    const [stopRepValue, setStopRepValue] = useState(0);
    const [alreadySurvery, setAlreadySurvey] = useState(null);
    const [tone, setTone] = useState(null);
    const [dataTone, setDataTone] = useState(null);
    const [soundFile, setSoundFile] = useState(null);

    useEffect(() => {
        getSleepmodeById(props.id_user).then(res => {
            const sleepData = res.data[0];

         

            if (sleepData) {
                setTone(sleepData.tone_id);
                setDataTone(base64ToBlob(sleepData.tone_location, "audio/mpeg" ));
                setHoraDormir(formatTimeFromTinyInt(sleepData.sleep_starthour));
                setHoraDespertar(formatTimeFromTinyInt(sleepData.sleep_endhour));
                setIsToggled(sleepData.sleep_active === 1);
                setRepValue(sleepData.sleep_rep || 1);
                setMediaLink(sleepData.sleep_video_url || '');
                if (sleepData.sleep_starthour && sleepData.sleep_endhour) {
                    setHoradiff(calcularDiferenciaHoras(sleepData.sleep_starthour, sleepData.sleep_endhour));
                }
            }
        }
        
            
    
    
    ).catch(err => { console.log(err) });
    }, [props.id_user]);

    useEffect(() => {
        const currentDate = moment().format('YYYY-MM-DD');
        getSleepQualityById({ quality_id: props.id_user, current_date: currentDate }).then(res => {
            console.log("ya hizo la query", res.data[0] != null);
            if (res.data[0])  {
                setAlreadySurvey(true);
                console.log("alreadySurve es:", alreadySurvery);
            }
            else
            {
                setAlreadySurvey(false);
            }
        }).catch(err => { console.log(err) });
    }, []);

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
                     console.log("sigue el tiempo");
                    setIsPlaying(true);
                } else {
                    console.log("El tiempo se acabo");
                    if(alreadySurvery === null) return;
              
                    if(alreadySurvery) 
                        {
                            setShowSurvey(false);
                            return;
                        }

                     if(repValue > 0)   
                     {
                        const more = repValue-1;
                        const less = stopRepValue+1;
                        setRepValue(more);
                        setStopRepValue(less);
                        if(tone === null)
                        {
                            console.log("olaaaaa");
                          playAlarm();
                            
                        }
                        else
                        {
                            playBlobAudio(soundFile);
                        }
                     }
                        
                    setIsPlaying(false);
                    
                }
            } else {
               
                //Cuando es la hora
                setIsPlaying(false);

                setShowSurvey(false);
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [horaDormir, horaDespertar, isToggled]);



    const confirmarModoDeSueño = () => {
        let tone_id = null;
    
        if (soundFile != null) {
            // Object for the alarm
            const formData = {
                alarmTone: soundFile.base64,
                alarmToneName: soundFile.name,
                alarmToneType: soundFile.type
            };
    
            // Add tone to the database
            addTone(formData).then(response => {
                tone_id = response.tone_id;
    
                // Sleep data object
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
    
                console.log('Sleep Data:', sleepData);
    
                // Update sleep mode
                updateSleepmode(sleepData).then(() => {
                    setHoradiff(calcularDiferenciaHoras(sleepData.sleep_starthour, sleepData.sleep_endhour));
                }).catch(err => {
                    console.log(err);
                });
    
            }).catch(err => {
                console.log(err);
            });
    
        } else {
            // Sleep data object without tone
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
    
            console.log('Sleep Data:', sleepData);
    
            // Update sleep mode
            updateSleepmode(sleepData).then(() => {
                setHoradiff(calcularDiferenciaHoras(sleepData.sleep_starthour, sleepData.sleep_endhour));
            }).catch(err => {
                console.log(err);
            });
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
                        stopRep = {stopRepValue}
                    />
                ) : (
                    <div className="sleep-alarma">
                        <div className="sleep-alarma-container">
                            <div className="sleep-toggle-container">
                                Desactivar
                                <ToggleButton
                                    handleChange={() => setIsToggled(!isToggled)}
                                    isToggled={isToggled}
                                />
                                Activar
                            </div>
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
                            </div>

                            <div className="sleep-confirmar-button-container">
                                <button className="sleep-confirm" onClick={() => {
                                    confirmarModoDeSueño();
                                }}>
                                    Confirmar hora de dormir
                                </button>
                            </div>
                        </div>
                        <div className="sleep-horas-container">
                            <label className='sleep-horas'>{isNaN(horadiff) ? "" : horadiff}</label>
                            <label className='sleep-texto'>Horas<br />de<br />Sueño</label>
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
