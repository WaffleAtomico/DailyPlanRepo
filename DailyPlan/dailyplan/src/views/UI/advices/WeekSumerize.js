import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, Filler } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, Filler);

const WeekSumerize = () => {
    const punctualityData = [80, 90, 70, 85, 95, 60, 75]; // Puntualidad en porcentaje
    const days = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];

    const data = {
        labels: days,
        datasets: [
            {
                label: 'Puntualidad (%)',
                data: punctualityData,
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
                fill: true,
            },
            {
                label: 'Línea de Tendencia',
                data: punctualityData.map((value) => (value + 20)), // Ejemplo de línea de tendencia
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
        <div>
            <h2>Resumen Semanal de Puntualidad</h2>
            <Bar data={data} options={options} />
        </div>
    );
}

export default WeekSumerize;
