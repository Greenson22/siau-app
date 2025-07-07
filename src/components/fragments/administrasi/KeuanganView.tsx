import Card from '@/components/elements/Card';
import Button from '@/components/elements/Button';

const KeuanganView = () => (
    <Card>
        <h3 className="text-xl font-bold text-gray-800 mb-4">Manajemen Keuangan</h3>
        <p className="text-gray-600">Fitur untuk melihat semua transaksi dan membuat laporan keuangan. [cite: 110, 111]</p>
        <div className="mt-4">
            <Button>Generate Laporan Keuangan</Button>
        </div>
    </Card>
);

export default KeuanganView;