import React, { useState } from 'react';
// import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import YearView from './YearView.js';
import MonthView from './MonthView.js';
import WeekView from './WeekView.js';
import '../../../styles/UI/Calendar/Calendar_view.css';
import ReminderFormView from './Reminder_formCrea.js';

// Queda pendiente cambiar el formulario para poder hacer la query correcta y poder publicar/
// Crear un registro que tenga la informacion completa que se necesita

export default function Calendar_Adapted() {
  const [view, setView] = useState('year'); // Inicializa la vista en "year"
  const [date, setDate] = useState(new Date());
  const [visible, setVisibilty] = useState(false);
  const [hour, setHour] = useState(0);
  const [selectDate, setSelectDate] = useState("2024-01-01");


  // console.log(view);
  

  const renderView = () => {
    switch(view) {
      case 'year':
        return <YearView date={date} setDate={setDate} setView={setView}/>;
      case 'month':
        return <MonthView 
                date={date} 
                setDate={setDate} 
                setView={setView}
                />;
      case 'week':
        return <WeekView 
                date={date}
                setDate={setDate}
                showform={()=>setVisibilty(true)}
                setHour={setHour}
                setSelectDate={setSelectDate}
                />;
      default:
        return <YearView 
                date={date} 
                setDate={setDate} 
                setView={setView}
                />;
    }
  };

  return (

    <div >
      <select onChange={(e) => setView(e.target.value)} value={view}>
        <option value="year">Año</option>
        <option value="month">Mes</option>
        <option value="week">Semana</option>
      </select>
      <div className="calendar-view-container">
        {renderView()}
      </div>
  {visible && (
    
      <ReminderFormView 
        showform = {()=>setVisibilty(false)}
        SelectHour={hour}
        SelectDate={selectDate}
       />
    )} 
    </div>
  );
};

