'use client';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const IpsChart = () => {
    const data = {
        labels: ['Sm 1', 'Sm 2', 'Sm 3', 'Sm 4', 'Sm 5', 'Sm 6'],
        datasets: [{
            label: 'IPS',
            data: [3.5, 3.6, 3.4, 3.7, 3.8, 3.75],
            borderColor: 'rgb(79, 70, 229)',
            backgroundColor: 'rgba(79, 70, 229, 0.1)',
            tension: 0.4,
            fill: true,
        }]
    };
    const options = { responsive: true, maintainAspectRatio: false };

    return <Line options={options} data={data} />;
};

export default IpsChart;