'use client';

import { useState, useEffect } from 'react';
import Card from "@/components/elements/Card";
import Button from '@/components/elements/Button';
import Input from '@/components/elements/Input';
import { LucideIcon } from 'lucide-react';

// --- Tipe Data Generik ---
interface UserProfile {
  nama: string;
  peran: string;
  idNumber: string; // Bisa NIM atau NIDN
  idLabel: string; // "NIM" atau "NIDN"
  status: string;
  fotoProfil: string;
  detail?: string; // Prodi untuk mahasiswa, Jabatan untuk dosen
}

interface ProfileTab {
  id: string;
  label:string;
  content: React.ReactNode;
}

interface ProfileViewProps {
  user: UserProfile;
  tabs: ProfileTab[];
  initialTab?: string;
}

const ProfileView: React.FC<ProfileViewProps> = ({ user, tabs, initialTab }) => {
    const [activeTab, setActiveTab] = useState(initialTab || (tabs.length > 0 ? tabs[0].id : ''));

    useEffect(() => {
        if (initialTab) {
            setActiveTab(initialTab);
        }
    }, [initialTab]);
    
    const ActiveContent = tabs.find(tab => tab.id === activeTab)?.content;

    return (
        <Card className="max-w-4xl mx-auto">
            {/* Header Profil Generik */}
            <div className="flex flex-col md:flex-row items-center gap-8 border-b border-gray-200 pb-6 mb-6">
                <img 
                    src={user.fotoProfil} 
                    alt={`Foto Profil ${user.nama}`} 
                    className="w-32 h-32 rounded-full shadow-md object-cover ring-2 ring-offset-2 ring-indigo-200"
                />
                <div className="flex-1 text-center md:text-left">
                    <p className="text-2xl font-bold text-gray-800">{user.nama}</p>
                    {user.detail && <p className="text-indigo-600 font-medium">{user.detail}</p>}
                    <div className="mt-2 flex items-center justify-center md:justify-start gap-2 text-sm">
                        <span className="font-semibold text-gray-600">{user.idLabel}:</span>
                        <span>{user.idNumber}</span>
                    </div>
                     <div className="mt-1 flex items-center justify-center md:justify-start gap-2 text-sm">
                        <span className="font-semibold text-gray-600">Status:</span>
                        <span className="px-2 py-0.5 bg-green-100 text-green-800 rounded-full text-xs font-medium">{user.status}</span>
                    </div>
                </div>
            </div>

            {/* Tombol Navigasi Tab Dinamis */}
            <div className="flex border-b border-gray-200 mb-6">
                {tabs.map(tab => (
                    <TabButton 
                        key={tab.id}
                        id={tab.id} 
                        label={tab.label} 
                        activeTab={activeTab} 
                        setActiveTab={setActiveTab} 
                    />
                ))}
            </div>
            
            <div>
                {ActiveContent}
            </div>
        </Card>
    );
};


// --- Komponen Pembantu (Reusable) ---

// Komponen Tombol Tab
const TabButton = ({ id, label, activeTab, setActiveTab }: { id: string, label: string, activeTab: string, setActiveTab: (id: string) => void }) => (
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

// Komponen untuk Bagian Keamanan (Ganti Password)
export const KeamananSection = () => {
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

// Komponen item info yang dapat digunakan kembali
export const InfoItem = ({ icon, label, value, isBlock = false }: { icon: React.ReactNode, label: string, value: string | number, isBlock?: boolean }) => (
    <div className={`flex ${isBlock ? 'flex-col sm:flex-row' : 'flex-row'} items-start sm:items-center gap-x-4 gap-y-1`}>
        <div className="flex items-center gap-2 min-w-[240px] text-gray-500">
            {icon}
            <span className="font-semibold">{label}:</span>
        </div>
        <span className="text-gray-800">{value}</span>
    </div>
);

export default ProfileView;