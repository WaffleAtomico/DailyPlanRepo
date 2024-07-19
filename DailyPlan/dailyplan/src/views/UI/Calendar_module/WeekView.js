import React, { useState, useEffect } from 'react';
import { startOfWeek, endOfWeek, addDays, format, isSameDay, parseISO } from 'date-fns';
import HourBlock from './HourBlock';
import '../../../styles/UI/Calendar/Calendar_view.css';
import { getRemindersByWeek } from '../../../utils/validations/reminders';
import { useParams } from "react-router-dom";

const WeekView = ({ date, setDate, showform, setHour, setSelectDate }) => {
  const { id } = useParams();
  const startOfCurrentWeek = startOfWeek(date, { weekStartsOn: 1 });

  const daysOfWeek = Array.from({ length: 7 }).map((_, index) =>
    addDays(startOfCurrentWeek, index)
  );

  const nextWeek = () => setDate(addDays(date, 7));
  const previousWeek = () => setDate(addDays(date, -7));

  const handleHourClick = (day, hour) => {
    console.log(`Selected hour: ${hour} on ${format(day, 'yyyy-MM-dd')}`);
    // Aquí se abrirá el formulario para llenar el recordatorio
    setHour(hour);
    setSelectDate(day);
    showform();
  };


  const [reminders, setReminders] = useState([
    // { name: 'Reunión', date: '2024-07-11', time: '09:00' },
    // { name: 'Gimnasio', date: '2024-07-11', time: '20:00' },
    // { name: 'Gimnasio', date: '2024-07-11', time: '17:00' },
    // { name: 'Dentista', date: '2024-07-12', time: '11:00' },
    // { name: 'Compras', date: '2024-07-13', time: '14:00' },
    // { name: 'Cena', date: '2024-07-13', time: '20:00' },
    // { name: 'Estudio', date: '2024-07-14', time: '18:00' },
    // { name: 'Cine', date: '2024-07-15', time: '19:00' },
  ]);

  useEffect(() => {
    const startOfCurrentWeek = startOfWeek(date, { weekStartsOn: 1 }); // Primer día de la semana
    const endOfCurrentWeek = endOfWeek(date, { weekStartsOn: 1 }); // Último día de la semana
  
    const formattedStartOfWeek = format(startOfCurrentWeek, 'yyyy-MM-dd');
    const formattedEndOfWeek = format(endOfCurrentWeek, 'yyyy-MM-dd');
  
    console.log('Primer día de la semana:', formattedStartOfWeek);
    console.log('Último día de la semana:', formattedEndOfWeek);
  
    getRemindersByWeek(formattedStartOfWeek, formattedEndOfWeek, id).then(response => {
      console.log(response);
      console.log(response.data);
      if (Array.isArray(response.data)) {
        setReminders(response.data);
      } else {
        console.error("Expected an array but received:", response.data);
        setReminders([]); // Set to empty array to avoid map error
      }
    })
    .catch(err => {
      console.log(err);
      setReminders([]); // Set to empty array in case of error
    });
  }, [date, id]);

  // Ordenar recordatorios por fecha y hora
  const sortedReminders = reminders.sort((a, b) => {
    const dateComparison = parseISO(a.date) - parseISO(b.date);
    if (dateComparison !== 0) {
      return dateComparison;
    }
    return a.time.localeCompare(b.time);
  });

  const locale = {
    localize: {
      day: (dayIndex) => ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'][dayIndex],
      month: (monthIndex) => ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'][monthIndex]
    },
    formatLong: {
      date: {
        full: 'EEEE, d MMMM yyyy',
        long: 'd MMMM yyyy',
        medium: 'd MMM yyyy',
        short: 'dd/MM/yyyy'
      },
      time: {
        full: 'HH:mm:ss zzzz',
        long: 'HH:mm:ss z',
        medium: 'HH:mm:ss',
        short: 'HH:mm'
      }
    }
  };

  return (
    <div className="week-view-container">
      <div className="week-nav">
        <button onClick={previousWeek}>Semana anterior</button>
        <button onClick={nextWeek}>Siguiente semana</button>
      </div>
      <div className="week-days">
        {daysOfWeek.map((day, dayIndex) => (
          <div key={day.toISOString()} className="day-section">
            <div className="day-box">
              <strong>{format(day, 'EEEE', { locale })}</strong>
              <p>{format(day, 'yyyy-MM-dd')}</p>
              <div className="hours-container">
                {Array.from({ length: 24 }).map((_, hour) => (
                  <HourBlock key={hour} hour={hour} day={day} onHourClick={handleHourClick} />
               ))}
              </div>
            </div>
            <div className="reminders-table-container">
              {sortedReminders.filter(reminder => isSameDay(parseISO(reminder.date), day)).length > 0 && (
                <table>
                  <thead>
                    <tr>
                      <th>Nombre</th>
                      <th>Hora</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedReminders.filter(reminder => isSameDay(parseISO(reminder.date), day)).map((reminder, reminderIndex) => (
                      <tr key={reminderIndex}>
                        <td>{reminder.name}</td>
                        <td>{reminder.time}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeekView;
