// src/hooks/useKrsPackage.ts
'use client';

import { useState, useEffect } from 'react';

// Definisikan tipe data untuk setiap matakuliah dalam paket
interface MatakuliahPaket {
  kodeMk: string;
  namaMatakuliah: string;
  sks: number;
}

// Definisikan tipe data untuk respons API secara keseluruhan
interface KrsPackageData {
  namaPaket: string;
  totalSks: number;
  detailPaket: MatakuliahPaket[];
}

export const useKrsPackage = () => {
  const [krsPackage, setKrsPackage] = useState<KrsPackageData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchKrsPackage = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem('authToken');
        if (!token) {
          throw new Error('Sesi tidak valid. Silakan login kembali.');
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/mahasiswa/me/paket-krs`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Gagal memuat paket KRS. Pastikan data paket untuk semester Anda telah diinput oleh admin.');
        }

        const data: KrsPackageData = await response.json();
        setKrsPackage(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchKrsPackage();
  }, []);

  return { krsPackage, isLoading, error };
};