'use client';

import { Mail, Phone, Building, User, Info } from 'lucide-react';
import { InfoItem } from '@/components/fragments/ProfileView';
import { AdminProfile } from '@/hooks/useAdminProfile'; // Impor tipe data

interface BiodataAdminSectionProps {
    profile: AdminProfile; // Terima data profil sebagai props
}

const BiodataAdminSection = ({ profile }: BiodataAdminSectionProps) => (
    <div className="space-y-4 text-sm">
        <h4 className="font-bold text-lg text-gray-700 mb-4">Informasi Kontak & Pribadi</h4>
        <InfoItem icon={<User size={16} />} label="Nama Lengkap" value={profile.namaLengkap} />
        <InfoItem icon={<Info size={16} />} label="NIP" value={profile.nip} />
        <InfoItem icon={<User size={16} />} label="Jabatan/Posisi" value={profile.jabatan} />
        <InfoItem icon={<Mail size={16} />} label="Alamat Email" value={profile.email} />
        <InfoItem icon={<Phone size={16} />} label="No. Telepon Kantor" value={profile.teleponKantor} /> 
        <InfoItem icon={<Building size={16} />} label="Lokasi Kantor" value={profile.lokasiKantor} isBlock />
    </div>
);

export default BiodataAdminSection;