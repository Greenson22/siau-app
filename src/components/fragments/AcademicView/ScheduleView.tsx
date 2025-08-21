// program/next-js/components/fragments/AcademicView/ScheduleView.tsx
'use client';

import React from 'react';
import { useJadwalKuliah } from '@/hooks/useJadwalKuliah'; // Impor hook baru
import { useAkademikSummary } from '@/hooks/useAkademikSummary'; // Untuk mendapatkan semester
import Card from '@/components/elements/Card'; // Impor Card untuk pesan error/loading
import { Clock, User, MapPin, AlertCircle } from 'lucide-react';

const ScheduleView = () => {
  const { jadwal, isLoading: isLoadingJadwal, error: errorJadwal } = useJadwalKuliah();
  const { summary, isLoading: isLoadingSummary, error: errorSummary } = useAkademikSummary();

  // Urutan hari yang diinginkan
  const daysOrder = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'];

  // Mengelompokkan jadwal berdasarkan hari
  const groupedSchedule = jadwal.reduce((acc, item) => {
    const day = item.hari;
    if (!acc[day]) {
      acc[day] = [];
    }
    acc[day].push(item);
    return acc;
  }, {} as Record<string, typeof jadwal>);

  const sortedDays = daysOrder.filter(day => groupedSchedule[day]);

  // Handle loading and error states
  if (isLoadingJadwal || isLoadingSummary) {
    return <Card><p>Memuat jadwal kuliah...</p></Card>;
  }

  const anyError = errorJadwal || errorSummary;
  if (anyError) {
    return (
      <Card className="bg-red-50 border-red-200 text-red-700 p-4 flex items-center gap-3">
        <AlertCircle />
        <p>Error: {anyError}</p>
      </Card>
    );
  }

  return (
    <div>
      <h4 className="font-bold text-lg text-gray-800 mb-1">Jadwal Kuliah</h4>
      <p className="text-sm text-gray-500 mb-6">Semester {summary?.semesterAktif || 'Saat Ini'}</p>

      {sortedDays.length > 0 ? (
        <div className="space-y-6">
          {sortedDays.map(day => (
            <div key={day}>
              <h5 className="font-semibold text-indigo-600 mb-3 border-b pb-2">{day}</h5>
              <div className="space-y-4">
                {groupedSchedule[day].map((item, index) => (
                  <div key={index} className="p-4 rounded-lg border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow">
                    <p className="font-bold text-md text-gray-900 mb-3">{item.namaMataKuliah}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Clock size={14} className="mr-2 text-gray-400 flex-shrink-0" />
                        <span>{item.jadwal}</span>
                      </div>
                      <div className="flex items-center">
                        <User size={14} className="mr-2 text-gray-400 flex-shrink-0" />
                        <span>{item.dosenPengajar}</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin size={14} className="mr-2 text-gray-400 flex-shrink-0" />
                        <span>Ruang: {item.ruangan}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <Card>
            <p className="text-center text-gray-500 mt-8">Tidak ada jadwal kuliah yang ditemukan untuk semester ini.</p>
        </Card>
      )}
    </div>
  );
};

export default ScheduleView;