'use client';

import React, { useState } from 'react';
import Card from '@/components/elements/Card';
import Button from '@/components/elements/Button';
import StatusBadge from '@/components/elements/StatusBadge';
import ConfirmationModal from '@/components/fragments/Modal/ConfirmationModal';
import MahasiswaAkademikProfileModal from './MahasiswaAkademikProfileModal';
import KrsRejectionModal from './KrsRejectionModal'; // <-- Impor modal baru
import { useBimbinganAkademik, MahasiswaBimbingan } from '@/hooks/useBimbinganAkademik';
import { AlertCircle, Check, X } from 'lucide-react';
import type { KrsData } from '@/types';

interface SelectedMahasiswaInfo {
    mahasiswa: MahasiswaBimbingan;
    krsToValidate: KrsData[];
}

const BimbinganAkademikView = () => {
    const { mahasiswaList, isLoading, error, validateKrs } = useBimbinganAkademik();
    
    // State untuk berbagai modal
    const [selectedMahasiswaInfo, setSelectedMahasiswaInfo] = useState<SelectedMahasiswaInfo | null>(null);
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [isRejectModalOpen, setIsRejectModalOpen] = useState(false); // <-- State untuk modal tolak
    const [isAkademikModalOpen, setIsAkademikModalOpen] = useState(false);
    const [selectedMahasiswaForAkademik, setSelectedMahasiswaForAkademik] = useState<MahasiswaBimbingan | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Handler untuk membuka modal
    const handleOpenConfirmModal = (mahasiswa: MahasiswaBimbingan) => {
        const krsToValidate = mahasiswa.krs.filter(k => k.statusPersetujuan === 'DIAJUKAN');
        setSelectedMahasiswaInfo({ mahasiswa, krsToValidate });
        setIsConfirmModalOpen(true);
    };

    const handleOpenRejectModal = (mahasiswa: MahasiswaBimbingan) => {
        const krsToValidate = mahasiswa.krs.filter(k => k.statusPersetujuan === 'DIAJUKAN');
        setSelectedMahasiswaInfo({ mahasiswa, krsToValidate });
        setIsRejectModalOpen(true);
    };
    
    const handleViewAcademicProfile = (mahasiswa: MahasiswaBimbingan) => {
        setSelectedMahasiswaForAkademik(mahasiswa);
        setIsAkademikModalOpen(true);
    };

    // Handler untuk aksi
    const handleConfirmValidation = async () => {
        if (!selectedMahasiswaInfo) return;
        setIsSubmitting(true);
        const validationPromises = selectedMahasiswaInfo.krsToValidate.map(krs => 
            validateKrs(krs.krsId, 'DISETUJUI')
        );
        await Promise.all(validationPromises);
        setIsConfirmModalOpen(false);
        setSelectedMahasiswaInfo(null);
        setIsSubmitting(false);
    };

    const handleConfirmRejection = async (reason: string) => {
        if (!selectedMahasiswaInfo) return;
        setIsSubmitting(true);
        const rejectionPromises = selectedMahasiswaInfo.krsToValidate.map(krs =>
            validateKrs(krs.krsId, 'DITOLAK', reason)
        );
        await Promise.all(rejectionPromises);
        setIsRejectModalOpen(false);
        setSelectedMahasiswaInfo(null);
        setIsSubmitting(false);
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
            <ConfirmationModal
                isOpen={isConfirmModalOpen}
                onClose={() => setIsConfirmModalOpen(false)}
                onConfirm={handleConfirmValidation}
                title="Setujui KRS Mahasiswa"
                message={`Apakah Anda yakin ingin menyetujui ${selectedMahasiswaInfo?.krsToValidate.length} mata kuliah untuk ${selectedMahasiswaInfo?.mahasiswa.namaLengkap}?`}
            />

            {selectedMahasiswaInfo && (
                <KrsRejectionModal
                    isOpen={isRejectModalOpen}
                    onClose={() => setIsRejectModalOpen(false)}
                    onConfirm={handleConfirmRejection}
                    mahasiswaName={selectedMahasiswaInfo.mahasiswa.namaLengkap}
                    isLoading={isSubmitting}
                />
            )}

            {selectedMahasiswaForAkademik && (
                <MahasiswaAkademikProfileModal
                    isOpen={isAkademikModalOpen}
                    onClose={() => setIsAkademikModalOpen(false)}
                    mahasiswaId={selectedMahasiswaForAkademik.mahasiswaId}
                    mahasiswaName={selectedMahasiswaForAkademik.namaLengkap}
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
                                                    <button onClick={() => handleViewAcademicProfile(mhs)} className="font-semibold text-left hover:text-indigo-600 transition-colors">
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
                                                <div className="flex justify-center items-center gap-2">
                                                    <Button variant="primary" className="!p-2" onClick={() => handleOpenConfirmModal(mhs)}>
                                                        <Check size={16} />
                                                    </Button>
                                                    <Button variant="danger" className="!p-2" onClick={() => handleOpenRejectModal(mhs)}>
                                                        <X size={16} />
                                                    </Button>
                                                </div>
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