// program/next-js/components/fragments/dosen/MahasiswaAkademikProfileModal.tsx
'use client';

import React, { useState, useMemo } from 'react';
import Modal from '@/components/fragments/Modal/Modal';
import Card from '@/components/elements/Card';
import TabButton from '@/components/elements/TabButton';
import IpsChart from '../DashboardView/IpsChart';
import { useMahasiswaAkademikProfile } from '@/hooks/useMahasiswaAkademikProfile';
import { AlertCircle, GraduationCap, TrendingUp, BookCopy } from 'lucide-react';
import type { KhsDTO } from '@/types';

interface MahasiswaAkademikProfileModalProps {
    isOpen: boolean;
    onClose: () => void;
    mahasiswaId: number | null;
    mahasiswaName: string;
}

const MahasiswaAkademikProfileModal: React.FC<MahasiswaAkademikProfileModalProps> = ({ isOpen, onClose, mahasiswaId, mahasiswaName }) => {
    const { profileData, isLoading, error } = useMahasiswaAkademikProfile(mahasiswaId);
    const [activeTab, setActiveTab] = useState('summary');

    const renderContent = () => {
        if (isLoading) return <p className="text-center p-4">Memuat data akademik...</p>;
        if (error) return <p className="text-red-600 text-center p-4">Error: {error}</p>;
        if (!profileData) return <p className="text-gray-500 text-center p-4">Tidak ada data tersedia.</p>;

        switch (activeTab) {
            case 'summary':
                return (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <Card className="p-4 flex items-center">
                            <div className="p-3 rounded-full mr-4 bg-indigo-100 text-indigo-600"><GraduationCap size={24} /></div>
                            <div>
                                <p className="text-sm text-gray-500">IPK</p>
                                <p className="text-2xl font-bold text-gray-800">{profileData.summary?.ipk.toFixed(2) || '0.00'}</p>
                            </div>
                        </Card>
                        <Card className="p-4 flex items-center">
                            <div className="p-3 rounded-full mr-4 bg-green-100 text-green-600"><BookCopy size={24} /></div>
                            <div>
                                <p className="text-sm text-gray-500">Total SKS</p>
                                <p className="text-2xl font-bold text-gray-800">{profileData.summary?.totalSks || 0}</p>
                            </div>
                        </Card>
                    </div>
                );
            case 'ips-chart':
                 const chartLabels = profileData.ipsHistory?.labels || [];
                 const chartDataPoints = profileData.ipsHistory?.data || [];
                return (
                    <div className="mt-4">
                        <h4 className="font-semibold text-gray-800 mb-4">Riwayat Indeks Prestasi Semester (IPS)</h4>
                        <div className="h-80">
                           {chartLabels.length > 0 && <IpsChart labels={chartLabels} dataPoints={chartDataPoints} />}
                        </div>
                    </div>
                );
            case 'khs':
                return (
                    <div className="mt-4">
                        <h4 className="font-semibold text-gray-800 mb-4">Riwayat KHS</h4>
                        <div className="overflow-x-auto max-h-96">
                            <table className="w-full text-sm text-left text-gray-500">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 sticky top-0">
                                    <tr>
                                        <th className="px-4 py-2">Semester</th>
                                        <th className="px-4 py-2">Mata Kuliah</th>
                                        <th className="px-4 py-2 text-center">SKS</th>
                                        <th className="px-4 py-2 text-center">Nilai</th>
                                    </tr>
                                </thead>
                                <tbody>
                                     {/* Grouping KHS by semester */}
                                    {Object.entries(
                                        profileData.khsData.reduce((acc, khs) => {
                                            const key = `${khs.semester} ${khs.tahunAkademik}`;
                                            if (!acc[key]) acc[key] = [];
                                            acc[key].push(khs);
                                            return acc;
                                        }, {} as Record<string, KhsDTO[]>)
                                    ).map(([semester, courses]) => (
                                        <React.Fragment key={semester}>
                                            <tr className="bg-gray-100 font-bold text-gray-700">
                                                <td colSpan={4} className="px-4 py-2">{semester}</td>
                                            </tr>
                                            {courses.map((course, index) => (
                                                <tr key={index} className="bg-white border-b hover:bg-gray-50">
                                                    <td className="px-4 py-2 font-mono">{course.kodeMataKuliah}</td>
                                                    <td className="px-4 py-2">{course.namaMataKuliah}</td>
                                                    <td className="px-4 py-2 text-center">{course.sks}</td>
                                                    <td className="px-4 py-2 text-center">{course.nilaiHuruf}</td>
                                                </tr>
                                            ))}
                                        </React.Fragment>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    const tabs = [
        { id: 'summary', label: 'Ringkasan' },
        { id: 'khs', label: 'Riwayat KHS' },
        { id: 'ips-chart', label: 'Grafik IPS' },
    ];

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            onConfirm={onClose} // Tombol konfirmasi hanya akan menutup modal
            title={`Profil Akademik - ${mahasiswaName}`}
            variant="info"
            maxWidth="max-w-4xl" // <-- PERUBAHAN DI SINI
        >
            <div className="border-b border-gray-200">
                <nav className="flex space-x-6 overflow-x-auto" aria-label="Tabs">
                    {tabs.map((tab) => (
                        <div key={tab.id}>
                            <TabButton
                                label={tab.label}
                                isActive={activeTab === tab.id}
                                onClick={() => setActiveTab(tab.id)}
                            />
                        </div>
                    ))}
                </nav>
            </div>
            
            <div>
                 {renderContent()}
            </div>
        </Modal>
    );
};

export default MahasiswaAkademikProfileModal;