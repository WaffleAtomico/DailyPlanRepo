import React from 'react';
import '../../styles/UI/Alarm/buttonAlarm.css'; // Archivo CSS para estilos del botón
import { FaPlus } from "react-icons/fa";
const ButtonAlarm = () => {
    return (
        <button className="custom-button">
           <FaPlus size={40}/>
        </button>
    );
}

export default ButtonAlarm;
