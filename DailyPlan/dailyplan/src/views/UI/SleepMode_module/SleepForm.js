import React, { useEffect, useState } from 'react';
import { FaRegSmile, FaMeh, FaRegFrown } from 'react-icons/fa';
import '../../../styles/UI/Sleep/sleepForm.css';
import moment from 'moment';
import { saveSleepQuality } from '../../../utils/validations/sleepquality';
import { updateSleepRepStopped } from '../../../utils/validations/sleep';

const SleepForm = ({ onClose, user_id, stopRep}) => {
  const [sleepRating, setSleepRating] = useState(null);



  useEffect(() => {

    updateSleepRepStopped(user_id, stopRep);

}, stopRep)


  const handleRatingSelect = (rating) => {
    setSleepRating(rating);
    // quality_good, quality_medium, quiality_bad, quality_date, sleep_id

    const sleepQualityInfo = {
      quality_good: 0,
      quality_medium: 0,
      quiality_bad: 0,
      quality_date: moment().format('YYYY-MM-DD'),  // Formatear la fecha actual
      sleep_id: user_id,
    };


    switch (sleepRating) {
      case 'bien':
        sleepQualityInfo.quality_good = 1;
        break;
      case 'regular':
        sleepQualityInfo.quality_medium = 1;
        break;
      case 'mal':
        sleepQualityInfo.quiality_bad = 1;
        break;
      default:
        sleepQualityInfo.quality_good = 1;
      break;
    }
    saveSleepQuality(sleepQualityInfo).then(()=>{

    }).catch(err => {console.log(err)});
    onClose(); // Cierra el formulario al seleccionar una opción.
  };

  return (
    <div className="sleep-survey-container">
      <h2>¿Cómo dormiste?</h2>
      <div className="sleep-rating-options">
        <div className={`sleep-rating-option ${sleepRating === 'bien' ? 'selected' : ''}`} onClick={() => handleRatingSelect('bien')}>
          <FaRegSmile size={150} />
          <span>Bien</span>
        </div>
        <div className={`sleep-rating-option ${sleepRating === 'regular' ? 'selected' : ''}`} onClick={() => handleRatingSelect('regular')}>
          <FaMeh size={150} />
          <span>Regular</span>
        </div>
        <div className={`sleep-rating-option ${sleepRating === 'mal' ? 'selected' : ''}`} onClick={() => handleRatingSelect('mal')}>
          <FaRegFrown size={150} />
          <span>Mal</span>
        </div>
      </div>
    </div>
  );
};

export default SleepForm;
