'use client';

import Card from '@/components/elements/Card';
import InfoCard from '@/components/fragments/InfoCard';
import { useAdminDashboard } from '@/hooks/useAdminDashboard'; // <-- 1. Impor hook baru
import { UserPlus, Wallet, GraduationCap, AlertCircle, Hourglass } from 'lucide-react'; // <-- 2. Impor ikon baru

const AdministrasiDashboardView = () => {
    // 3. Panggil hook untuk mendapatkan data dinamis
    const { summary, isLoading, error } = useAdminDashboard();

    // 4. Tampilkan state loading
    if (isLoading) {
        return (
            <Card>
                <p className="text-center text-gray-500">Memuat ringkasan sistem...</p>
            </Card>
        );
    }

    // 5. Tampilkan state error
    if (error) {
        return (
            <Card className="bg-red-50 border-red-200 text-red-700 p-4 flex items-center gap-3">
                <AlertCircle />
                <p>Error: {error}</p>
            </Card>
        );
    }

    // 6. Tampilkan data jika berhasil diambil
    return (
        <div className="space-y-8">
            <div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">Ringkasan Sistem</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Menggunakan data dari 'summary' */}
                    <InfoCard icon={UserPlus} label="Pendaftar Baru" value={summary?.pendaftarBaru ?? 0} colorClass={{bg: 'bg-blue-100', text: 'text-blue-600'}} />
                    <InfoCard icon={GraduationCap} label="Total Mahasiswa Aktif" value={summary?.totalMahasiswaAktif ?? 0} colorClass={{bg: 'bg-green-100', text: 'text-green-600'}} />
                    <InfoCard icon={Wallet} label="Total Dosen" value={summary?.totalDosen ?? 0} colorClass={{bg: 'bg-yellow-100', text: 'text-yellow-600'}} />
                    {/* KARTU BARU */}
                    <InfoCard icon={Hourglass} label="Pembayaran Pending" value={summary?.pembayaranMenungguVerifikasi ?? 0} colorClass={{bg: 'bg-red-100', text: 'text-red-600'}} />
                </div>
            </div>

            <Card>
                <h3 className="text-xl font-bold text-gray-800 mb-4">Statistik Pendaftaran</h3>
                <p className="text-gray-600">Area untuk menampilkan grafik atau statistik pendaftaran mahasiswa baru.</p>
            </Card>
        </div>
    );
};

export default AdministrasiDashboardView;