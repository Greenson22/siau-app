// src/components/fragments/KrsBelumKontrak.tsx
import React from 'react';
import Button from '../elements/Button';
import Card from '../elements/Card';

interface Matkul {
  kode: string;
  nama: string;
  sks: number;
}

interface KrsBelumKontrakProps {
  matakuliah: Matkul[];
  onAjukan: () => void;
}

const KrsBelumKontrak: React.FC<KrsBelumKontrakProps> = ({ matakuliah, onAjukan }) => {
  return (
    <Card>
      <h3 className="text-xl font-bold mb-4">Paket Matakuliah Semester 3</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kode MK</th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama Matakuliah</th>
              <th className="py-3 px-6 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">SKS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {matakuliah.map((mk) => (
              <tr key={mk.kode}>
                <td className="py-4 px-6 whitespace-nowrap">{mk.kode}</td>
                <td className="py-4 px-6 whitespace-nowrap font-medium">{mk.nama}</td>
                <td className="py-4 px-6 whitespace-nowrap text-center">{mk.sks}</td>
              </tr>
            ))}
          </tbody>
           <tfoot className="bg-gray-50">
                <tr>
                    <td colSpan={2} className="py-3 px-6 text-right font-bold">Total SKS</td>
                    <td className="py-3 px-6 text-center font-bold">
                        {matakuliah.reduce((total, mk) => total + mk.sks, 0)}
                    </td>
                </tr>
            </tfoot>
        </table>
      </div>
      <div className="mt-8 text-center">
        <Button onClick={onAjukan} variant="primary">
          Ajukan Kontrak KRS
        </Button>
      </div>
    </Card>
  );
};

export default KrsBelumKontrak;