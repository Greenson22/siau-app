// src/components/fragments/KrsView/index.tsx

'use client';

import Card from '@/components/elements/Card';
import { mataKuliahTersedia } from '@/lib/data';
import { useState } from 'react';

const KrsView = () => {
  const [mataKuliah, setMataKuliah] = useState(mataKuliahTersedia.mataKuliah);

  const totalSks = mataKuliah.reduce((acc, mk) => mk.checked ? acc + mk.sks : acc, 0);

  return (
    <Card>
      <h3 className="text-xl font-bold mb-2 text-gray-800">
        Pengisian Kartu Rencana Studi
      </h3>
      <p className="text-base mb-6 text-gray-500">
        Semester {mataKuliahTersedia.semester}
      </p>

      <div className="border rounded-lg overflow-hidden">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th className="px-6 py-3">Kode MK</th>
              <th className="px-6 py-3">Mata Kuliah</th>
              <th className="px-6 py-3 text-center">SKS</th>
            </tr>
          </thead>
          <tbody>
            {mataKuliah.map((mk) => (
              <tr key={mk.kode} className="bg-white border-b">
                <td className="px-6 py-4 font-medium text-gray-900">{mk.kode}</td>
                <td className="px-6 py-4">{mk.nama}</td>
                <td className="px-6 py-4 text-center">{mk.sks}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex flex-col sm:flex-row justify-between items-center">
        <div className="text-lg font-bold text-gray-800 mb-4 sm:mb-0">
          Total SKS yang diambil: <span className="text-indigo-600">{totalSks} SKS</span>
        </div>
        <button className="w-full sm:w-auto bg-indigo-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-indigo-700 transition-colors duration-300">
          Ajukan KRS
        </button>
      </div>

      <div className="mt-4 text-xs text-gray-500">
        <p>*Sistem pengambilan KRS di STTIS Siau adalah sistem paket. Semua mata kuliah wajib diambil.</p>
        <p>*Hubungi Dosen Pembimbing Akademik (PA) untuk melakukan validasi setelah mengajukan KRS.</p>
      </div>
    </Card>
  );
};

export default KrsView;