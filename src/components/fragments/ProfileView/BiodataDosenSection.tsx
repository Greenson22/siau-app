'use client';

import { Mail, Phone, Building } from 'lucide-react';
import { dosen } from '@/lib/dataDosen';
import { InfoItem } from '@/components/fragments/ProfileView';

const BiodataDosenSection = () => (
    <div className="space-y-4 text-sm">
        <h4 className="font-bold text-lg text-gray-700 mb-4">Informasi Kontak & Pribadi</h4>
        <InfoItem icon={<Mail size={16} />} label="Alamat Email" value={dosen.email} />
        <InfoItem icon={<Phone size={16} />} label="No. Telepon" value={dosen.telepon} />
        <InfoItem icon={<Building size={16} />} label="Alamat Kantor" value={dosen.alamatKantor} isBlock />
    </div>
);

export default BiodataDosenSection;