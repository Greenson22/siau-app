// program/next-js/components/fragments/dosen/GradeManagementModal.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Modal from '@/components/fragments/Modal/Modal';
import Button from '@/components/elements/Button';
import Input from '@/components/elements/Input';
import { useKelasMahasiswa, MahasiswaDiKelas } from '@/hooks/useKelasMahasiswa';
import { useInputNilai, NilaiInput } from '@/hooks/useInputNilai';
import { AlertCircle, CheckCircle } from 'lucide-react';

// Tipe untuk kelas yang dipilih
interface SelectedKelas {
    id: number;
    nama: string;
}

interface GradeManagementModalProps {
    isOpen: boolean;
    onClose: () => void;
    selectedKelas: SelectedKelas | null;
}

const GradeManagementModal: React.FC<GradeManagementModalProps> = ({ isOpen, onClose, selectedKelas }) => {
    const { mahasiswaList, isLoading, error } = useKelasMahasiswa(selectedKelas?.id || null);
    const { submitNilai, isSubmitting, submitError, submitSuccess } = useInputNilai();
    const [nilai, setNilai] = useState<Record<number, { nilaiAkhir: string; nilaiHuruf: string }>>({});

    // Inisialisasi state nilai ketika daftar mahasiswa dimuat
    useEffect(() => {
        if (mahasiswaList.length > 0) {
            const initialNilai: Record<number, { nilaiAkhir: string; nilaiHuruf: string }> = {};
            mahasiswaList.forEach(mhs => {
                initialNilai[mhs.krsId] = {
                    nilaiAkhir: mhs.nilaiAkhir?.toString() || '',
                    nilaiHuruf: mhs.nilaiHuruf || '',
                };
            });
            setNilai(initialNilai);
        }
    }, [mahasiswaList]);
    
    const handleNilaiChange = (krsId: number, field: 'nilaiAkhir' | 'nilaiHuruf', value: string) => {
        setNilai(prev => ({
            ...prev,
            [krsId]: {
                ...prev[krsId],
                [field]: value,
            },
        }));
    };
    
    const handleConfirmSave = () => {
        const nilaiToSubmit: NilaiInput[] = Object.entries(nilai)
            .map(([krsId, values]) => ({
                krsId: parseInt(krsId),
                nilaiAkhir: parseFloat(values.nilaiAkhir) || 0,
                nilaiHuruf: values.nilaiHuruf.toUpperCase(),
            }))
            .filter(item => item.nilaiHuruf); // Hanya kirim yang nilai hurufnya tidak kosong
            
        submitNilai(nilaiToSubmit);
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            onConfirm={handleConfirmSave}
            title={`Input Nilai - ${selectedKelas?.nama || ''}`}
            maxWidth="max-w-4xl"
            confirmText="Simpan Nilai"
        >
            <div className="my-4">
                {isLoading && <p>Memuat daftar mahasiswa...</p>}
                {error && <p className="text-red-500">{error}</p>}
                {submitSuccess && (
                    <div className="flex items-center gap-2 p-3 mb-4 bg-green-100 text-green-800 rounded-md">
                        <CheckCircle size={20} />
                        <p>Nilai berhasil disimpan. Anda bisa menutup jendela ini.</p>
                    </div>
                )}
                 {submitError && (
                    <div className="flex items-center gap-2 p-3 mb-4 bg-red-100 text-red-800 rounded-md">
                        <AlertCircle size={20} />
                        <p>{submitError}</p>
                    </div>
                )}
                {!isLoading && !error && (
                    <div className="overflow-x-auto max-h-[60vh] overflow-y-auto">
                        <table className="w-full text-sm text-left text-gray-500">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 sticky top-0">
                                <tr>
                                    <th className="px-4 py-2">NIM</th>
                                    <th className="px-4 py-2">Nama Mahasiswa</th>
                                    <th className="px-4 py-2 w-32">Nilai Akhir (0-100)</th>
                                    <th className="px-4 py-2 w-24">Nilai Huruf</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y">
                                {mahasiswaList.map(mhs => (
                                    <tr key={mhs.mahasiswaId}>
                                        <td className="px-4 py-2 font-mono">{mhs.nim}</td>
                                        <td className="px-4 py-2 font-medium">{mhs.namaLengkap}</td>
                                        <td className="px-4 py-2">
                                            <Input
                                                id={`nilai-akhir-${mhs.krsId}`}
                                                label=""
                                                type="number"
                                                min="0"
                                                max="100"
                                                value={nilai[mhs.krsId]?.nilaiAkhir || ''}
                                                onChange={(e) => handleNilaiChange(mhs.krsId, 'nilaiAkhir', e.target.value)}
                                            />
                                        </td>
                                        <td className="px-4 py-2">
                                            <Input
                                                id={`nilai-huruf-${mhs.krsId}`}
                                                label=""
                                                type="text"
                                                maxLength={2}
                                                value={nilai[mhs.krsId]?.nilaiHuruf || ''}
                                                onChange={(e) => handleNilaiChange(mhs.krsId, 'nilaiHuruf', e.target.value)}
                                                className="uppercase"
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </Modal>
    );
};

export default GradeManagementModal;