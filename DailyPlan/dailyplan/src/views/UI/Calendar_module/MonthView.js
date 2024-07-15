import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import { getRemindersByMonth } from '../../../utils/validations/reminders';
import { useParams } from "react-router-dom";


const MonthView = ({ date, setDate, setView }) => {
  const { id } = useParams();
  const [reminders, setReminders] = useState([
    // { name: 'Reunión', date: '2023-07-15', time: '10:00 AM' },
    // { name: 'Consulta médica', date: '2023-07-18', time: '2:00 PM' },
    // { name: 'Cena con amigos', date: '2023-07-20', time: '7:00 PM' },
    // { name: 'Cena con amigos', date: '2023-07-20', time: '7:00 PM' },
    // { name: 'Cena con amigos', date: '2023-07-20', time: '7:00 PM' },
    // { name: 'Cena con amigos', date: '2023-07-20', time: '7:00 PM' },
  ]);

  useEffect(() => {
    // Obtener la primera y última fecha del mes actual
    const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const lastDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    const Month = new Date(date.getFullYear(), date.getMonth());
    const formattedMonth = `${Month.getFullYear()}-${(Month.getMonth() + 1).toString().padStart(2, '0')}`;;
    console.log('Fecha de inicio del mes:', firstDayOfMonth);
    console.log('Fecha de fin del mes:', lastDayOfMonth);
    console.log('Año y mes: ', formattedMonth );
  }, [date]);

  useEffect(() => {
    console.log(id);
    const Month = new Date(date.getFullYear(), date.getMonth());
    const formattedMonth = `${Month.getFullYear()}-${(Month.getMonth() + 1).toString().padStart(2, '0')}`;;
    getRemindersByMonth(formattedMonth, id).then(response => 
      {
        console.log(response);
        console.log(response.data);
        setReminders(response.data);
      }).catch(err => console.log(err));
    
  },[])

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
      <div className="reminders-table-container" >
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
              <tr key={index}>
                <td>{reminder.reminder_name}</td>
                <td>{reminder.reminder_date}</td>
                <td>{reminder.reminder_hour}/{reminder.reminder_min}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MonthView;
