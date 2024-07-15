// GeneralNotif.jsx
import React, { useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import { playRingtone } from '../../../utils/sounds';
import '../../../styles/advices/GeneralNotif.css'; // Importamos el archivo CSS
import { myPojo } from '../../../utils/ShowNotifInfo';

export default function GeneralNotif({ mensaje, onClose, componente }) {
    useEffect(() => {
        if (myPojo._isShow) {
            playRingtone();
        }
    }, [])
    const handleCloseNotif = () => {
        myPojo.setNotif();
    }
    return (
        <div className="genotif-overlay">
            <div className="genotif-notificacion">
                <button className="genotif-boton-rojo" onClick={() => handleCloseNotif()}>
                    <FaTimes />
                </button>
                <div className="genotif-contenido">
                    <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                        {mensaje}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        {componente}
                    </div>
                </div>
                <div className="genotif-botones">

                    <button className="genotif-boton-verde" onClick={() => handleCloseNotif()}>Aceptar</button>
                </div>
            </div>
        </div>
    );
}
