import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import { getRemindersByMonth } from '../../../utils/validations/reminders';
import { useParams } from "react-router-dom";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-CA').format(date); // 'en-CA' locale gives 'YYYY-MM-DD' format
};

const formatTime = (hour, minute) => {
  const formattedHour = hour.toString().padStart(2, '0');
  const formattedMinute = minute.toString().padStart(2, '0');
  return `${formattedHour}:${formattedMinute}`;
};

const MonthView = ({ date, setDate, setView }) => {
  const { id } = useParams();
  const [reminders, setReminders] = useState([]);

  useEffect(() => {
    const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const lastDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    const Month = new Date(date.getFullYear(), date.getMonth());
    const formattedMonth = `${Month.getFullYear()}-${(Month.getMonth() + 1).toString().padStart(2, '0')}`;
    // console.log('Fecha de inicio del mes:', firstDayOfMonth);
    // console.log('Fecha de fin del mes:', lastDayOfMonth);
    // console.log('Año y mes: ', formattedMonth);
  }, [date]);

  useEffect(() => {
    // console.log(id);
    const Month = new Date(date.getFullYear(), date.getMonth());
    const formattedMonth = `${Month.getFullYear()}-${(Month.getMonth() + 1).toString().padStart(2, '0')}`;
    getRemindersByMonth(formattedMonth, id)
      .then(response => {
        console.log(response);
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

  const handleReminderMonth = (date) => {
    console.log("Date",date);
    const formattedDate = new Date(date);
    console.log("Formatted Date:", formattedDate);
    setDate(formattedDate);
    setView('week');
  }

  return (
    <div className="month-view-container">
      <Calendar
        value={date}
        onChange={setDate}
        onClickDay={() => setView('week')}
        view="month"
        onActiveStartDateChange={({ activeStartDate }) => setDate(activeStartDate)}
        tileClassName={({ date }) =>
          date.getFullYear() === new Date().getFullYear() &&
            date.getMonth() === new Date().getMonth() &&
            date.getDate() === new Date().getDate() ? 'highlight' : null
        }
      />
      <style>{`
        .highlight {
          background: yellow;
          color: black;
        }
      `}</style>
      <div className="reminders-table-container">
        <table>
          <thead>
            <tr>
              <th>Nombre del recordatorio</th>
              <th>Fecha</th>
              <th>Hora</th>
            </tr>
          </thead>
          <tbody>
            {reminders.map((reminder, index) => (
              <tr key={index}
                style={{
                  cursor: 'pointer',
                  transition: 'background-color 0.3s ease',
                }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#e0f7fa'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = ''}
                onClick={()=>handleReminderMonth(reminder.reminder_date)}
              >
                <td>{reminder.reminder_name}</td>
                <td>{formatDate(reminder.reminder_date)}</td>
                <td>{formatTime(reminder.reminder_hour, reminder.reminder_min)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MonthView;
