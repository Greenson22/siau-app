// program/next-js/hooks/usePendaftaranChart.ts
'use client';

import { useState, useEffect } from 'react';

// Interface untuk mencocokkan struktur DTO dari backend
interface TrenPendaftaran {
  periode: string;
  jumlah: number;
}

interface SebaranJurusan {
  namaJurusan: string;
  jumlah: number;
}

interface PendaftaranChartData {
  trenPendaftaran: TrenPendaftaran[];
  sebaranJurusan: SebaranJurusan[];
}

export const usePendaftaranChart = () => {
  const [chartData, setChartData] = useState<PendaftaranChartData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchChartData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem('authToken');
        if (!token) {
          throw new Error('Sesi tidak valid.');
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/dashboard/pendaftaran-chart`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Gagal memuat data grafik pendaftaran.');
        }

        const data: PendaftaranChartData = await response.json();
        setChartData(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchChartData();
  }, []);

  return { chartData, isLoading, error };
};