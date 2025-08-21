// program/next-js/components/fragments/AcademicView/TranscriptView.tsx
'use client';

import React, { useMemo } from 'react';
import { useKhs } from '@/hooks/useKhs';
import { useAkademikSummary } from '@/hooks/useAkademikSummary'; // <-- 1. Impor hook summary
import { KhsDTO } from '@/types';
import Card from '@/components/elements/Card';
import Button from '@/components/elements/Button';
import { Download, AlertCircle } from 'lucide-react';

const TranscriptView = () => {
  // 2. Gunakan kedua hook untuk mengambil data
  const { khs, isLoading: isLoadingKhs, error: errorKhs } = useKhs();
  const { summary, isLoading: isLoadingSummary, error: errorSummary } = useAkademikSummary();

  // 3. Kelompokkan data KHS berdasarkan semester (logika sama seperti KhsView)
  const groupedSemesters = useMemo(() => {
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

  const sortedSemesterKeys = Object.keys(groupedSemesters).sort(); // Urutkan semester

  // Kalkulasi IPS per semester
  const calculateIps = (mataKuliah: KhsDTO[]) => {
      const gradeToWeight = (grade: string): number => {
        const gradeMap: { [key: string]: number } = {'A':4.0,'A-':3.7,'B+':3.3,'B':3.0,'B-':2.7,'C+':2.3,'C':2.0,'D':1.0,'E':0.0};
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

  // Render state
  if (isLoadingKhs || isLoadingSummary) {
    return <Card><p>Memuat data transkrip nilai...</p></Card>;
  }

  const anyError = errorKhs || errorSummary;
  if (anyError) {
    return <Card className="bg-red-50 border-red-200 text-red-700 p-4 flex items-center gap-3"><AlertCircle /><p>Error: {anyError}</p></Card>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h4 className="font-bold text-lg text-gray-800">Transkrip Nilai Akademik</h4>
          <p className="text-sm text-gray-500">Rekapitulasi nilai semua semester.</p>
        </div>
        <Button>
          <Download size={16} className="mr-2" />
          Unduh Transkrip
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 text-center">
        <Card className="p-4">
          <p className="text-sm text-gray-500">Indeks Prestasi Kumulatif (IPK)</p>
          <p className="text-2xl font-bold text-indigo-600">{summary?.ipk.toFixed(2) || '0.00'}</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-gray-500">Total SKS Ditempuh</p>
          <p className="text-2xl font-bold text-indigo-600">{summary?.totalSks || 0}</p>
        </Card>
      </div>

      <div className="space-y-6">
        {sortedSemesterKeys.map((semesterKey, index) => {
           const semesterCourses = groupedSemesters[semesterKey];
           const ips = calculateIps(semesterCourses);
           const sksSemester = semesterCourses.reduce((sum, item) => sum + item.sks, 0);
          return(
            <Card key={index}>
              <h5 className="font-bold text-md mb-3 text-gray-700">Semester {semesterKey}</h5>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                      <th className="px-4 py-2">Kode</th>
                      <th className="px-4 py-2">Mata Kuliah</th>
                      <th className="px-4 py-2 text-center">SKS</th>
                      <th className="px-4 py-2 text-center">Nilai</th>
                      <th className="px-4 py-2 text-center">Bobot</th>
                    </tr>
                  </thead>
                  <tbody>
                    {semesterCourses.map((mk, mkIndex) => (
                      <tr key={mkIndex} className="bg-white border-b">
                        <td className="px-4 py-2 font-mono">{mk.kodeMataKuliah}</td>
                        <td className="px-4 py-2 font-medium text-gray-900">{mk.namaMataKuliah}</td>
                        <td className="px-4 py-2 text-center">{mk.sks}</td>
                        <td className="px-4 py-2 text-center">{mk.nilaiHuruf}</td>
                        <td className="px-4 py-2 text-center">{mk.nilaiAkhir.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-4 text-right text-sm font-semibold">
                <p>SKS Semester: {sksSemester} | IPS: {ips}</p>
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  );
};

export default TranscriptView;