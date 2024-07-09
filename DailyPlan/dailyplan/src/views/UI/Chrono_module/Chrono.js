import React, { useState, useEffect } from 'react';
import { FaRegCirclePause, FaRegCirclePlay, FaClockRotateLeft } from "react-icons/fa6";
import { TbClockEdit } from "react-icons/tb";
import '../../../styles/UI/Chronometer/Chrono.css';

export default function Chrono_view(props) {
    const [timesFromUser, setTimesFromUser] = useState([]); // Las marcas guardadas por el usuario
    const [savedmarks, setSavedmark] = useState([]); // Marcas para saber qué tiempos comparar
    const [inputTime, setInputTime] = useState(""); // Nuevo estado para el campo de entrada

    const handleMark = () => {
        const actualtime = props.chronoTimeSecond;
        if (savedmarks.length < timesFromUser.length) {

          
            setSavedmark([...savedmarks, actualtime]);
            //console.log(savedmarks);
        }
    };

    const handleAddTime = () => {
        if (!props.isRunningChrono && inputTime) {
            const newTimes = [...timesFromUser, inputTime].sort((a, b) => a.localeCompare(b));
            setTimesFromUser(newTimes);
            setInputTime(""); 
        }
    };

    const getDifference = (expectedTime, actualTime) => {

       //console.log(expectedTime);
     //   console.log(actualTime);
        const [expectedHours, expectedMinutes, expectedSeconds] = expectedTime.split(":").map(Number);
        
        const expectedTotalSeconds = expectedHours * 3600 + expectedMinutes * 60 + expectedSeconds;
        const actualTimeSeconds = Math.floor(actualTime);
        console.log(actualTimeSeconds);

        const differenceInSeconds = actualTimeSeconds - expectedTotalSeconds;
    
        const diffHours = Math.floor(Math.abs(differenceInSeconds) / 3600).toString().padStart(2, '0');
        const diffMinutes = Math.floor((Math.abs(differenceInSeconds) % 3600) / 60).toString().padStart(2, '0');
        const diffSeconds = (Math.abs(differenceInSeconds) % 60).toString().padStart(2, '0');
    
        return `${differenceInSeconds < 0 ? '-' : '+'}${diffHours}:${diffMinutes}:${diffSeconds}`;
    };

    useEffect(() => {
        // Avoid updating state inside useEffect to prevent infinite loop
        if (timesFromUser.length > 1) {
            const sortedTimes = [...timesFromUser].sort((a, b) => a.localeCompare(b));
            if (JSON.stringify(sortedTimes) !== JSON.stringify(timesFromUser)) {
                setTimesFromUser(sortedTimes);
            }
        }
    }, [timesFromUser]);

    const iconSize = 45;

    return (
        <div className="chronometer-container">
            <div className="chronometer-time">{props.chronoTimeToChrono}</div>
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
                        <td>Tiempo esperado</td>
                        <td>Diferencia al obtenido</td>
                    </tr>
                    {timesFromUser.map((time, index) => (
                        <tr key={index}>
                            <td>{time}</td>
                            <td>{savedmarks[index] ? getDifference(timesFromUser[index], savedmarks[index]) : "-"}</td>
                        </tr>
                    ))}
                    <tr onClick={handleAddTime} style={{ backgroundColor: "#CDDC39", cursor: "pointer" }}>
                        <td colSpan="2">
                            <button className="add-button">
                                +
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div className="chronometer-controls">
                <div className="time-input-item" style={{ backgroundColor: "#2196F3" }} onClick={props.handleResetChrono}>
                    <div className='time-input-item-front'>
                        <FaClockRotateLeft size={iconSize} />
                    </div>
                </div>
                <div className="time-input-item" style={props.isRunningChrono ? { backgroundColor: "#4CAF50" } : { backgroundColor: "#B43F61" }} onClick={props.handleStaStoChrono}>
                    <div className='time-input-item-front'>
                        {props.isRunningChrono ?
                            <FaRegCirclePause size={iconSize} /> :
                            <FaRegCirclePlay size={iconSize} />
                         }
                    </div>
                </div>
                <div className="time-input-item" style={{ backgroundColor: "#FFC107" }} onClick={handleMark}>
                    <div className='time-input-item-front'>
                        <TbClockEdit size={iconSize} />
                    </div>
                </div>
            </div>
        </div>
    );
}