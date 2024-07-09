import React, { useState, useEffect } from 'react';
import { FaRegCirclePause, FaRegCirclePlay, FaClockRotateLeft } from "react-icons/fa6";
import { TbClockEdit } from "react-icons/tb";
import '../../../styles/UI/Chronometer/Chrono.css';

export default function Chrono_view(props) {
    const [timesFromUser, setTimesFromUser] = useState([]); //las marcas guardadas por el usuario
    const [savedmarks, setSavedmark] = useState([]); //marcas para saber que tiempos comparar
    const [inputTime, setInputTime] = useState(""); // Nuevo estado para el campo de entrada

    const handleMark = () => {
        console.log(savedmarks);

        const actualtime = props.chronoTimeToChrono;
        console.log(actualtime);      
        if (timesFromUser.length < savedmarks.length) {
            setSavedmark([...savedmarks, actualtime]);
            console.log(savedmarks);
        }
      };
    

    const handleAddTime = () => {
        if (!props.isRunningChrono && inputTime) {
            const newTimes = [...timesFromUser, inputTime].sort((a, b) => a.localeCompare(b));
            setTimesFromUser(newTimes);
            // setTimesFromUser([...timesFromUser, inputTime]);
            // const sortedTimes = [...timesFromUser].sort((a, b) => a.localeCompare(b));
            // setTimesFromUser(sortedTimes);
            setInputTime(""); 
        }
    };

    const getDifference = (expectedTime, actualTime) => {
        const [expectedHours, expectedMinutes, expectedSeconds] = expectedTime.split(":").map(Number);
        const [actualHours, actualMinutes, actualSeconds] = actualTime.split(":").map(Number);
        
        const expectedTotalSeconds = expectedHours * 3600 + expectedMinutes * 60 + expectedSeconds;
        const actualTotalSeconds = actualHours * 3600 + actualMinutes * 60 + actualSeconds;
    
        const differenceInSeconds = actualTotalSeconds - expectedTotalSeconds;
    
        const diffHours = Math.floor(Math.abs(differenceInSeconds) / 3600).toString().padStart(2, '0');
        const diffMinutes = Math.floor((Math.abs(differenceInSeconds) % 3600) / 60).toString().padStart(2, '0');
        const diffSeconds = (Math.abs(differenceInSeconds) % 60).toString().padStart(2, '0');
    
        return `${differenceInSeconds < 0 ? '-' : '+'}${diffHours}:${diffMinutes}:${diffSeconds}`;
    };

    useEffect(() => {
        // console.log("Activo");
        const sortedTimes = [...timesFromUser].sort((a, b) => a.localeCompare(b));
        setTimesFromUser(sortedTimes);
        // console.log(sortedTimes);
      }, [timesFromUser]);

    const iconSize = 45;

    return (
        <div className="chronometer-container">
            <div className="chronometer-time">{props.chronoTimeToChrono}</div>
            {/* <div className="input-container">
            </div> */}
            <table className="times-table">
                <thead>
                    <tr>
                        <th colSpan="2">
                            <input
                                type="time"
                                step="1"
                                placeholder="Ingrese un tiempo"
                                value={inputTime}
                                max="99:59:59"
                                onChange={(e) => setInputTime(e.target.value)}
                                required
                            />
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td >Tiempo esperado</td>
                        <td >Diferencia al obtenido</td>
                    </tr>
                    {timesFromUser.map((time, index) => (
                        <tr key={index}>
                            <td>{time}</td>
                            
                            {/* <td>{savedmarks[index] ? savedmarks[index] : "-"}</td> */}
                            <td>{savedmarks[index] ? getDifference(timesFromUser[0], time) : "-"}</td>
                        </tr>
                    ))}
                    <tr onClick={handleAddTime} style={{backgroundColor: "#CDDC39", cursor: "pointer"}}>
                        <td colSpan="2">
                            <button className="add-button" >
                                +
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div className="chronometer-controls">                
                <div class="time-input-item" style={{backgroundColor: "#2196F3 "}} onClick={props.handleResetChrono}>
                    <div className='time-input-item-front'>
                        <FaClockRotateLeft size={iconSize} />
                    </div>
                </div>
                <div class="time-input-item" style={props.isRunningChrono ? {backgroundColor: "#4CAF50"} : {backgroundColor: "#B43F61"}} onClick={props.handleStaStoChrono}>
                    <div className='time-input-item-front'>
                        {props.isRunningChrono ?
                            <FaRegCirclePause size={iconSize} /> :
                            <FaRegCirclePlay size={iconSize} />
                        }
                    </div>
                </div>
                <div class="time-input-item" style={{backgroundColor: "#FFC107"}} onClick={handleMark}>
                    <div className='time-input-item-front'>
                        <TbClockEdit size={iconSize} />
                    </div>
                </div>
            </div>
        </div>
    );
}
