// program/next-js/components/fragments/AcademicView/Krs/KrsMenungguPersetujuan.tsx
import React from 'react';
import Card from '../../../elements/Card';
import { Hourglass } from 'lucide-react';

const KrsMenungguPersetujuan: React.FC = () => {
  return (
    <Card className="text-center bg-blue-50 border border-blue-200">
       <div className="p-8">
        <div className="flex justify-center mb-4">
          <Hourglass className="h-16 w-16 text-blue-500 animate-spin" style={{ animationDuration: '3s' }}/>
        </div>
        <h3 className="text-2xl font-bold text-blue-800 mb-2">Pengajuan KRS Terkirim</h3>
        <p className="text-blue-700 max-w-md mx-auto">
          KRS Anda telah berhasil diajukan dan sedang menunggu validasi dari Dosen Pembimbing Akademik (PA) Anda. Silakan cek kembali halaman ini secara berkala.
        </p>
      </div>
    </Card>
  );
};

export default KrsMenungguPersetujuan;