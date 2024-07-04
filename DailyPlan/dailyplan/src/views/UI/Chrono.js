import React, { useState } from 'react';
import { FaRegCirclePause, FaRegCirclePlay, FaClockRotateLeft   } from "react-icons/fa6";
import { TbClockEdit } from "react-icons/tb";

export default function Cronometro(props) {

    const [timesFromUser, setTimesFromUser] = useState([]);
    /*
     Hay una lista de chronometros guardados, y otra de tiempos del usuario
     
     
    */

    const iconzise = 45;

    return (
        <div>
            {/* timeFormat() */}
            <div>{props.chronoTimeToChrono}</div>
            <div>

            </div>
            <div>
                <button onClick={props.handleStaStoChrono}>{props.isRunningChrono ? <FaRegCirclePause size={iconzise}/> : <FaRegCirclePlay size={iconzise}/>}</button>
                
                <button onClick={props.handleResetChrono}><FaClockRotateLeft size={iconzise}/></button>
                <button ><TbClockEdit size={iconzise}/></button>
            </div>
        </div>
    );
}