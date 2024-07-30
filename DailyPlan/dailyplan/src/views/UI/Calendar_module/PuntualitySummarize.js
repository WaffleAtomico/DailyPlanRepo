import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const PuntualitySummarize = ({ chartData }) => {
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top'
            },
            title: {
                display: true,
                text: 'Estadísticas del Bloque'
            }
        },
        scales: {
            y: {
                title: {
                    display: true,
                    text: 'Objective Block Time (seconds)'
                }
            },
            x: {
                title: {
                    display: true,
                    text: 'Time (seconds)'
                }
            }
        }
    };

    return (
        <div style={{ width: '80%', height: 'auto', margin: '0 auto' }}>
            <Bar data={chartData} options={options} />
        </div>
    );
}

export default PuntualitySummarize;
