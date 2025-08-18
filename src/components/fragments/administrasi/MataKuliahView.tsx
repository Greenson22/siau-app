'use client';

import React, { useState, useEffect } from 'react';
import Card from '@/components/elements/Card';
import Button from '@/components/elements/Button';
import Input from '@/components/elements/Input';
import Select from '@/components/elements/Select';
import { AlertCircle } from 'lucide-react';

// Interface untuk data dari API
interface MataKuliah {
    matkulId: number;
    kodeMatkul: string;
    namaMatkul: string;
    sks: number;
    namaJurusan: string;
}

interface Jurusan {
    jurusanId: number;
    namaJurusan: string;
}

const MataKuliahView = () => {
    // State untuk data
    const [mataKuliahList, setMataKuliahList] = useState<MataKuliah[]>([]);
    const [jurusanList, setJurusanList] = useState<Jurusan[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // State untuk form
    const [kodeMatkul, setKodeMatkul] = useState('');
    const [namaMatkul, setNamaMatkul] = useState('');
    const [sks, setSks] = useState('');
    const [jurusanId, setJurusanId] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formError, setFormError] = useState<string | null>(null);

    // Efek untuk mengambil data awal (mata kuliah & jurusan)
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const token = localStorage.getItem('authToken');
                const headers = { 'Authorization': `Bearer ${token}` };

                const [matkulRes, jurusanRes] = await Promise.all([
                    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/mata-kuliah`, { headers }),
                    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/jurusan`, { headers }),
                ]);

                if (!matkulRes.ok || !jurusanRes.ok) {
                    throw new Error('Gagal mengambil data dari server.');
                }

                const matkulData = await matkulRes.json();
                const jurusanData = await jurusanRes.json();

                setMataKuliahList(matkulData);
                setJurusanList(jurusanData);
                if (jurusanData.length > 0) {
                    setJurusanId(jurusanData[0].jurusanId.toString());
                }

            } catch (e: any) {
                setError(e.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    // Handler untuk submit form
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setFormError(null);

        try {
            const token = localStorage.getItem('authToken');
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/mata-kuliah`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    kodeMatkul,
                    namaMatkul,
                    sks: parseInt(sks),
                    jurusanId: parseInt(jurusanId),
                }),
            });

            const newData = await response.json();

            if (!response.ok) {
                throw new Error(newData.message || 'Gagal menambahkan mata kuliah.');
            }
            
            setMataKuliahList(prev => [...prev, newData]);
            setKodeMatkul('');
            setNamaMatkul('');
            setSks('');

        } catch (e: any) {
            setFormError(e.message);
        } finally {
            setIsSubmitting(false);
        }
    };
    
    if (isLoading) return <Card><p>Memuat data mata kuliah...</p></Card>;
    if (error) return <Card className="bg-red-50 border-red-200 text-red-700 p-4 flex items-center gap-3"><AlertCircle /><p>Error: {error}</p></Card>;

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form Tambah */}
            <div className="lg:col-span-1">
                <Card>
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Tambah Mata Kuliah 📚</h3>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <Input id="kodeMatkul" label="Kode MK" value={kodeMatkul} onChange={e => setKodeMatkul(e.target.value)} required placeholder="e.g., TEO101" />
                        <Input id="namaMatkul" label="Nama Mata Kuliah" value={namaMatkul} onChange={e => setNamaMatkul(e.target.value)} required placeholder="e.g., Pengantar Teologi" />
                        <Input id="sks" label="Jumlah SKS" type="number" value={sks} onChange={e => setSks(e.target.value)} required placeholder="e.g., 3" />
                        <Select
                            id="jurusan"
                            label="Jurusan Terkait"
                            options={jurusanList.map(j => ({ value: j.jurusanId.toString(), label: j.namaJurusan }))}
                            value={jurusanId}
                            onChange={e => setJurusanId(e.target.value)}
                            required
                        />
                        <div className="pt-2">
                            <Button type="submit" isLoading={isSubmitting} className="w-full">
                                Simpan Mata Kuliah
                            </Button>
                        </div>
                        {formError && <p className="text-sm text-red-600 mt-2 text-center">{formError}</p>}
                    </form>
                </Card>
            </div>

            {/* Daftar Mata Kuliah */}
            <div className="lg:col-span-2">
                <Card>
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Daftar Mata Kuliah Terdaftar</h3>
                    <div className="overflow-x-auto max-h-[600px] overflow-y-auto">
                        <table className="w-full text-sm text-left text-gray-500">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 sticky top-0">
                                <tr>
                                    <th className="px-6 py-3">Kode</th>
                                    <th className="px-6 py-3">Nama Mata Kuliah</th>
                                    <th className="px-6 py-3 text-center">SKS</th>
                                    <th className="px-6 py-3">Jurusan</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y">
                                {mataKuliahList.map((mk) => (
                                    <tr key={mk.matkulId} className="bg-white hover:bg-gray-50">
                                        <td className="px-6 py-4 font-mono">{mk.kodeMatkul}</td>
                                        <td className="px-6 py-4 font-medium text-gray-900">{mk.namaMatkul}</td>
                                        <td className="px-6 py-4 text-center">{mk.sks}</td>
                                        <td className="px-6 py-4">{mk.namaJurusan}</td>
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

export default MataKuliahView;