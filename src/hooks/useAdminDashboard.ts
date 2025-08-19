'use client';

import { useState, useEffect } from 'react';

// Interface untuk mencocokkan data dari DTO backend
interface DashboardSummary {
  pendaftarBaru: number;
  totalMahasiswaAktif: number;
  totalDosen: number;
  pembayaranMenungguVerifikasi: number;
}

export const useAdminDashboard = () => {
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSummary = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem('authToken');
        if (!token) {
          throw new Error('Sesi tidak valid. Silakan login kembali.');
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/dashboard/summary`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Gagal memuat data ringkasan dashboard.');
        }

        const data: DashboardSummary = await response.json();
        setSummary(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSummary();
  }, []);

  return { summary, isLoading, error };
};