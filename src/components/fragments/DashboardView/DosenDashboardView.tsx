'use client';

import Card from '@/components/elements/Card';
import InfoCard from '@/components/fragments/InfoCard';
import Button from '@/components/elements/Button'; // <-- IMPORT BUTTON
import { useDosenDashboard } from '@/hooks/useDosenDashboard';
import { useDosenJadwal } from '@/hooks/useDosenJadwal';
import { Users, Calendar, BookOpen, AlertCircle, Bell, ArrowRight } from 'lucide-react'; // <-- IMPORT ICON BARU

// TAMBAHKAN INTERFACE PROPS BARU
interface DosenDashboardViewProps {
  onNavigate?: (view: string, tab?: string) => void;
}

const DosenDashboardView: React.FC<DosenDashboardViewProps> = ({ onNavigate }) => {
    const { summary, isLoading: isLoadingSummary, error: errorSummary } = useDosenDashboard();
    const { jadwal, isLoading: isLoadingJadwal, error: errorJadwal } = useDosenJadwal();

    if (isLoadingSummary || isLoadingJadwal) {
        return (
            <Card>
                <p className="text-center text-gray-500">Memuat ringkasan aktivitas...</p>
            </Card>
        );
    }
    
    const anyError = errorSummary || errorJadwal;
    if (anyError) {
        return (
            <Card className="bg-red-50 border-red-200 text-red-700 p-4 flex items-center gap-3">
                <AlertCircle />
                <p>Error: {anyError}</p>
            </Card>
        );
    }

    const handleNavigateToBimbingan = () => {
        if (onNavigate) {
            onNavigate('bimbingan');
        }
    }

    return (
        <div className="space-y-8">
            {/* --- KARTU NOTIFIKASI BARU --- */}
            {summary && summary.krsMenungguPersetujuan > 0 && (
                 <Card className="bg-blue-50 border-blue-200">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <div className="bg-blue-200 p-3 rounded-full">
                                <Bell className="text-blue-700" size={24}/>
                            </div>
                            <div>
                                <h4 className="font-bold text-blue-800">Tugas Validasi KRS</h4>
                                <p className="text-blue-700">
                                    Anda memiliki <strong className="text-lg">{summary.krsMenungguPersetujuan}</strong> mahasiswa yang KRS-nya menunggu persetujuan.
                                </p>
                            </div>
                        </div>
                        <Button onClick={handleNavigateToBimbingan} className="w-full sm:w-auto">
                            Lihat Detail
                            <ArrowRight size={16} className="ml-2"/>
                        </Button>
                    </div>
                </Card>
            )}

            <div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">Ringkasan Aktivitas</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <InfoCard icon={Users} label="Mahasiswa Bimbingan" value={summary?.totalMahasiswaBimbingan ?? 0} colorClass={{bg: 'bg-blue-100', text: 'text-blue-600'}} />
                    <InfoCard icon={Calendar} label="Jadwal Mengajar" value={summary?.totalKelasMengajar ?? 0} colorClass={{bg: 'bg-green-100', text: 'text-green-600'}} />
                    <InfoCard icon={BookOpen} label="Total SKS Mengajar" value={summary?.totalSksMengajar ?? 0} colorClass={{bg: 'bg-yellow-100', text: 'text-yellow-600'}} />
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
                                {jadwal.length > 0 ? (
                                    jadwal.map((item, index) => (
                                        <tr key={index} className="bg-white border-b hover:bg-gray-50">
                                            <td className="px-6 py-4 font-medium">{item.jadwal.split(',')[0]}</td>
                                            <td className="px-6 py-4">{item.jadwal.split(',')[1]}</td>
                                            <td className="px-6 py-4 font-semibold text-gray-900">{item.namaMataKuliah}</td>
                                            <td className="px-6 py-4">{item.ruangan}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr className="bg-white hover:bg-gray-50">
                                        <td colSpan={4} className="text-center px-6 py-4">Tidak ada jadwal mengajar yang ditemukan.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                 </Card>
            </div>
        </div>
    );
};

export default DosenDashboardView;