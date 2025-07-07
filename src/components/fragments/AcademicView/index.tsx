'use client';

import React, { useState, useMemo, ReactNode } from 'react';
import Card from '@/components/elements/Card';
import TabButton from '@/components/elements/TabButton';
import Button from '@/components/elements/Button';

// Impor komponen view mahasiswa
import KrsView from './KrsView';
import KhsView from './KhsView';
import TranscriptView from './TranscriptView';
import ScheduleView from './ScheduleView';

// Impor data dummy untuk dosen
import { jadwalMengajar, kelasUntukNilai } from '@/lib/dataDosen';
import { Clock, MapPin, Users } from 'lucide-react';

// Tipe untuk peran pengguna
type UserRole = 'mahasiswa' | 'dosen';

// =================================================================
// KOMPONEN SPESIFIK UNTUK DOSEN
// =================================================================

// Sub-komponen untuk mengisi nilai (dari AkademikDosenView)
const IsiNilaiView = () => (
    <div>
        <h4 className="font-bold text-lg text-gray-800 mb-4">Input Nilai Mahasiswa</h4>
        <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                        <th className="px-6 py-3">Kode MK</th>
                        <th className="px-6 py-3">Mata Kuliah</th>
                        <th className="px-6 py-3">Prodi</th>
                        <th className="px-6 py-3 text-center">Jml. Mahasiswa</th>
                        <th className="px-6 py-3 text-center">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {kelasUntukNilai.map((kelas) => (
                        <tr key={kelas.id} className="bg-white border-b hover:bg-gray-50">
                            <td className="px-6 py-4">{kelas.id}</td>
                            <td className="px-6 py-4 font-medium text-gray-900">{kelas.nama}</td>
                            <td className="px-6 py-4">{kelas.prodi}</td>
                            <td className="px-6 py-4 text-center">{kelas.jumlahMahasiswa}</td>
                            <td className="px-6 py-4 text-center">
                                <Button className="!w-auto !py-1 !px-3 text-xs">
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

// Sub-komponen untuk melihat jadwal mengajar (dari AkademikDosenView)
const JadwalMengajarView = () => {
    const daysOrder = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat'];
    const groupedSchedule = jadwalMengajar.reduce((acc, item) => {
        const day = item.hari;
        if (!acc[day]) acc[day] = [];
        acc[day].push(item);
        return acc;
    }, {} as Record<string, typeof jadwalMengajar>);

    return (
        <div>
            <h4 className="font-bold text-lg text-gray-800 mb-4">Jadwal Mengajar</h4>
            <div className="space-y-6">
                {daysOrder.filter(day => groupedSchedule[day]).map(day => (
                    <div key={day}>
                        <h5 className="font-semibold text-indigo-600 mb-3 border-b pb-2">{day}</h5>
                        <div className="space-y-4">
                            {groupedSchedule[day].map((item, index) => (
                                <div key={index} className="p-4 rounded-lg border bg-gray-50">
                                    <p className="font-bold text-md text-gray-900 mb-3">{item.nama}</p>
                                    <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-600">
                                        <div className="flex items-center gap-2"><Clock size={14} /><span>{item.waktu}</span></div>
                                        <div className="flex items-center gap-2"><Users size={14} /><span>{item.prodi}</span></div>
                                        <div className="flex items-center gap-2"><MapPin size={14} /><span>Ruang: {item.ruang}</span></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// =================================================================
// KOMPONEN UTAMA YANG TELAH DIGABUNGKAN
// =================================================================
interface AcademicViewProps {
    // Tambahkan prop `role` untuk membedakan tampilan
    role: UserRole;
}

const AcademicView: React.FC<AcademicViewProps> = ({ role = 'mahasiswa' }) => {
    // Definisikan tab berdasarkan peran
    const studentTabs = useMemo(() => [
        { id: 'krs', label: 'KRS', component: KrsView },
        { id: 'khs', label: 'KHS', component: KhsView },
        { id: 'transkrip', label: 'Transkrip Nilai', component: TranscriptView },
        { id: 'jadwal', label: 'Jadwal Kuliah', component: ScheduleView },
    ], []);

    const lecturerTabs = useMemo(() => [
        { id: 'nilai', label: 'Input Nilai', component: IsiNilaiView },
        { id: 'jadwal_mengajar', label: 'Jadwal Mengajar', component: JadwalMengajarView },
    ], []);
    
    // Pilih set tab yang akan digunakan
    const tabs = role === 'dosen' ? lecturerTabs : studentTabs;

    // Set tab aktif awal berdasarkan peran
    const [activeTab, setActiveTab] = useState(tabs[0].id);

    const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component;
    const title = role === 'dosen' ? 'Akademik Dosen' : 'Informasi Akademik';
    
    return (
        <Card>
            <h3 className="text-xl font-bold mb-4 text-gray-800">{title}</h3>
            
            <div className="border-b border-gray-200">
                <nav className="flex space-x-6 overflow-x-auto" aria-label="Tabs">
                    {tabs.map((tab) => (
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
    );
};

export default AcademicView;