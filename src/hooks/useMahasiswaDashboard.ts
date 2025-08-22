// program/next-js/hooks/useMahasiswaDashboard.ts

'use client';

import { useState, useEffect } from 'react';

// --- Interface & Tipe Data ---
interface AkademikSummary {
  ipk: number;
  totalSks: number;
}

interface Tagihan {
  status: 'LUNAS' | 'BELUM_LUNAS';
}

interface Pengumuman {
  pengumumanId: number;
  judul: string;
  tanggalTerbit: string;
}

interface SummaryData {
  ipk: string;
  statusKeuangan: 'Lunas' | 'Belum Lunas' | 'Memuat...';
  sksDitempuh: number;
}


// --- Custom Hook Utama ---
export const useMahasiswaDashboard = () => {
  const [summaryData, setSummaryData] = useState<SummaryData>({
    ipk: '0.00',
    statusKeuangan: 'Memuat...',
    sksDitempuh: 0,
  });
  const [announcements, setAnnouncements] = useState<Pengumuman[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
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

        // Mengambil data dari tiga endpoint secara bersamaan
        const [summaryRes, tagihanRes, pengumumanRes] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/mahasiswa/me/summary`, { headers }),
          fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/mahasiswa/me/tagihan`, { headers }),
          fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/pengumuman`, { headers })
        ]);

        if (!summaryRes.ok || !tagihanRes.ok || !pengumumanRes.ok) {
          throw new Error('Gagal mengambil data dari server. Pastikan Anda sudah login.');
        }

        const summaryDataFromApi: AkademikSummary = await summaryRes.json();
        const tagihanData: Tagihan[] = await tagihanRes.json();
        const pengumumanData: Pengumuman[] = await pengumumanRes.json();

        // Langsung gunakan data dari API
        const { ipk, totalSks } = summaryDataFromApi;
        const hasUnpaidBill = tagihanData.some(t => t.status === 'BELUM_LUNAS');
        const statusKeuangan = hasUnpaidBill ? 'Belum Lunas' : 'Lunas';

        setSummaryData({ ipk: ipk.toFixed(2), sksDitempuh: totalSks, statusKeuangan });
        setAnnouncements(pengumumanData);

      } catch (err: any) {
        setError(err.message || 'Terjadi kesalahan tidak diketahui.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []); // <-- Hook ini hanya berjalan sekali saat komponen dimuat

  // Kembalikan semua state yang dibutuhkan oleh komponen UI
  return { summaryData, announcements, isLoading, error };
};