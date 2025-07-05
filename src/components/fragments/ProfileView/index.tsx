'use client';

import { useState } from 'react';
import Card from "@/components/elements/Card";
import Button from '@/components/elements/Button';
import Input from '@/components/elements/Input';
import { mahasiswa } from "@/lib/data";
import { 
    CreditCard, 
    User, 
    Mail, 
    Phone, 
    UserSquare, 
    Home, 
    Calendar, 
    VenetianMask, 
    BookOpen, 
    Star, 
    KeyRound 
} from "lucide-react";

// Tipe untuk Tab yang aktif
type ProfileTab = 'biodata' | 'akademik' | 'keamanan';

const ProfileView = () => {
    const [activeTab, setActiveTab] = useState<ProfileTab>('biodata');

    // Fungsi untuk merender konten berdasarkan tab yang aktif
    const renderContent = () => {
        switch (activeTab) {
            case 'biodata':
                return <BiodataSection />;
            case 'akademik':
                return <AkademikSection />;
            case 'keamanan':
                return <KeamananSection />;
            default:
                return <BiodataSection />;
        }
    };

    return (
        <Card className="max-w-4xl mx-auto">
            {/* Bagian Header Profil */}
            <div className="flex flex-col md:flex-row items-center gap-8 border-b border-gray-200 pb-6 mb-6">
                <img 
                    src={mahasiswa.fotoProfil} 
                    alt="Foto Profil Mahasiswa" 
                    className="w-32 h-32 rounded-full shadow-md object-cover ring-2 ring-offset-2 ring-indigo-200"
                />
                <div className="flex-1 text-center md:text-left">
                    <p className="text-2xl font-bold text-gray-800">{mahasiswa.nama}</p>
                    <p className="text-indigo-600 font-medium">{mahasiswa.prodi}</p>
                    <div className="mt-2 flex items-center justify-center md:justify-start gap-2 text-sm">
                        <CreditCard size={16} className="text-gray-500" />
                        <span className="font-semibold text-gray-600">NIM:</span>
                        <span>{mahasiswa.nim}</span>
                    </div>
                     <div className="mt-1 flex items-center justify-center md:justify-start gap-2 text-sm">
                        <User size={16} className="text-gray-500" />
                        <span className="font-semibold text-gray-600">Status:</span>
                        <span className="px-2 py-0.5 bg-green-100 text-green-800 rounded-full text-xs font-medium">{mahasiswa.status}</span>
                    </div>
                </div>
            </div>

            {/* Tombol Navigasi Tab */}
            <div className="flex border-b border-gray-200 mb-6">
                <TabButton id="biodata" label="Biodata" activeTab={activeTab} setActiveTab={setActiveTab} />
                <TabButton id="akademik" label="Info Akademik" activeTab={activeTab} setActiveTab={setActiveTab} />
                <TabButton id="keamanan" label="Keamanan" activeTab={activeTab} setActiveTab={setActiveTab} />
            </div>
            
            {/* Konten Tab */}
            <div>
                {renderContent()}
            </div>
        </Card>
    );
};

// Komponen untuk Tombol Tab
const TabButton = ({ id, label, activeTab, setActiveTab }: { id: ProfileTab, label: string, activeTab: ProfileTab, setActiveTab: (id: ProfileTab) => void }) => (
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

// Komponen untuk Bagian Biodata
const BiodataSection = () => (
    <div className="space-y-4 text-sm">
        <h4 className="font-bold text-lg text-gray-700 mb-4">Informasi Pribadi</h4>
        <InfoItem icon={<Calendar size={16} />} label="Tempat, Tanggal Lahir" value={mahasiswa.ttl} />
        <InfoItem icon={<VenetianMask size={16} />} label="Jenis Kelamin" value={mahasiswa.jenisKelamin} />
        <InfoItem icon={<Mail size={16} />} label="Email" value={mahasiswa.email} />
        <InfoItem icon={<Phone size={16} />} label="No. Telepon" value={mahasiswa.telepon} />
        <InfoItem icon={<Home size={16} />} label="Alamat" value={mahasiswa.alamat} isBlock />
    </div>
);

// Komponen untuk Bagian Akademik
const AkademikSection = () => (
     <div className="space-y-4 text-sm">
        <h4 className="font-bold text-lg text-gray-700 mb-4">Informasi Akademik</h4>
        <InfoItem icon={<UserSquare size={16} />} label="Dosen Pembimbing Akademik" value={mahasiswa.dosenPA} />
        <InfoItem icon={<BookOpen size={16} />} label="Semester" value={mahasiswa.semester} />
        <InfoItem icon={<Star size={16} />} label="Total SKS Ditempuh" value={mahasiswa.totalSKS} />
        <InfoItem icon={<Star size={16} />} label="Indeks Prestasi Kumulatif (IPK)" value={mahasiswa.ipk.toFixed(2)} />
    </div>
);

// Komponen untuk Bagian Keamanan (Ganti Password)
const KeamananSection = () => {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Logika ganti password akan ditambahkan di sini
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
                    <Button type="submit">
                        Simpan Perubahan
                    </Button>
                </div>
            </form>
        </div>
    );
};

// Komponen item info yang dapat digunakan kembali
const InfoItem = ({ icon, label, value, isBlock = false }: { icon: React.ReactNode, label: string, value: string | number, isBlock?: boolean }) => (
    <div className={`flex ${isBlock ? 'flex-col sm:flex-row' : 'flex-row'} items-start sm:items-center gap-x-4 gap-y-1`}>
        <div className="flex items-center gap-2 min-w-[240px] text-gray-500">
            {icon}
            <span className="font-semibold">{label}:</span>
        </div>
        <span className="text-gray-800">{value}</span>
    </div>
);

export default ProfileView;