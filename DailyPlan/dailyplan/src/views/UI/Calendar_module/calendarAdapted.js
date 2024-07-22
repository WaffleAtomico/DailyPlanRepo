import React, { useState } from 'react';
// import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import YearView from './YearView.js';
import MonthView from './MonthView.js';
import WeekView from './WeekView.js';
import '../../../styles/UI/Calendar/Calendar_view.css';
import ReminderFormView from './Reminder_formCrea.js';

import { FaCalendarAlt } from 'react-icons/fa';

// Queda pendiente cambiar el formulario para poder hacer la query correcta y poder publicar/
// Crear un registro que tenga la informacion completa que se necesita

export default function Calendar_Adapted(props) {
  const [view, setView] = useState('year'); // Inicializa la vista en "year"
  const [date, setDate] = useState(new Date());
  const [visible, setVisibilty] = useState(false);
  const [hour, setHour] = useState(0);
  const [reminderId, setReminderId] = useState(null);
  const [selectDate, setSelectDate] = useState("2024-01-01");


  // console.log(view);


  const renderView = () => {
    switch (view) {
      case 'year':
        return <YearView date={date} setDate={setDate} setView={setView} />;
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
          showform={() => setVisibilty(true)}
          setHour={setHour}
          setSelectDate={setSelectDate}
          setReminderId={setReminderId}
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
      <div style={{ position: 'relative', display: 'inline-block', width: '100%' }}>
        <select
          onChange={(e) => setView(e.target.value)}
          value={view}
          className="custom-select"
        >
          <option value="year"> Año</option>
          <option value="month"> Mes</option>
          <option value="week"> Semana</option>
        </select>
        <FaCalendarAlt className="custom-select-icon" />
      </div>

      <div className="calendar-view-container">
        {renderView()}
      </div>
      {visible && (

        <ReminderFormView
          user_id={props.user_id}
          showform={() => setVisibilty(false)}
          SelectHour={hour}
          SelectDate={selectDate}
          Reminder_id={reminderId}
          setReminderId={setReminderId}
        />
      )}
    </div>
  );
};

