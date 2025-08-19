// program/next-js/components/fragments/DashboardView/AdministrasiDashboardView.tsx
'use client';

import Card from '@/components/elements/Card';
import InfoCard from '@/components/fragments/InfoCard';
import { useAdminDashboard } from '@/hooks/useAdminDashboard';
import { UserPlus, Wallet, GraduationCap, AlertCircle, Hourglass } from 'lucide-react';
import PendaftaranChart from './PendaftaranChart';
import ActionItemsView from './ActionItemsView';
import ActivityLogCard from './ActivityLogCard'; // <-- 1. Impor komponen baru

const AdministrasiDashboardView = () => {
    const { summary, isLoading, error } = useAdminDashboard();

    if (isLoading) {
        return (
            <Card>
                <p className="text-center text-gray-500">Memuat ringkasan sistem...</p>
            </Card>
        );
    }

    if (error) {
        return (
            <Card className="bg-red-50 border-red-200 text-red-700 p-4 flex items-center gap-3">
                <AlertCircle />
                <p>Error: {error}</p>
            </Card>
        );
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
                <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Ringkasan Sistem</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <InfoCard icon={UserPlus} label="Pendaftar Baru" value={summary?.pendaftarBaru ?? 0} colorClass={{bg: 'bg-blue-100', text: 'text-blue-600'}} />
                        <InfoCard icon={GraduationCap} label="Total Mahasiswa Aktif" value={summary?.totalMahasiswaAktif ?? 0} colorClass={{bg: 'bg-green-100', text: 'text-green-600'}} />
                        <InfoCard icon={Wallet} label="Total Dosen" value={summary?.totalDosen ?? 0} colorClass={{bg: 'bg-yellow-100', text: 'text-yellow-600'}} />
                        <InfoCard icon={Hourglass} label="Pembayaran Pending" value={summary?.pembayaranMenungguVerifikasi ?? 0} colorClass={{bg: 'bg-red-100', text: 'text-red-600'}} />
                    </div>
                </div>

                <PendaftaranChart />
            </div>
            
            {/* Kolom kanan sekarang berisi 2 komponen */}
            <div className="lg:col-span-1 space-y-8">
                <ActionItemsView />
                <ActivityLogCard /> {/* <-- 2. Tambahkan komponen di sini */}
            </div>
        </div>
    );
};

export default AdministrasiDashboardView;