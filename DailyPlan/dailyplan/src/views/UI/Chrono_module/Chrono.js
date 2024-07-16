import React, { useState, useEffect } from 'react';
import { FaRegCirclePause, FaRegCirclePlay, FaClockRotateLeft } from "react-icons/fa6";
import { addChronometer, deleteChronometer, getChronometersForUser } from '../../../utils/validations/chrono';
import { getPercentages, getPuntuality, getPuntualityById, updatePuntuality } from '../../../utils/validations/puntuality';
import { TbClockEdit } from "react-icons/tb";
import '../../../styles/UI/Chronometer/Chrono.css';
import { timeFormatHHMMSS, timeFormatSec } from '../../../utils/timeFormat';
import ChronoList from './ChronoList';

export default function Chrono_view(props) {


    const [timesFromUser, setTimesFromUser] = useState([]); // Las marcas guardadas por el usuario
    const [savedmarks, setSavedmark] = useState([]); // Marcas para saber qué tiempos comparar
    const [puntuality, setPuntuality] = useState([]);
    const [showList, setShowList] = useState(false); //Show the list or not
    const [inputTime, setInputTime] = useState(""); // Nuevo estado para el campo de entrada
    const [chronos, setChronos] = useState([]); // List of chronometers from the user
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

    const handleSaveChrono = async () => {
        // Variables
        const timeFormat = timeFormatHHMMSS(props.chronoTimeSecond);
        const date = new Date();
        const formattedDate = formatDateToHHMMSS(date);
    
        // Check if seconds are zero
        if (timeFormat.seconds === 0) {
            console.warn("Chrono seconds are zero, not saving the chrono.");
            return;
        }
    
        // Cannot surpass 20 chronometers
        if (chronos != null && chronos.length >= 20) {
            return;
        }
    
        // Create new object to store
        const chrono = {
            chrono_name: formattedDate,
            chrono_hour: timeFormat.hours,
            chrono_min: timeFormat.minutes,
            chrono_sec: timeFormat.seconds,
            user_id: props.id_user
        };
        console.log(chrono);
    
        try {
            // Save the chrono
            await addChronometer(chrono);
    
            // Update the punctuality
             getPuntualityById(props.id_user).then(response => {

                setPuntuality(response.data)
                
            })
            .catch(error => {
                console.log("error", error);
            });
           

           

            if (puntuality[0] == null && puntuality[0].punt_percent_chro == null) return;

            const punt = puntuality[0];
        

            console.log("Puntualidad antigua", punt.punt_percent_chro);
            if (punt.punt_percent_chro != 0) {
                const newPunctuality = (punt.punt_percent_chro + getPercentages(savedmarks, timesFromUser)) / 2;
                punt.punt_percent_chro = newPunctuality;
            }
            
            console.log("Nueva puntualidad", punt.punt_percent_chro);
            updatePuntuality(punt.punt_id, punt);


        } catch (error) {
            console.log("Error occurred: ", error);
        }
    };
    
    

    //Function to list al the chrono
    const handleListChrono = () => 
    {
        setShowList(!showList);

        if(!showList == false) return;
        getChronometersForUser(props.id_user)
        .then(response => {
            if (response.data ) {
                console.log(response.data)
                setChronos(response.data);
            } else {
               // console.error("Unexpected response format:", data);
            }
        })
        .catch(error => {
          //  console.error("Error fetching the user's chronometers:", error);
        });


        console.log("los crono:", chronos);

        
    }


    //function to eliminate a chrono
    const handleDeleteChrono =(id_chrono) =>
    {

        deleteChronometer(id_chrono).then(() =>{console.log("Éxito")})
        .catch(error => {console.error("Error:", error)})

    }



    const getDifference = (expectedTime, actualTime) => {

      
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
      
        if (timesFromUser.length > 1) {
            const sortedTimes = [...timesFromUser].sort((a, b) => a.localeCompare(b));
            if (JSON.stringify(sortedTimes) !== JSON.stringify(timesFromUser)) {
                setTimesFromUser(sortedTimes);
            }
        }

     
        
        //execute only

    });


//utils
const formatDateToHHMMSS = (date) => {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
};


    const iconSize = 45;

    return (
        <div className="chronometer-container">
            <div className="chronometer-time">{props.chronoTimeToChrono}</div>

            <div className="general-div">
            <button className="general-button" onClick={() =>handleSaveChrono()} >Guardar</button> 
            <button className="general-button" onClick={() =>handleListChrono()}>Listado</button>

            {showList && (<ChronoList chronos={chronos} handleDeleteChrono={handleDeleteChrono}/>)}

            </div>
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