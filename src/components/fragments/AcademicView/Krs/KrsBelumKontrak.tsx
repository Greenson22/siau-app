// src/components/fragments/AcademicView/Krs/KrsBelumKontrak.tsx
import React from 'react';
import Button from '../../../elements/Button';
import Card from '../../../elements/Card';

// Tipe data untuk matakuliah, sesuaikan dengan hook
interface Matkul {
  kodeMk: string;
  namaMatakuliah: string;
  sks: number;
}

// Tipe data untuk props, termasuk nama paket dan total SKS dari API
interface KrsBelumKontrakProps {
  namaPaket: string;
  matakuliah: Matkul[];
  totalSks: number;
  onAjukan: () => void;
}

const KrsBelumKontrak: React.FC<KrsBelumKontrakProps> = ({ namaPaket, matakuliah, totalSks, onAjukan }) => {
  return (
    <Card>
      {/* Judul paket sekarang dinamis */}
      <h3 className="text-xl font-bold mb-4">{namaPaket}</h3>
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
              // Gunakan kodeMk sebagai key yang lebih unik
              <tr key={mk.kodeMk}>
                <td className="py-4 px-6 whitespace-nowrap">{mk.kodeMk}</td>
                <td className="py-4 px-6 whitespace-nowrap font-medium">{mk.namaMatakuliah}</td>
                <td className="py-4 px-6 whitespace-nowrap text-center">{mk.sks}</td>
              </tr>
            ))}
          </tbody>
           <tfoot className="bg-gray-50">
                <tr>
                    <td colSpan={2} className="py-3 px-6 text-right font-bold">Total SKS</td>
                    {/* Total SKS juga diambil dari data dinamis */}
                    <td className="py-3 px-6 text-center font-bold">
                        {totalSks}
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