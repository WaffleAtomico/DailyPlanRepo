import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getUsrName } from "../../utils/validations/user";

import Archivement_view from "./Archievements";
import ProfileConfig_view from "./ProfileConfig";

import "../../styles/UI/profile/profGeneral.css";

import { IoIosArrowBack } from "react-icons/io";
import { FaUserClock } from "react-icons/fa6";

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
    const getUserName = async (user_id) => {
      const response = await getUsrName(user_id);
      console.log("Response in front " + response.user_name);
      setUsername(response.user_name);
    };
    getUserName(id);
  }, []);

  const GoToOrigin = () => {
    // e.preventDefault();
    navigate(`/dailyplan/${id}/`);
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
    </div>
  );
}
