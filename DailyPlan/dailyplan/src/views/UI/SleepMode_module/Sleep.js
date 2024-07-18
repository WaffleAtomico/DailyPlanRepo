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
    const [soundFile, setSoundFile] = useState(null);

    useEffect(() => {
        getSleepmodeById(props.id_user).then(res => {
            const sleepData = res.data[0];
            if (sleepData) {
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

    useEffect(()=>{
        getSleepQualityById(props.id_user, moment().format('YYYY-MM-DD')).then(res=>{
            if(res.data >0)
            {
                
            }
        }).catch(err => {console.log(err)});
    },[props.id_user]);

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
            setSoundFile(file);
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
                    setIsPlaying(true);
                } else {
                    setIsPlaying(false);
                }
            } else {
                setIsPlaying(false);
                
                setShowSurvey(false);
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [horaDormir, horaDespertar, isToggled]);

    const confirmarModoDeSueño = () => {
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
        updateSleepmode(sleepData).then(() => {
            setHoradiff(calcularDiferenciaHoras(sleepData.sleep_starthour, sleepData.sleep_endhour));
        }).catch(err => { console.log(err) });
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
