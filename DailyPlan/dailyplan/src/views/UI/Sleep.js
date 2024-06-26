import React, { useState, useEffect } from 'react';
import '../../styles/UI/Alarm/Sleep.css'
import ToggleButton from '../../components/alarm/togglebtn';
import ReactPlayer from 'react-player';
import moment from 'moment-timezone/builds/moment-timezone-with-data-10-year-range.js';


export default function SleepAlarm() {
    // const [activo, setActivo] = useState(false);

    const [isToggled, setIsToggled] = useState(false);
    const [isPlaying, setIsPlaying] = useState(true);
    const [horaActual, setHoraActual] = useState(moment().format('HH:mm:ss'));

    const handleChange = () => {
        setIsToggled(!isToggled);
    };

    const [horaDormir, setHoraDormir] = useState('');
    const [horaDespertar, setHoraDespertar] = useState('');
    const [mediaLink, setMediaLink] = useState('');

    const handleMediaSubmit = (e) => {
        e.preventDefault();
        console.log('Media Link:', mediaLink);
    };

    useEffect( () => {
        const interval = setInterval(() => {
            setHoraActual(moment().format('HH:mm'));
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    

    const handlePause = () => {
        setIsPlaying(false);
    };

    return (
        <div className={mediaLink ? "sleep-body-link" : "sleep-body-nolink"}>
            <div className="content-wrapper">
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
                            <button className="sleep-confirm" onClick={() => console.log(horaDormir)}>
                                Confirmar hora de dormir
                            </button>
                        </div>
                    </div>
                </div>

                <div className="sleep-horas-container">
                    <label className='sleep-horas' style={{ fontSize: "120px" }}> X </label>
                    <label className='sleep-texto' style={{ fontSize: "40px" }}> Horas <br /> de <br /> Sueño </label>
                </div>

                <form onSubmit={handleMediaSubmit} className="media-form">
                    <input
                        className="sleep-input media-input"
                        type="text"
                        placeholder="Inserta un Link de Youtube o de Spotify para reproducirlo mientras duermes"
                        value={mediaLink}
                        onChange={(e) => setMediaLink(e.target.value)}
                    />
                </form>

                {mediaLink && (
                    <div className="media-container">
                        {mediaLink.includes('youtube.com') ? (

                            <ReactPlayer
                                url={mediaLink}
                                loop={true}
                                playing={isPlaying} 
                            />
                        ) : mediaLink.includes('spotify.com') ? (
                            <iframe
                                src={`https://open.spotify.com/embed/track/${mediaLink.split('track/')[1]}`}
                                width="300"
                                height="80"
                                frameBorder="0"
                                allowtransparency="true"
                                allow="encrypted-media"
                            ></iframe>
                        ) : (
                            <p>El enlace proporcionado no es válido</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}