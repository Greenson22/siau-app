// program/next-js/components/fragments/AcademicView/Krs/KrsMenungguPersetujuan.tsx
import React from 'react';
import Card from '../../../elements/Card';
import { Hourglass } from 'lucide-react';
import type { KrsData } from '@/hooks/useKrs'; // Impor tipe data

interface Props {
  krsDiajukan: KrsData[];
}

const KrsMenungguPersetujuan: React.FC<Props> = ({ krsDiajukan }) => {
  const totalSks = krsDiajukan.reduce((sum, item) => sum + item.sks, 0);

  return (
    <Card>
       <div className="p-8 text-center border-b">
        <div className="flex justify-center mb-4">
          <Hourglass className="h-16 w-16 text-blue-500 animate-spin" style={{ animationDuration: '3s' }}/>
        </div>
        <h3 className="text-2xl font-bold text-blue-800 mb-2">Pengajuan KRS Terkirim</h3>
        <p className="text-blue-700 max-w-md mx-auto">
          KRS Anda telah berhasil diajukan dan sedang menunggu validasi dari Dosen Pembimbing Akademik (PA) Anda. Silakan cek kembali halaman ini secara berkala.
        </p>
      </div>
      {/* Tampilkan daftar mata kuliah yang diajukan */}
      <div className="p-6">
        <h4 className="font-semibold mb-4 text-center">Mata Kuliah yang Diajukan</h4>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th className="px-6 py-3">Kode MK</th>
                <th className="px-6 py-3">Nama Matakuliah</th>
                <th className="px-6 py-3 text-center">SKS</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {krsDiajukan.map(krs => (
                <tr key={krs.krsId}>
                  <td className="px-6 py-4 font-mono">{krs.kodeMataKuliah}</td>
                  <td className="px-6 py-4 font-medium">{krs.namaMataKuliah}</td>
                  <td className="px-6 py-4 text-center">{krs.sks}</td>
                </tr>
              ))}
            </tbody>
            <tfoot className="bg-gray-100 font-bold">
              <tr>
                <td colSpan={2} className="px-6 py-3 text-right">Total SKS</td>
                <td className="px-6 py-3 text-center text-indigo-600">{totalSks}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </Card>
  );
};

export default KrsMenungguPersetujuan;