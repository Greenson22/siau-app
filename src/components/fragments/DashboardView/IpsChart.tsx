// program/next-js/components/fragments/DashboardView/IpsChart.tsx
'use client';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler,
} from 'chart.js';

ChartJS.register(
  CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler
);

// Terima data sebagai props
interface IpsChartProps {
  labels: string[];
  dataPoints: number[];
}

const IpsChart: React.FC<IpsChartProps> = ({ labels, dataPoints }) => {
    const data = {
        labels: labels,
        datasets: [{
            label: 'IPS',
            data: dataPoints,
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