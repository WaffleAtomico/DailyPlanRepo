import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend, Filler);

const WeekSumerize = () => {
    // Rellenar con la info correspondiente por dia sacada de la misma query
    const punctualityData = [10, 15, 20, 13, 10, 19, 20]; 
    const puntualityPercet = [50, 70, 60, 90, 80, 60, 74];
    const days = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];

    const data = {
        labels: days,
        datasets: [
            {
                label: 'Acciones que modificaron tu puntualidad (%)',
                data: punctualityData,
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
                fill: true,
            },
            {
                label: 'Porcentaje de puntualidad por dia',
                data: puntualityPercet,
                type: 'line',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderDash: [5, 5], // Línea discontinua
                fill: false,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            tooltip: {
                mode: 'index',
                intersect: false,
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Días de la Semana',
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Puntualidad (%)',
                },
                min: 0,
                max: 100,
            },
        },
    };

    return (
        <div style={{ width: '80%', height: 'auto', margin: '0 auto' }} >
            {/* <h2></h2> */}
            <Bar data={data} options={options} />
        </div>
    );
}

export default WeekSumerize;
