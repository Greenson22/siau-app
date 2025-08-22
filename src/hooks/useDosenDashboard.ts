'use client';

import { useState, useEffect } from 'react';

// Interface untuk mencocokkan DTO dari backend
interface DosenDashboardSummary {
  totalMahasiswaBimbingan: number;
  totalKelasMengajar: number;
  totalSksMengajar: number;
}

export const useDosenDashboard = () => {
  const [summary, setSummary] = useState<DosenDashboardSummary | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSummary = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem('authToken');
        if (!token) throw new Error('Sesi tidak valid.');

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/dosen/me/summary`, {
          headers: { 'Authorization': `Bearer ${token}` },
        });

        if (!response.ok) {
          throw new Error('Gagal memuat ringkasan dashboard dosen.');
        }

        const data: DosenDashboardSummary = await response.json();
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