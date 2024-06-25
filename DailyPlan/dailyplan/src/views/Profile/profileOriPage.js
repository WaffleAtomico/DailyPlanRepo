import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import Archivement_view from "./Archievements";
import ProfileConfig_view from "./ProfileConfig";

import '../../styles/UI/profile/profGeneral.css'

import { IoIosArrowBack } from "react-icons/io";

export default function ProfileOriPage() {

    const { id } = useParams();
    const navigate  = useNavigate();

    const [selectedOption, setSelectedOption] = useState(0);


    const handleSuboption = (index) => 
    {
      if(index === 1)
      {
        setSelectedOption(0);
      }else
      {
        setSelectedOption(1);
      }
    }
    const renderOption = (selectedOption) =>
    {
      switch (selectedOption) {
        case 0:
          return (<>
          <ProfileConfig_view 
          />
          </>)
        case 1:
            return (<>
            <Archivement_view
              id={id}
            />
            </>)
        default:
          return <><ProfileConfig_view /></>
      }
    }

    const GoToOrigin = () =>
    {
      // e.preventDefault();
      navigate(`/dailyplan/${id}/`);
    }

    return(
    <div className='prof-main-container'>
        <div className='prof-UI-header'>
          <div onClick={()=>GoToOrigin()} className='prof-left-button'> <IoIosArrowBack /> Volver </div>
            <div style={{fontSize: "xx-large", paddingBottom: "1rem"}}>Configuración</div> 
              {/* <Ui_navbar 
                handleOptionSelected={handleOptionSelected} 
                selectedOption={selectedOption}
              /> */}
            <button className='prof-right-button'>Perfil</button>
            <button  className='UI-btn-opption' 
            onClick={()=>handleSuboption(selectedOption)} 
            >
              {selectedOption === 0 && "Logros" }
              {selectedOption === 1 && "Perfil" }
            </button>
        </div>
       
        <div className='prof-UI-background'>
            {renderOption(selectedOption)}
        </div>
    </div>
    )
}
