// src/components/fragments/AcademicView/index.tsx

'use client';

import Card from '@/components/elements/Card';
import React, { useState } from 'react';
import { dataAkademik } from '@/lib/data';
import KrsView from '../KrsView'; // Impor komponen baru

type AcademicTab = 'isi_krs' | 'krs' | 'khs' | 'transkrip' | 'jadwal';

const AcademicView = () => {
  const [activeTab, setActiveTab] = useState<AcademicTab>('isi_krs');

  const tabs: { id: AcademicTab, label: string }[] = [
    { id: 'isi_krs', label: 'Isi KRS' },
    { id: 'krs', label: 'KRS' },
    { id: 'khs', label: 'KHS' },
    { id: 'transkrip', label: 'Transkrip Nilai' },
    { id: 'jadwal', label: 'Jadwal Kuliah' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'isi_krs':
        return <KrsView />; // Tampilkan komponen form KRS
      case 'krs':
        return (
          <>
            <h4 className="font-bold text-lg mb-4 text-gray-800">Kartu Rencana Studi - Semester {dataAkademik.krs.semester}</h4>
            <p className="text-sm mb-4 text-gray-500">Status: <span className="font-semibold text-green-600">{dataAkademik.krs.status}</span></p>
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr><th className="px-6 py-3">Kode MK</th><th className="px-6 py-3">Mata Kuliah</th><th className="px-6 py-3">SKS</th></tr>
              </thead>
              <tbody>
                {dataAkademik.krs.mataKuliah.map((mk, index) => (
                  <tr key={index} className="bg-white border-b">
                    <td className="px-6 py-4">{mk.kode}</td>
                    <td className="px-6 py-4">{mk.nama}</td>
                    <td className="px-6 py-4">{mk.sks}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        );
      case 'khs':
        return (
          <>
            <h4 className="font-bold text-lg mb-4 text-gray-800">Kartu Hasil Studi - Semester {dataAkademik.khs.semester}</h4>
            <p className="text-sm mb-4 text-gray-500">IPS: <span className="font-semibold text-gray-800">{dataAkademik.khs.ips}</span> | SKS: <span className="font-semibold text-gray-800">{dataAkademik.khs.sks}</span></p>
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr><th className="px-6 py-3">Mata Kuliah</th><th className="px-6 py-3">SKS</th><th className="px-6 py-3">Nilai Huruf</th><th className="px-6 py-3">Nilai Angka</th></tr>
              </thead>
              <tbody>
                {dataAkademik.khs.mataKuliah.map((mk, index) => (
                  <tr key={index} className="bg-white border-b">
                    <td className="px-6 py-4">{mk.nama}</td>
                    <td className="px-6 py-4">{mk.sks}</td>
                    <td className="px-6 py-4">{mk.nilaiHuruf}</td>
                    <td className="px-6 py-4">{mk.nilaiAngka.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        );
      case 'transkrip':
        return <p className="text-gray-600">Fitur Transkrip Nilai sedang dalam pengembangan.</p>;
      case 'jadwal':
        return <p className="text-gray-600">Fitur Jadwal Kuliah sedang dalam pengembangan.</p>;
      default:
        return null;
    }
  };

  return (
    <Card>
      <h3 className="text-xl font-bold mb-4 text-gray-800">Informasi Akademik</h3>
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8 overflow-x-auto" aria-label="Tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
      <div className="mt-6">
        {renderContent()}
      </div>
    </Card>
  );
};

export default AcademicView;