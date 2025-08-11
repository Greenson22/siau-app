'use client';

import React, { useState, useEffect } from 'react';
import Card from '@/components/elements/Card';
import InfoCard from '@/components/fragments/InfoCard';
import IpsChart from './IpsChart';
import { GraduationCap, Wallet, BookCopy, Megaphone, AlertCircle } from 'lucide-react';

// --- Interface untuk tipe data dari API ---
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

// --- Tipe data untuk ringkasan di dashboard ---
interface SummaryData {
  ipk: string;
  statusKeuangan: 'Lunas' | 'Belum Lunas' | 'Memuat...';
  sksDitempuh: number;
}

// --- Props dan Komponen untuk Pengumuman ---
interface AnnouncementItemProps {
  title: string;
  date: string;
  borderColor: string;
}

const AnnouncementItem: React.FC<AnnouncementItemProps> = ({ title, date, borderColor }) => (
  <li className={`border-l-4 pl-4 py-2 ${borderColor}`}>
    <p className="font-semibold text-gray-800">{title}</p>
    <p className="text-sm text-gray-500">{date}</p>
  </li>
);

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

const formatDate = (isoString: string) => {
  return new Date(isoString).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
};

const MahasiswaDashboardView = () => {
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
        // Ambil token dari localStorage
        const token = localStorage.getItem('authToken');
        if (!token) {
          throw new Error('Sesi tidak valid. Silakan login kembali.');
        }

        // Siapkan header otorisasi
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

        // Kalkulasi data dan update state
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
  }, []);

  if (isLoading) {
    return <div className="text-center p-8">Memuat data dashboard...</div>;
  }

  if (error) {
    return (
        <Card className="bg-red-50 border-red-200 text-red-800">
            <div className="flex items-center gap-4">
                <AlertCircle />
                <div>
                    <h3 className="font-bold">Gagal Memuat Data</h3>
                    <p>{error}</p>
                </div>
            </div>
        </Card>
    );
  }

  const announcementColors = ["border-indigo-500", "border-green-500", "border-yellow-500"];

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <InfoCard icon={GraduationCap} label="IPK" value={summaryData.ipk} colorClass={{bg: 'bg-blue-100', text: 'text-blue-600'}} />
        <InfoCard icon={Wallet} label="Status Keuangan" value={summaryData.statusKeuangan} colorClass={{bg: 'bg-green-100', text: 'text-green-600'}} />
        <InfoCard icon={BookCopy} label="SKS Ditempuh" value={summaryData.sksDitempuh} colorClass={{bg: 'bg-yellow-100', text: 'text-yellow-600'}} />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <h3 className="text-xl font-bold mb-4 text-gray-800">Grafik Indeks Prestasi Semester (IPS)</h3>
          <div className="h-80"><IpsChart /></div>
        </Card>
        <Card>
          <div className="flex items-center gap-3 mb-4">
            <Megaphone className="text-indigo-500" />
            <h3 className="text-xl font-bold text-gray-800">Pengumuman</h3>
          </div>
          <ul className="space-y-5">
            {announcements.length > 0 ? (
                announcements.slice(0, 3).map((item, index) => ( // Batasi 3 pengumuman
                    <AnnouncementItem 
                        key={item.pengumumanId}
                        title={item.judul} 
                        date={formatDate(item.tanggalTerbit)} 
                        borderColor={announcementColors[index % announcementColors.length]} 
                    />
                ))
            ) : (
                <p className="text-sm text-gray-500">Tidak ada pengumuman saat ini.</p>
            )}
          </ul>
        </Card>
      </div>
    </>
  );
};

export default MahasiswaDashboardView;