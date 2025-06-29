import Card from '@/components/elements/Card';
import IpsChart from './IpsChart';
import { GraduationCap, Wallet, BookCopy } from 'lucide-react';

const DashboardView = () => (
    <>
        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
             <Card className="flex items-center gap-4">
                <div className="bg-blue-100 p-3 rounded-full"><GraduationCap className="text-blue-600" /></div>
                <div><p className="text-sm text-gray-500">IPK</p><p className="text-2xl font-bold text-gray-800">3.75</p></div>
            </Card>
            <Card className="flex items-center gap-4">
                <div className="bg-green-100 p-3 rounded-full"><Wallet className="text-green-600" /></div>
                <div><p className="text-sm text-gray-500">Status Keuangan</p><p className="text-xl font-bold text-green-600">Lunas</p></div>
            </Card>
            <Card className="flex items-center gap-4">
                <div className="bg-yellow-100 p-3 rounded-full"><BookCopy className="text-yellow-600" /></div>
                <div><p className="text-sm text-gray-500">SKS Ditempuh</p><p className="text-2xl font-bold text-gray-800">98</p></div>
            </Card>
        </div>
        {/* Chart & Pengumuman */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
                <h3 className="font-bold mb-4">Grafik Indeks Prestasi Semester (IPS)</h3>
                <div className="relative h-80"><IpsChart /></div>
            </Card>
            <Card>
                <h3 className="font-bold mb-4">Pengumuman</h3>
                 <ul className="space-y-4">
                    <li className="border-l-4 border-indigo-500 pl-4">
                        <p className="font-semibold">Batas Akhir Pembayaran UKT</p>
                        <p className="text-sm text-gray-500">30 Juli 2025</p>
                    </li>
                    <li className="border-l-4 border-green-500 pl-4">
                        <p className="font-semibold">Perkuliahan Semester Ganjil Dimulai</p>
                        <p className="text-sm text-gray-500">1 September 2025</p>
                    </li>
                    <li className="border-l-4 border-yellow-500 pl-4">
                        <p className="font-semibold">Validasi KRS oleh Dosen PA</p>
                        <p className="text-sm text-gray-500">25-31 Agustus 2025</p>
                    </li>
                </ul>
            </Card>
        </div>
    </>
);

export default DashboardView;