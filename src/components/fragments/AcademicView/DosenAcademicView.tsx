// program/next-js/components/fragments/AcademicView/DosenAcademicView.tsx
'use client';

import React, { useState, useMemo } from 'react';
import Card from '@/components/elements/Card';
import TabButton from '@/components/elements/TabButton';
import Button from '@/components/elements/Button';
import { useDosenJadwal } from '@/hooks/useDosenJadwal';
import { kelasUntukNilai as mockKelas } from '@/lib/dataDosen';
import { Clock, MapPin, Users, AlertCircle, Edit } from 'lucide-react';
import GradeManagementModal from '../dosen/GradeManagementModal'; // <-- IMPORT MODAL BARU

// Tipe data untuk kelas yang dipilih
interface SelectedKelas {
    id: number;
    nama: string;
}

// Sub-komponen untuk mengisi nilai
const IsiNilaiView = ({ onOpenModal }: { onOpenModal: (kelas: SelectedKelas) => void }) => {
    // Di masa depan, data ini harusnya datang dari hook/API
    const { jadwal: kelasUntukNilai, isLoading, error } = useDosenJadwal();

    if (isLoading) return <p>Memuat daftar kelas...</p>;
    if (error) return <p className="text-red-500">Error: {error}</p>;

    return (
        <div>
            <h4 className="font-bold text-lg text-gray-800 mb-4">Input Nilai Mahasiswa</h4>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th className="px-6 py-3">Kode MK</th>
                            <th className="px-6 py-3">Mata Kuliah</th>
                            <th className="px-6 py-3">Prodi</th>
                            <th className="px-6 py-3 text-center">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {kelasUntukNilai.map((kelas) => (
                            <tr key={kelas.kelasId} className="bg-white border-b hover:bg-gray-50">
                                <td className="px-6 py-4">{kelas.kodeMataKuliah}</td>
                                <td className="px-6 py-4 font-medium text-gray-900">{kelas.namaMataKuliah}</td>
                                <td className="px-6 py-4">{kelas.sks} SKS</td>
                                <td className="px-6 py-4 text-center">
                                    <Button 
                                        className="!w-auto !py-1 !px-3 text-xs"
                                        onClick={() => onOpenModal({ id: kelas.kelasId, nama: kelas.namaMataKuliah })}
                                    >
                                        <Edit size={14} className="mr-2"/>
                                        Input Nilai
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

// Sub-komponen untuk melihat jadwal mengajar
const JadwalMengajarView = () => {
    const { jadwal, isLoading, error } = useDosenJadwal();
    
    const daysOrder = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat'];

    const groupedSchedule = useMemo(() => {
        if (!jadwal) return {};
        return jadwal.reduce((acc, item) => {
            const day = item.jadwal.split(',')[0];
            if (!acc[day]) acc[day] = [];
            acc[day].push(item);
            return acc;
        }, {} as Record<string, typeof jadwal>);
    }, [jadwal]);

    const sortedDays = daysOrder.filter(day => groupedSchedule[day]);

    if (isLoading) return <p>Memuat jadwal mengajar...</p>;
    if (error) return <p className="text-red-500">Error: {error}</p>;

    return (
        <div>
            <h4 className="font-bold text-lg text-gray-800 mb-4">Jadwal Mengajar</h4>
            <div className="space-y-6">
                {sortedDays.length > 0 ? (
                    sortedDays.map(day => (
                        <div key={day}>
                            <h5 className="font-semibold text-indigo-600 mb-3 border-b pb-2">{day}</h5>
                            <div className="space-y-4">
                                {groupedSchedule[day].map((item, index) => (
                                    <div key={index} className="p-4 rounded-lg border bg-gray-50">
                                        <p className="font-bold text-md text-gray-900 mb-3">{item.namaMataKuliah}</p>
                                        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-600">
                                            <div className="flex items-center gap-2"><Clock size={14} /><span>{item.jadwal.split(', ')[1]}</span></div>
                                            <div className="flex items-center gap-2"><MapPin size={14} /><span>Ruang: {item.ruangan}</span></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-500 mt-8">Tidak ada jadwal mengajar yang ditemukan.</p>
                )}
            </div>
        </div>
    );
};

const DosenAcademicView = () => {
    const [activeTab, setActiveTab] = useState('nilai');
    const [isGradeModalOpen, setIsGradeModalOpen] = useState(false);
    const [selectedKelas, setSelectedKelas] = useState<SelectedKelas | null>(null);

    // Handler untuk membuka modal
    const handleOpenGradeModal = (kelas: SelectedKelas) => {
        setSelectedKelas(kelas);
        setIsGradeModalOpen(true);
    };

    const lecturerTabs = useMemo(() => [
        { id: 'nilai', label: 'Input Nilai', component: () => <IsiNilaiView onOpenModal={handleOpenGradeModal} /> },
        { id: 'jadwal_mengajar', label: 'Jadwal Mengajar', component: JadwalMengajarView },
    ], []);

    const ActiveComponent = lecturerTabs.find(tab => tab.id === activeTab)?.component;

    return (
        <>
            <GradeManagementModal 
                isOpen={isGradeModalOpen}
                onClose={() => setIsGradeModalOpen(false)}
                selectedKelas={selectedKelas}
            />
            <Card>
                <h3 className="text-xl font-bold mb-4 text-gray-800">Akademik Dosen</h3>
                
                <div className="border-b border-gray-200">
                    <nav className="flex space-x-6 overflow-x-auto" aria-label="Tabs">
                        {lecturerTabs.map((tab) => (
                            <div key={tab.id} className="flex-shrink-0">
                                <TabButton
                                    label={tab.label}
                                    isActive={activeTab === tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                />
                            </div>
                        ))}
                    </nav>
                </div>

                <div className="mt-6">
                    {ActiveComponent && <ActiveComponent />}
                </div>
            </Card>
        </>
    );
};

export default DosenAcademicView;