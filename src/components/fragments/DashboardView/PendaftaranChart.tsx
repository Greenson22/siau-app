// program/next-js/components/fragments/DashboardView/PendaftaranChart.tsx
'use client';

import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import Card from '@/components/elements/Card';
import { usePendaftaranChart } from '@/hooks/usePendaftaranChart';
import { AlertCircle } from 'lucide-react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const PendaftaranChart = () => {
  const { chartData, isLoading, error } = usePendaftaranChart();

  const trendData = {
    labels: chartData?.trenPendaftaran.map(d => d.periode) || [],
    datasets: [
      {
        label: 'Pendaftar Baru',
        data: chartData?.trenPendaftaran.map(d => d.jumlah) || [],
        backgroundColor: 'rgba(79, 70, 229, 0.8)',
        borderColor: 'rgba(79, 70, 229, 1)',
        borderWidth: 1,
      },
    ],
  };

  const jurusanData = {
    labels: chartData?.sebaranJurusan.map(d => d.namaJurusan) || [],
    datasets: [
      {
        label: 'Jumlah Pendaftar',
        data: chartData?.sebaranJurusan.map(d => d.jumlah) || [],
        backgroundColor: [
          'rgba(79, 70, 229, 0.8)',
          'rgba(34, 197, 94, 0.8)',
          'rgba(253, 186, 116, 0.8)',
        ],
        borderColor: ['rgba(255, 255, 255, 1)'],
        borderWidth: 2,
      },
    ],
  };

  return (
    <Card>
        <h3 className="text-xl font-bold text-gray-800 mb-6">Grafik Pendaftaran Mahasiswa Baru 📈</h3>
        {isLoading && <p className="text-center text-gray-500">Memuat data grafik...</p>}
        {error && 
            <div className="bg-red-50 border-red-200 text-red-700 p-4 flex items-center gap-3 rounded-md">
                <AlertCircle />
                <p>Error: {error}</p>
            </div>
        }
        {chartData && !isLoading && !error && (
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                <div className="lg:col-span-3">
                    <h4 className="font-semibold text-center mb-2">Tren Pendaftaran</h4>
                    <div className="h-80">
                         <Bar data={trendData} options={{ maintainAspectRatio: false, plugins: { legend: { display: false } } }} />
                    </div>
                </div>
                <div className="lg:col-span-2">
                    <h4 className="font-semibold text-center mb-2">Sebaran Jurusan Pendaftar</h4>
                     <div className="h-80 flex justify-center items-center">
                        <Pie data={jurusanData} options={{ maintainAspectRatio: false }} />
                    </div>
                </div>
            </div>
        )}
    </Card>
  );
};
export default PendaftaranChart;