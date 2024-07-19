// PunctualityBarChart.jsx
import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';
import axios from 'axios';
import '../../../styles/advices/PunctualityBarChart.css'; // Importa tu archivo CSS
import { getPuntuality, getPuntualityById } from '../../../utils/validations/puntuality';

// Register the Chart.js components
Chart.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const PunctualityBarChart = ({ userId }) => {
  const [chartData, setChartData] = useState({
    labels: ['Recordatorios', 'Alarmas', 'Temporizadores', 'Cronómetros'],
    datasets: []
  });

  useEffect(() => {
    
   getPuntualityById(userId).then(response => {

    // Process the data
    const labels = ['Recordatorios', 'Alarmas', 'Temporizadores', 'Cronómetros'];
    const dataset = [
      response.data.punt_percent_rem || 0,
      response.data.punt_percent_alar || 0,
      response.data.punt_percent_timer || 0,
      response.data.punt_percent_chro || 0
    ];

    setChartData({
      labels: labels,
      datasets: [
        {
          label: 'Porcentaje de Puntualidad (%)',
          data: dataset,
          backgroundColor: [
            '#36A2EB', // Color para Recordatorios
            '#FFCE56', // Color para Alarmas
            '#FF6384', // Color para Temporizadores
            '#4BC0C0'  // Color para Cronómetros
          ],
          borderColor: '#000',
          borderWidth: 1
        }
      ]
    });



   })
   
   .catch(error = {});
      
    },
   [userId]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Porcentaje de Puntualidad por Componente'
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Componente'
        }
      },
      y: {
        title: {
          display: true,
          text: 'Porcentaje (%)'
        },
        min: 0,
        max: 100
      }
    }
  };

  return (
    <div className="punctuality-bar-chart">
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default PunctualityBarChart;
