import React from 'react';

const HourBlock = ({ hour, day, onHourClick }) => {
  const formatHour = (hour) => {
    const period = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}${period}`;
  };

  return (
    <div className="hour-block" onClick={() => onHourClick(day, hour)}>
      <p>{formatHour(hour)} - {formatHour(hour + 1)}</p>
    </div>
  );
};

export default HourBlock;
