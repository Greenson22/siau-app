'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Card from '@/components/elements/Card';
import Button from '@/components/elements/Button';
import Input from '@/components/elements/Input';
import Select from '@/components/elements/Select';
import { AlertCircle, Plus, X } from 'lucide-react';

// --- Interface untuk Data dari API ---
interface Mahasiswa {
    mahasiswaId: number;
    nim: string;
    namaLengkap: string;
}

interface KomponenBiaya {
    komponenId: number;
    namaKomponen: string;
}

interface Tagihan {
    tagihanId: number;
    namaMahasiswa: string;
    deskripsiTagihan: string;
    totalTagihan: number;
    tanggalJatuhTempo: string;
    status: string;
}

// BARU: Interface untuk data pembayaran
interface Pembayaran {
    pembayaranId: number;
    namaMahasiswa: string;
    deskripsiTagihan: string;
    jumlahBayar: number;
    tanggalBayar: string;
    statusVerifikasi: string; // PENDING, BERHASIL, GAGAL
}

interface RincianInput {
    komponenId: string;
    jumlah: string;
    keterangan: string;
}

const KeuanganView = () => {
    // --- State untuk Data dari API ---
    const [mahasiswaList, setMahasiswaList] = useState<Mahasiswa[]>([]);
    const [komponenList, setKomponenList] = useState<KomponenBiaya[]>([]);
    const [tagihanList, setTagihanList] = useState<Tagihan[]>([]);
    const [pembayaranList, setPembayaranList] = useState<Pembayaran[]>([]); // <-- State baru
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // --- State untuk Form ---
    const [selectedMahasiswa, setSelectedMahasiswa] = useState('');
    const [deskripsiTagihan, setDeskripsiTagihan] = useState('');
    const [tanggalJatuhTempo, setTanggalJatuhTempo] = useState('');
    const [rincian, setRincian] = useState<RincianInput[]>([
        { komponenId: '', jumlah: '', keterangan: '' },
    ]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formError, setFormError] = useState<string | null>(null);

    // Fetch data awal
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const token = localStorage.getItem('authToken');
                const headers = { 'Authorization': `Bearer ${token}` };

                const [mhsRes, kompRes, tagihanRes, pembayaranRes] = await Promise.all([
                    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/mahasiswa`, { headers }),
                    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/komponen-biaya`, { headers }),
                    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/tagihan`, { headers }),
                    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/pembayaran`, { headers }), // <-- Fetch pembayaran
                ]);

                if (!mhsRes.ok || !kompRes.ok || !tagihanRes.ok || !pembayaranRes.ok) {
                    throw new Error('Gagal mengambil data keuangan dari server.');
                }

                const mhsData = await mhsRes.json();
                const kompData = await kompRes.json();
                const tagihanData = await tagihanRes.json();
                const pembayaranData = await pembayaranRes.json(); // <-- Ambil data pembayaran

                setMahasiswaList(mhsData.content);
                setKomponenList(kompData);
                setTagihanList(tagihanData);
                setPembayaranList(pembayaranData); // <-- Set state pembayaran

            } catch (e: any) {
                setError(e.message);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    // ... (Handler-handler lain tidak berubah) ...
    const handleRincianChange = (index: number, field: keyof RincianInput, value: string) => {
        const newRincian = [...rincian];
        newRincian[index][field] = value;
        setRincian(newRincian);
    };

    const addRincian = () => {
        setRincian([...rincian, { komponenId: '', jumlah: '', keterangan: '' }]);
    };

    const removeRincian = (index: number) => {
        const newRincian = rincian.filter((_, i) => i !== index);
        setRincian(newRincian);
    };
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setFormError(null);

        try {
            const token = localStorage.getItem('authToken');
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/tagihan`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    mahasiswaId: parseInt(selectedMahasiswa),
                    deskripsiTagihan,
                    tanggalJatuhTempo,
                    rincian: rincian.map(r => ({
                        ...r,
                        komponenId: parseInt(r.komponenId),
                        jumlah: parseFloat(r.jumlah),
                    })),
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Gagal membuat tagihan baru.');
            }

            const newTagihan = await response.json();
            setTagihanList(prev => [newTagihan, ...prev]);

            // Reset form
            setSelectedMahasiswa('');
            setDeskripsiTagihan('');
            setTanggalJatuhTempo('');
            setRincian([{ komponenId: '', jumlah: '', keterangan: '' }]);

        } catch (e: any) {
            setFormError(e.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        });
    };
    
    const formatDateTime = (dateString: string) => {
        return new Date(dateString).toLocaleString('id-ID', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const totalTagihan = useMemo(() => {
        return rincian.reduce((total, item) => total + (parseFloat(item.jumlah) || 0), 0);
    }, [rincian]);
    
    const getStatusVerifikasiClass = (status: string) => {
        switch (status) {
            case 'BERHASIL':
                return 'bg-green-100 text-green-800';
            case 'PENDING':
                return 'bg-yellow-100 text-yellow-800';
            case 'GAGAL':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };


    if (isLoading) return <p>Memuat data keuangan...</p>;
    if (error) return <p className="text-red-500">Error: {error}</p>;

    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Form Buat Tagihan */}
                <div className="lg:col-span-1">
                    <Card>
                        <h3 className="text-xl font-bold text-gray-800 mb-6">Buat Tagihan Baru</h3>
                        {/* ... (kode form tidak berubah) ... */}
                        <form onSubmit={handleSubmit} className="space-y-4">
                        <Select
                            id="mahasiswa"
                            label="Pilih Mahasiswa"
                            options={mahasiswaList.map(m => ({ value: m.mahasiswaId.toString(), label: `${m.nim} - ${m.namaLengkap}` }))}
                            value={selectedMahasiswa}
                            onChange={e => setSelectedMahasiswa(e.target.value)}
                            required
                        />
                        <Input id="deskripsi" label="Deskripsi Tagihan" value={deskripsiTagihan} onChange={e => setDeskripsiTagihan(e.target.value)} required />
                        <Input id="jatuhTempo" label="Tanggal Jatuh Tempo" type="date" value={tanggalJatuhTempo} onChange={e => setTanggalJatuhTempo(e.target.value)} required />

                        <hr className="my-4" />
                        <h4 className="font-semibold">Rincian Tagihan</h4>
                        {rincian.map((item, index) => (
                            <div key={index} className="p-3 border rounded-md space-y-3 relative">
                                {rincian.length > 1 && (
                                    <Button variant="ghost" className="!p-1 absolute top-1 right-1" onClick={() => removeRincian(index)}>
                                        <X size={14} />
                                    </Button>
                                )}
                                <Select
                                    id={`komponen-${index}`}
                                    label="Komponen Biaya"
                                    options={komponenList.map(k => ({ value: k.komponenId.toString(), label: k.namaKomponen }))}
                                    value={item.komponenId}
                                    onChange={e => handleRincianChange(index, 'komponenId', e.target.value)}
                                    required
                                />
                                <Input id={`jumlah-${index}`} label="Jumlah (Rp)" type="number" value={item.jumlah} onChange={e => handleRincianChange(index, 'jumlah', e.target.value)} required />
                                <Input id={`keterangan-${index}`} label="Keterangan (Opsional)" value={item.keterangan} onChange={e => handleRincianChange(index, 'keterangan', e.target.value)} />
                            </div>
                        ))}
                        <Button variant="secondary" onClick={addRincian} className="w-full !text-sm">
                            <Plus size={16} className="mr-2" /> Tambah Rincian
                        </Button>
                        
                        <div className="pt-4 space-y-3">
                            <div className="flex justify-between font-bold text-lg">
                                <span>Total:</span>
                                <span>Rp {totalTagihan.toLocaleString('id-ID')}</span>
                            </div>
                             {formError && <p className="text-sm text-red-600 text-center">{formError}</p>}
                            <Button type="submit" isLoading={isSubmitting} className="w-full">
                                Terbitkan Tagihan
                            </Button>
                        </div>
                    </form>
                    </Card>
                </div>

                {/* Daftar Tagihan */}
                <div className="lg:col-span-2">
                    <Card>
                        <h3 className="text-xl font-bold text-gray-800 mb-4">Riwayat Tagihan Seluruh Mahasiswa</h3>
                         {/* ... (kode tabel tagihan tidak berubah) ... */}
                         <div className="overflow-x-auto max-h-[600px] overflow-y-auto">
                        <table className="w-full text-sm text-left text-gray-500">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 sticky top-0">
                                <tr>
                                    <th className="px-6 py-3">Mahasiswa</th>
                                    <th className="px-6 py-3">Deskripsi</th>
                                    <th className="px-6 py-3">Jumlah</th>
                                    <th className="px-6 py-3">Jatuh Tempo</th>
                                    <th className="px-6 py-3 text-center">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y">
                                {tagihanList.map(tagihan => (
                                    <tr key={tagihan.tagihanId} className="bg-white hover:bg-gray-50">
                                        <td className="px-6 py-4 font-medium text-gray-900">{tagihan.namaMahasiswa}</td>
                                        <td className="px-6 py-4">{tagihan.deskripsiTagihan}</td>
                                        <td className="px-6 py-4">Rp {tagihan.totalTagihan.toLocaleString('id-ID')}</td>
                                        <td className="px-6 py-4">{formatDate(tagihan.tanggalJatuhTempo)}</td>
                                        <td className="px-6 py-4 text-center">
                                            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                                                tagihan.status === 'LUNAS' 
                                                    ? 'bg-green-100 text-green-800' 
                                                    : 'bg-red-100 text-red-800'
                                            }`}>
                                                {tagihan.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    </Card>
                </div>
            </div>

            {/* BARU: Kartu untuk Riwayat Pembayaran */}
            <Card>
                <h3 className="text-xl font-bold text-gray-800 mb-4">Riwayat Pembayaran Masuk</h3>
                <div className="overflow-x-auto max-h-[600px] overflow-y-auto">
                    <table className="w-full text-sm text-left text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 sticky top-0">
                            <tr>
                                <th className="px-6 py-3">Tanggal Bayar</th>
                                <th className="px-6 py-3">Mahasiswa</th>
                                <th className="px-6 py-3">Deskripsi Tagihan</th>
                                <th className="px-6 py-3">Jumlah Bayar</th>
                                <th className="px-6 py-3 text-center">Status Verifikasi</th>
                                <th className="px-6 py-3 text-center">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {pembayaranList.map(p => (
                                <tr key={p.pembayaranId} className="bg-white hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">{formatDateTime(p.tanggalBayar)}</td>
                                    <td className="px-6 py-4 font-medium text-gray-900">{p.namaMahasiswa}</td>
                                    <td className="px-6 py-4">{p.deskripsiTagihan}</td>
                                    <td className="px-6 py-4">Rp {p.jumlahBayar.toLocaleString('id-ID')}</td>
                                    <td className="px-6 py-4 text-center">
                                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusVerifikasiClass(p.statusVerifikasi)}`}>
                                            {p.statusVerifikasi}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        {p.statusVerifikasi === 'PENDING' && (
                                            <Button variant="primary" className="!text-xs !py-1 !px-2">
                                                Verifikasi
                                            </Button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
};

export default KeuanganView;