'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Card from '@/components/elements/Card';
import Button from '@/components/elements/Button';
import Input from '@/components/elements/Input';
import Select from '@/components/elements/Select';
import Modal from '@/components/fragments/Modal/Modal';
import { AlertCircle, Search, ChevronLeft, ChevronRight, Edit } from 'lucide-react';

// --- Interface ---
interface Dosen {
    dosenId: number;
    nidn: string;
    namaLengkap: string;
    namaJurusan: string;
    spesialisasi: string;
}

// DTO untuk update biodata, sesuai dengan backend
interface DosenBiodataUpdateDTO {
    alamat: string;
    nomorTelepon: string;
    emailPribadi: string;
    spesialisasi: string;
}

interface Jurusan {
    jurusanId: number;
    namaJurusan: string;
}

interface Page<T> {
    content: T[];
    totalPages: number;
    totalElements: number;
    number: number;
}

const DosenManagementView = () => {
    // --- State ---
    const [dosenPage, setDosenPage] = useState<Page<Dosen> | null>(null);
    const [jurusanList, setJurusanList] = useState<Jurusan[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Filter & Paginasi
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedJurusan, setSelectedJurusan] = useState('');
    const [currentPage, setCurrentPage] = useState(0);

    // State untuk modal edit
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedDosen, setSelectedDosen] = useState<Dosen | null>(null);
    const [biodata, setBiodata] = useState<DosenBiodataUpdateDTO>({
        alamat: '',
        nomorTelepon: '',
        emailPribadi: '',
        spesialisasi: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formError, setFormError] = useState<string | null>(null);

    const jurusanOptions = useMemo(() => [
        { value: '', label: 'Semua Jurusan' },
        ...jurusanList.map(j => ({ value: j.jurusanId.toString(), label: j.namaJurusan }))
    ], [jurusanList]);

    // --- Efek untuk Fetch Data Awal (Jurusan) ---
    useEffect(() => {
        const fetchJurusan = async () => {
             try {
                const token = localStorage.getItem('authToken');
                const jurusanRes = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/jurusan`, {
                    headers: { 'Authorization': `Bearer ${token}` },
                });
                if (!jurusanRes.ok) throw new Error('Gagal memuat daftar jurusan.');
                const jurusanData = await jurusanRes.json();
                setJurusanList(jurusanData);
            } catch (e: any) {
                setError(e.message);
            }
        };
        fetchJurusan();
    }, []);

    // --- Efek untuk Fetch Data Dosen (dengan filter & paginasi) ---
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const token = localStorage.getItem('authToken');
                const params = new URLSearchParams({
                    page: currentPage.toString(),
                    limit: '10',
                    search: searchTerm,
                    jurusan_id: selectedJurusan,
                });

                const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/dosen?${params.toString()}`, {
                    headers: { 'Authorization': `Bearer ${token}` },
                });

                if (!response.ok) {
                    throw new Error('Gagal mengambil data dosen.');
                }
                const data = await response.json();
                setDosenPage(data);
            } catch (e: any) {
                setError(e.message);
            } finally {
                setIsLoading(false);
            }
        };
        const timer = setTimeout(() => {
            fetchData();
        }, 300);
        return () => clearTimeout(timer);
    }, [currentPage, searchTerm, selectedJurusan]);

    // --- Handler untuk Modal ---
    const handleEditClick = (dosen: Dosen) => {
        setSelectedDosen(dosen);
        setBiodata({ // Reset state dan isi dengan data yang ada jika perlu
            alamat: '',
            nomorTelepon: '',
            emailPribadi: '',
            spesialisasi: dosen.spesialisasi || '',
        });
        setIsEditModalOpen(true);
        setFormError(null);
    };

    const handleUpdateBiodata = async () => {
        if (!selectedDosen) return;
        setIsSubmitting(true);
        setFormError(null);
        try {
            const token = localStorage.getItem('authToken');
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/dosen/${selectedDosen.dosenId}/biodata`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(biodata),
            });

            if (!response.ok) {
                throw new Error('Gagal memperbarui biodata dosen.');
            }
            
            setIsEditModalOpen(false);
            // Refresh data untuk melihat perubahan
            setCurrentPage(0); 
            setSearchTerm('');

        } catch (e: any) {
            setFormError(e.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setBiodata(prev => ({ ...prev, [name]: value }));
    };

    if (error) {
        return <Card className="bg-red-50 border-red-200 text-red-700 p-4 flex items-center gap-3"><AlertCircle /><p>Error: {error}</p></Card>;
    }

    return (
        <>
            <Modal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                onConfirm={handleUpdateBiodata}
                title={`Edit Biodata ${selectedDosen?.namaLengkap || ''}`}
            >
                <div className="space-y-4 my-4">
                    <Input id="alamat" name="alamat" label="Alamat" value={biodata.alamat} onChange={handleInputChange} />
                    <Input id="nomorTelepon" name="nomorTelepon" label="No. Telepon" value={biodata.nomorTelepon} onChange={handleInputChange} />
                    <Input id="emailPribadi" name="emailPribadi" label="Email Pribadi" type="email" value={biodata.emailPribadi} onChange={handleInputChange} />
                    <Input id="spesialisasi" name="spesialisasi" label="Bidang Spesialisasi" value={biodata.spesialisasi} onChange={handleInputChange} />
                    {formError && <p className="text-sm text-red-600">{formError}</p>}
                </div>
            </Modal>

            <Card>
                <h3 className="text-xl font-bold text-gray-800 mb-4">Melihat & Mencari Data Dosen 👨‍🏫</h3>
                
                {/* Filter */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="md:col-span-2 relative">
                        <Input id="searchDosen" label="" placeholder="Cari berdasarkan Nama atau NIDN..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
                        <Search className="absolute top-9 right-3 text-gray-400" size={20}/>
                    </div>
                    <Select id="jurusanFilterDosen" label="" options={jurusanOptions} value={selectedJurusan} onChange={e => setSelectedJurusan(e.target.value)} />
                </div>

                {/* Tabel */}
                {isLoading && !dosenPage ? <p>Memuat data dosen...</p> : (
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                <th className="px-6 py-3">NIDN</th>
                                <th className="px-6 py-3">Nama Lengkap</th>
                                <th className="px-6 py-3">Jurusan</th>
                                <th className="px-6 py-3">Spesialisasi</th>
                                <th className="px-6 py-3 text-center">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dosenPage?.content.map((dosen) => (
                                <tr key={dosen.dosenId} className="bg-white border-b hover:bg-gray-50">
                                    <td className="px-6 py-4 font-mono">{dosen.nidn}</td>
                                    <td className="px-6 py-4 font-medium text-gray-900">{dosen.namaLengkap}</td>
                                    <td className="px-6 py-4">{dosen.namaJurusan}</td>
                                    <td className="px-6 py-4">{dosen.spesialisasi || '-'}</td>
                                    <td className="px-6 py-4 text-center">
                                        <Button variant="ghost" className="!p-2" onClick={() => handleEditClick(dosen)}>
                                            <Edit size={16} />
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                )}

                {/* Paginasi */}
                <div className="flex justify-between items-center mt-6">
                    <span className="text-sm text-gray-600">
                        Menampilkan {dosenPage?.content.length || 0} dari {dosenPage?.totalElements || 0} data
                    </span>
                    <div className="flex items-center gap-2">
                        <Button onClick={() => setCurrentPage(p => p - 1)} disabled={currentPage === 0 || isLoading} variant="secondary" className="!px-3 !py-1.5">
                            <ChevronLeft size={16} className="mr-1"/> Sebelumnya
                        </Button>
                        <span className="text-sm font-medium text-gray-700">
                           Halaman {dosenPage ? dosenPage.number + 1 : 0} dari {dosenPage?.totalPages || 0}
                        </span>
                        <Button onClick={() => setCurrentPage(p => p + 1)} disabled={currentPage >= (dosenPage?.totalPages || 1) - 1 || isLoading} variant="secondary" className="!px-3 !py-1.5">
                           Berikutnya <ChevronRight size={16} className="ml-1"/>
                        </Button>
                    </div>
                </div>
            </Card>
        </>
    );
};

export default DosenManagementView;