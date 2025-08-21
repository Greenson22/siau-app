// program/next-js/components/layouts/KrsPrintPage.tsx
'use client';

import React from 'react';
import { useKrs } from '@/hooks/useKrs';
import { useMahasiswaProfile } from '@/hooks/useMahasiswaProfile';
import Logo from '../elements/Logo';
import Button from '../elements/Button';
import { Printer } from 'lucide-react';

const KrsPrintPage = () => {
    const { krsData, isLoading: isLoadingKrs, error: errorKrs } = useKrs();
    const { mahasiswa, isLoading: isLoadingProfile, error: errorProfile } = useMahasiswaProfile();

    if (isLoadingKrs || isLoadingProfile) {
        return <div className="p-8 text-center">Memuat data untuk dicetak...</div>;
    }

    const error = errorKrs || errorProfile;
    if (error) {
        return <div className="p-8 text-center text-red-600">Error: {error}</div>;
    }

    const krsDisetujui = krsData.filter(k => k.statusPersetujuan === 'DISETUJUI');
    const totalSks = krsDisetujui.reduce((sum, item) => sum + item.sks, 0);

    return (
        <div className="bg-white text-gray-900 font-sans p-8 max-w-4xl mx-auto">
            {/* Tombol Print (hanya tampil di layar, hilang saat dicetak) */}
            <div className="mb-8 text-center print:hidden">
                <Button onClick={() => window.print()}>
                    <Printer size={16} className="mr-2" />
                    Cetak Halaman Ini
                </Button>
            </div>

            {/* --- Konten yang akan Dicetak --- */}
            <div className="border-b-4 border-gray-900 pb-4 mb-6 flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold">KARTU RENCANA STUDI (KRS)</h1>
                    <p className="text-lg">Sekolah Tinggi Teologi Injili Setia Siau</p>
                </div>
                <div className="w-24">
                   <Logo showText={false} />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-x-8 mb-6 text-sm">
                <div>
                    <p><span className="font-semibold w-32 inline-block">Nama Mahasiswa</span>: {mahasiswa?.nama}</p>
                    <p><span className="font-semibold w-32 inline-block">NIM</span>: {mahasiswa?.nim}</p>
                </div>
                <div>
                    <p><span className="font-semibold w-32 inline-block">Program Studi</span>: {mahasiswa?.prodi}</p>
                    <p><span className="font-semibold w-32 inline-block">Dosen P.A.</span>: {mahasiswa?.dosenPA}</p>
                </div>
            </div>

            <table className="w-full text-sm border-collapse border border-gray-400">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="border border-gray-400 p-2 text-center">No</th>
                        <th className="border border-gray-400 p-2 text-left">Kode MK</th>
                        <th className="border border-gray-400 p-2 text-left">Nama Mata Kuliah</th>
                        <th className="border border-gray-400 p-2 text-center">SKS</th>
                        <th className="border border-gray-400 p-2 text-left">Dosen Pengampu</th>
                        <th className="border border-gray-400 p-2 text-left">Jadwal</th>
                    </tr>
                </thead>
                <tbody>
                    {krsDisetujui.map((krs, index) => (
                        <tr key={krs.krsId}>
                            <td className="border border-gray-400 p-2 text-center">{index + 1}</td>
                            <td className="border border-gray-400 p-2">{krs.kodeMataKuliah}</td>
                            <td className="border border-gray-400 p-2">{krs.namaMataKuliah}</td>
                            <td className="border border-gray-400 p-2 text-center">{krs.sks}</td>
                            <td className="border border-gray-400 p-2">{krs.namaDosen}</td>
                            <td className="border border-gray-400 p-2">{krs.jadwal}</td>
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    <tr className="font-bold bg-gray-100">
                        <td colSpan={3} className="border border-gray-400 p-2 text-right">Total SKS</td>
                        <td className="border border-gray-400 p-2 text-center">{totalSks}</td>
                        <td colSpan={2} className="border border-gray-400 p-2"></td>
                    </tr>
                </tfoot>
            </table>

            <div className="grid grid-cols-2 gap-x-8 mt-12 text-sm">
                <div className="text-center">
                    <p>Mahasiswa,</p>
                    <br /><br /><br />
                    <p className="font-bold underline">{mahasiswa?.nama}</p>
                    <p>NIM: {mahasiswa?.nim}</p>
                </div>
                <div className="text-center">
                    <p>Dosen Pembimbing Akademik,</p>
                    <br /><br /><br />
                    <p className="font-bold underline">{mahasiswa?.dosenPA}</p>
                </div>
            </div>
            
            <div className="mt-12 text-center text-xs text-gray-500">
                <p>Dokumen ini dicetak dari Sistem Informasi Akademik STTIS Siau pada {new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' })}.</p>
            </div>
        </div>
    );
};

export default KrsPrintPage;