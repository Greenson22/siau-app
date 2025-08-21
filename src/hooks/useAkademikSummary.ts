// program/next-js/hooks/useAkademikSummary.ts
'use client';

import { useState, useEffect } from 'react';

// Tipe untuk mencocokkan DTO dari backend
interface AkademikSummary {
    ipk: number;
    totalSks: number;
    semesterAktif: number;
}

export const useAkademikSummary = () => {
  const [summary, setSummary] = useState<AkademikSummary | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSummary = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem('authToken');
        if (!token) throw new Error('Sesi tidak valid.');

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/mahasiswa/me/summary`, {
          headers: { 'Authorization': `Bearer ${token}` },
        });

        if (!response.ok) {
          throw new Error('Gagal memuat ringkasan akademik.');
        }

        const data: AkademikSummary = await response.json();
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