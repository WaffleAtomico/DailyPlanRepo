import React, { useState, useEffect } from 'react';
import '../../styles/UI/Alarm/Sleep.css'
import ToggleButton from '../../components/alarm/togglebtn';
import ReactPlayer from 'react-player';
import moment from 'moment-timezone/builds/moment-timezone-with-data-10-year-range.js';
import SpotifyPlayer from 'react-spotify-player';
// import SpotifyPlayer from '../../components/alarm/SpoRepro';


export default function SleepAlarm() { const [isToggled, setIsToggled] = useState(false);
    const [isPlaying, setIsPlaying] = useState(true);
    const [horaActual, setHoraActual] = useState(moment().format('HH:mm:ss'));
    const [horaDormir, setHoraDormir] = useState('');
    const [horaDespertar, setHoraDespertar] = useState('');
    const [horadiff, setHoradiff] = useState();
    const [mediaLink, setMediaLink] = useState('');

    const size = {
      width: '100%',
      height: 300,
    };
    const view = 'list'; // or 'coverart'
    const theme = 'black'; // or 'white'

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

            if(isToggled)
            {
                // console.log("Es menor la actual a despertar: " + (horaActual <= horaDespertar) );
                // console.log("Es mayor la actual a dormir: " + (horaActual > horaDormir) );
                if (  (horaActual < horaDespertar) && (horaActual >= horaDormir) ) {
                    // console.log("es true")
                    setIsPlaying(true); 
                } else {
                    // console.log("es false")
                    setIsPlaying(false); 
                }
            }else{
                // console.log("es false toggle")
                setIsPlaying(false); 
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [horaDespertar, isToggled]);

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
                            <button className="sleep-confirm" onClick={() => calcularDiferenciaHoras()}>
                                Confirmar hora de dormir
                            </button>
                        </div>
                    </div>
                </div>

                <div className="sleep-horas-container">
                    <label className='sleep-horas' style={{ fontSize: "120px" }}> {horadiff} </label>
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
                            <SpotifyPlayer 
                                uri="spotify:album:1TIUsv8qmYLpBEhvmBmyBk"
                                size={size}
                                view={view}
                                theme={theme}
                            />

                        ) : (
                            <p>El enlace proporcionado no es válido</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}