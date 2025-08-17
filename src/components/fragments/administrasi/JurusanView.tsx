// program/next-js/components/fragments/administrasi/JurusanView.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Card from '@/components/elements/Card';
import Button from '@/components/elements/Button';
import Input from '@/components/elements/Input';
import Modal from '@/components/fragments/Modal/Modal'; // Impor komponen Modal
import { AlertCircle, Pencil } from 'lucide-react';

// Interface untuk data Jurusan dari API
interface Jurusan {
    jurusanId: number;
    namaJurusan: string;
    fakultas: string;
}

const JurusanView = () => {
    // State untuk menyimpan data, loading, dan error
    const [jurusanList, setJurusanList] = useState<Jurusan[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // State untuk form tambah jurusan
    const [namaJurusan, setNamaJurusan] = useState('');
    const [fakultas, setFakultas] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formError, setFormError] = useState<string | null>(null);

    // State untuk modal edit
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingJurusan, setEditingJurusan] = useState<Jurusan | null>(null);
    const [editNamaJurusan, setEditNamaJurusan] = useState('');
    const [editFakultas, setEditFakultas] = useState('');

    // Efek untuk mengambil data jurusan saat komponen dimuat
    useEffect(() => {
        const fetchJurusan = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const token = localStorage.getItem('authToken');
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/jurusan`, {
                    headers: { 'Authorization': `Bearer ${token}` },
                });

                if (!response.ok) {
                    throw new Error('Gagal mengambil data jurusan.');
                }
                const data = await response.json();
                setJurusanList(data);
            } catch (e: any) {
                setError(e.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchJurusan();
    }, []);

    // Handler untuk membuka modal edit
    const handleEditClick = (jurusan: Jurusan) => {
        setEditingJurusan(jurusan);
        setEditNamaJurusan(jurusan.namaJurusan);
        setEditFakultas(jurusan.fakultas);
        setIsEditModalOpen(true);
    };

    // Handler untuk submit form tambah jurusan
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setFormError(null);

        try {
            const token = localStorage.getItem('authToken');
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/jurusan`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ namaJurusan, fakultas }),
            });

            const newData = await response.json();

            if (!response.ok) {
                throw new Error(newData.message || 'Gagal menambahkan jurusan baru.');
            }

            // Tambahkan data baru ke state dan reset form
            setJurusanList(prevList => [...prevList, newData]);
            setNamaJurusan('');
            setFakultas('');

        } catch (e: any) {
            setFormError(e.message);
        } finally {
            setIsSubmitting(false);
        }
    };
    
    // Handler untuk submit form edit jurusan
    const handleUpdate = async () => {
        if (!editingJurusan) return;

        setIsSubmitting(true);
        setFormError(null);

        try {
            const token = localStorage.getItem('authToken');
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/jurusan/${editingJurusan.jurusanId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ namaJurusan: editNamaJurusan, fakultas: editFakultas }),
            });
            
            const updatedData = await response.json();

            if (!response.ok) {
                throw new Error(updatedData.message || 'Gagal memperbarui jurusan.');
            }

            // Perbarui state, tutup modal, dan reset form edit
            setJurusanList(jurusanList.map(j => (j.jurusanId === editingJurusan.jurusanId ? updatedData : j)));
            setIsEditModalOpen(false);
            setEditingJurusan(null);

        } catch (e: any) {
            setFormError(e.message);
        } finally {
            setIsSubmitting(false);
        }
    };


    if (isLoading) {
        return <Card><p>Memuat data jurusan...</p></Card>;
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
        <>
            {/* Modal untuk Edit Jurusan */}
            <Modal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                onConfirm={handleUpdate}
                title="Edit Jurusan"
            >
                <div className="space-y-4">
                     <Input 
                        id="editNamaJurusan" 
                        label="Nama Jurusan" 
                        value={editNamaJurusan} 
                        onChange={e => setEditNamaJurusan(e.target.value)} 
                        required 
                    />
                    <Input 
                        id="editFakultas" 
                        label="Fakultas" 
                        value={editFakultas} 
                        onChange={e => setEditFakultas(e.target.value)} 
                        required 
                    />
                    {formError && <p className="text-sm text-red-600 mt-2">{formError}</p>}
                </div>
            </Modal>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Kolom Kiri: Form Tambah Jurusan */}
                <div className="lg:col-span-1">
                    <Card>
                        <h3 className="text-xl font-bold text-gray-800 mb-4">Tambah Jurusan Baru</h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <Input 
                                id="namaJurusan" 
                                label="Nama Jurusan" 
                                value={namaJurusan} 
                                onChange={e => setNamaJurusan(e.target.value)} 
                                required 
                                placeholder="Contoh: S1 Teologi"
                            />
                            <Input 
                                id="fakultas" 
                                label="Fakultas" 
                                value={fakultas} 
                                onChange={e => setFakultas(e.target.value)} 
                                required 
                                placeholder="Contoh: Fakultas Teologi"
                            />
                            <div className="pt-2">
                                <Button type="submit" isLoading={isSubmitting} className="w-full">
                                    Simpan Jurusan
                                </Button>
                            </div>
                            {formError && <p className="text-sm text-red-600 mt-2 text-center">{formError}</p>}
                        </form>
                    </Card>
                </div>

                {/* Kolom Kanan: Daftar Jurusan */}
                <div className="lg:col-span-2">
                    <Card>
                        <h3 className="text-xl font-bold text-gray-800 mb-4">Daftar Jurusan</h3>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left text-gray-500">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3">ID</th>
                                        <th className="px-6 py-3">Nama Jurusan</th>
                                        <th className="px-6 py-3">Fakultas</th>
                                        <th className="px-6 py-3 text-center">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {jurusanList.map((jurusan) => (
                                        <tr key={jurusan.jurusanId} className="bg-white border-b hover:bg-gray-50">
                                            <td className="px-6 py-4">{jurusan.jurusanId}</td>
                                            <td className="px-6 py-4 font-medium text-gray-900">{jurusan.namaJurusan}</td>
                                            <td className="px-6 py-4">{jurusan.fakultas}</td>
                                            <td className="px-6 py-4 text-center">
                                                <Button 
                                                    variant="ghost" 
                                                    className="!p-2"
                                                    onClick={() => handleEditClick(jurusan)}
                                                >
                                                    <Pencil size={16} />
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </Card>
                </div>
            </div>
        </>
    );
};

export default JurusanView;