// src/components/fragments/KrsDisetujui.tsx
import React from 'react';
import Button from '../elements/Button';
import Card from '../elements/Card';

const KrsDisetujui: React.FC = () => {
  return (
    <Card className="text-center">
      <div className="p-8">
        <h3 className="text-2xl font-bold text-green-600 mb-2">KRS Telah Disetujui!</h3>
        <p className="text-gray-500 mb-6 max-w-md mx-auto">
          Selamat! KRS Anda telah divalidasi oleh Dosen PA. Anda sekarang resmi terdaftar pada matakuliah semester ini.
        </p>
        <div className="flex justify-center space-x-4">
            <Button variant="success">Lihat Jadwal Kuliah</Button>
            <Button variant="secondary">Cetak KRS</Button>
        </div>
      </div>
    </Card>
  );
};

export default KrsDisetujui;