import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const PuntualitySummarize = ({ chartData }) => {
    const data = {
        labels: chartData.labels,
        datasets: [
            {
                label: 'Estadísticas del Bloque',
                data: chartData.data,
                backgroundColor: ['#36A2EB', '#FF6384', '#FFCE56']
            }
        ]
    };

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
        }
    };

    return (
        <div style={{ width: '80%', height: 'auto', margin: '0 auto' }}>
            <Bar data={data} options={options} />
        </div>
    );
}

export default PuntualitySummarize;
