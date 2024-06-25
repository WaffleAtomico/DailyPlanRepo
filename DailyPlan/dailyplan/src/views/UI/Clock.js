import React, { useState, useEffect } from 'react';
import moment from 'moment-timezone/builds/moment-timezone-with-data-10-year-range.js';
import ClockSpinner from '../../components/clock/clockSpinner';

import { TiDeleteOutline } from "react-icons/ti";

import { saveUserClock, getUserClocks, delUserClock, ZoneInUserExist } from '../../utils/validations/clock';

export default function ClockView(props) {
    const [zonaHoraria1, setZonaHoraria1] = useState(null);
    const [zonaHoraria2, setZonaHoraria2] = useState(null);
    const [diferenciaHoras, setDiferenciaHoras] = useState(null);
    const [horaActual, setHoraActual] = useState(moment().format('HH:mm:ss'));
    const [clocksOfUser, setclocksOfUser] = useState([]);

    const zonaHorariaSistema = moment.tz.guess();

    //esta funcion puede ir en un useEffect para que cada que se cargue la pagina se renderize lo necesario
    const getAllUserClocks = async () => {
        const id_userSaved = props.id_user;
        const  UsersClocks  = await getUserClocks(id_userSaved);
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
            if( !(await ZoneInUserExist(clockInfo) ) ){
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

    useEffect( () => {
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
        // console.log(horaActual1);
        // console.log(horaActual2);
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

    return (
        <div>
            <div>Relojes</div>
            <div>Tu hora actual: {horaActual}, estas en {zonaHorariaSistema}</div>
            <ClockSpinner onSelectTimezone={handleTimezoneSelection1} />
            <ClockSpinner onSelectTimezone={handleTimezoneSelection2} />

            <div>Diferencia: {diferenciaHoras}</div>
            {/* <button onClick={calcularDiferencia}>Calcular button</button> */}
            <button onClick={AddUserClock}>Guardar</button>
            <button onClick={getAllUserClocks}>Obtener todos los relojes</button>

            {/* Hacer commit en cuanto se pueda */}

            <table>
                <thead>
                    <tr>
                        <th>Hora</th>
                        <th>Ubicación</th>
                    </tr>
                </thead>
                <tbody>
                    {clocksOfUser.map((clock) => (
                        <tr key={clock.clock_id}>
                            <td>{moment().tz(clock.clock_name).format('HH:mm:ss')}</td>
                            <td>{clock.clock_name}</td>
                            {/* Ponle algo para que se vea cuando pone el cursor */}
                            <th>< TiDeleteOutline  onClick={() => deleteUserClock(clock.clock_id)}/></th>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
