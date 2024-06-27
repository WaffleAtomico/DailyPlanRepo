import React, { useState, useEffect } from 'react';
import moment from 'moment-timezone/builds/moment-timezone-with-data-10-year-range.js';
import ClockSpinner from '../../components/clock/clockSpinner';
import AnalogClock from 'analog-clock-react';

import { TiDeleteOutline } from "react-icons/ti";

import { saveUserClock, getUserClocks, delUserClock, ZoneInUserExist } from '../../utils/validations/clock';

import '../../styles/UI/Clock/clockView.css'


export default function ClockView(props) {
    const [zonaHoraria1, setZonaHoraria1] = useState('America/New_York');
    const [zonaHoraria2, setZonaHoraria2] = useState('America/New_York');
    const [diferenciaHoras, setDiferenciaHoras] = useState(null);
    const [horaActual, setHoraActual] = useState(moment().format('HH:mm:ss'));
    const [clocksOfUser, setclocksOfUser] = useState([]);

    // const fechaActual1 = moment().tz(zonaHoraria1);
    // const fechaActual2 = moment().tz(zonaHoraria2);
    
    const [options1, setOptions1] = useState({
        useCustomTime: true,
        width: "200px",
        border: true,
        borderColor: "#2e2e2e",
        baseColor: "#17a2b8",
        centerColor: "#459cff",
        centerBorderColor: "#ffffff",
        handColors: {
            second: "#d81c7a",
            minute: "#ffffff",
            hour: "#ffffff"
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
            second: "#d81c7a",
            minute: "#ffffff",
            hour: "#ffffff"
        },
        seconds: 0,
        minutes: 0,
        hours: 0
    });

    const zonaHorariaSistema = moment.tz.guess();

    //esta funcion puede ir en un useEffect para que cada que se cargue la pagina se renderize lo necesario
    const getAllUserClocks = async () => {
        const id_userSaved = props.id_user;
        const UsersClocks = await getUserClocks(id_userSaved);
        setclocksOfUser(UsersClocks);
    }

    const AddUserClock = async () => {
        // Hacer una validacion para que no agrege dos iguales

        // const userExist = await UserExist(userInfoLogin);
        // console.log(props.id_user);
        if (zonaHoraria1 && zonaHoraria2) {
            const clockInfo = {
                clock_name: zonaHoraria2,
                user_id: props.id_user
            }
            if (!(await ZoneInUserExist(clockInfo))) {
                await saveUserClock(clockInfo);
                // console.log(clocksOfUser);
                getAllUserClocks();
                // console.log(clocksOfUser);
            }
        }
    }


    const deleteUserClock = async (clock_id) => {
        // const userExist = await UserExist(userInfoLogin);
        console.log("Clock id to delete: " + clock_id);
        // esto es un objeto con valores como 
        await delUserClock(clock_id);
        // console.log("Response de eliminar: " + response);
        getAllUserClocks();
    }

    useEffect(() => {
        getAllUserClocks();
        // console.log(clocksOfUser);
        const interval = setInterval(() => {
            setHoraActual(moment().format('HH:mm:ss'));
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        console.log("Info en el hook: ", clocksOfUser);
    }, [clocksOfUser]);

    const calcularDiferenciaZonasHorarias = (zonaHoraria1, zonaHoraria2) => {
        if (zonaHoraria1 == zonaHoraria2) {
            return 'Misma hora';
        }
        const horaActual1 = moment().tz(zonaHoraria1).format('HH:mm:ss');
        const horaActual2 = moment().tz(zonaHoraria2).format('HH:mm:ss');
        const hora1 = moment(horaActual1, 'HH:mm:ss');
        const hora2 = moment(horaActual2, 'HH:mm:ss');
        const diferencia = hora2 - hora1;
        const minutos = Math.floor(diferencia / 60000);
        const horas = Math.floor(minutos / 60);
        const minutosRestantes = minutos % 60;
        console.log(`La diferencia es de ${horas} horas y ${minutosRestantes} minutos`);
        //Cuando la hora es menor se debe de hacer el cambio para mostar la diferencia en negativo
        if (horas == 0 && minutosRestantes == 0) { return 'Misma hora'; }
        if (horas != 0 && minutosRestantes == 0) { return `${horas}h`; }
        if (horas == 0 && minutosRestantes != 0) { return `${minutosRestantes}min`; }

        return `${horas}h ${minutosRestantes}min`;
    };


    const handleTimezoneSelection1 = (selectedTimezone) => {
        setZonaHoraria1(selectedTimezone);
        calcularDiferencia();
    };

    const handleTimezoneSelection2 = (selectedTimezone) => {
        setZonaHoraria2(selectedTimezone);
        calcularDiferencia();
    };

    const calcularDiferencia = () => {
        if (zonaHoraria1 && zonaHoraria2) {
            const diferencia = calcularDiferenciaZonasHorarias(zonaHoraria1, zonaHoraria2);
            setDiferenciaHoras(diferencia);
        }
    };

    useEffect(() => {
        const fechaActual1 = moment().tz(zonaHoraria1);
        const fechaActual2 = moment().tz(zonaHoraria2);

        setOptions1(prevOptions => ({
            ...prevOptions,
            seconds: fechaActual1.seconds(),
            minutes: fechaActual1.minutes(),
            hours: fechaActual1.hours()
        }));

        setOptions2(prevOptions => ({
            ...prevOptions,
            seconds: fechaActual2.seconds(),
            minutes: fechaActual2.minutes(),
            hours: fechaActual2.hours()
        }));
    }, [zonaHoraria1, zonaHoraria2]);

    return (
        <div className="clock-view-container">
            <div className="clock-title">Relojes</div>
            <div>Tu hora actual: {horaActual}, estás en {zonaHorariaSistema}</div>

            <div className="clock-container">
                <div className="clock-spinners">
                    <AnalogClock {...options1} />
                    <ClockSpinner onSelectTimezone={handleTimezoneSelection1} />
                </div>

                <div className="clock-spinners">
                    <AnalogClock {...options2} />
                    <ClockSpinner onSelectTimezone={handleTimezoneSelection2} />
                </div>
            </div>

            <div className="diferencia-horas">Diferencia: {diferenciaHoras}</div>

            <button className="button-large" onClick={AddUserClock}>
                Guardar
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
                            <td><TiDeleteOutline className="icon-large" onClick={() => deleteUserClock(clock.clock_id)} /></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
