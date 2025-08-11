// src/hooks/useMahasiswaDashboard.ts

'use client';

import { useState, useEffect } from 'react';

// --- Interface & Tipe Data ---
interface KhsItem {
  sks: number;
  nilaiHuruf: string;
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

// --- Fungsi Helper ---
const gradeToWeight = (grade: string): number => {
  const gradeMap: { [key: string]: number } = {
    'A': 4.0, 'A-': 3.7, 'B+': 3.3, 'B': 3.0,
    'B-': 2.7, 'C+': 2.3, 'C': 2.0, 'D': 1.0, 'E': 0.0
  };
  return gradeMap[grade] || 0;
};

const calculateIpkAndSks = (khsData: KhsItem[]): { ipk: string, totalSks: number } => {
  if (!khsData || khsData.length === 0) {
    return { ipk: '0.00', totalSks: 0 };
  }

  const total = khsData.reduce((acc, item) => {
    const weight = gradeToWeight(item.nilaiHuruf);
    acc.totalQualityPoints += item.sks * weight;
    acc.totalSks += item.sks;
    return acc;
  }, { totalQualityPoints: 0, totalSks: 0 });

  const ipk = total.totalSks > 0 ? (total.totalQualityPoints / total.totalSks).toFixed(2) : '0.00';

  return { ipk, totalSks: total.totalSks };
};

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

        const [khsRes, tagihanRes, pengumumanRes] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/mahasiswa/me/khs`, { headers }),
          fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/mahasiswa/me/tagihan`, { headers }),
          fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/pengumuman`, { headers })
        ]);

        if (!khsRes.ok || !tagihanRes.ok || !pengumumanRes.ok) {
          throw new Error('Gagal mengambil data dari server. Pastikan Anda sudah login.');
        }

        const khsData: KhsItem[] = await khsRes.json();
        const tagihanData: Tagihan[] = await tagihanRes.json();
        const pengumumanData: Pengumuman[] = await pengumumanRes.json();

        const { ipk, totalSks } = calculateIpkAndSks(khsData);
        const hasUnpaidBill = tagihanData.some(t => t.status === 'BELUM_LUNAS');
        const statusKeuangan = hasUnpaidBill ? 'Belum Lunas' : 'Lunas';

        setSummaryData({ ipk, sksDitempuh: totalSks, statusKeuangan });
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