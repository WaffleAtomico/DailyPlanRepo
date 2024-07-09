import React, { useState } from 'react';
// import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import YearView from './YearView.js';
import MonthView from './MonthView.js';
import WeekView from './WeekView.js';
import '../../../styles/UI/Calendar/Calendar_view.css';


export default function Calendar_Adapted() {
  const [view, setView] = useState('year'); // Inicializa la vista en "year"
  const [date, setDate] = useState(new Date());

    console.log(view);

  const renderView = () => {
    switch(view) {
      case 'year':
        return <YearView date={date} setDate={setDate} setView={setView}/>;
      case 'month':
        return <MonthView date={date} setDate={setDate} setView={setView}/>;
      case 'week':
        return <WeekView date={date} setDate={setDate} />;
      default:
        return <YearView date={date} setDate={setDate} setView={setView}/>;
    }
  };

  return (
    <div>
      <select onChange={(e) => setView(e.target.value)} value={view}>
        <option value="year">Año</option>
        <option value="month">Mes</option>
        <option value="week">Semana</option>
      </select>
      {renderView()}
    </div>
  );
};

