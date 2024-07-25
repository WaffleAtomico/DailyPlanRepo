import React, { useState, useEffect } from 'react';
import moment from 'moment-timezone/builds/moment-timezone-with-data-10-year-range.js';
import ClockSpinner from './clockSpinner';
import AnalogClock from 'analog-clock-react';
import { TiArrowRightThick, TiDeleteOutline } from "react-icons/ti";
import { TbClockCheck } from "react-icons/tb";

import { saveUserClock, getUserClocks, delUserClock, ZoneInUserExist } from '../../../utils/validations/clock';


import '../../../styles/UI/Clock/clockView.css'
import { myPojo } from '../../../utils/ShowNotifInfo';
import { grantArchivement, isCompleted } from '../../../utils/archivements/grantArchivement';

export default function ClockView(props) {
    const [zonaHoraria1, setZonaHoraria1] = useState('');
    const [zonaHoraria2, setZonaHoraria2] = useState('');
    const [diferenciaHoras, setDiferenciaHoras] = useState(null);
    const [horaActual, setHoraActual] = useState(moment().format('HH:mm:ss'));
    const [clocksOfUser, setclocksOfUser] = useState([]);
    const [isCompletedArchivement, setIsCompletedArchivement] = useState(true);
    const zonaHorariaSistema = moment.tz.guess();
    const [options1, setOptions1] = useState({
        useCustomTime: true,
        width: "200px",
        border: true,
        borderColor: "#2e2e2e",
        baseColor: "#17a2b8",
        centerColor: "#459cff",
        centerBorderColor: "#ffffff",
        handColors: {
            second: "#17a2b8",
            minute: "#ffffff",
            hour: "#d81c7a"
        },
        seconds: 0,
        minutes: 0,
        hours: 0
    });
    const [options2, setOptions2] = useState({
        useCustomTime: true,
        width: "200px",
        border: true,
        borderColor: "#2e2e2e",
        baseColor: "#17a2b8",
        centerColor: "#459cff",
        centerBorderColor: "#ffffff",
        handColors: {
            second: "#17a2b8",
            minute: "#ffffff",
            hour: "#d81c7a"
        },
        seconds: 0,
        minutes: 0,
        hours: 0
    });

    useEffect(() => {
        getAllUserClocks();
        confirmArchivement(props.id_user);
        console.log(isCompletedArchivement)
        // console.log(clocksOfUser);
        const interval = setInterval(() => {
            setHoraActual(moment().format('HH:mm:ss'));
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    
    useEffect(() => {
        if (zonaHoraria1) {
            const fechaActual1 = moment().tz(zonaHoraria1);

            setOptions1(prevOptions => ({
                ...prevOptions,
                seconds: fechaActual1.seconds(),
                minutes: fechaActual1.minutes(),
                hours: fechaActual1.hours()
            }));
        } else {
            setOptions1(prevOptions => ({
                ...prevOptions,
                seconds: 0,
                minutes: 0,
                hours: 0
            }));
        }
        if (zonaHoraria2) {
            const fechaActual2 = moment().tz(zonaHoraria2);

            setOptions2(prevOptions => ({
                ...prevOptions,
                seconds: fechaActual2.seconds(),
                minutes: fechaActual2.minutes(),
                hours: fechaActual2.hours()
            }));
        } else {
            setOptions1(prevOptions => ({
                ...prevOptions,
                seconds: 0,
                minutes: 0,
                hours: 0
            }));
        }
    }, [zonaHoraria1, zonaHoraria2]);

    const confirmArchivement = (user_id) => 
    {
        const grant_title_id = 13;
        isCompleted(user_id, grant_title_id).then(response => {
            console.log("IsCompleted", response);
            if(response == false)
            {
                console.log("Si es falso?",response)
                setIsCompletedArchivement(response);
            }
        }).catch(error => {
            console.error("Error confirming achievement: ", error);
        });
    }
    

    //esta funcion puede ir en un useEffect para que cada que se cargue la pagina se renderize lo necesario
    const getAllUserClocks = () => {
        const id_user = props.id_user;
        // const UsersClocks = await 
        getUserClocks(id_user).then(response => {
            setclocksOfUser(response.data);
        }).catch(error => {
            console.error(error);
        });
    }

    const grant14Archivement = (user_id) => {
        const grant_title_id = 13;
        // isCompleted(user_id, grant_title_id).then(response => {
        //     console.log("IsCompleted", response);
        console.log("Is completed:? ",isCompletedArchivement);
            if (!isCompletedArchivement) { //si no esta completado hay que entregarlo
                grantArchivement(user_id, (grant_title_id+1)).then(res => {
                    // if(response)
                    // {
                    console.log(res);
                    myPojo.setNotif("Logro: MUNDIAL", <TbClockCheck size={220} />);
                    // }
                }).catch(error => {
                    console.error("Error granting achievement:", error);
                });
            }
        // }).catch(err => { console.log(err) })
    };

    const AddUserClock = () => {
        // myPojo.setNotif("Logro obtenido: Mundial", <><TbClockCheck size={220} /></>);

        if (zonaHoraria1 && zonaHoraria2) {
            const clockInfo = {
                clock_name: zonaHoraria2,
                user_id: props.id_user
            }
            // if (!(await ZoneInUserExist(clockInfo))) {
            //     await saveUserClock(clockInfo);
            //     // console.log(clocksOfUser);
            //     getAllUserClocks();
            //     // console.log(clocksOfUser);
            // }

            ZoneInUserExist(clockInfo).then(zoneExists => {
                if (!zoneExists.data.exists) {
                    saveUserClock(clockInfo).then(() => {
                        getAllUserClocks();
                        // console.log(clocksOfUser);
                        grant14Archivement(props.id_user);
                    }).catch(error => {
                        console.error("Error al guardar el reloj del usuario:", error);
                    });
                }
            }).catch(error => {
                console.error("Error al verificar si la zona existe en el usuario:", error);
            });
        }
    }


    const deleteUserClock = (clock_id) => {
        console.log("Clock id to delete: " + clock_id);
        delUserClock(clock_id).then(response => {
            console.log("Response de eliminar: " + response);
            getAllUserClocks();
        }).catch(error => {
            console.error("Error al eliminar el reloj del usuario:", error);
        });
    };

    function calculateHourDifference() {
        let hourDifference = moment().tz(zonaHoraria2).hours() - moment().tz(zonaHoraria1).hours();
        if (hourDifference < 0) {
            hourDifference += 24;
            return -hourDifference
        }
        return hourDifference;
    }

    useEffect(() => {
        calcularDiferencia();
    }, [zonaHoraria2]);
    useEffect(() => {
        calcularDiferencia();
    }, [zonaHoraria1]);

    const calcularDiferencia = () => {
        if (zonaHoraria1 && zonaHoraria2) {
            // console.log("Entre a calcular diferencia ");
            const diference = calculateHourDifference();
            setDiferenciaHoras(diference);
        }
    };

    return (
        <div className="clock-view-container">
            <div>Tu hora actual: {horaActual}, estás en {zonaHorariaSistema}</div>

            <div className="clock-container">
                <div className="clock-spinners">
                    <AnalogClock {...options1} />
                    <p>{zonaHoraria1} {zonaHoraria1 ? moment().tz(zonaHoraria1).format('HH:mm:ss') : "00:00:00"}</p>
                    <ClockSpinner sethour={setZonaHoraria1} />
                </div>
                <div>
                    <TiArrowRightThick size={82} />
                </div>
                <div className="clock-spinners">
                    <AnalogClock {...options2} />
                    <p>{zonaHoraria2}  {zonaHoraria2 ? moment().tz(zonaHoraria2).format('HH:mm:ss') : "00:00:00"}</p>
                    <ClockSpinner sethour={setZonaHoraria2} />
                </div>
            </div>

            <div className="diferencia-horas">Diferencia: {diferenciaHoras}</div>

            <button className="button-large" onClick={AddUserClock}>
                Guardar reloj de destino
            </button>

            <table className="clock-table">
                <thead>
                    <tr>
                        <th>Hora</th>
                        <th>Ubicación</th>
                        <th>Eliminar</th>
                    </tr>
                </thead>
                <tbody>
                    {clocksOfUser.map((clock) => (
                        <tr key={clock.clock_id}>
                            <td>{moment().tz(clock.clock_name).format('HH:mm:ss')}</td>
                            <td>{clock.clock_name}</td>
                            <td><TiDeleteOutline className="icon-large" size={30} onClick={() => deleteUserClock(clock.clock_id)} /></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
