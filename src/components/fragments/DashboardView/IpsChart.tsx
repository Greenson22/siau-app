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
import { ringkasanAkademik } from '@/lib/data';

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
        labels: ringkasanAkademik.ipsData.labels,
        datasets: [{
            label: 'IPS',
            data: ringkasanAkademik.ipsData.data,
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