'use client';

import Card from '@/components/elements/Card';
import InfoCard from '@/components/fragments/InfoCard'; // <-- 1. Impor InfoCard yang baru
import { mahasiswaBimbingan, jadwalMengajar } from '@/lib/dataDosen';
import { Users, Calendar, BookOpen } from 'lucide-react';

const DosenDashboardView = () => {
    const totalBimbingan = mahasiswaBimbingan.length;
    const totalJadwal = jadwalMengajar.length;
    const totalSks = jadwalMengajar.reduce((sum, item) => sum + item.sks, 0);

    return (
        <div className="space-y-8">
            <div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">Ringkasan Aktivitas</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* 3. Penggunaan InfoCard tidak perlu diubah */}
                    <InfoCard icon={Users} label="Mahasiswa Bimbingan" value={totalBimbingan} colorClass={{bg: 'bg-blue-100', text: 'text-blue-600'}} />
                    <InfoCard icon={Calendar} label="Jadwal Mengajar" value={totalJadwal} colorClass={{bg: 'bg-green-100', text: 'text-green-600'}} />
                    <InfoCard icon={BookOpen} label="Total SKS Mengajar" value={totalSks} colorClass={{bg: 'bg-yellow-100', text: 'text-yellow-600'}} />
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

export default DosenDashboardView;