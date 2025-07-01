// src/components/fragments/AcademicView/KrsView.tsx
import React from 'react';
import { dataAkademik } from '@/lib/data';

const KrsView = () => {
  const { krs } = dataAkademik;

  return (
    <>
      <h4 className="font-bold text-lg mb-4 text-gray-800">
        Kartu Rencana Studi - Semester {krs.semester}
      </h4>
      <p className="text-sm mb-4 text-gray-500">
        Status: <span className="font-semibold text-green-600">{krs.status}</span>
      </p>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">Kode MK</th>
              <th scope="col" className="px-6 py-3">Mata Kuliah</th>
              <th scope="col" className="px-6 py-3">SKS</th>
            </tr>
          </thead>
          <tbody>
            {krs.mataKuliah.map((mk, index) => (
              <tr key={index} className="bg-white border-b">
                <td className="px-6 py-4">{mk.kode}</td>
                <td className="px-6 py-4">{mk.nama}</td>
                <td className="px-6 py-4">{mk.sks}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default KrsView;