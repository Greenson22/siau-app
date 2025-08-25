'use client';

import { Mail, Phone, Building } from 'lucide-react';
import { InfoItem } from '@/components/fragments/ProfileView';
import { DosenProfile } from '@/hooks/useDosenProfile'; // <-- Impor tipe data

interface BiodataDosenSectionProps {
    profile: DosenProfile;
}

const BiodataDosenSection = ({ profile }: BiodataDosenSectionProps) => (
    <div className="space-y-4 text-sm">
        <h4 className="font-bold text-lg text-gray-700 mb-4">Informasi Kontak & Pribadi</h4>
        <InfoItem icon={<Mail size={16} />} label="Alamat Email" value={profile.emailPribadi || '-'} />
        <InfoItem icon={<Phone size={16} />} label="No. Telepon" value={profile.nomorTelepon || '-'} />
        <InfoItem icon={<Building size={16} />} label="Alamat Kantor" value={profile.alamat || '-'} isBlock />
    </div>
);

export default BiodataDosenSection;