// src/components/fragments/DashboardView/MahasiswaDashboardView.tsx

'use client';

import React from 'react';
import Card from '@/components/elements/Card';
import InfoCard from '@/components/fragments/InfoCard';
import IpsChart from './IpsChart';
import { useMahasiswaDashboard } from '@/hooks/useMahasiswaDashboard'; // <-- 1. Impor hook baru
import { GraduationCap, Wallet, BookCopy, Megaphone, AlertCircle } from 'lucide-react';

// Komponen untuk item pengumuman (tidak berubah)
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

// Format tanggal (bisa juga dipindah ke file utils)
const formatDate = (isoString: string) => {
  return new Date(isoString).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
};

const MahasiswaDashboardView = () => {
  // 2. Panggil hook untuk mendapatkan data dan state
  const { summaryData, announcements, isLoading, error } = useMahasiswaDashboard();

  // 3. Render loading state
  if (isLoading) {
    return <div className="text-center p-8">Memuat data dashboard...</div>;
  }

  // 4. Render error state
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

  // 5. Render UI utama dengan data dari hook
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
                announcements.slice(0, 3).map((item, index) => (
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