import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Ui_navbar from "../../components/nav/UinavBar";
import Calendar from "./Calendar";
import Alarm from "./Alarm";
import Chrono from "./Chrono";
import CountdownTimer from "./CountdownTimer";
import Clock from "./Clock";
import Invitation from "./Invtitation";
import Sleep from './Sleep';
import Pomodoro from './Pomodoro';


import { timeFormatSec } from '../../utils/timeFormat'


import ChronoIndicator from "../../components/advices/ChronoMsjs";

import '../../styles/UI/Origin/UI.css';
import '../../styles/start/startpage.css';
import '../../styles/UI/Countdowntimer/style.css';

import { FaUserClock } from "react-icons/fa6";
import { getUsrName } from '../../utils/validations/user';



export default function OriginPage() {

  /* --------------------ORIGIN BASE-------------------- */
  const { id } = useParams();
  const navigate  = useNavigate();
  

  const [selectedOption, setSelectedOption] = useState(0);
  const [username, setUsername] = useState('');

  const handleOptionSelected = (index) => {
    setSelectedOption(index);
  };

  useEffect(() => {
    const getUserName = async (user_id) => {
      const response = await getUsrName(user_id);
      console.log("Response in front " + response.user_name);
      setUsername(response.user_name);
    };
    getUserName(id);
  }, []);

  const handleSuboption = (index) => {
    switch (index) {
      case 1:
        handleOptionSelected(7);
        break;
      case 3:
        handleOptionSelected(8);
      break;
      case 7:
        handleOptionSelected(1);
        break;
      case 8:
        handleOptionSelected(3);
      break;
      default:

        break;
    }
  }

  /*  --------------------CHRONO IN ALL-------------------- */

  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);


    useEffect(() => {
        if(isRunning){
            clearInterval(intervalRef.current);
            intervalRef.current = setInterval(()=>{
                setElapsedTime(Date.now() - startTime);
            },10);
        }else{
            clearInterval(intervalRef.current);
        }

        return () => {
            clearInterval(intervalRef.current);
        };
    }, [isRunning, startTime]);

    function handleStart(){
        setIsRunning(true);
        setStartTime(Date.now() - elapsedTime);
    }

    function handleStop(){
        setIsRunning(false);
    }

    function handleStaSto(){
        if(isRunning){ handleStop(); }
        else{ handleStart(); }
    };

    function handleReset() {
        setIsRunning(false);
        setStartTime(null);
        setElapsedTime(0);
    }

    const GoToProfileModule = () =>
    {
      navigate(`/dailyplanconfig/${id}`);
    }

    const secondsPassed = elapsedTime / 1000;
    const chronoTime = timeFormatSec(secondsPassed);


  return (
    <div className='main-container'>
      <div className='UI-header'>
        <button className='left-button'>Puntualidad</button>
          <Ui_navbar 
            handleOptionSelected={handleOptionSelected} 
            selectedOption={selectedOption}
          />
        <button onClick={()=>GoToProfileModule()} className='right-button'> <FaUserClock /> {username} </button>
        <p style={{marginTop:'3rem'}}>
          {selectedOption === 0 && "Calendario"}
          {selectedOption === 1 && "Alarma"}
          {selectedOption === 2 && "Cronometro"}
          {selectedOption === 3 && "Temporizador"}
          {selectedOption === 4 && "Relojes"}
          {selectedOption === 5 && "Invitaciones"}
          {/* {selectedOption === 6 && "Congifuración"} */}
          {selectedOption === 7 && "Modo de sueño"}
          {selectedOption === 8 && "Pomodoro"}
        </p>
        { (selectedOption === 1 ||
            selectedOption === 3 ||
            selectedOption === 7 ||
            selectedOption === 8) && 
        <button className='UI-btn-opption' onClick={() => handleSuboption(selectedOption)}>
          {selectedOption === 1 && "Modo de sueño"}
          {selectedOption === 3 && "Pomodoro"}
          {selectedOption === 7 && "Alarma"}
          {selectedOption === 8 && "Temporizador"}
        </button>
        }
      </div>

      <div className='UI-background'>
          {selectedOption === 0 && <Calendar />}
          {selectedOption === 1 && <Alarm />}
          {selectedOption === 2 && <Chrono 
            chronoTimeToChrono= {chronoTime}
            isRunningChrono={isRunning}
            handleStaStoChrono={handleStaSto}
            handleResetChrono={handleReset}
          />}
          {selectedOption === 3 && <CountdownTimer />}
          {selectedOption === 4 && <Clock id_user={id} />}
          {selectedOption === 5 && <Invitation />}
          {/* {selectedOption === 6 && <Configuration />} */}
          {selectedOption === 7 && <Sleep />}
          {selectedOption === 8 && <Pomodoro />}
          {
            (selectedOption !== 2 && secondsPassed > 0) && 
            <ChronoIndicator chronoTimeToChrono={chronoTime} 
            handleStaStoToChrono={handleStaSto}
            />
          }
      </div>
    </div>
  );
}
  
  