import React from 'react';
import Calendar from 'react-calendar';

const YearView = ({ date, setDate, setView }) => {
  const locale = {
    months: [
      'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ],
    daysOfWeek: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb']
  };

  const handleMonthClick = (date) => {
    setDate(date);
    // setView('month');
  };

  return (
    <div className="calendar-container">
      {/* <h2>Vista Anual</h2> */}
      <Calendar
        value={date}
        onChange={handleMonthClick}
        onClickMonth={()=>setView('month')}
        view="year"
        onActiveStartDateChange={({ activeStartDate }) => setDate(activeStartDate)}
        tileClassName={({ date }) => date.getFullYear() === new Date().getFullYear() && date.getMonth() === new Date().getMonth() && date.getDate() === new Date().getDate() ? 'highlight' : null}
        locale={locale}
      />
      <style>{`
        .highlight {
          background: green;
          color: black;
        }
      `}</style>
    </div>
  );
};

export default YearView;
