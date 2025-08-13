// src/hooks/useFinanceData.ts

'use client';

import { useState, useEffect } from 'react';

// Definisikan antarmuka (interface) untuk tipe data yang diharapkan dari API
interface Tagihan {
  deskripsiTagihan: string;
  totalTagihan: number;
  status: 'LUNAS' | 'BELUM_LUNAS';
}

interface Pembayaran {
  tanggalBayar: string;
  deskripsiTagihan: string;
  jumlahBayar: number;
}

export const useFinanceData = () => {
  // State untuk menyimpan data, status loading, dan pesan error
  const [tagihan, setTagihan] = useState<Tagihan[]>([]);
  const [pembayaran, setPembayaran] = useState<Pembayaran[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fungsi untuk mengambil data dari API
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem('authToken');
        if (!token) {
          throw new Error('Sesi tidak valid. Silakan login kembali.');
        }

        const headers = {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        };

        // Mengambil data dari kedua endpoint secara bersamaan
        const [tagihanRes, pembayaranRes] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/mahasiswa/me/tagihan`, { headers }),
          fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/mahasiswa/me/pembayaran`, { headers })
        ]);

        if (!tagihanRes.ok || !pembayaranRes.ok) {
          throw new Error('Gagal mengambil data keuangan dari server.');
        }

        const tagihanData: Tagihan[] = await tagihanRes.json();
        const pembayaranData: Pembayaran[] = await pembayaranRes.json();

        setTagihan(tagihanData);
        setPembayaran(pembayaranData);

      } catch (err: any) {
        setError(err.message || 'Terjadi kesalahan tidak diketahui.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []); // Dependensi kosong agar hook hanya berjalan sekali saat komponen dimuat

  // Kembalikan semua state yang dibutuhkan oleh komponen UI
  return { tagihan, pembayaran, isLoading, error };
};