import React, { useState, useEffect } from 'react';
import ToggleButton from './togglebtn';
import ReactPlayer from 'react-player';
import moment from 'moment-timezone/builds/moment-timezone-with-data-10-year-range.js';
import SleepSurvey from './SleepForm'; // Importa el componente SleepSurvey
// import SpotifyPlayer from '../../components/alarm/SpoRepro';

import '../../../styles/UI/Sleep/Sleep.css'

export default function SleepAlarm() {
    const [isToggled, setIsToggled] = useState(false);
    const [isPlaying, setIsPlaying] = useState(true);
    const [horaActual, setHoraActual] = useState(moment().format('HH:mm:ss'));
    const [horaDormir, setHoraDormir] = useState('');
    const [horaDespertar, setHoraDespertar] = useState('');
    const [horadiff, setHoradiff] = useState();
    const [mediaLink, setMediaLink] = useState('');
    const [showSurvey, setShowSurvey] = useState(false); // Estado para mostrar la encuesta

    const handleMediaSubmit = (e) => {
        e.preventDefault();
        console.log('Media Link:', mediaLink);
    };

    const calcularDiferenciaHoras = () => {
        const fechaDormir = new Date(`2000-01-01T${horaDormir}`);
        const fechaDespertar = new Date(`2000-01-01T${horaDespertar}`);
        let diferenciaMilisegundos = fechaDespertar - fechaDormir;
        if (diferenciaMilisegundos < 0) {
            diferenciaMilisegundos += 24 * 3600000;
        }
        const horas = Math.floor(diferenciaMilisegundos / 3600000);
        setHoradiff(horas);
        return horas;
    };

    useEffect(() => {
        const interval = setInterval(() => {
            const horaActual = moment().format('HH:mm');

            if (isToggled) {
                if ((horaActual < horaDespertar) && (horaActual >= horaDormir)) {
                    setIsPlaying(true);
                } else {
                    setIsPlaying(false);
                    //Debe el sistema de asegurarse que ya contesto la encuesta para poder preguntarle
                    if (horaActual >= horaDespertar && horaActual+1) {
                        setShowSurvey(true);
                    }
                }
            } else {
                setIsPlaying(false);
                setShowSurvey(false); // Resetear el estado de mostrar la encuesta
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [horaDespertar, isToggled]);

    return (
        <div className={mediaLink ? "sleep-body-link" : "sleep-body-nolink"}>
            <div className="sleep-content-wrapper">
                {showSurvey ? (
                    <SleepSurvey onClose={() => setShowSurvey(false)} /> // Mostrar SleepSurvey cuando showSurvey es true
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
                                <div className="sleep-time-input">
                                    <input
                                        className="sleep-input"
                                        type="time"
                                        placeholder="Hora para dormir"
                                        value={horaDormir}
                                        onChange={(e) => setHoraDormir(e.target.value)}
                                    />
                                </div>
                                <div className="sleep-time-input">
                                    <input
                                        className="sleep-input"
                                        type="time"
                                        placeholder="Hora para despertar"
                                        value={horaDespertar}
                                        onChange={(e) => setHoraDespertar(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="sleep-confirmar-button-container">
                                <button className="sleep-confirm" onClick={() => calcularDiferenciaHoras()}>
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
