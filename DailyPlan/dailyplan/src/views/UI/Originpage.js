import { useContext, useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Ui_navbar from "./nav/UinavBar";
import Calendar from "./Calendar_module/Calendar";
import Alarm from "./Alarm_module/Alarm";
import Chrono from "./Chrono_module/Chrono";
import CountdownTimer from "./CountDownTimer_module/CountdownTimer";
import Clock from "./Clocks_module/Clock";
import Invitation from "./Invitations_module/Invitation";
import Sleep from "./SleepMode_module/Sleep";
import Pomodoro from "./Pomodoro_module/Pomodoro";
import PuntButton from "./Puntuality_module/punt_button";
import ChronoIndicator from "./advices/ChronoMsjs";
import GeneralNotif from "./advices/GeneralNotif";


import { timeFormatSec } from "../../utils/timeFormat";
import { myPojo, changeCounter } from "../../utils/ShowNotifInfo";


import "../../styles/UI/Origin/UI.css";
import "../../styles/start/startpage.css";
import "../../styles/UI/Countdowntimer/countdown.css";

import { FaList, FaUserClock } from "react-icons/fa6";
import { getUsrName } from "../../utils/validations/user";
import { AuthContext } from "../../services/AuthContext";


//-------------
//import CRUD function
import { addChronometer } from "../../utils/validations/chrono";
import { getScheduleById } from "../../utils/validations/schedule";

import PreparationView from "./advices/Preparation";



export default function OriginPage() {
  /* --------------------ORIGIN BASE-------------------- */
  const { id } = useParams();
  const navigate = useNavigate();

  const [selectedOption, setSelectedOption] = useState(0);
  const [username, setUsername] = useState("");
  const [schedule, setSchedule] = useState([]);


  const handleOptionSelected = (index) => {
    setSelectedOption(index);
  };

  useEffect(() => {
    const getUserName = (user_id) => {
      // const response = await 
      getUsrName(user_id).then(response => {
        console.log("Response in front");
        console.log(response.data);
        setUsername(response.data[0].user_name);
      }).catch(error => {
        console.error(error);
      });

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
  };

  /*-------------------- Notifications --------------------*/

  const [mostrarNotificacion, setMostrarNotificacion] = useState(false);
  const [counter, setCounter] = useState(changeCounter);

  useEffect(() => {
    // console.log("Usestate "+mostrarNotificacion);
    // console.log("Pojo ", myPojo._isShow);
    if (myPojo._isShow === true) {
      setMostrarNotificacion(true);
      // console.log("Se muestra");
    } else if (myPojo._isShow === false) {
      setMostrarNotificacion(false);
      // console.log("No se muestra");
    }
  }, [counter]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter(changeCounter);
    }, 100); // Ajusta el intervalo según sea necesario

    return () => clearInterval(interval);
  }, []);


  /**
   *   GET SCHEDULE
   */

  useEffect(() => {
    getScheduleById(id).then(response => {
      console.log("Se obtuvo la siguiente información", response.data);
      setSchedule(response.data); localStorage.setItem('schedule', JSON.stringify(schedule));
    }).catch("no se logro obtener el schedule");
  }, [id, selectedOption]);

  /*---------------------- PREPARACION ---------------------- */

  const [mostrarPreparacion, setMostrarPreparacion] = useState(false);
  const [showMiniTab, setShowMiniTab] = useState(true);

  const handleClosePreparationView = () => {
    setMostrarPreparacion(false);
  };
  const [blocks, setBlocks] = useState([
    {
      name: 'Bloque 1',
      timeLimit: 5,
      objectives: [
        { id: 1, text: 'Objetivo 1', confirmed: false },
        { id: 2, text: 'Objetivo 2', confirmed: false },
        { id: 3, text: 'Objetivo 3', confirmed: false }
      ],
      timeDifference: null
    },
    {
      name: 'Bloque 2',
      timeLimit: 5,
      objectives: [
        { id: 4, text: 'Objetivo 4', confirmed: false },
        { id: 5, text: 'Objetivo 5', confirmed: false },
        { id: 6, text: 'Objetivo 6', confirmed: false },
        { id: 7, text: 'Objetivo 7', confirmed: false }
      ],
      timeDifference: null
    },
  ]);

  const handleUpdateBlocks = (updatedBlocks) => {
    setBlocks(updatedBlocks);
    console.log(blocks);
  };



  /*  --------------------CHRONO IN ALL-------------------- */

  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      clearInterval(intervalRef.current);
      intervalRef.current = setInterval(() => {
        setElapsedTime(Date.now() - startTime);
      }, 10);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => {
      clearInterval(intervalRef.current);
    };
  }, [isRunning, startTime]);

  function handleStart() {
    setIsRunning(true);
    setStartTime(Date.now() - elapsedTime);
  }

  function handleStop() {
    setIsRunning(false);
  }

  function handleStaSto() {
    if (isRunning) {
      handleStop();
    } else {
      handleStart();
    }
  }

  function handleReset() {
    setIsRunning(false);
    setStartTime(null);
    setElapsedTime(0);
  }

  const GoToProfileModule = () => {
    navigate(`/dailyplanconfig/${id}`);
  };

  const secondsPassed = elapsedTime / 1000;
  const chronoTime = timeFormatSec(secondsPassed);

  return (
    <div className="main-container">
      <div className="UI-header">
        <PuntButton id_user={id} />
        {/* <button className="left-button">
          Puntualidad
          </button> */}
        <Ui_navbar
          handleOptionSelected={handleOptionSelected}
          selectedOption={selectedOption}
        />
        <button onClick={() => GoToProfileModule()} className="right-button">
          {" "}
          <FaUserClock /> {username}{" "}
        </button>
        <p style={{ marginTop: "3rem" }}>
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
        {(selectedOption === 1 ||
          selectedOption === 3 ||
          selectedOption === 7 ||
          selectedOption === 8) && (
            <button
              className="UI-btn-opption"
              onClick={() => handleSuboption(selectedOption)}
            >
              {selectedOption === 1 && "Modo de sueño"}
              {selectedOption === 3 && "Pomodoro"}
              {selectedOption === 7 && "Alarma"}
              {selectedOption === 8 && "Temporizador"}
            </button>
          )}
      </div>

      <div className="UI-background">
        {selectedOption === 0 && <Calendar user_id={id} />}
        {selectedOption === 1 && <Alarm user_id={id} />}
        {selectedOption === 2 && (
          <Chrono
            id_user={id}
            chronoTimeToChrono={chronoTime}
            chronoTimeSecond={secondsPassed}
            isRunningChrono={isRunning}
            handleStaStoChrono={handleStaSto}
            handleResetChrono={handleReset}
          />
        )}
        {selectedOption === 3 && <CountdownTimer user_id={id} />}
        {selectedOption === 4 && <Clock id_user={id} />}
        {selectedOption === 5 && <Invitation user_id={id} />}
        {selectedOption === 7 && <Sleep id_user={id} />}
        {selectedOption === 8 && <Pomodoro id_user={id} />}
        {selectedOption !== 2 && secondsPassed > 0 && (
          <ChronoIndicator
            chronoTimeToChrono={chronoTime}
            chronoTimeSecond={secondsPassed}
            handleStaStoToChrono={handleStaSto}
          />
        )}
      </div>
      {mostrarPreparacion && (
        <PreparationView
          onClose={handleClosePreparationView}
          setShowMiniTab={setShowMiniTab}
          blocks={blocks}
          handleUpdateBlocks={handleUpdateBlocks}
        />
      )}
      {showMiniTab && (
        <div className="preparation-mini-tab" onClick={() => {
          setShowMiniTab(false);
          setMostrarPreparacion(true);
        }}>
          <FaList className="tab-icon" />
          <div className="tab-text">
            <span>P</span>
            <span>R</span>
            <span>E</span>
            <span>P</span>
            <span>A</span>
            <span>R</span>
            <span>A</span>
            <span>C</span>
            <span>I</span>
            <span>Ó</span>
            <span>N</span>
          </div>
        </div>
      )}

      {mostrarNotificacion && (
        <GeneralNotif
          mensaje={myPojo.HeadText}
          componente={myPojo.content}
        />
      )}
    </div>
  );
}