import Card from '@/components/elements/Card';
import IpsChart from './IpsChart';
import { GraduationCap, Wallet, BookCopy, Megaphone } from 'lucide-react';
import { ElementType } from 'react';
import { ringkasanAkademik } from '@/lib/data';

// Tipe untuk props InfoCard
interface InfoCardProps {
  icon: ElementType;
  label: string;
  value: string;
  colorClass: {
    bg: string;
    text: string;
  };
}

// Tipe untuk props AnnouncementItem
interface AnnouncementItemProps {
    title: string;
    date: string;
    borderColor: string;
}

const InfoCard: React.FC<InfoCardProps> = ({ icon: Icon, label, value, colorClass }) => (
    <Card className="flex items-center gap-5">
        <div className={`p-4 rounded-full ${colorClass.bg}`}>
            <Icon className={colorClass.text} size={28}/>
        </div>
        <div>
            <p className="text-md text-gray-500">{label}</p>
            <p className="text-3xl font-bold text-gray-800">{value}</p>
        </div>
    </Card>
);

const AnnouncementItem: React.FC<AnnouncementItemProps> = ({ title, date, borderColor }) => (
    <li className={`border-l-4 pl-4 py-2 ${borderColor}`}>
        <p className="font-semibold text-gray-800">{title}</p>
        <p className="text-sm text-gray-500">{date}</p>
    </li>
);

const DashboardView = () => (
    <>
        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <InfoCard icon={GraduationCap} label="IPK" value={ringkasanAkademik.ipk} colorClass={{bg: 'bg-blue-100', text: 'text-blue-600'}} />
            <InfoCard icon={Wallet} label="Status Keuangan" value={ringkasanAkademik.statusKeuangan} colorClass={{bg: 'bg-green-100', text: 'text-green-600'}} />
            <InfoCard icon={BookCopy} label="SKS Ditempuh" value={ringkasanAkademik.sksDitempuh} colorClass={{bg: 'bg-yellow-100', text: 'text-yellow-600'}} />
        </div>
        {/* Chart & Pengumuman */}
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

export default DashboardView;