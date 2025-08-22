// program/next-js/hooks/useIpsChart.ts
'use client';

import { useState, useEffect } from 'react';

interface IpsChartData {
  labels: string[];
  data: number[];
}

export const useIpsChart = () => {
  const [chartData, setChartData] = useState<IpsChartData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchChartData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem('authToken');
        if (!token) throw new Error('Sesi tidak valid.');

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/mahasiswa/me/ips-history`, {
          headers: { 'Authorization': `Bearer ${token}` },
        });

        if (!response.ok) {
          throw new Error('Gagal memuat data grafik IPS.');
        }

        const data: IpsChartData = await response.json();
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