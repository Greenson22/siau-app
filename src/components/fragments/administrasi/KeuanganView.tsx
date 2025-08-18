'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Card from '@/components/elements/Card';
import Button from '@/components/elements/Button';
import Input from '@/components/elements/Input';
import Select from '@/components/elements/Select';
import { AlertCircle, Plus, Trash2, X } from 'lucide-react';
import { Mahasiswa } from '@/types';

// Interface untuk data dari API
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

interface RincianInput {
    komponenId: string;
    jumlah: string;
    keterangan: string;
}

const KeuanganView = () => {
    // State untuk data dari API
    const [mahasiswaList, setMahasiswaList] = useState<Mahasiswa[]>([]);
    const [komponenList, setKomponenList] = useState<KomponenBiaya[]>([]);
    const [tagihanList, setTagihanList] = useState<Tagihan[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // State untuk form
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

                const [mhsRes, kompRes, tagihanRes] = await Promise.all([
                    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/mahasiswa`, { headers }),
                    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/komponen-biaya`, { headers }),
                    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/tagihan`, { headers }),
                ]);

                if (!mhsRes.ok || !kompRes.ok || !tagihanRes.ok) {
                    throw new Error('Gagal mengambil data keuangan dari server.');
                }

                const mhsData = await mhsRes.json();
                const kompData = await kompRes.json();
                const tagihanData = await tagihanRes.json();

                setMahasiswaList(mhsData.content);
                setKomponenList(kompData);
                setTagihanList(tagihanData);

            } catch (e: any) {
                setError(e.message);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    // Handler untuk form rincian
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

    // Handler untuk submit form
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

    const totalTagihan = useMemo(() => {
        return rincian.reduce((total, item) => total + (parseFloat(item.jumlah) || 0), 0);
    }, [rincian]);

    if (isLoading) return <p>Memuat...</p>;
    if (error) return <p className="text-red-500">Error: {error}</p>;

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form Buat Tagihan */}
            <div className="lg:col-span-1">
                <Card>
                    <h3 className="text-xl font-bold text-gray-800 mb-6">Buat Tagihan Baru</h3>
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
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Daftar Tagihan Mahasiswa</h3>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            {/* ... thead ... */}
                            <tbody>
                                {tagihanList.map(t => (
                                    <tr key={t.tagihanId} className="border-b">
                                        {/* ... td ... */}
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

export default KeuanganView;