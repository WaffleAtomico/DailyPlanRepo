import React, { useState, useEffect } from 'react';
import { startOfWeek, endOfWeek, addDays, format, isSameDay, parseISO } from 'date-fns';
import HourBlock from './HourBlock';
import '../../../styles/UI/Calendar/Calendar_view.css';
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";


import { getRemindersByWeek } from '../../../utils/validations/reminders';
import { useParams } from "react-router-dom";

const WeekView = ({ date, setDate, showform, setHour, setSelectDate, setReminderId }) => {
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

  const handleReminderSaved = (reminder_id) => {
    console.log(reminder_id);
    setReminderId(reminder_id);
    showform();
  }

  const [reminders, setReminders] = useState([]);

  useEffect(() => {
    const startOfCurrentWeek = startOfWeek(date, { weekStartsOn: 1 }); // Primer día de la semana
    const endOfCurrentWeek = endOfWeek(date, { weekStartsOn: 1 }); // Último día de la semana

    const formattedStartOfWeek = format(startOfCurrentWeek, 'yyyy-MM-dd');
    const formattedEndOfWeek = format(endOfCurrentWeek, 'yyyy-MM-dd');

    // console.log('Primer día de la semana:', formattedStartOfWeek);
    // console.log('Último día de la semana:', formattedEndOfWeek);
    // console.log('id user:', id);
    const interval = setInterval(() => {
      GetRemByWeek(formattedStartOfWeek, formattedEndOfWeek);
    }, 3000);
    return () => clearInterval(interval);
  }, [date, id]);

  const GetRemByWeek = (formattedStartOfWeek, formattedEndOfWeek) => {
    getRemindersByWeek(formattedStartOfWeek, formattedEndOfWeek, id)
      .then(response => {
        if (Array.isArray(response.data)) {
          // Formatear las fechas y asignar al estado
          const formattedReminders = response.data.map(reminder => ({
            id: reminder.reminder_id,
            name: reminder.reminder_name,
            date: reminder.reminder_date.substring(0, 10), // Primeros 10 caracteres de reminder_date
            time: reminder.reminder_hour ? String(reminder.reminder_hour) : ''
          }));
          setReminders(formattedReminders);
        } else {
          console.error("Expected an array but received:", response.data);
          setReminders([]); 
        }
      })
      .catch(err => {
        console.log(err);
        setReminders([]); 
      });
  }

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
        <div style={{ color: "green" }} onClick={previousWeek}><FaArrowAltCircleLeft size={50} /></div>
        <div style={{ color: "green" }} onClick={nextWeek}><FaArrowAltCircleRight size={50} /></div>
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
                      <tr
                        key={reminderIndex}
                        onClick={() => handleReminderSaved(reminder.id)}
                        style={{
                          cursor: 'pointer',
                          transition: 'background-color 0.3s ease',
                        }}
                        onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#e0f7fa'}
                        onMouseOut={(e) => e.currentTarget.style.backgroundColor = ''}
                      >
                        <td>{reminder.name}</td>
                        <td>{reminder.time}h</td>
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
