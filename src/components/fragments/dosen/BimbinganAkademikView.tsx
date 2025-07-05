'use client'

import React, { useState } from 'react';
import Card from '@/components/elements/Card';
import Button from '@/components/elements/Button';
import StatusBadge from '@/components/elements/StatusBadge';
import ConfirmationModal from '@/components/fragments/ConfirmationModal';
import { mahasiswaBimbingan as initialData, KrsStatus } from '@/lib/dataDosen';

interface Mahasiswa {
    id: number;
    nama: string;
    nim: string;
    prodi: string;
    semester: number;
    statusKrs: KrsStatus;
    avatar: string;
}

const BimbinganAkademikView = () => {
    const [mahasiswaList, setMahasiswaList] = useState<Mahasiswa[]>(initialData);
    const [selectedMahasiswa, setSelectedMahasiswa] = useState<Mahasiswa | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = (mahasiswa: Mahasiswa) => {
        setSelectedMahasiswa(mahasiswa);
        setIsModalOpen(true);
    };

    const handleConfirmValidation = () => {
        if (!selectedMahasiswa) return;

        setMahasiswaList(prevList =>
            prevList.map(m =>
                m.id === selectedMahasiswa.id ? { ...m, statusKrs: 'Disetujui' } : m
            )
        );
        setIsModalOpen(false);
        setSelectedMahasiswa(null);
    };

    return (
        <>
            <ConfirmationModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={handleConfirmValidation}
                title="Validasi KRS Mahasiswa"
                message={`Apakah Anda yakin ingin menyetujui KRS untuk ${selectedMahasiswa?.nama} (${selectedMahasiswa?.nim})? Tindakan ini tidak dapat dibatalkan.`}
            />
            <Card>
                <h3 className="text-xl font-bold text-gray-800 mb-4">Validasi KRS Mahasiswa Bimbingan</h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                <th className="px-6 py-3">Mahasiswa</th>
                                <th className="px-6 py-3">NIM</th>
                                <th className="px-6 py-3">Semester</th>
                                <th className="px-6 py-3 text-center">Status KRS</th>
                                <th className="px-6 py-3 text-center">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {mahasiswaList.map((mhs) => (
                                <tr key={mhs.id} className="bg-white border-b hover:bg-gray-50">
                                    <td className="px-6 py-4 font-medium text-gray-900">
                                        <div className="flex items-center gap-3">
                                            <img src={mhs.avatar} alt={mhs.nama} className="w-10 h-10 rounded-full" />
                                            <div>
                                                <p className="font-semibold">{mhs.nama}</p>
                                                <p className="text-xs text-gray-500">{mhs.prodi}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">{mhs.nim}</td>
                                    <td className="px-6 py-4">{mhs.semester}</td>
                                    <td className="px-6 py-4 text-center">
                                        <StatusBadge status={mhs.statusKrs} />
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        {mhs.statusKrs === 'Menunggu Persetujuan' && (
                                            <Button
                                                className="!w-auto !py-1 !px-3 text-xs"
                                                onClick={() => handleOpenModal(mhs)}
                                            >
                                                Validasi KRS
                                            </Button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </>
    );
};

export default BimbinganAkademikView;