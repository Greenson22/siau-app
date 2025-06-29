'use client';

import { useState } from 'react';
import { MataKuliah, maxSks } from '@/lib/data';
import KrsInfo from './KrsInfo';
import KrsTable from './KrsTable';
import Button from '@/components/elements/Button';
import Card from '@/components/elements/Card';

interface KrsViewProps {
  dataMataKuliah: MataKuliah[];
}

export default function KrsView({ dataMataKuliah }: KrsViewProps) {
  const [selectedCourses, setSelectedCourses] = useState<number[]>([]);
  const [totalSks, setTotalSks] = useState(0);

  const handleSelectCourse = (id: number, sks: number) => {
    setSelectedCourses((prevSelected) => {
      if (prevSelected.includes(id)) {
        setTotalSks(totalSks - sks);
        return prevSelected.filter((courseId) => courseId !== id);
      } else {
        setTotalSks(totalSks + sks);
        return [...prevSelected, id];
      }
    });
  };
  
  const handleSubmit = () => {
    if (totalSks > maxSks) {
      alert('Jumlah SKS yang dipilih melebihi batas maksimal!');
    } else if (totalSks === 0) {
      alert('Anda belum memilih mata kuliah.');
    } else {
      alert(`KRS berhasil diajukan dengan total ${totalSks} SKS.`);
      // Logika pengiriman data bisa ditambahkan di sini
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Pengisian Kartu Rencana Studi</h1>
      <KrsInfo sksTerpilih={totalSks} maksSks={maxSks} />
      <Card>
        <KrsTable
          matakuliah={dataMataKuliah}
          selectedCourses={selectedCourses}
          onCourseSelect={handleSelectCourse}
        />
      </Card>
      <div className="flex justify-end">
        <Button onClick={handleSubmit} disabled={totalSks === 0}>
          Ajukan KRS
        </Button>
      </div>
    </div>
  );
}