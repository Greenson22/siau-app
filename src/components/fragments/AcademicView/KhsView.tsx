// src/components/fragments/AcademicView/KhsView.tsx

'use client';

import React, { useState, useMemo } from 'react';
import { dataAkademik } from '@/lib/data';
import Card from '@/components/elements/Card';
import Select from '@/components/elements/Select';
import { GraduationCap, BookCopy, TrendingUp, CheckCircle } from 'lucide-react';

// Tipe untuk props InfoCardKHS
interface InfoCardKHSProps {
  icon: React.ElementType;
  label: string;
  value: string;
  color: string;
}

const InfoCardKHS: React.FC<InfoCardKHSProps> = ({ icon: Icon, label, value, color }) => (
  <Card className="flex items-center p-4">
    <div className={`p-3 rounded-full mr-4 ${color}`}>
      <Icon className="text-white" size={24} />
    </div>
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-2xl font-bold text-gray-800">{value}</p>
    </div>
  </Card>
);


const KhsView = () => {
  const { khs } = dataAkademik;

  // State untuk menyimpan semester yang dipilih, default ke semester terbaru
  const [selectedSemester, setSelectedSemester] = useState(khs[0].semester);

  // Cari data KHS yang sesuai dengan semester yang dipilih
  const selectedKhsData = useMemo(() => {
    return khs.find((k) => k.semester === selectedSemester);
  }, [khs, selectedSemester]);
  
  // Opsi untuk dropdown semester
  const semesterOptions = khs.map(k => ({
    value: k.semester,
    label: `Semester ${k.semester}`
  }));

  const handleSemesterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSemester(e.target.value);
  };

  if (!selectedKhsData) {
    return <Card><p>Data untuk semester yang dipilih tidak ditemukan.</p></Card>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <h4 className="font-bold text-xl text-gray-800">
          Kartu Hasil Studi (KHS)
        </h4>
        <Select
          label="Pilih Semester"
          options={semesterOptions}
          value={selectedSemester}
          onChange={handleSemesterChange}
          containerClassName="w-full md:w-64"
          id="semester-select"
        />
      </div>

      {/* Kartu Informasi IPS, SKS, IPK */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <InfoCardKHS icon={TrendingUp} label="Indeks Prestasi Semester (IPS)" value={selectedKhsData.ips} color="bg-blue-500" />
        <InfoCardKHS icon={BookCopy} label="SKS Semester" value={selectedKhsData.sks} color="bg-green-500" />
        <InfoCardKHS icon={GraduationCap} label="IP Kumulatif (IPK)" value={selectedKhsData.ipk} color="bg-indigo-500" />
        <InfoCardKHS icon={CheckCircle} label="Total SKS" value={selectedKhsData.totalSks} color="bg-yellow-500" />
      </div>

      {/* Tabel Mata Kuliah */}
      <Card>
        <h5 className="font-bold text-lg mb-4 text-gray-800">
          Daftar Nilai - Semester {selectedKhsData.semester}
        </h5>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3">Mata Kuliah</th>
                <th scope="col" className="px-6 py-3 text-center">SKS</th>
                <th scope="col" className="px-6 py-3 text-center">Nilai Huruf</th>
                <th scope="col" className="px-6 py-3 text-center">Nilai Angka</th>
              </tr>
            </thead>
            <tbody>
              {selectedKhsData.mataKuliah.map((mk, index) => (
                <tr key={index} className="bg-white border-b hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">{mk.nama}</td>
                  <td className="px-6 py-4 text-center">{mk.sks}</td>
                  <td className="px-6 py-4 text-center font-semibold text-gray-800">{mk.nilaiHuruf}</td>
                  <td className="px-6 py-4 text-center">{mk.nilaiAngka.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default KhsView;