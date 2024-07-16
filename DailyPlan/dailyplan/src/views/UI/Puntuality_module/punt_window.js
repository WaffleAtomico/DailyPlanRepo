import React from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import { FaTimes } from 'react-icons/fa';
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';

// Registrar los elementos de Chart.js
Chart.register(ArcElement, Tooltip, Legend);

const PopupWindow = ({ closePopup }) => {

  // Sueno

  const data = {
    labels: ['Bueno', 'Regular', 'Mal'],
    datasets: [
      {
        data: [30, 50, 20], // Estos son los valores para cada segmento del gráfico
        backgroundColor: [
          '#36A2EB', // Color para "Bueno"
          '#FFCE56', // Color para "Regular"
          '#FF6384'  // Color para "Mal"
        ],
        hoverBackgroundColor: [
          '#36A2EB',
          '#FFCE56',
          '#FF6384'
        ]
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Calidad de sueño'
      }
    }
  };

  return (
    <div className="punt_button-popup-container">
      <div className="punt_button-popup-header">
        <button className="punt_button-close-btn" onClick={closePopup}>
          <FaTimes />
        </button>
      </div>
      <Tabs defaultActiveKey="general" id="punt_button-popup-tabs">
        <Tab eventKey="reminders" title="Recordatorios">
          <div className="punt_button-tab-content">Contenido de Recordatorios</div>
        </Tab>
        <Tab eventKey="alarms" title="Alarmas">
          <div className="punt_button-tab-content">Contenido de Alarmas</div>
        </Tab>
        <Tab eventKey="sleep" title="Sueño">
          <div className="punt_button-tab-content">
            <div style={{ width: '100%', height: '100%' }}>
              <Pie data={data} options={options} />
            </div>
          </div>
        </Tab>
        <Tab eventKey="stopwatches" title="Cronómetros">
          <div className="punt_button-tab-content">Contenido de Cronómetros</div>
        </Tab>
      </Tabs>
    </div>
  );
};

export default PopupWindow;
