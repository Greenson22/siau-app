// src/components/fragments/AcademicView/KhsView.tsx
import React from 'react';
import { dataAkademik } from '@/lib/data';

const KhsView = () => {
  const { khs } = dataAkademik;

  return (
    <>
      <h4 className="font-bold text-lg mb-4 text-gray-800">
        Kartu Hasil Studi - Semester {khs.semester}
      </h4>
      <p className="text-sm mb-4 text-gray-500">
        IPS: <span className="font-semibold text-gray-800">{khs.ips}</span> | SKS: <span className="font-semibold text-gray-800">{khs.sks}</span>
      </p>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">Mata Kuliah</th>
              <th scope="col" className="px-6 py-3">SKS</th>
              <th scope="col" className="px-6 py-3">Nilai Huruf</th>
              <th scope="col" className="px-6 py-3">Nilai Angka</th>
            </tr>
          </thead>
          <tbody>
            {khs.mataKuliah.map((mk, index) => (
              <tr key={index} className="bg-white border-b">
                <td className="px-6 py-4">{mk.nama}</td>
                <td className="px-6 py-4">{mk.sks}</td>
                <td className="px-6 py-4">{mk.nilaiHuruf}</td>
                <td className="px-6 py-4">{mk.nilaiAngka.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default KhsView;