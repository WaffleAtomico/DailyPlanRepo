import React, { useState } from 'react';
import { FaRegSmile, FaMeh, FaRegFrown } from 'react-icons/fa';
import '../../../styles/UI/Sleep/sleepForm.css';

const SleepForm = ({ onClose }) => {
  const [sleepRating, setSleepRating] = useState(null);

  const handleRatingSelect = (rating) => {
    setSleepRating(rating);
    // Aquí puedes agregar cualquier lógica adicional, como enviar el rating a una API o guardar localmente.
    onClose(); // Cierra el formulario al seleccionar una opción.
  };

  return (
    <div className="sleep-survey-container">
      <h2>¿Cómo dormiste?</h2>
      <div className="sleep-rating-options">
        <div className={`sleep-rating-option ${sleepRating === 'bien' ? 'selected' : ''}`} onClick={() => handleRatingSelect('bien')}>
          <FaRegSmile size={50} />
          <span>Bien</span>
        </div>
        <div className={`sleep-rating-option ${sleepRating === 'regular' ? 'selected' : ''}`} onClick={() => handleRatingSelect('regular')}>
          <FaMeh size={50} />
          <span>Regular</span>
        </div>
        <div className={`sleep-rating-option ${sleepRating === 'mal' ? 'selected' : ''}`} onClick={() => handleRatingSelect('mal')}>
          <FaRegFrown size={50} />
          <span>Mal</span>
        </div>
      </div>
    </div>
  );
};

export default SleepForm;
