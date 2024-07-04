import React from "react";
import '../../styles/UI/Countdowntimer/countdown.css'

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
        <label>hh</label>
        <input value={hours} onChange={changeHours} />
      </div>{" "}
      <div className="count-d-flex flex-column">
        <label>mm</label>
        <input value={minutes} onChange={changeMinutes} />
      </div>{" "}
      <div className="count-d-flex flex-column">
        <label>ss</label>
        <input value={seconds} onChange={changeSeconds} />
      </div>{" "}
      <div className="count-d-flex flex-column">
        <label>ms</label>
        <input value={milliseconds} />
      </div>
    </div>
  );
}
