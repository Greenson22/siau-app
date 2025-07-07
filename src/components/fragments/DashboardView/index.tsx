'use client';

import Card from '@/components/elements/Card';
import { ElementType } from 'react';

// --- Impor untuk Mahasiswa ---
import IpsChart from './IpsChart';
import { GraduationCap, Wallet, BookCopy, Megaphone } from 'lucide-react';
import { ringkasanAkademik } from '@/lib/data';

// --- Impor untuk Dosen ---
import { mahasiswaBimbingan, jadwalMengajar } from '@/lib/dataDosen';
import { Users, Calendar } from 'lucide-react';

// Tipe untuk peran pengguna
type UserRole = 'mahasiswa' | 'dosen';

// =================================================================
// PROPS & KOMPONEN BERSAMA
// =================================================================

interface InfoCardProps {
  icon: ElementType;
  label: string;
  value: string | number;
  colorClass: {
    bg: string;
    text: string;
  };
}

const InfoCard: React.FC<InfoCardProps> = ({ icon: Icon, label, value, colorClass }) => (
    <Card className="flex items-center gap-5 p-5">
        <div className={`p-4 rounded-full ${colorClass.bg}`}>
            <Icon className={colorClass.text} size={28}/>
        </div>
        <div>
            <p className="text-md text-gray-500">{label}</p>
            <p className="text-3xl font-bold text-gray-800">{value}</p>
        </div>
    </Card>
);


// =================================================================
// KOMPONEN SPESIFIK UNTUK MAHASISWA
// =================================================================

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

const MahasiswaDashboard = () => (
    <>
        {/* Info Cards Mahasiswa */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <InfoCard icon={GraduationCap} label="IPK" value={ringkasanAkademik.ipk} colorClass={{bg: 'bg-blue-100', text: 'text-blue-600'}} />
            <InfoCard icon={Wallet} label="Status Keuangan" value={ringkasanAkademik.statusKeuangan} colorClass={{bg: 'bg-green-100', text: 'text-green-600'}} />
            <InfoCard icon={BookCopy} label="SKS Ditempuh" value={ringkasanAkademik.sksDitempuh} colorClass={{bg: 'bg-yellow-100', text: 'text-yellow-600'}} />
        </div>
        {/* Chart & Pengumuman Mahasiswa */}
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
                    <AnnouncementItem title="Batas Akhir Pembayaran UKT" date="30 Juli 2025" borderColor="border-indigo-500" />
                    <AnnouncementItem title="Perkuliahan Semester Ganjil" date="1 September 2025" borderColor="border-green-500" />
                    <AnnouncementItem title="Validasi KRS oleh Dosen PA" date="25-31 Agustus 2025" borderColor="border-yellow-500" />
                </ul>
            </Card>
        </div>
    </>
);


// =================================================================
// KOMPONEN SPESIFIK UNTUK DOSEN
// =================================================================

const DosenDashboard = () => {
    const totalBimbingan = mahasiswaBimbingan.length;
    const totalJadwal = jadwalMengajar.length;
    const totalSks = jadwalMengajar.reduce((sum, item) => sum + item.sks, 0);

    return (
        <div className="space-y-8">
            <div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">Ringkasan Aktivitas</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <InfoCard icon={Users} label="Mahasiswa Bimbingan" value={totalBimbingan} colorClass={{bg: 'bg-blue-100', text: 'text-blue-600'}} />
                    <InfoCard icon={Calendar} label="Jadwal Mengajar" value={totalJadwal} colorClass={{bg: 'bg-green-100', text: 'text-green-600'}} />
                    <InfoCard icon={BookCopy} label="Total SKS Mengajar" value={totalSks} colorClass={{bg: 'bg-yellow-100', text: 'text-yellow-600'}} />
                </div>
            </div>

             <div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">Jadwal Mengajar Minggu Ini</h3>
                 <Card>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left text-gray-500">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3">Hari</th>
                                    <th className="px-6 py-3">Waktu</th>
                                    <th className="px-6 py-3">Mata Kuliah</th>
                                    <th className="px-6 py-3">Ruang</th>
                                </tr>
                            </thead>
                            <tbody>
                                {jadwalMengajar.map((item, index) => (
                                    <tr key={index} className="bg-white border-b hover:bg-gray-50">
                                        <td className="px-6 py-4 font-medium">{item.hari}</td>
                                        <td className="px-6 py-4">{item.waktu}</td>
                                        <td className="px-6 py-4 font-semibold text-gray-900">{item.nama}</td>
                                        <td className="px-6 py-4">{item.ruang}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                 </Card>
            </div>
        </div>
    );
};


// =================================================================
// KOMPONEN UTAMA YANG TELAH DIGABUNGKAN
// =================================================================

interface DashboardViewProps {
  role: UserRole;
}

const DashboardView: React.FC<DashboardViewProps> = ({ role }) => {
  if (role === 'dosen') {
    return <DosenDashboard />;
  }
  
  // Default ke dashboard mahasiswa
  return <MahasiswaDashboard />;
};

export default DashboardView;