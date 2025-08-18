'use client';

import Card from '@/components/elements/Card';
import InfoCard from '@/components/fragments/InfoCard';
import { UserPlus, Wallet, GraduationCap } from 'lucide-react';

const AdministrasiDashboardView = () => {
    return (
        <div className="space-y-8">
            <div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">Ringkasan Sistem</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <InfoCard icon={UserPlus} label="Pendaftar Baru" value={10} colorClass={{bg: 'bg-blue-100', text: 'text-blue-600'}} />
                    <InfoCard icon={Wallet} label="Total Mahasiswa" value={130} colorClass={{bg: 'bg-green-100', text: 'text-green-600'}} />
                    <InfoCard icon={GraduationCap} label="Total Dosen" value={15} colorClass={{bg: 'bg-yellow-100', text: 'text-yellow-600'}} />
                </div>
            </div>

            <Card>
                <h3 className="text-xl font-bold text-gray-800 mb-4">Statistik Pendaftaran hore</h3>
                <p className="text-gray-600">Area untuk menampilkan grafik atau statistik pendaftaran mahasiswa baru. [cite: 104]</p>
            </Card>
        </div>
    );
};

export default AdministrasiDashboardView;