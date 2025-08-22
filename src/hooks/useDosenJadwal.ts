'use client';

import { useState, useEffect } from 'react';
import { JadwalDTO } from '@/types'; 

export const useDosenJadwal = () => {
  const [jadwal, setJadwal] = useState<JadwalDTO[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJadwal = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem('authToken');
        if (!token) {
          throw new Error('Sesi tidak valid. Silakan login kembali.');
        }

        // Memanggil endpoint khusus untuk dosen
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/dosen/me/kelas`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Gagal memuat data jadwal mengajar.');
        }

        const data: JadwalDTO[] = await response.json();
        setJadwal(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchJadwal();
  }, []);

  return { jadwal, isLoading, error };
};