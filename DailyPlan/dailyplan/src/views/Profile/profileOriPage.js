import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getUsrName } from "../../utils/validations/user";

import Archivement_view from "./Archivements_module/Archievements";
import ProfileConfig_view from "./ProfileConfig_module/ProfileConfig";

import "../../styles/UI/profile/profGeneral.css";

import { IoIosArrowBack } from "react-icons/io";
import { FaUserClock } from "react-icons/fa6";
import GeneralNotif from "../UI/advices/GeneralNotif";

export default function ProfileOriPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [selectedOption, setSelectedOption] = useState(0);
  const [username, setUsername] = useState("");

  const handleSuboption = (index) => {
    if (index === 1) {
      setSelectedOption(0);
    } else {
      setSelectedOption(1);
    }
  };
  const renderOption = (selectedOption) => {
    switch (selectedOption) {
      case 0:
        return (
          <>
            <ProfileConfig_view user_id={id} />
          </>
        );
      case 1:
        return (
          <>
            <Archivement_view user_id={id} />
          </>
        );
      default:
        return (
          <>
            <ProfileConfig_view user_id={id} />
          </>
        );
    }
  };

  useEffect(() => {
    const getUserName = (user_id) => {
      // const response = await 
      getUsrName(user_id).then(response => {
        console.log("Response in front");
        console.log(response.data);
        setUsername(response.data[0].user_name);
      }).catch(error => {
        console.error(error);
      });

    };
    getUserName(id);
  }, []);

  const GoToOrigin = () => {
    // e.preventDefault();
    navigate(`/dailyplan/${id}/`);
  };


    /*-------------------- Notifications --------------------*/
    const [mostrarNotificacion, setMostrarNotificacion] = useState(false);

    const handleShowNotificacion = () => {
      setMostrarNotificacion(true);
    };
  
    const handleCloseNotificacion = () => {
      setMostrarNotificacion(false);
    };

  return (
    <div className="prof-main-container">
      <div className="prof-UI-header">
        <div onClick={() => GoToOrigin()} className="prof-left-button">
          {" "}
          <IoIosArrowBack /> Volver{" "}
        </div>
        <div style={{ fontSize: "xx-large", paddingBottom: "1rem" }}>
          Configuración
        </div>
        <button className="prof-right-button">
          {" "}
          <FaUserClock /> {username}{" "}
        </button>
        <button
          className="UI-btn-opption"
          onClick={() => handleSuboption(selectedOption)}
        >
          {selectedOption === 0 && "Logros"}
          {selectedOption === 1 && "Perfil"}
        </button>
      </div>

      <div className="prof-UI-background">{renderOption(selectedOption)}</div>

      {mostrarNotificacion && (
        <GeneralNotif
          mensaje="Este es el mensaje de la notificación"
          onClose={handleCloseNotificacion}
          componente={<div>Componente adicional</div>}
        />
      )}
    </div>
  );
}
