// program/next-js/components/fragments/AcademicView/Krs/KrsDisetujui.tsx
'use client';

import React from 'react';
import Button from '../../../elements/Button';
import Card from '../../../elements/Card';
import { CheckCircle2, Calendar, Printer } from 'lucide-react';
import type { KrsData } from '@/hooks/useKrs';

interface Props {
  krsDisetujui: KrsData[];
  onNavigateToJadwal: () => void;
}

const KrsDisetujui: React.FC<Props> = ({ krsDisetujui, onNavigateToJadwal }) => {
  const totalSks = krsDisetujui.reduce((sum, item) => sum + item.sks, 0);

  // Fungsi untuk membuka halaman cetak di tab baru
  const handlePrint = () => {
    window.open('/mahasiswa/krs/cetak', '_blank');
  };

  return (
    <Card>
      <div className="text-center bg-green-50 border border-green-200 p-8 rounded-t-lg">
        <div className="flex justify-center mb-4">
          <CheckCircle2 className="h-16 w-16 text-green-600"/>
        </div>
        <h3 className="text-2xl font-bold text-green-800 mb-2">KRS Telah Disetujui!</h3>
        <p className="text-green-700 mb-6 max-w-md mx-auto">
          Selamat! KRS Anda telah divalidasi oleh Dosen PA. Anda sekarang resmi terdaftar pada mata kuliah semester ini.
        </p>
        <div className="flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-4">
            <Button variant="primary" onClick={onNavigateToJadwal}>
                <Calendar size={16} className="mr-2"/>
                Lihat Jadwal Kuliah
            </Button>
            {/* Tombol Cetak sekarang membuka halaman baru */}
            <Button variant="secondary" onClick={handlePrint}>
                <Printer size={16} className="mr-2"/>
                Cetak Bukti KRS
            </Button>
        </div>
      </div>
      <div className="p-6">
        <h4 className="font-semibold mb-4 text-center">Mata Kuliah yang Disetujui</h4>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th className="px-6 py-3">Kode MK</th>
                <th className="px-6 py-3">Nama Matakuliah</th>
                <th className="px-6 py-3">Dosen</th>
                <th className="px-6 py-3 text-center">SKS</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {krsDisetujui.map(krs => (
                <tr key={krs.krsId}>
                  <td className="px-6 py-4 font-mono">{krs.kodeMataKuliah}</td>
                  <td className="px-6 py-4 font-medium">{krs.namaMataKuliah}</td>
                  <td className="px-6 py-4 text-gray-600">{krs.namaDosen}</td>
                  <td className="px-6 py-4 text-center">{krs.sks}</td>
                </tr>
              ))}
            </tbody>
            <tfoot className="bg-gray-100 font-bold">
              <tr>
                <td colSpan={3} className="px-6 py-3 text-right">Total SKS</td>
                <td className="px-6 py-3 text-center text-indigo-600">{totalSks}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </Card>
  );
};

export default KrsDisetujui;