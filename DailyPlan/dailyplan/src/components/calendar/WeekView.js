import React from 'react';
import { startOfWeek, addDays, format } from 'date-fns';
import '../../styles/UI/Calendar/Calendar_view.css';

const WeekView = ({ date, setDate }) => {
  const startOfCurrentWeek = startOfWeek(date, { weekStartsOn: 1 });

  const daysOfWeek = Array.from({ length: 7 }).map((_, index) =>
    addDays(startOfCurrentWeek, index)
  );

  const nextWeek = () => setDate(addDays(date, 7));
  const previousWeek = () => setDate(addDays(date, -7));

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
    <div>
      <div>
        <button onClick={previousWeek}>Semana anterior</button>
        <button onClick={nextWeek}>Siguiente semana</button>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        {daysOfWeek.map(day => (
          <div key={day.toISOString()} className="day-box">
            <strong>{format(day, 'EEEE', { locale })}</strong>
            <p>{format(day, 'yyyy-MM-dd')}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeekView;
