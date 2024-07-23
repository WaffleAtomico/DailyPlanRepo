import React, { useState, useEffect } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import { FaTimes } from 'react-icons/fa';
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import { getSleepQualityByUser } from '../../../utils/validations/sleepquality';
// Register the Chart.js components
Chart.register(ArcElement, Tooltip, Legend);

const PopupWindow = ({ closePopup, props }) => {
  const [qualityData, setQualityData] = useState({ good: 0, medium: 0, bad: 0 });

  useEffect(() => {
    getSleepQualityByUser(props.id_user)
      .then(response => {
        const qualityCounts = { good: 0, medium: 0, bad: 0 };
        console.log("Se obtuvo la información para la grafica:", response.data);
        response.data.forEach(item => {
          if (item.quality_good === 1) {
            qualityCounts.good += 1;
          } else if (item.quality_medium === 1) {
            qualityCounts.medium += 1;
          } else if (item.quiality_bad === 1) {
            qualityCounts.bad += 1;
          }
        });

        setQualityData(qualityCounts);
      })
      .catch(error => {
        console.log("Ocurrió un error al obtener la calidad de sueño para la gráfica", error);
      });
  }, [props.id_user]);

  const sleepdata = {
    labels: ['Bueno', 'Regular', 'Mal'],
    datasets: [
      {
        data: [qualityData.good, qualityData.medium, qualityData.bad],
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
      <Tabs defaultActiveKey="reminders" id="punt_button-popup-tabs">
        <Tab eventKey="reminders" title="Recordatorios">
          <div className="punt_button-tab-content">
            Contenido de Recordatorios
            </div>
        </Tab>
        <Tab eventKey="alarms" title="Alarmas">
          <div className="punt_button-tab-content">Contenido de Alarmas</div>
        </Tab>
        <Tab eventKey="sleep" title="Sueño">
          <div className="punt_button-tab-content">
          <div style={{ width: '100%', height: '100%' }}>
              {(qualityData.good < 1 &&
                qualityData.medium < 1 &&
                qualityData.bad < 1 ) ? (
                <div>
                  <h2>Prueba el modulo de calidad de sueño desde alarmas!</h2>
                </div>
              ) : (
                <Pie data={sleepdata} options={options} />
              )}
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
