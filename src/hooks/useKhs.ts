// program/next-js/hooks/useKhs.ts
'use client';

import { useState, useEffect } from 'react';
import { KhsDTO } from '@/types'; // Mengasumsikan KhsDTO didefinisikan di types

export const useKhs = () => {
  const [khs, setKhs] = useState<KhsDTO[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchKhs = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem('authToken');
        if (!token) {
          throw new Error('Sesi tidak valid. Silakan login kembali.');
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/mahasiswa/me/khs`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Gagal memuat data KHS.');
        }

        const data: KhsDTO[] = await response.json();
        setKhs(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchKhs();
  }, []);

  return { khs, isLoading, error };
};