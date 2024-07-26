import React from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    LineElement,
    PointElement,
    Filler,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    LineElement,
    PointElement,
    Filler,
    Tooltip,
    Legend
);

const TimeReportChart = ({ actualTimes, budgetedTimes, labels }) => {

    //SIEMPRE RECIBE LA INFO EN SEGUNDOS
    //Esta cosa solo acepta los tiempos en unidades

    const formatTime = (seconds) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const remainingSeconds = seconds % 60;
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    // Calcular la diferencia y el porcentaje de mejoría
    const differences = actualTimes.map((actual, index) => actual - budgetedTimes[index]);
    const improvementPercentages = differences.map((diff, index) => {
        const budgeted = budgetedTimes[index];
        if (budgeted === 0) return 0; 
        const error = (diff / budgeted) * 100;
        return error < 0 ? Math.abs(error) : 0; 
    });

    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Tiempo Presupuestado',
                data: actualTimes, 
                backgroundColor: 'rgba(75, 192, 192, 0.4)',
                borderColor: 'rgba(75, 192, 192, 1)',
                fill: true,
            },
            {
                label: 'Tiempo Obtenido',
                data: budgetedTimes, 
                backgroundColor: 'rgba(255, 99, 132, 0.4)',
                borderColor: 'rgba(255, 99, 132, 1)',
                fill: true,
            },
            {
                label: 'Diferencia',
                data: differences, 
                type: 'line',
                borderColor: 'rgba(255, 159, 64, 1)',
                borderDash: [5, 5], 
                fill: false,
            },
            {
                label: 'Porcentaje de Mejoría',
                data: improvementPercentages, 
                type: 'line',
                borderColor: 'rgba(153, 102, 255, 1)',
                borderDash: [5, 5], 
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
                callbacks: {
                    label: (context) => {
                        const label = context.dataset.label || '';
                        const value = context.parsed.y;
                        return `${label}: ${formatTime(value)}`;
                    },
                },
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Actividades',
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Tiempo (segundos)',
                },
                min: Math.min(...actualTimes, ...budgetedTimes) - 10,
                max: Math.max(...actualTimes, ...budgetedTimes) + 10,
            },
        },
    };

    return (
        <div style={{ width: '80%', height: 'auto', margin: '0 auto' }} >
            {/* <h2>Reporte de Tiempos de Tardanza</h2> */}
            <Line data={data} options={options} />
        </div>
    );
};

export default TimeReportChart;
