// program/next-js/components/fragments/AcademicView/Krs/KrsDisetujui.tsx
import React from 'react';
import Button from '../../../elements/Button';
import Card from '../../../elements/Card';
import { CheckCircle2, Calendar, Printer } from 'lucide-react';

const KrsDisetujui: React.FC = () => {
  return (
    <Card className="text-center bg-green-50 border border-green-200">
      <div className="p-8">
        <div className="flex justify-center mb-4">
          <CheckCircle2 className="h-16 w-16 text-green-600"/>
        </div>
        <h3 className="text-2xl font-bold text-green-800 mb-2">KRS Telah Disetujui!</h3>
        <p className="text-green-700 mb-6 max-w-md mx-auto">
          Selamat! KRS Anda telah divalidasi oleh Dosen PA. Anda sekarang resmi terdaftar pada mata kuliah semester ini.
        </p>
        <div className="flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-4">
            <Button variant="primary">
                <Calendar size={16} className="mr-2"/>
                Lihat Jadwal Kuliah
            </Button>
            <Button variant="secondary">
                <Printer size={16} className="mr-2"/>
                Cetak Bukti KRS
            </Button>
        </div>
      </div>
    </Card>
  );
};

export default KrsDisetujui;