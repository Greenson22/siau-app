import React from 'react';
import { dataAkademik } from '@/lib/data';
import Card from '@/components/elements/Card';
import Button from '@/components/elements/Button';
import { Download } from 'lucide-react';

const TranscriptView = () => {
  const { ipk, totalSks, semesters } = dataAkademik.transkrip;

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
          <p className="text-2xl font-bold text-indigo-600">{ipk}</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-gray-500">Total SKS Ditempuh</p>
          <p className="text-2xl font-bold text-indigo-600">{totalSks}</p>
        </Card>
      </div>

      <div className="space-y-6">
        {semesters.map((semester, index) => (
          <Card key={index}>
            <h5 className="font-bold text-md mb-3 text-gray-700">Semester {semester.semester}</h5>
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
                  {semester.mataKuliah.map((mk, mkIndex) => (
                    <tr key={mkIndex} className="bg-white border-b">
                      <td className="px-4 py-2">{mk.kode}</td>
                      <td className="px-4 py-2 font-medium text-gray-900">{mk.nama}</td>
                      <td className="px-4 py-2 text-center">{mk.sks}</td>
                      <td className="px-4 py-2 text-center">{mk.nilaiHuruf}</td>
                      <td className="px-4 py-2 text-center">{mk.nilaiAngka.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 text-right text-sm font-semibold">
              <p>SKS Semester: {semester.sks} | IPS: {semester.ips}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TranscriptView;