import React from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import { FaTimes } from 'react-icons/fa';
// import '../../styles/Puntuality/punt_Button.css';

const PopupWindow = ({ closePopup }) => {
  return (
    <div className="punt_button-popup-container">
      <div className="punt_button-popup-header">
        <button className="punt_button-close-btn" onClick={closePopup}>
          <FaTimes />
        </button>
      </div>
      <Tabs defaultActiveKey="general" id="punt_button-popup-tabs">
        <Tab eventKey="general" title="General">
          <div className="punt_button-tab-content">Contenido General</div>
        </Tab>
        <Tab eventKey="reminders" title="Recordatorios">
          <div className="punt_button-tab-content">Contenido de Recordatorios</div>
        </Tab>
        <Tab eventKey="alarms" title="Alarmas">
          <div className="punt_button-tab-content">Contenido de Alarmas</div>
        </Tab>
        <Tab eventKey="stopwatches" title="Cronómetros">
          <div className="punt_button-tab-content">Contenido de Cronómetros</div>
        </Tab>
        <Tab eventKey="timers" title="Temporizadores">
          <div className="punt_button-tab-content">Contenido de Temporizadores</div>
        </Tab>
      </Tabs>
    </div>
  );
};

export default PopupWindow;
