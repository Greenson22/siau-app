// program/next-js/components/fragments/AcademicView/KhsView.tsx
'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { useKhs } from '@/hooks/useKhs';
import { useAkademikSummary } from '@/hooks/useAkademikSummary'; // <-- 1. Impor hook untuk ringkasan
import { KhsDTO } from '@/types';
import Card from '@/components/elements/Card';
import Select from '@/components/elements/Select';
import { GraduationCap, BookCopy, TrendingUp, CheckCircle, AlertCircle } from 'lucide-react';

// Tipe untuk props InfoCardKHS (tidak berubah)
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
  // 2. Panggil kedua hook untuk mendapatkan semua data yang diperlukan
  const { khs, isLoading: isLoadingKhs, error: errorKhs } = useKhs();
  const { summary, isLoading: isLoadingSummary, error: errorSummary } = useAkademikSummary();
  const [selectedSemester, setSelectedSemester] = useState('');

  // Logika untuk mengelompokkan KHS per semester (tidak berubah)
  const groupedKhsData = useMemo(() => {
    if (!khs) return {};
    return khs.reduce((acc, item) => {
      const semesterKey = `${item.semester} ${item.tahunAkademik}`;
      if (!acc[semesterKey]) {
        acc[semesterKey] = [];
      }
      acc[semesterKey].push(item);
      return acc;
    }, {} as Record<string, KhsDTO[]>);
  }, [khs]);

  // Logika untuk menghitung IPS (tidak berubah)
  const calculateIps = (mataKuliah: KhsDTO[]) => {
      const gradeToWeight = (grade: string): number => {
        const gradeMap: { [key: string]: number } = {
          'A': 4.0, 'A-': 3.7, 'B+': 3.3, 'B': 3.0,
          'B-': 2.7, 'C+': 2.3, 'C': 2.0, 'D': 1.0, 'E': 0.0
        };
        return gradeMap[grade.toUpperCase()] || 0;
      };

      const total = mataKuliah.reduce((acc, item) => {
          const weight = gradeToWeight(item.nilaiHuruf);
          acc.totalQualityPoints += item.sks * weight;
          acc.totalSks += item.sks;
          return acc;
      }, { totalQualityPoints: 0, totalSks: 0 });

      return total.totalSks > 0 ? (total.totalQualityPoints / total.totalSks).toFixed(2) : '0.00';
  }

  const semesterOptions = useMemo(() => {
    return Object.keys(groupedKhsData).map(semester => ({
      value: semester,
      label: `Semester ${semester}`
    }));
  }, [groupedKhsData]);

  useEffect(() => {
    if (semesterOptions.length > 0 && !selectedSemester) {
      setSelectedSemester(semesterOptions[0].value);
    }
  }, [semesterOptions, selectedSemester]);

  const selectedKhsData = groupedKhsData[selectedSemester];

  const handleSemesterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSemester(e.target.value);
  };

  // 3. Tampilkan status loading jika salah satu data masih dimuat
  if (isLoadingKhs || isLoadingSummary) {
    return <Card><p>Memuat data Kartu Hasil Studi...</p></Card>;
  }

  // 4. Tampilkan error jika salah satu panggilan API gagal
  const anyError = errorKhs || errorSummary;
  if (anyError) {
    return <Card className="bg-red-50 border-red-200 text-red-700 p-4 flex items-center gap-3"><AlertCircle /><p>Error: {anyError}</p></Card>;
  }
  
  if (!selectedKhsData) {
    return <Card><p>Tidak ada data KHS yang tersedia untuk ditampilkan.</p></Card>;
  }

  const ips = calculateIps(selectedKhsData);
  const sksSemester = selectedKhsData.reduce((sum, item) => sum + item.sks, 0);
  
  // 5. Ambil data IPK dan total SKS dari hook summary, bukan dari data statis
  const ipk = summary?.ipk?.toFixed(2) || '0.00';
  const totalSks = summary?.totalSks?.toString() || '0';


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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <InfoCardKHS icon={TrendingUp} label="Indeks Prestasi Semester (IPS)" value={ips} color="bg-blue-500" />
        <InfoCardKHS icon={BookCopy} label="SKS Semester" value={sksSemester.toString()} color="bg-green-500" />
        <InfoCardKHS icon={GraduationCap} label="IP Kumulatif (IPK)" value={ipk} color="bg-indigo-500" />
        <InfoCardKHS icon={CheckCircle} label="Total SKS" value={totalSks} color="bg-yellow-500" />
      </div>

      <Card>
        <h5 className="font-bold text-lg mb-4 text-gray-800">
          Daftar Nilai - Semester {selectedSemester}
        </h5>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3">Kode MK</th>
                <th scope="col" className="px-6 py-3">Mata Kuliah</th>
                <th scope="col" className="px-6 py-3 text-center">SKS</th>
                <th scope="col" className="px-6 py-3 text-center">Nilai Huruf</th>
                <th scope="col" className="px-6 py-3 text-center">Nilai Angka</th>
              </tr>
            </thead>
            <tbody>
              {selectedKhsData.map((mk, index) => (
                <tr key={index} className="bg-white border-b hover:bg-gray-50">
                  <td className="px-6 py-4 font-mono">{mk.kodeMataKuliah}</td>
                  <td className="px-6 py-4 font-medium text-gray-900">{mk.namaMataKuliah}</td>
                  <td className="px-6 py-4 text-center">{mk.sks}</td>
                  <td className="px-6 py-4 text-center font-semibold text-gray-800">{mk.nilaiHuruf}</td>
                  <td className="px-6 py-4 text-center">{mk.nilaiAkhir.toFixed(2)}</td>
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