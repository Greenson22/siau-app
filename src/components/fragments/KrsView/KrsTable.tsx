import { MataKuliah } from '@/lib/data';
import Checkbox from '@/components/elements/Checkbox';

interface KrsTableProps {
  matakuliah: MataKuliah[];
  selectedCourses: number[];
  onCourseSelect: (id: number, sks: number) => void;
}

export default function KrsTable({ matakuliah, selectedCourses, onCourseSelect }: KrsTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pilih</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kode MK</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama Mata Kuliah</th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">SKS</th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Semester</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {matakuliah.map((mk) => (
            <tr key={mk.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <Checkbox
                  checked={selectedCourses.includes(mk.id)}
                  onChange={() => onCourseSelect(mk.id, mk.sks)}
                />
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{mk.kode}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{mk.nama}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">{mk.sks}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">{mk.semester}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}