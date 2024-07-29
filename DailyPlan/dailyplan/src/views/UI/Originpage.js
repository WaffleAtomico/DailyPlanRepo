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


import { calculateWeekRange, timeFormatSec } from "../../utils/timeFormat";
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
import { getReminderById, getRemindersByWeek } from "../../utils/validations/reminders";

import { getPuntualityById } from "../../utils/validations/puntuality";
import WeekSumerize from "./advices/WeekSumerize";
import { useBootstrapBreakpoints } from "react-bootstrap/esm/ThemeProvider";


export default function OriginPage() {
  /* --------------------ORIGIN BASE-------------------- */
  //#region 
  const { id } = useParams();
  const navigate = useNavigate();

  const [selectedOption, setSelectedOption] = useState(0);
  const [username, setUsername] = useState("");
  const [schedule, setSchedule] = useState([]);
  const [puntuality, setPuntuality] = useState(0);


  const handleOptionSelected = (index) => {
    setSelectedOption(index);
  };

  useEffect(() => {
    const getUserName = (user_id) => {
      // const response = await 
      getUsrName(user_id).then(response => {
        // console.log("Response in front");
        // console.log(response.data);
        setUsername(response.data[0].user_name);
        
      }).catch(error => {
        console.error(error);
        navigate("/login");
      });

    };
    const getUserPuntuality = (user_id) => {
      getPuntualityById(user_id).then(res => {
        if (isNaN(res.data[0])) {
          // console.log("Puntualidad ", res.data[0]);
          setPuntuality(0);
          // myPojo.setNotif("¿No tienes puntualidad?", <> Cada domingo a las 6pm con base en tus resultados de esa semana se te asignará un valor de puntualidad. ¡Esfuerzate cada semana para obtener distintos logros y hasta un marco especial para tu usuario!</>)
        } else {
          setPuntuality(res.data[0]);
        }
      }).catch(error => {
        console.error(error);
      });
    };
    getUserName(id);
    getUserPuntuality(id);
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

  useEffect(() => {
    const showSumarize = () => {
      //Preguntar si existe o si esta en 0 o 1
      myPojo.setNotif("Resumen Semanal de Puntualidad", <WeekSumerize />);
    }
    // showSumarize();
  }, [])

  const GoToProfileModule = () => {
    navigate(`/dailyplanconfig/${id}`);
  };

  //#endregion
  /*-------------------- NOTIFICATIONS --------------------*/
  //#region 
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

  //Se puede manejar como un 3er tipo de notificacion
  //Si si tiene esa notificacion, se lo va a mostrar aca
  //Como con un true, si no le llega esa notificacion tecnicamente no lo tiene
  const [reminderArchi, setReminderArchi] = useState({
    timeObj: false,
    allObj: false,
    fasArrival: false,
  });
  const [currentAchievement, setCurrentAchievement] = useState(null);
  
  useEffect(() => {
    if (!myPojo._isShow) {
      if (currentAchievement === null || currentAchievement === 'fasArrival') {
        if (reminderArchi.fasArrival) {
          handleFastestArrival();
          setReminderArchi(prevState => ({
            ...prevState,
            fasArrival: false,
          }));
          setCurrentAchievement('timeObj');
          return;
        }
      }
      if (currentAchievement === 'timeObj') {
        if (reminderArchi.timeObj) {
          handleFastestTimeObj();
          setReminderArchi(prevState => ({
            ...prevState,
            timeObj: false,
          }));
          setCurrentAchievement('allObj');
          return;
        }
      }
      if (currentAchievement === 'allObj') {
        if (reminderArchi.allObj) {
          handleFastestAllObj();
          setReminderArchi(prevState => ({
            ...prevState,
            allObj: false,
          }));
          setCurrentAchievement(null); // Todos los logros procesados
          return;
        }
      }
    }
  }, [myPojo._isShow, counter, currentAchievement]);
  

  const handleFastestTimeObj = () => {
    myPojo.setNotif("Felicidades, completaste tu primer grupo de objetivos antes que todos los demás");
  }
  const handleFastestAllObj = () => {
    myPojo.setNotif("Felicidades, completaste todos tus grupos de objetivos antes que todos los demás");
  }
  const handleFastestArrival = () => {
    myPojo.setNotif("Felicidades, llegaste a tu destino antes que todos los demás");
  }


  /*  */

  //#endregion
  /**
   *   GET SCHEDULE
   */

  //#region 
  useEffect(() => {
    getScheduleById(id).then(response => {
      // console.log("Se obtuvo la siguiente información", response.data);
      setSchedule(response.data); localStorage.setItem('schedule', JSON.stringify(schedule));
    }).catch("no se logro obtener el schedule");
  }, [id, selectedOption]);
  //#endregion


/*---------------------- PREPARACION ---------------------- */
const [targetDate, setTargetDate] = useState(null);
const [mostrarPreparacion, setMostrarPreparacion] = useState(false);
const [showMiniTab, setShowMiniTab] = useState(true);
const [reminders, setReminders] = useState([]);
const [blocks, setBlocks] = useState([
]);

useEffect(() => {
  const calculatePreparationTime = (reminderDate, reminderHour, reminderMin, travelTime, blockDuration) => {
    const reminderDateTime = new Date(reminderDate);
    reminderDateTime.setHours(reminderHour);
    reminderDateTime.setMinutes(reminderMin);
    reminderDateTime.setSeconds(0);
    reminderDateTime.setMilliseconds(0);

    const preparationTime = reminderDateTime.getTime() - (travelTime * 60 * 1000) - (blockDuration * 60 * 1000);
    return new Date(preparationTime);
  };

  const checkReminders = () => {
    const currentTime = new Date();

    const upcomingReminder = blocks.find(block => {
      const totalBlockDuration = block.objectives.length * block.timeLimit; // total time for the block
      const preparationTime = calculatePreparationTime(block.reminderDate, block.reminderHour, block.reminderMin, block.travelTime, totalBlockDuration);
      const reminderTime = new Date(block.reminderDate);
      reminderTime.setHours(block.reminderHour);
      reminderTime.setMinutes(block.reminderMin);
      reminderTime.setSeconds(0);
      reminderTime.setMilliseconds(0);
          
      return currentTime >= preparationTime && currentTime < reminderTime;
    });

    if (upcomingReminder) {
      setShowMiniTab(true);
    } else {
      setShowMiniTab(false);
    }
  };

  const interval = setInterval(checkReminders, 20000); // Check every 20 seconds
  return () => clearInterval(interval);
}, [blocks]);

useEffect(() => {
  const { startDate, endDate } = calculateWeekRange();

  getRemindersByWeek(startDate, endDate, id)
    .then(data => {
      const processedBlocks = data.reduce((acc, reminder) => {
        const existingBlock = acc.find(block => block.name === reminder.objblo_name);
        const objective = {
          id: reminder.obj_id,
          text: reminder.obj_name,
          confirmed: false
        };

        if (existingBlock) {
          existingBlock.objectives.push(objective);
        } else {
          acc.push({
            id: reminder.objblo_id,
            name: reminder.objblo_name,
            timeLimit: reminder.objblo_duration_min,
            objectives: [objective],
            travelTime: reminder.reminder_travel_time,
            reminderDate: reminder.reminder_date,
            reminderHour: reminder.reminder_hour,
            reminderMin: reminder.reminder_min
          });
        }
      
        return acc;
      }, []);
      setBlocks(processedBlocks);
    })
    .catch(error => {
      console.log("No se pudieron obtener los recordatorios de la semana", error);
    });
}, [id]);


const handleClosePreparationView = () => {
  setMostrarPreparacion(false);
};







  const handleUpdateBlocks = (updatedBlocks) => {
    setBlocks(updatedBlocks);
    console.log(blocks);
  };


  //#endregion
  /*  --------------------CHRONO IN ALL-------------------- */
  //#region 
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
  const secondsPassed = elapsedTime / 1000;
  const chronoTime = timeFormatSec(secondsPassed);
  //#endregion


  return (
    <div className="main-container">
      <div className="UI-header">
        <PuntButton id_user={id} puntuality={puntuality} />
        {/* <button className="left-button">
          Puntualidad
          </button> */}
        <Ui_navbar
          handleOptionSelected={handleOptionSelected}
          selectedOption={selectedOption}
        />
        <button
          onClick={GoToProfileModule}
          className={`right-button ${(puntuality > 89) ? 'right-button-gold' : ''}`}
        >{" "}
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
          id_user={id}
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