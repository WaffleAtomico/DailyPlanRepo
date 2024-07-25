import React, { useState } from 'react';
import { FaRegSmile, FaMeh, FaRegFrown } from 'react-icons/fa';
import '../../../styles/UI/Sleep/sleepForm.css';
import moment from 'moment';
import { saveSleepQuality, updateSleepModeRep } from '../../../utils/validations/sleepquality';
import { updateSleepRepStopped } from '../../../utils/validations/sleep';
import Button from 'react-bootstrap/Button';



const SleepForm = ({ onClose, user_id, stopRep, setAlreadySurvey }) => {
  const [sleepRating, setSleepRating] = useState(null);

  const handleRatingSelect = (rating) => {
    setSleepRating(rating);

    const sleepQualityInfo = {
      quality_good: 0,
      quality_medium: 0,
      quiality_bad: 0,
      quality_date: moment().format('YYYY-MM-DD'),
      sleep_id: user_id,
      sleep_rep_stopped: stopRep,
    };

    switch (rating) {
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
        updateSleepRepStopped(user_id, stopRep)
          .then(() => {


            updateSleepModeRep({ date: moment().format('YYYY-MM-DD'), userId: user_id })
              .then(() => {
                setAlreadySurvey(true);
                onClose();
              })
              .catch(err => {
                console.log("Error updating sleep mode rep increment:", err);
                onClose();
              });
          })
          .catch(err => {
            console.log("Error updating sleep rep stopped:", err);
            onClose();
          });
      })
      .catch(err => {
        console.log("Error saving sleep quality:", err);
      });
  };

  const handleCloseWithoutAnswer = () => {
    updateSleepRepStopped(user_id, stopRep)
      .then(() => {
        setAlreadySurvey(true);
        onClose();
      })
      .catch(err => {
        console.log(err);
        onClose();
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
      <Button variant="warning" onClick={handleCloseWithoutAnswer}>
        Cerrar sin respuesta
      </Button>

    </div>
  );
};

export default SleepForm;
