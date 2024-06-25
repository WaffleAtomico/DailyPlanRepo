import React from 'react';
import Calendar from 'react-calendar';

const MonthView = ({ date, setDate, setView }) => {

  // const handleClick = (date) => {
  //     setDate(date);
  //     setView('day');
  //   };

  return (
    <div>
      <Calendar
        value={date}
        onChange={setDate}
        onClickDay={()=>setView('week')}
        view="month"
        onActiveStartDateChange={({ activeStartDate }) => setDate(activeStartDate)}
        tileClassName={({ date }) => date.getFullYear() === new Date().getFullYear() && date.getMonth() === new Date().getMonth() && date.getDate() === new Date().getDate() ? 'highlight' : null}
      />
      <style>{`
        .highlight {
          background: yellow;
          color: black;
        }
      `}</style>
    </div>
  );
};

export default MonthView;
