// program/next-js/components/fragments/AcademicView/Krs/KrsBelumKontrak.tsx
import React from 'react';
import Button from '../../../elements/Button';
import Card from '../../../elements/Card';
import { BookMarked } from 'lucide-react';

interface Matkul {
  kodeMk: string;
  namaMatakuliah: string;
  sks: number;
}

interface KrsBelumKontrakProps {
  namaPaket: string;
  matakuliah: Matkul[];
  totalSks: number;
  onAjukan: () => void;
}

const KrsBelumKontrak: React.FC<KrsBelumKontrakProps> = ({ namaPaket, matakuliah, totalSks, onAjukan }) => {
  return (
    <Card>
      <div className="border-b pb-4 mb-4">
        <h3 className="text-xl font-bold text-gray-800">{namaPaket}</h3>
        <p className="text-sm text-gray-500">Berikut adalah daftar mata kuliah yang telah disiapkan untuk Anda di semester ini.</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th className="px-6 py-3">Kode MK</th>
              <th className="px-6 py-3">Nama Matakuliah</th>
              <th className="px-6 py-3 text-center">SKS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {matakuliah.map((mk) => (
              <tr key={mk.kodeMk} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap font-mono">{mk.kodeMk}</td>
                <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-800">{mk.namaMatakuliah}</td>
                <td className="px-6 py-4 whitespace-nowrap text-center">{mk.sks}</td>
              </tr>
            ))}
          </tbody>
           <tfoot className="bg-gray-100 font-bold">
                <tr>
                    <td colSpan={2} className="py-3 px-6 text-right text-gray-800">Total SKS yang Akan Ditempuh</td>
                    <td className="py-3 px-6 text-center text-lg text-indigo-600">
                        {totalSks}
                    </td>
                </tr>
            </tfoot>
        </table>
      </div>
      <div className="mt-8 text-center border-t pt-6">
        <Button onClick={onAjukan} variant="primary" className="w-full md:w-auto">
          <BookMarked size={18} className="mr-2"/>
          Ajukan Kontrak KRS
        </Button>
      </div>
    </Card>
  );
};

export default KrsBelumKontrak;