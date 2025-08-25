// program/next-js/components/fragments/dosen/BimbinganAkademikView.tsx
'use client';

import React, { useState, useMemo } from 'react';
import Card from '@/components/elements/Card';
import Button from '@/components/elements/Button';
import Checkbox from '@/components/elements/Checkbox';
import StatusBadge from '@/components/elements/StatusBadge';
import ConfirmationModal from '@/components/fragments/Modal/ConfirmationModal';
import MahasiswaAkademikProfileModal from './MahasiswaAkademikProfileModal';
import KrsRejectionModal from './KrsRejectionModal';
import { useBimbinganAkademik, MahasiswaBimbingan } from '@/hooks/useBimbinganAkademik';
import { AlertCircle, Check, X, Users } from 'lucide-react';
import type { KrsData } from '@/types';

interface SelectedMahasiswaInfo {
    mahasiswa: MahasiswaBimbingan;
    krsToValidate: KrsData[];
}

const BimbinganAkademikView = () => {
    const { 
        mahasiswaList, 
        isLoading, 
        error, 
        validateKrs,
        validateMultipleKrs,
        selectedMahasiswaIds,
        toggleMahasiswaSelection,
        toggleSelectAll,
        getOverallKrsStatus
    } = useBimbinganAkademik();
    
    // State untuk berbagai modal
    const [selectedMahasiswaInfo, setSelectedMahasiswaInfo] = useState<SelectedMahasiswaInfo | null>(null);
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
    const [isAkademikModalOpen, setIsAkademikModalOpen] = useState(false);
    const [selectedMahasiswaForAkademik, setSelectedMahasiswaForAkademik] = useState<MahasiswaBimbingan | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isBatchConfirmModalOpen, setIsBatchConfirmModalOpen] = useState(false);

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

    // Handler untuk aksi validasi tunggal
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

    // Handler untuk aksi penolakan tunggal
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

    // --- HANDLER BARU UNTUK AKSI VALIDASI MASSAL ---
    const handleBatchConfirm = async () => {
        setIsSubmitting(true);
        await validateMultipleKrs(Array.from(selectedMahasiswaIds), 'DISETUJUI');
        setIsBatchConfirmModalOpen(false);
        setIsSubmitting(false);
    };
    
    // Memoization untuk data yang perlu di-render
    const pendingValidationMhs = useMemo(() => 
        mahasiswaList.filter(mhs => getOverallKrsStatus(mhs.krs) === 'Menunggu Persetujuan'),
    [mahasiswaList, getOverallKrsStatus]);

    const isAllSelected = useMemo(() => 
        pendingValidationMhs.length > 0 && selectedMahasiswaIds.size === pendingValidationMhs.length,
    [pendingValidationMhs, selectedMahasiswaIds]);


    if (isLoading) {
        return <Card><p className="text-center p-8">Memuat data mahasiswa bimbingan...</p></Card>;
    }

    if (error) {
        return <Card className="bg-red-50 border-red-200 text-red-700 p-4 flex items-center gap-3"><AlertCircle /><p>Error: {error}</p></Card>;
    }

    return (
        <>
            {/* Modal untuk konfirmasi tunggal */}
            <ConfirmationModal
                isOpen={isConfirmModalOpen}
                onClose={() => setIsConfirmModalOpen(false)}
                onConfirm={handleConfirmValidation}
                title="Setujui KRS Mahasiswa"
                message={`Apakah Anda yakin ingin menyetujui ${selectedMahasiswaInfo?.krsToValidate.length} mata kuliah untuk ${selectedMahasiswaInfo?.mahasiswa.namaLengkap}?`}
            />

            {/* Modal untuk konfirmasi massal */}
            <ConfirmationModal
                isOpen={isBatchConfirmModalOpen}
                onClose={() => setIsBatchConfirmModalOpen(false)}
                onConfirm={handleBatchConfirm}
                title="Konfirmasi Validasi Massal"
                message={`Anda akan menyetujui KRS untuk ${selectedMahasiswaIds.size} mahasiswa terpilih. Lanjutkan?`}
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
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-gray-800">Validasi KRS Mahasiswa Bimbingan</h3>
                    {selectedMahasiswaIds.size > 0 && (
                        <Button onClick={() => setIsBatchConfirmModalOpen(true)} variant="primary">
                            <Users size={16} className="mr-2" />
                            Validasi {selectedMahasiswaIds.size} Mahasiswa Terpilih
                        </Button>
                    )}
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                <th className="p-4">
                                    <Checkbox
                                        checked={isAllSelected}
                                        onChange={toggleSelectAll}
                                        disabled={pendingValidationMhs.length === 0}
                                    />
                                </th>
                                <th className="px-6 py-3">Mahasiswa</th>
                                <th className="px-6 py-3">NIM</th>
                                <th className="px-6 py-3 text-center">Status KRS</th>
                                <th className="px-6 py-3 text-center">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {mahasiswaList.map((mhs) => {
                                const statusKrs = getOverallKrsStatus(mhs.krs);
                                const isPending = statusKrs === 'Menunggu Persetujuan';
                                return (
                                    <tr key={mhs.mahasiswaId} className={`bg-white border-b ${isPending ? 'hover:bg-gray-50' : ''}`}>
                                        <td className="p-4">
                                            {isPending && (
                                                <Checkbox
                                                    checked={selectedMahasiswaIds.has(mhs.mahasiswaId)}
                                                    onChange={() => toggleMahasiswaSelection(mhs.mahasiswaId)}
                                                />
                                            )}
                                        </td>
                                        <td className="px-6 py-4 font-medium text-gray-900">
                                            <div className="flex items-center gap-3">
                                                <img src={mhs.fotoProfil as string} alt={mhs.namaLengkap} className="w-10 h-10 rounded-full" />
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
                                            {isPending && (
                                                <div className="flex justify-center items-center gap-2">
                                                    <Button variant="primary" className="!p-2" onClick={() => handleOpenConfirmModal(mhs)} title="Setujui">
                                                        <Check size={16} />
                                                    </Button>
                                                    <Button variant="danger" className="!p-2" onClick={() => handleOpenRejectModal(mhs)} title="Tolak">
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