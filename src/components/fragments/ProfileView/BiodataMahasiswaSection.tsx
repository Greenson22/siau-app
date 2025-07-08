'use client';

import { InfoItem } from '@/components/fragments/ProfileView';
import { mahasiswa as MahasiswaType } from '@/lib/data';

import {
    Mail, Phone, Home, Calendar, VenetianMask
} from 'lucide-react';

interface BiodataMahasiswaSectionProps {
    mahasiswa: typeof MahasiswaType; // Komponen ini mengharapkan sebuah prop 'mahasiswa' dengan tipe 'Mahasiswa'
}

const BiodataMahasiswaSection = ({ mahasiswa }: BiodataMahasiswaSectionProps) => (
    <div className="space-y-4 text-sm">
        <h4 className="font-bold text-lg text-gray-700 mb-4">Informasi Pribadi</h4>
        <InfoItem icon={<Calendar size={16} />} label="Tempat, Tanggal Lahir" value={mahasiswa.ttl} />
        <InfoItem icon={<VenetianMask size={16} />} label="Jenis Kelamin" value={mahasiswa.jenisKelamin} />
        <InfoItem icon={<Mail size={16} />} label="Email" value={mahasiswa.email} />
        <InfoItem icon={<Phone size={16} />} label="No. Telepon" value={mahasiswa.telepon} />
        <InfoItem icon={<Home size={16} />} label="Alamat" value={mahasiswa.alamat} isBlock />
    </div>
);

export default BiodataMahasiswaSection;