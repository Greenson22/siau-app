'use client';

import { useState } from 'react';
import Card from '@/components/elements/Card';
import Button from '@/components/elements/Button';
import Input from '@/components/elements/Input';
import { dosen, ProfileDosenTab } from '@/lib/dataDosen';
import {
    Award, BrainCircuit, Building, GraduationCap, Mail, Phone, KeyRound, BookUser, BookCheck
} from 'lucide-react';

interface ProfileDosenViewProps {
  initialTab?: ProfileDosenTab;
}

const ProfileDosenView: React.FC<ProfileDosenViewProps> = ({ initialTab = 'biodata' }) => {
    const [activeTab, setActiveTab] = useState<ProfileDosenTab>(initialTab);

    const renderContent = () => {
        switch (activeTab) {
            case 'biodata':
                return <BiodataDosenSection />;
            case 'akademik':
                return <AkademikDosenSection />;
            case 'keamanan':
                return <KeamananSection />;
            default:
                return <BiodataDosenSection />;
        }
    };

    return (
        <Card className="max-w-4xl mx-auto">
            {/* Header Profil Dosen */}
            <div className="flex flex-col md:flex-row items-center gap-8 border-b border-gray-200 pb-6 mb-6">
                <img 
                    src={dosen.fotoProfil} 
                    alt="Foto Profil Dosen" 
                    className="w-32 h-32 rounded-full shadow-md object-cover ring-2 ring-offset-2 ring-indigo-200"
                />
                <div className="flex-1 text-center md:text-left">
                    <p className="text-2xl font-bold text-gray-800">{dosen.nama}</p>
                    <p className="text-indigo-600 font-medium">{dosen.jabatanAkademik}</p>
                    <div className="mt-2 flex items-center justify-center md:justify-start gap-2 text-sm">
                        <Award size={16} className="text-gray-500" />
                        <span className="font-semibold text-gray-600">NIDN:</span>
                        <span>{dosen.nidn}</span>
                    </div>
                     <div className="mt-1 flex items-center justify-center md:justify-start gap-2 text-sm">
                        <BookUser size={16} className="text-gray-500" />
                        <span className="font-semibold text-gray-600">Status:</span>
                        <span className="px-2 py-0.5 bg-green-100 text-green-800 rounded-full text-xs font-medium">{dosen.peran}</span>
                    </div>
                </div>
            </div>

            {/* Tombol Navigasi Tab */}
            <div className="flex border-b border-gray-200 mb-6">
                <TabButton id="biodata" label="Biodata" activeTab={activeTab} setActiveTab={setActiveTab} />
                <TabButton id="akademik" label="Info Akademik" activeTab={activeTab} setActiveTab={setActiveTab} />
                <TabButton id="keamanan" label="Keamanan" activeTab={activeTab} setActiveTab={setActiveTab} />
            </div>
            
            <div>
                {renderContent()}
            </div>
        </Card>
    );
};

// Komponen Tombol Tab
const TabButton = ({ id, label, activeTab, setActiveTab }: { id: ProfileDosenTab, label: string, activeTab: ProfileDosenTab, setActiveTab: (id: ProfileDosenTab) => void }) => (
    <button
        onClick={() => setActiveTab(id)}
        className={`px-4 py-2 text-sm font-medium transition-colors duration-200 -mb-px ${
            activeTab === id
                ? 'border-b-2 border-indigo-600 text-indigo-600'
                : 'border-b-2 border-transparent text-gray-500 hover:text-gray-700'
        }`}
    >
        {label}
    </button>
);

// Komponen untuk Bagian Biodata Dosen
const BiodataDosenSection = () => (
    <div className="space-y-4 text-sm">
        <h4 className="font-bold text-lg text-gray-700 mb-4">Informasi Kontak & Pribadi</h4>
        <InfoItem icon={<Mail size={16} />} label="Alamat Email" value={dosen.email} />
        <InfoItem icon={<Phone size={16} />} label="No. Telepon" value={dosen.telepon} />
        <InfoItem icon={<Building size={16} />} label="Alamat Kantor" value={dosen.alamatKantor} isBlock />
    </div>
);

// Komponen untuk Bagian Akademik Dosen
const AkademikDosenSection = () => (
     <div className="space-y-6 text-sm">
        <div>
            <h4 className="font-bold text-lg text-gray-700 mb-4">Informasi Akademik</h4>
            <div className="space-y-4">
                <InfoItem icon={<BookCheck size={16} />} label="Jabatan Fungsional" value={dosen.jabatanAkademik} />
                <InfoItem icon={<BrainCircuit size={16} />} label="Bidang Keahlian" value={dosen.spesialisasi} isBlock />
            </div>
        </div>
         <div>
            <h4 className="font-bold text-lg text-gray-700 mt-6 mb-4">Riwayat Pendidikan</h4>
            <ul className="space-y-3">
                {dosen.riwayatPendidikan.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                        <GraduationCap className="text-indigo-500 mt-1 flex-shrink-0" size={18} />
                        <div>
                            <p className="font-semibold text-gray-800">{item.jenjang}</p>
                            <p className="text-gray-600">{item.institusi} - Lulus {item.tahun}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    </div>
);

// Komponen untuk Bagian Keamanan (Ganti Password) - Reusable
const KeamananSection = () => {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert('Fitur ganti password sedang dalam pengembangan.');
    };

    return (
        <div className="max-w-md">
            <h4 className="font-bold text-lg text-gray-700 mb-4">Ganti Password</h4>
            <form onSubmit={handleSubmit} className="space-y-4">
                <Input id="password-lama" label="Password Lama" type="password" required />
                <Input id="password-baru" label="Password Baru" type="password" required />
                <Input id="konfirmasi-password" label="Konfirmasi Password Baru" type="password" required />
                <div className="pt-2">
                    <Button type="submit">Simpan Perubahan</Button>
                </div>
            </form>
        </div>
    );
};

// Komponen item info yang dapat digunakan kembali - Reusable
const InfoItem = ({ icon, label, value, isBlock = false }: { icon: React.ReactNode, label: string, value: string | number, isBlock?: boolean }) => (
    <div className={`flex ${isBlock ? 'flex-col sm:flex-row' : 'flex-row'} items-start sm:items-center gap-x-4 gap-y-1`}>
        <div className="flex items-center gap-2 min-w-[240px] text-gray-500">
            {icon}
            <span className="font-semibold">{label}:</span>
        </div>
        <span className="text-gray-800">{value}</span>
    </div>
);

export default ProfileDosenView;