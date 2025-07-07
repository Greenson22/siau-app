// src/components/fragments/KrsMenungguPersetujuan.tsx
import React from 'react';
import Card from '../../../elements/Card';

const KrsMenungguPersetujuan: React.FC = () => {
  return (
    <Card className="text-center">
       <div className="p-8">
        <h3 className="text-2xl font-bold text-gray-700 mb-2">Pengajuan KRS Terkirim</h3>
        <p className="text-gray-500 max-w-md mx-auto">
          KRS Anda telah berhasil diajukan dan sedang menunggu validasi dari Dosen Pembimbing Akademik (PA) Anda. Silakan cek kembali halaman ini secara berkala.
        </p>
      </div>
    </Card>
  );
};

export default KrsMenungguPersetujuan;