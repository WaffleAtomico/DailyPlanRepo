// GeneralNotif.jsx
import React from 'react';
import { FaTimes } from 'react-icons/fa';
import '../../../styles/advices/GeneralNotif.css'; // Importamos el archivo CSS

export default function GeneralNotif({ mensaje, onClose, componente }) {
    return (
        <div className="overlay">
            <div className="notificacion">
                <button className="boton-rojo" onClick={onClose}>
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
