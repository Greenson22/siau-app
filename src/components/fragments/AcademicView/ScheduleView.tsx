// src/components/fragments/AcademicView/ScheduleView.tsx
import React from 'react';
import { dataAkademik } from '@/lib/data';
import { Clock, User, BookOpen, MapPin } from 'lucide-react';

const ScheduleView = () => {
  const { jadwal, krs } = dataAkademik;

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

  // Menyusun kembali urutan hari sesuai daysOrder
  const sortedDays = daysOrder.filter(day => groupedSchedule[day]);

  return (
    <div>
      <h4 className="font-bold text-lg text-gray-800 mb-1">Jadwal Kuliah</h4>
      <p className="text-sm text-gray-500 mb-6">Semester {krs.semester}</p>

      {sortedDays.length > 0 ? (
        <div className="space-y-6">
          {sortedDays.map(day => (
            <div key={day}>
              <h5 className="font-semibold text-indigo-600 mb-3 border-b pb-2">{day}</h5>
              <div className="space-y-4">
                {groupedSchedule[day].map((item, index) => (
                  <div key={index} className="p-4 rounded-lg border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow">
                    <p className="font-bold text-md text-gray-900 mb-3">{item.nama}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Clock size={14} className="mr-2 text-gray-400 flex-shrink-0" />
                        <span>{item.waktu}</span>
                      </div>
                      <div className="flex items-center">
                        <User size={14} className="mr-2 text-gray-400 flex-shrink-0" />
                        <span>{item.dosen}</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin size={14} className="mr-2 text-gray-400 flex-shrink-0" />
                        <span>Ruang: {item.ruang}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-8">Tidak ada jadwal kuliah untuk semester ini.</p>
      )}
    </div>
  );
};

export default ScheduleView;