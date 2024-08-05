import { useState, useEffect } from "react";
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';
import { getWeeklyScorecardForUser } from "../../../utils/validations/weeklyscorecard";

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend, Filler);

const WeekSumerize = (props) => {
    // Rellenar con la info correspondiente por dia sacada de la misma query
    const [punctualityData, setPunctualityDatan] = useState([]);
    const [puntualityPercet, setPuntualityPercet] = useState([]);
    const days = ['Recordatorios', 'Alarmas', 'Timers', 'Cronometro'];

    useEffect(() => {
        const setPuntualityInfo = (user_id) => {
            getWeeklyScorecardForUser(user_id).then(res => {
                const scoreCard = res.data[0];
                if (scoreCard) {
                    setPunctualityDatan([scoreCard.punt_num_rem, scoreCard.punt_num_alar, scoreCard.punt_num_timer, scoreCard.punt_num_chro]);
                    setPuntualityPercet([scoreCard.punt_percent_rem, scoreCard.punt_percent_alar, scoreCard.punt_percent_timer, scoreCard.punt_percent_chro]);
                } else {
                    setPunctualityDatan([0, 0, 0, 0]);
                    setPuntualityPercet([0, 0, 0, 0]);
                }
            }).catch(err => { console.log(err) });
        };
        
        setPuntualityInfo(props.user_id);
    }, [props.user_id]);

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
                label: 'Porcentaje de puntualidad',
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
                    text: 'Acciones',
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
