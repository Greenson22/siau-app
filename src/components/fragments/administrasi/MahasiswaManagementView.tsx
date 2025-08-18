'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Card from '@/components/elements/Card';
import Button from '@/components/elements/Button';
import Input from '@/components/elements/Input';
import Select from '@/components/elements/Select';
import Modal from '@/components/fragments/Modal/Modal';
import { AlertCircle, Search, ChevronLeft, ChevronRight, Edit } from 'lucide-react';

// --- Interface ---
interface Mahasiswa {
    mahasiswaId: number;
    nim: string;
    namaLengkap: string;
    status: string;
    namaJurusan: string;
    namaDosenPA: string;
}

interface Jurusan {
    jurusanId: number;
    namaJurusan: string;
}

interface Page<T> {
    content: T[];
    totalPages: number;
    totalElements: number;
    number: number; // Current page number
}

// Interface untuk DTO update biodata
interface BiodataUpdateDTO {
    alamat: string;
    nomorTelepon: string;
    emailPribadi: string;
    kontakDarurat: string;
    jenisKelamin: string;
}

const MahasiswaManagementView = () => {
    // --- State ---
    const [mahasiswaPage, setMahasiswaPage] = useState<Page<Mahasiswa> | null>(null);
    const [jurusanList, setJurusanList] = useState<Jurusan[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Filter & Paginasi
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedJurusan, setSelectedJurusan] = useState('');
    const [currentPage, setCurrentPage] = useState(0);

    // State baru untuk modal edit
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedMahasiswa, setSelectedMahasiswa] = useState<Mahasiswa | null>(null);
    const [biodata, setBiodata] = useState<BiodataUpdateDTO>({
        alamat: '',
        nomorTelepon: '',
        emailPribadi: '',
        kontakDarurat: '',
        jenisKelamin: 'Laki-laki',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formError, setFormError] = useState<string | null>(null);

    const jurusanOptions = useMemo(() => [
        { value: '', label: 'Semua Jurusan' },
        ...jurusanList.map(j => ({ value: j.jurusanId.toString(), label: j.namaJurusan }))
    ], [jurusanList]);

    // --- Efek untuk Fetch Data ---
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

                const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/mahasiswa?${params.toString()}`, {
                    headers: { 'Authorization': `Bearer ${token}` },
                });

                if (!response.ok) {
                    throw new Error('Gagal mengambil data mahasiswa.');
                }
                const data = await response.json();
                setMahasiswaPage(data);
            } catch (e: any) {
                setError(e.message);
            } finally {
                setIsLoading(false);
            }
        };
        const timer = setTimeout(() => {
            fetchData();
        }, 300); // Debounce to avoid rapid API calls while typing
        return () => clearTimeout(timer);
    }, [currentPage, searchTerm, selectedJurusan]);

    // --- Handler untuk modal ---
    const handleEditClick = (mahasiswa: Mahasiswa) => {
        setSelectedMahasiswa(mahasiswa);
        setBiodata({ // Reset state before opening
            alamat: '',
            nomorTelepon: '',
            emailPribadi: '',
            kontakDarurat: '',
            jenisKelamin: 'Laki-laki',
        });
        setIsEditModalOpen(true);
        setFormError(null);
    };

    const handleUpdateBiodata = async () => {
        if (!selectedMahasiswa) return;

        setIsSubmitting(true);
        setFormError(null);
        try {
            const token = localStorage.getItem('authToken');
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/mahasiswa/${selectedMahasiswa.mahasiswaId}/biodata`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(biodata),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Gagal memperbarui biodata.');
            }

            setIsEditModalOpen(false);
            // Optional: Show a success toast notification here
            
        } catch (e: any) {
            setFormError(e.message);
        } finally {
            setIsSubmitting(false);
        }
    };
    
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setBiodata(prev => ({...prev, [name]: value}));
    };

    // --- Render ---
    if (error) {
        return <Card className="bg-red-50 border-red-200 text-red-700 p-4 flex items-center gap-3"><AlertCircle /><p>Error: {error}</p></Card>;
    }

    return (
        <>
            {/* Modal Edit Biodata */}
            <Modal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                onConfirm={handleUpdateBiodata}
                title={`Edit Biodata ${selectedMahasiswa?.namaLengkap || ''}`}
            >
                <div className="space-y-4 my-4">
                    <Input id="alamat" name="alamat" label="Alamat" value={biodata.alamat} onChange={handleInputChange} required />
                    <Input id="nomorTelepon" name="nomorTelepon" label="No. Telepon" value={biodata.nomorTelepon} onChange={handleInputChange} required />
                    <Input id="emailPribadi" name="emailPribadi" label="Email Pribadi" type="email" value={biodata.emailPribadi} onChange={handleInputChange} />
                    <Input id="kontakDarurat" name="kontakDarurat" label="Kontak Darurat" value={biodata.kontakDarurat} onChange={handleInputChange} />
                    <Select id="jenisKelamin" name="jenisKelamin" label="Jenis Kelamin" options={[{value: 'Laki-laki', label: 'Laki-laki'}, {value: 'Perempuan', label: 'Perempuan'}]} value={biodata.jenisKelamin} onChange={handleInputChange} />
                    {formError && <p className="text-sm text-red-600">{formError}</p>}
                </div>
            </Modal>

            <Card>
                <h3 className="text-xl font-bold text-gray-800 mb-4">Melihat & Mencari Data Mahasiswa 🔍</h3>
                
                {/* Filter */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="md:col-span-2 relative">
                        <Input id="search" label="" placeholder="Cari berdasarkan Nama atau NIM..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
                        <Search className="absolute top-9 right-3 text-gray-400" size={20}/>
                    </div>
                    <Select id="jurusanFilter" label="" options={jurusanOptions} value={selectedJurusan} onChange={e => setSelectedJurusan(e.target.value)} />
                </div>

                {/* Tabel */}
                {isLoading && !mahasiswaPage ? <p>Memuat data mahasiswa...</p> : (
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                <th className="px-6 py-3">NIM</th>
                                <th className="px-6 py-3">Nama Lengkap</th>
                                <th className="px-6 py-3">Jurusan</th>
                                <th className="px-6 py-3">Dosen PA</th>
                                <th className="px-6 py-3 text-center">Status</th>
                                <th className="px-6 py-3 text-center">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {mahasiswaPage?.content.map((mhs) => (
                                <tr key={mhs.mahasiswaId} className="bg-white border-b hover:bg-gray-50">
                                    <td className="px-6 py-4 font-mono">{mhs.nim}</td>
                                    <td className="px-6 py-4 font-medium text-gray-900">{mhs.namaLengkap}</td>
                                    <td className="px-6 py-4">{mhs.namaJurusan}</td>
                                    <td className="px-6 py-4">{mhs.namaDosenPA || '-'}</td>
                                    <td className="px-6 py-4 text-center">
                                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${mhs.status === 'AKTIF' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                            {mhs.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <Button variant="ghost" className="!p-2" onClick={() => handleEditClick(mhs)}>
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
                        Menampilkan {mahasiswaPage?.content.length || 0} dari {mahasiswaPage?.totalElements || 0} data
                    </span>
                    <div className="flex items-center gap-2">
                        <Button onClick={() => setCurrentPage(p => p - 1)} disabled={currentPage === 0 || isLoading} variant="secondary" className="!px-3 !py-1.5">
                            <ChevronLeft size={16} className="mr-1"/> Sebelumnya
                        </Button>
                        <span className="text-sm font-medium text-gray-700">
                           Halaman {mahasiswaPage ? mahasiswaPage.number + 1 : 0} dari {mahasiswaPage?.totalPages || 0}
                        </span>
                        <Button onClick={() => setCurrentPage(p => p + 1)} disabled={currentPage >= (mahasiswaPage?.totalPages || 1) - 1 || isLoading} variant="secondary" className="!px-3 !py-1.5">
                           Berikutnya <ChevronRight size={16} className="ml-1"/>
                        </Button>
                    </div>
                </div>
            </Card>
        </>
    );
};

export default MahasiswaManagementView;