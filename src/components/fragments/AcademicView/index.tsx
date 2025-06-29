'use client';

import Card from '@/components/elements/Card';
import React, { useState } from 'react';

type AcademicTab = 'krs' | 'khs' | 'transkrip' | 'jadwal';

const AcademicView = () => {
  const [activeTab, setActiveTab] = useState<AcademicTab>('krs');

  const tabs: { id: AcademicTab, label: string }[] = [
    { id: 'krs', label: 'KRS' },
    { id: 'khs', label: 'KHS' },
    { id: 'transkrip', label: 'Transkrip Nilai' },
    { id: 'jadwal', label: 'Jadwal Kuliah' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'krs':
        return (
          <>
            <h4 className="font-bold text-lg mb-4 text-gray-800">Kartu Rencana Studi - Semester Ganjil 2025/2026</h4>
            <p className="text-sm mb-4 text-gray-500">Status: <span className="font-semibold text-green-600">Disetujui oleh Dosen PA</span></p>
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr><th className="px-6 py-3">Kode MK</th><th className="px-6 py-3">Mata Kuliah</th><th className="px-6 py-3">SKS</th></tr>
              </thead>
              <tbody>
                <tr className="bg-white border-b"><td className="px-6 py-4">TEO501</td><td className="px-6 py-4">Teologi Sistematika III</td><td className="px-6 py-4">3</td></tr>
                <tr className="bg-white border-b"><td className="px-6 py-4">PAK503</td><td className="px-6 py-4">Hermeneutik II</td><td className="px-6 py-4">3</td></tr>
                <tr className="bg-white border-b"><td className="px-6 py-4">BIB505</td><td className="px-6 py-4">Bahasa Yunani II</td><td className="px-6 py-4">2</td></tr>
              </tbody>
            </table>
          </>
        );
      case 'khs':
        return (
          <>
            <h4 className="font-bold text-lg mb-4 text-gray-800">Kartu Hasil Studi - Semester Genap 2024/2025</h4>
            <p className="text-sm mb-4 text-gray-500">IPS: <span className="font-semibold text-gray-800">3.80</span> | SKS: <span className="font-semibold text-gray-800">21</span></p>
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr><th className="px-6 py-3">Mata Kuliah</th><th className="px-6 py-3">SKS</th><th className="px-6 py-3">Nilai Huruf</th><th className="px-6 py-3">Nilai Angka</th></tr>
              </thead>
              <tbody>
                <tr className="bg-white border-b"><td className="px-6 py-4">Teologi Sistematika II</td><td className="px-6 py-4">3</td><td className="px-6 py-4">A</td><td className="px-6 py-4">4.00</td></tr>
                <tr className="bg-white border-b"><td className="px-6 py-4">Hermeneutik I</td><td className="px-6 py-4">3</td><td className="px-6 py-4">A-</td><td className="px-6 py-4">3.70</td></tr>
                <tr className="bg-white border-b"><td className="px-6 py-4">Bahasa Yunani I</td><td className="px-6 py-4">2</td><td className="px-6 py-4">A</td><td className="px-6 py-4">4.00</td></tr>
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
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
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