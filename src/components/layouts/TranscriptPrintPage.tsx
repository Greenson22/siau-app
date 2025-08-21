// program/next-js/components/layouts/TranscriptPrintPage.tsx
'use client';

import React, { useMemo } from 'react';
import { useKhs } from '@/hooks/useKhs';
import { useAkademikSummary } from '@/hooks/useAkademikSummary';
import { useMahasiswaProfile } from '@/hooks/useMahasiswaProfile';
import { KhsDTO } from '@/types';
import Logo from '../elements/Logo';
import Button from '../elements/Button';
import { Printer } from 'lucide-react';

const TranscriptPrintPage = () => {
    const { khs, isLoading: isLoadingKhs, error: errorKhs } = useKhs();
    const { summary, isLoading: isLoadingSummary, error: errorSummary } = useAkademikSummary();
    const { mahasiswa, isLoading: isLoadingProfile, error: errorProfile } = useMahasiswaProfile();

    // Mengelompokkan KHS berdasarkan semester
    const groupedSemesters = useMemo(() => {
        if (!khs) return {};
        return khs.reduce((acc, item) => {
            const semesterKey = `${item.semester} ${item.tahunAkademik}`;
            if (!acc[semesterKey]) acc[semesterKey] = [];
            acc[semesterKey].push(item);
            return acc;
        }, {} as Record<string, KhsDTO[]>);
    }, [khs]);

    const sortedSemesterKeys = Object.keys(groupedSemesters).sort();

    // Kalkulasi IPS per semester
    const calculateIps = (mataKuliah: KhsDTO[]) => {
        const gradeToWeight = (grade: string): number => {
            const gradeMap: { [key: string]: number } = {'A':4.0,'A-':3.7,'B+':3.3,'B':3.0,'B-':2.7,'C+':2.3,'C':2.0,'D':1.0,'E':0.0};
            return gradeMap[grade.toUpperCase()] || 0;
        };
        const total = mataKuliah.reduce((acc, item) => {
            const weight = gradeToWeight(item.nilaiHuruf);
            acc.totalQualityPoints += item.sks * weight;
            acc.totalSks += item.sks;
            return acc;
        }, { totalQualityPoints: 0, totalSks: 0 });
        return total.totalSks > 0 ? (total.totalQualityPoints / total.totalSks).toFixed(2) : '0.00';
    };

    const isLoading = isLoadingKhs || isLoadingSummary || isLoadingProfile;
    const error = errorKhs || errorSummary || errorProfile;

    if (isLoading) {
        return <div className="p-8 text-center">Memuat data transkrip untuk dicetak...</div>;
    }

    if (error) {
        return <div className="p-8 text-center text-red-600">Error: {error}</div>;
    }

    return (
        <div className="bg-white text-gray-900 font-sans p-8 max-w-4xl mx-auto">
            <div className="mb-8 text-center print:hidden">
                <Button onClick={() => window.print()}>
                    <Printer size={16} className="mr-2" />
                    Cetak Halaman Ini
                </Button>
            </div>

            <header className="border-b-4 border-gray-900 pb-4 mb-6 text-center">
                <h1 className="text-2xl font-bold">TRANSKRIP NILAI AKADEMIK</h1>
                <p className="text-lg">Sekolah Tinggi Teologi Injili Setia Siau</p>
            </header>

            <section className="grid grid-cols-2 gap-x-8 mb-6 text-sm">
                <div>
                    <p><span className="font-semibold w-32 inline-block">Nama Mahasiswa</span>: {mahasiswa?.nama}</p>
                    <p><span className="font-semibold w-32 inline-block">NIM</span>: {mahasiswa?.nim}</p>
                </div>
                <div>
                    <p><span className="font-semibold w-32 inline-block">Program Studi</span>: {mahasiswa?.prodi}</p>
                    <p><span className="font-semibold w-32 inline-block">Status</span>: {mahasiswa?.status}</p>
                </div>
            </section>

            <main className="space-y-6">
                {sortedSemesterKeys.map((semesterKey) => {
                    const courses = groupedSemesters[semesterKey];
                    const ips = calculateIps(courses);
                    return (
                        <div key={semesterKey}>
                            <h2 className="font-bold text-sm bg-gray-100 p-2 border border-gray-400">Semester: {semesterKey} - IPS: {ips}</h2>
                            <table className="w-full text-sm border-collapse border border-gray-400">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="border border-gray-400 p-2 text-left w-24">Kode MK</th>
                                        <th className="border border-gray-400 p-2 text-left">Nama Mata Kuliah</th>
                                        <th className="border border-gray-400 p-2 text-center w-16">SKS</th>
                                        <th className="border border-gray-400 p-2 text-center w-16">Nilai</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {courses.map((course) => (
                                        <tr key={course.kodeMataKuliah}>
                                            <td className="border border-gray-400 p-2">{course.kodeMataKuliah}</td>
                                            <td className="border border-gray-400 p-2">{course.namaMataKuliah}</td>
                                            <td className="border border-gray-400 p-2 text-center">{course.sks}</td>
                                            <td className="border border-gray-400 p-2 text-center">{course.nilaiHuruf}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    );
                })}
            </main>

            <section className="mt-8 pt-4 border-t-2 border-gray-900 text-sm font-bold grid grid-cols-2">
                 <p>Total SKS Ditempuh: {summary?.totalSks || 0}</p>
                 <p>Indeks Prestasi Kumulatif (IPK): {summary?.ipk.toFixed(2) || '0.00'}</p>
            </section>
            
            <footer className="grid grid-cols-2 gap-x-8 mt-16 text-sm">
                <div className="text-center"></div>
                <div className="text-center">
                    <p>Siau, {new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' })}</p>
                    <p>Ketua Bidang Akademik,</p>
                    <br /><br /><br /><br />
                    <p className="font-bold underline">(Nama Ketua Akademik)</p>
                    <p>NIDN: (NIDN Ketua)</p>
                </div>
            </footer>
        </div>
    );
};

export default TranscriptPrintPage;