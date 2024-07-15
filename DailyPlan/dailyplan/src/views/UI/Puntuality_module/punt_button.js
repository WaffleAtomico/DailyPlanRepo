import React, { useState, useEffect } from 'react';
// import { FaTimes } from 'react-icons/fa';
import PopupWindow from './punt_window';
import '../../../styles/UI/Puntuality/punt_button.css';
import { myPojo } from '../../../utils/ShowNotifInfo';
import { grantArchivement, isCompleted } from '../../../utils/archivements/grantArchivement';
import { MdOutlineTimer10Select, MdOutlineTimer3Select } from 'react-icons/md';
import { TbNumber29Small } from 'react-icons/tb';


const PuntButton = (props) => {
  const [showPopup, setShowPopup] = useState(false);
  const [puntuality, setPuntuality] = useState(0);
  const [isCompletedArchivement1, setIsCompletedArchivement1] = useState(true);
  const [isCompletedArchivement2, setIsCompletedArchivement2] = useState(true);
  const [isCompletedArchivement3, setIsCompletedArchivement3] = useState(true);

  useEffect(() => {
    setPuntuality(95);
    const grant_title_id1 = 0;
    const grant_title_id2 = 1;
    const grant_title_id3 = 2;
    setIsCompletedArchivement1(confirmArchivement(props.id_user, grant_title_id1));
    setIsCompletedArchivement2(confirmArchivement(props.id_user, grant_title_id2));
    setIsCompletedArchivement3(confirmArchivement(props.id_user, grant_title_id3));
    if (!isCompletedArchivement1 && puntuality > 80) {
      sendGrantRequest(props.id_user, (grant_title_id1 + 1),
       "Logro: Asegurado", <TbNumber29Small size={220} />);
    }
    if (!isCompletedArchivement2 && puntuality > 90) {
      sendGrantRequest(props.id_user, (grant_title_id2 + 1),
       "Logro: Planificador", <MdOutlineTimer10Select size={220} />);
    }
    if (!isCompletedArchivement3 && puntuality > 95) {
      sendGrantRequest(props.id_user, (grant_title_id3 + 1), 
      "Logro: Liebre", <MdOutlineTimer3Select size={220} />);
    }
  }, [props.id_user]);

  // useEffect(()=>
  // {
  //   setPuntuality(95);
  // },[props.id_user]);

  const confirmArchivement = (user_id, grant_title_id) => {
    isCompleted(user_id, grant_title_id).then(response => {
      console.log("IsCompleted", response);
      if (response == false) {
        console.log("Si es falso?", response)
        return response;
      }
    }).catch(error => {
      console.error("Error confirming achievement: ", error);
    });
  }

  const sendGrantRequest = (user_id, grant_title_id, text, icon) => {
    grantArchivement(user_id, grant_title_id).then(res => {
      console.log(res);
      myPojo.setNotif(text, icon);
    }).catch(error => {
      console.error("Error granting achievement:", error);
    });
  };


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
