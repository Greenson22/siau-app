'use client';

import { InfoItem } from '@/components/fragments/ProfileView';
import { mahasiswa } from '@/lib/data';

import {
    UserSquare, BookOpen, Star
} from 'lucide-react';

interface AkademikMahasiswaSectionProps {
    mahasiswa: typeof mahasiswa;
}

const AkademikMahasiswaSection = ({ mahasiswa }: AkademikMahasiswaSectionProps) => (
    <div className="space-y-4 text-sm">
        <h4 className="font-bold text-lg text-gray-700 mb-4">Informasi Akademik</h4>
        <InfoItem icon={<UserSquare size={16} />} label="Dosen Pembimbing Akademik" value={mahasiswa.dosenPA} />
        <InfoItem icon={<BookOpen size={16} />} label="Semester" value={mahasiswa.semester} />
        <InfoItem icon={<Star size={16} />} label="Total SKS Ditempuh" value={mahasiswa.totalSKS} />
        <InfoItem icon={<Star size={16} />} label="Indeks Prestasi Kumulatif (IPK)" value={mahasiswa.ipk.toFixed(2)} />
    </div>
);

export default AkademikMahasiswaSection;