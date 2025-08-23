// program/next-js/components/fragments/dosen/BimbinganAkademikView.tsx
'use client'

import React, { useState } from 'react';
import Card from '@/components/elements/Card';
import Button from '@/components/elements/Button';
import StatusBadge from '@/components/elements/StatusBadge';
import ConfirmationModal from '@/components/fragments/Modal/ConfirmationModal';
import KrsDetailModal from './KrsDetailModal'; // <-- 1. Impor komponen modal baru
import { useBimbinganAkademik, MahasiswaBimbingan } from '@/hooks/useBimbinganAkademik';
import { AlertCircle } from 'lucide-react';
import type { KrsData } from '@/types';

interface SelectedMahasiswaInfo {
    mahasiswa: MahasiswaBimbingan;
    krsToValidate: KrsData[];
}

const BimbinganAkademikView = () => {
    const { mahasiswaList, isLoading, error, validateKrs } = useBimbinganAkademik();
    
    // --- State untuk Modal Konfirmasi Validasi ---
    const [selectedMahasiswaInfo, setSelectedMahasiswaInfo] = useState<SelectedMahasiswaInfo | null>(null);
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

    // --- 2. State baru untuk Modal Rincian KRS ---
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [selectedKrsDetails, setSelectedKrsDetails] = useState<SelectedMahasiswaInfo | null>(null);

    // Fungsi untuk membuka modal konfirmasi validasi
    const handleOpenConfirmModal = (mahasiswa: MahasiswaBimbingan) => {
        const krsToValidate = mahasiswa.krs.filter(k => k.statusPersetujuan === 'DIAJUKAN');
        setSelectedMahasiswaInfo({ mahasiswa, krsToValidate });
        setIsConfirmModalOpen(true);
    };

    // --- 3. Fungsi baru untuk membuka modal rincian KRS ---
    const handleViewKrsDetails = (mahasiswa: MahasiswaBimbingan) => {
        const krsToValidate = mahasiswa.krs.filter(k => k.statusPersetujuan === 'DIAJUKAN');
        setSelectedKrsDetails({ mahasiswa, krsToValidate });
        setIsDetailModalOpen(true);
    };

    // Fungsi yang dijalankan saat dosen mengonfirmasi validasi
    const handleConfirmValidation = async () => {
        if (!selectedMahasiswaInfo) return;
        const validationPromises = selectedMahasiswaInfo.krsToValidate.map(krs => 
            validateKrs(krs.krsId, 'DISETUJUI')
        );
        await Promise.all(validationPromises);
        setIsConfirmModalOpen(false);
        setSelectedMahasiswaInfo(null);
    };
    
    const getOverallKrsStatus = (krsList: KrsData[]): 'Disetujui' | 'Menunggu Persetujuan' | 'Belum Kontrak' => {
        if (!krsList || krsList.length === 0) return 'Belum Kontrak';
        if (krsList.some(k => k.statusPersetujuan === 'DIAJUKAN')) return 'Menunggu Persetujuan';
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
            {/* Modal untuk Konfirmasi Validasi */}
            <ConfirmationModal
                isOpen={isConfirmModalOpen}
                onClose={() => setIsConfirmModalOpen(false)}
                onConfirm={handleConfirmValidation}
                title="Validasi KRS Mahasiswa"
                message={`Apakah Anda yakin ingin menyetujui ${selectedMahasiswaInfo?.krsToValidate.length} mata kuliah untuk ${selectedMahasiswaInfo?.mahasiswa.namaLengkap}?`}
            />

            {/* --- 4. Render Modal Rincian KRS --- */}
            {selectedKrsDetails && (
                <KrsDetailModal
                    isOpen={isDetailModalOpen}
                    onClose={() => setIsDetailModalOpen(false)}
                    mahasiswaName={selectedKrsDetails.mahasiswa.namaLengkap}
                    krsDetails={selectedKrsDetails.krsToValidate}
                />
            )}

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
                                                    {/* --- 5. Buat nama mahasiswa bisa diklik --- */}
                                                    <button onClick={() => handleViewKrsDetails(mhs)} className="font-semibold text-left hover:text-indigo-600 transition-colors">
                                                        {mhs.namaLengkap}
                                                    </button>
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
                                                    onClick={() => handleOpenConfirmModal(mhs)}
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