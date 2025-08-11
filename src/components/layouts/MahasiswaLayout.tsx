// src/components/layouts/MahasiswaLayout.tsx

'use client';

import { useAppLayout } from '@/hooks/useAppLayout'; // Hook untuk layout
import { useMahasiswaProfile } from '@/hooks/useMahasiswaProfile'; // Hook baru kita
import AppLayout from './AppLayout';
import { navLinks, notifications } from '@/lib/dataMahasiswa'; // Data statis lain
import ProfileView, { KeamananSection } from '@/components/fragments/ProfileView';
import BiodataMahasiswaSection from '../fragments/ProfileView/BiodataMahasiswaSection';
import AkademikMahasiswaSection from '../fragments/ProfileView/AkademikMahasiswaSection';
import DashboardView from '@/components/fragments/DashboardView';
import FinanceView from '@/components/fragments/FinanceView';
import AcademicView from '@/components/fragments/AcademicView';
import { User, KeyRound } from 'lucide-react';


const MahasiswaProfileWrapper = ({ initialTab }: { initialTab: string }) => {
    // Gunakan hook untuk mendapatkan data profil
    const { mahasiswa, isLoading, error } = useMahasiswaProfile();

    if (isLoading) return <p>Memuat profil...</p>;
    if (error || !mahasiswa) return <p>Gagal memuat profil: {error}</p>;

    // Data untuk header ProfileView
    const userProfileData = {
        nama: mahasiswa.nama,
        peran: 'Mahasiswa', // Bisa diambil dari data user jika ada
        idNumber: mahasiswa.nim,
        idLabel: "NIM",
        status: mahasiswa.status,
        fotoProfil: mahasiswa.fotoProfil,
        detail: mahasiswa.prodi,
    };

    // Tabs untuk ProfileView
    const profileTabs = [
        { id: 'biodata', label: 'Biodata', content: <BiodataMahasiswaSection mahasiswa={mahasiswa}/> },
        { id: 'akademik', label: 'Info Akademik', content: <AkademikMahasiswaSection mahasiswa={mahasiswa}/> },
        { id: 'keamanan', label: 'Keamanan', content: <KeamananSection /> },
    ];

    return <ProfileView user={userProfileData} tabs={profileTabs} initialTab={initialTab} />;
};


// Komponen MahasiswaLayout utama (sebagian besar tidak berubah)
const MahasiswaLayout = () => {
    const { mahasiswa, isLoading, error } = useMahasiswaProfile(); // Ambil data di level atas
    
    // ... (sisa logika AppLayout)
    
    // Data user untuk header & sidebar, bisa ditampilkan sebagian saat loading
    const userDisplayData = {
        nama: isLoading ? 'Memuat...' : mahasiswa?.nama || 'User',
        peran: 'Mahasiswa',
        email: isLoading ? '...' : mahasiswa?.email || '...',
    };

    const views = {
        dashboard: () => <DashboardView role="mahasiswa" />,
        profil: MahasiswaProfileWrapper,
        keuangan: FinanceView,
        akademik: () => <AcademicView role="mahasiswa" />,
    };

    const profileMenuItemsFactory = (handleSetView: (view: string, tab?: string) => void) => [
        { id: 'profil', label: 'Profil Saya', icon: User, action: () => handleSetView('profil', 'biodata') },
        { id: 'keamanan', label: 'Ganti Password', icon: KeyRound, action: () => handleSetView('profil', 'keamanan') }
    ];

    return (
        <AppLayout
            user={userDisplayData}
            navLinks={navLinks}
            portalTitle="Portal Mahasiswa"
            notifications={notifications}
            profileMenuItemsFactory={profileMenuItemsFactory}
            views={views}
        />
    );
};

export default MahasiswaLayout;