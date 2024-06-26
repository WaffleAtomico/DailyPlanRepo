import React, { useState } from 'react';
import '../../styles/UI/Alarm/toggllebtn.css'

export default function ToggleButton(props) {

    // const [isToggled, setIsToggled] = useState(false);
    // const handleChange = () => {
    //   setIsToggled(!isToggled);
    // };
    return (
        <label className="switch">
            <input type="checkbox" checked={props.isToggled} onChange={props.handleChange} />
            <span className="slider round"></span>
        </label>
    );
  
  }