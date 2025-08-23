// program/next-js/components/fragments/dosen/BimbinganAkademikView.tsx
'use client'

import React, { useState } from 'react';
import Card from '@/components/elements/Card';
import Button from '@/components/elements/Button';
import StatusBadge from '@/components/elements/StatusBadge';
import ConfirmationModal from '@/components/fragments/Modal/ConfirmationModal';
import { useBimbinganAkademik, MahasiswaBimbingan } from '@/hooks/useBimbinganAkademik';
import { AlertCircle } from 'lucide-react';
import type { KrsData } from '@/types';

// Tipe data untuk mahasiswa yang dipilih di modal
interface SelectedMahasiswaInfo {
    mahasiswa: MahasiswaBimbingan;
    krsToValidate: KrsData[];
}

const BimbinganAkademikView = () => {
    // Gunakan hook untuk mendapatkan data dan fungsi dari backend
    const { mahasiswaList, isLoading, error, validateKrs } = useBimbinganAkademik();
    
    const [selectedMahasiswaInfo, setSelectedMahasiswaInfo] = useState<SelectedMahasiswaInfo | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Fungsi untuk membuka modal konfirmasi
    const handleOpenModal = (mahasiswa: MahasiswaBimbingan) => {
        // Filter KRS yang statusnya masih 'DIAJUKAN' untuk divalidasi
        const krsToValidate = mahasiswa.krs.filter(k => k.statusPersetujuan === 'DIAJUKAN');
        setSelectedMahasiswaInfo({ mahasiswa, krsToValidate });
        setIsModalOpen(true);
    };

    // Fungsi yang dijalankan saat dosen mengonfirmasi validasi
    const handleConfirmValidation = async () => {
        if (!selectedMahasiswaInfo) return;

        // Lakukan validasi untuk setiap KRS yang diajukan
        const validationPromises = selectedMahasiswaInfo.krsToValidate.map(krs => 
            validateKrs(krs.krsId, 'DISETUJUI')
        );

        await Promise.all(validationPromises);
        
        setIsModalOpen(false);
        setSelectedMahasiswaInfo(null);
    };
    
    // Fungsi untuk mendapatkan status KRS keseluruhan mahasiswa
    const getOverallKrsStatus = (krsList: KrsData[]): 'Disetujui' | 'Menunggu Persetujuan' | 'Belum Kontrak' => {
        if (!krsList || krsList.length === 0) {
            return 'Belum Kontrak';
        }
        if (krsList.some(k => k.statusPersetujuan === 'DIAJUKAN')) {
            return 'Menunggu Persetujuan';
        }
        return 'Disetujui';
    };

    if (isLoading) {
        return <Card><p className="text-center p-8">Memuat data mahasiswa bimbingan...</p></Card>;
    }

    if (error) {
        return <Card className="bg-red-50 border-red-200 text-red-700 p-4 flex items-center gap-3"><AlertCircle /><p>Error: {error}</p></Card>;
    }

    return (
        <>
            <ConfirmationModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={handleConfirmValidation}
                title="Validasi KRS Mahasiswa"
                message={`Apakah Anda yakin ingin menyetujui ${selectedMahasiswaInfo?.krsToValidate.length} mata kuliah untuk ${selectedMahasiswaInfo?.mahasiswa.namaLengkap}?`}
            />
            <Card>
                <h3 className="text-xl font-bold text-gray-800 mb-4">Validasi KRS Mahasiswa Bimbingan</h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                <th className="px-6 py-3">Mahasiswa</th>
                                <th className="px-6 py-3">NIM</th>
                                <th className="px-6 py-3 text-center">Status KRS</th>
                                <th className="px-6 py-3 text-center">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {mahasiswaList.map((mhs) => {
                                const statusKrs = getOverallKrsStatus(mhs.krs);
                                return (
                                    <tr key={mhs.mahasiswaId} className="bg-white border-b hover:bg-gray-50">
                                        <td className="px-6 py-4 font-medium text-gray-900">
                                            <div className="flex items-center gap-3">
                                                <img src={mhs.fotoProfil} alt={mhs.namaLengkap} className="w-10 h-10 rounded-full" />
                                                <div>
                                                    <p className="font-semibold">{mhs.namaLengkap}</p>
                                                    <p className="text-xs text-gray-500">{mhs.namaJurusan}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">{mhs.nim}</td>
                                        <td className="px-6 py-4 text-center">
                                            <StatusBadge status={statusKrs} />
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            {statusKrs === 'Menunggu Persetujuan' && (
                                                <Button
                                                    className="!w-auto !py-1 !px-3 text-xs"
                                                    onClick={() => handleOpenModal(mhs)}
                                                >
                                                    Validasi KRS
                                                </Button>
                                            )}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </Card>
        </>
    );
};

export default BimbinganAkademikView;