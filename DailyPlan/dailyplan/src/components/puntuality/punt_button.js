import React, { useState } from 'react';
// import { FaTimes } from 'react-icons/fa';
import PopupWindow from './punt_window';
import '../../styles/UI/Puntuality/punt_button.css';


const PuntButton = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [puntuality, setPuntuality] = useState(0);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <div className="punt_button-container">
      <button className="punt_button-circle" onClick={togglePopup}>
        <span className="punt_button-text">{puntuality}%</span>
      </button>
      {showPopup && <PopupWindow closePopup={togglePopup} />}
    </div>
  );
};

export default PuntButton;
