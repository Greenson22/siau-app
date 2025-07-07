import Card from '@/components/elements/Card';
import Button from '@/components/elements/Button';

const pendaftarBaru = [
    { id: 1, nama: 'Calon Mahasiswa A', tanggal: '2025-07-01', status: 'Belum Divalidasi' },
    { id: 2, nama: 'Calon Mahasiswa B', tanggal: '2025-07-02', status: 'Sudah Divalidasi' },
    { id: 3, nama: 'Calon Mahasiswa C', tanggal: '2025-07-03', status: 'Belum Divalidasi' },
];

const PendaftaranView = () => (
    <Card>
        <h3 className="text-xl font-bold text-gray-800 mb-4">Manajemen Pendaftaran Baru</h3>
        <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                        <th className="px-6 py-3">Nama Pendaftar</th>
                        <th className="px-6 py-3">Tanggal Daftar</th>
                        <th className="px-6 py-3">Status Pembayaran</th>
                        <th className="px-6 py-3 text-center">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {pendaftarBaru.map((p) => (
                        <tr key={p.id} className="bg-white border-b">
                            <td className="px-6 py-4 font-medium">{p.nama}</td>
                            <td className="px-6 py-4">{p.tanggal}</td>
                            <td className="px-6 py-4">{p.status}</td>
                            <td className="px-6 py-4 text-center">
                                {p.status === 'Belum Divalidasi' && (
                                    <Button className="!text-xs">Validasi & Generate NIM</Button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </Card>
);

export default PendaftaranView;