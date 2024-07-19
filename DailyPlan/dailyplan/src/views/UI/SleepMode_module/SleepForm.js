import React, { useEffect, useState } from 'react';
import { FaRegSmile, FaMeh, FaRegFrown } from 'react-icons/fa';
import '../../../styles/UI/Sleep/sleepForm.css';
import moment from 'moment';
import { saveSleepQuality } from '../../../utils/validations/sleepquality';
import { updateSleepRepStopped } from '../../../utils/validations/sleep';

const SleepForm = ({ onClose, user_id, stopRep, setAlreadySurvey }) => {
  const [sleepRating, setSleepRating] = useState(null);

  useEffect(() => {
    updateSleepRepStopped(user_id, stopRep);
  }, [stopRep, user_id]);

  const handleRatingSelect = (rating) => {
    setSleepRating(rating);

    const sleepQualityInfo = {
      quality_good: 0,
      quality_medium: 0,
      quiality_bad: 0,
      quality_date: moment().format('YYYY-MM-DD'),
      sleep_id: user_id,
    };

    switch (rating) { // Fixed the switch case to use the 'rating' parameter
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

    saveSleepQuality(sleepQualityInfo)
      .then(() => {
        setAlreadySurvey(true); // Set alreadySurvey to true after saving
        onClose(); // Close the form after saving
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleCloseWithoutAnswer = () => {
    // Ensure updateSleepRepStopped is called even if no rating is selected
    updateSleepRepStopped(user_id, stopRep)
      .then(() => {
        setAlreadySurvey(true); // Set alreadySurvey to true
        onClose(); // Close the form
      })
      .catch(err => {
        console.log(err);
        onClose(); // Close the form even if there's an error
      });
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
      <button onClick={handleCloseWithoutAnswer}>Cerrar sin respuesta</button> {/* Button to close without answer */}
    </div>
  );
};

export default SleepForm;
