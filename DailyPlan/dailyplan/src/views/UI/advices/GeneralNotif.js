// GeneralNotif.jsx
import React, { useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import { playAudio } from '../../../utils/sounds';
import '../../../styles/advices/GeneralNotif.css'; // Importamos el archivo CSS

export default function GeneralNotif({ mensaje, onClose, componente, src, repeticions  }) {

useEffect(() =>
{
    playAudio(src, repeticions);
}, [src, repeticions])

    return (
        <div className="overlay">
            <div className="notificacion">
                <button className="boton-rojo" onClick={playAudio(src, repeticions)}>
                    <FaTimes />
                </button>
                <div className="contenido">
                    <div>{mensaje}</div>
                    <div>{componente}</div>
                </div>
                <div className="botones">
                    <button className="boton-verde" onClick={onClose}>Aceptar</button>
                </div>
            </div>
        </div>
    );
}
