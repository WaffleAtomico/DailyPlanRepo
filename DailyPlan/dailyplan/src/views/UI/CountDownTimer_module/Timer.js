import React from "react";
import '../../../styles/UI/Countdowntimer/countdown.css'

export default function Timer({
  milliseconds,
  seconds,
  minutes,
  hours,
  changeSeconds,
  changeMinutes,
  changeHours,
}) {

  return (
    <div className="count-d-time-wrapper">
      <div className="count-d-flex flex-column">
        <label className="count-label">hh</label>
        <input
          className="count-input"
          value={hours}
          onChange={changeHours}
          type="number"
        />
      </div>{" "}
      <div className="count-d-flex flex-column">
        <label className="count-label">mm</label>
        <input
          className="count-input"
          value={minutes}
          onChange={changeMinutes}
          type="number"
        />
      </div>{" "}
      <div className="count-d-flex flex-column">
        <label className="count-label">ss</label>
        <input
          className="count-input"
          value={seconds}
          onChange={changeSeconds}
          type="number"
        />
      </div>{" "}
      <div className="count-d-flex flex-column">
        <label className="count-label">ms</label>
        <input className="count-input" value={milliseconds} type="number" />
      </div>
    </div>
  );
}
