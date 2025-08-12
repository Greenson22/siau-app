'use client';

import { InfoItem } from '@/components/fragments/ProfileView';
import { Mail, Phone, Home, Calendar, User } from 'lucide-react'; // Menambahkan ikon User

// Definisikan tipe data yang diharapkan, termasuk jenisKelamin
interface MahasiswaProfileData {
    ttl: string;
    email: string;
    telepon: string;
    alamat: string;
    jenisKelamin: string; // Menambahkan jenisKelamin ke interface
}

interface BiodataMahasiswaSectionProps {
    mahasiswa: MahasiswaProfileData;
}

const BiodataMahasiswaSection = ({ mahasiswa }: BiodataMahasiswaSectionProps) => (
    <div className="space-y-4 text-sm">
        <h4 className="font-bold text-lg text-gray-700 mb-4">Informasi Pribadi</h4>
        <InfoItem icon={<Calendar size={16} />} label="Tempat, Tanggal Lahir" value={mahasiswa.ttl} />
        {/* Menambahkan InfoItem untuk menampilkan Jenis Kelamin */}
        <InfoItem icon={<User size={16} />} label="Jenis Kelamin" value={mahasiswa.jenisKelamin} />
        <InfoItem icon={<Mail size={16} />} label="Email" value={mahasiswa.email} />
        <InfoItem icon={<Phone size={16} />} label="No. Telepon" value={mahasiswa.telepon} />
        <InfoItem icon={<Home size={16} />} label="Alamat" value={mahasiswa.alamat} isBlock />
    </div>
);

export default BiodataMahasiswaSection;