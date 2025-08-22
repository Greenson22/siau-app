// program/next-js/components/layouts/MahasiswaLayout.tsx
'use client';

import { useMahasiswaProfile } from '@/hooks/useMahasiswaProfile';
import AppLayout from './AppLayout';
import { navLinks } from '@/lib/dataMahasiswa';
import ProfileView, { KeamananSection } from '@/components/fragments/ProfileView';
import BiodataMahasiswaSection from '../fragments/ProfileView/BiodataMahasiswaSection';
import AkademikMahasiswaSection from '../fragments/ProfileView/AkademikMahasiswaSection';
import DashboardView from '@/components/fragments/DashboardView';
import FinanceView from '@/components/fragments/FinanceView';
import AcademicView from '@/components/fragments/AcademicView';
import { User, KeyRound, GraduationCap } from 'lucide-react';

const MahasiswaProfileWrapper = ({ initialTab }: { initialTab: string }) => {
    const { mahasiswa, isLoading, error } = useMahasiswaProfile();

    if (isLoading) return <p>Memuat profil...</p>;
    if (error || !mahasiswa) return <p>Gagal memuat profil: {error}</p>;

    const userProfileData = {
        nama: mahasiswa.nama,
        peran: 'Mahasiswa',
        idNumber: mahasiswa.nim,
        idLabel: "NIM",
        status: mahasiswa.status,
        fotoProfil: mahasiswa.fotoProfil,
        detail: mahasiswa.prodi,
    };

    const profileTabs = [
        { id: 'biodata', label: 'Biodata', content: <BiodataMahasiswaSection mahasiswa={mahasiswa}/> },
        { id: 'akademik', label: 'Info Akademik', content: <AkademikMahasiswaSection mahasiswa={mahasiswa}/> },
        { id: 'keamanan', label: 'Keamanan', content: <KeamananSection /> },
    ];

    return <ProfileView user={userProfileData} tabs={profileTabs} initialTab={initialTab} />;
};


const MahasiswaLayout = () => {
    const { mahasiswa, isLoading, error } = useMahasiswaProfile();
    
    // --- PERUBAHAN DI SINI ---
    const userDisplayData = {
        nama: isLoading ? 'Memuat...' : mahasiswa?.nama || 'User',
        peran: 'Mahasiswa',
        email: isLoading ? '...' : mahasiswa?.email || '...',
        fotoProfil: mahasiswa?.fotoProfil, // <-- FOTO PROFIL DITERUSKAN
    };

    const views = {
        dashboard: () => <DashboardView role="mahasiswa" />,
        akademik: () => <AcademicView role="mahasiswa" />,
        profil: MahasiswaProfileWrapper,
        keuangan: FinanceView,
    };

    const profileMenuItemsFactory = (handleSetView: (view: string, tab?: string) => void) => [
        { id: 'profil', label: 'Profil Saya', icon: User, action: () => handleSetView('profil', 'biodata') },
        { id: 'krs', label: 'Lihat KRS', icon: GraduationCap, action: () => handleSetView('akademik', 'krs') },
        { id: 'keamanan', label: 'Ganti Password', icon: KeyRound, action: () => handleSetView('profil', 'keamanan') }
    ];

    return (
        <AppLayout
            user={userDisplayData}
            navLinks={navLinks}
            portalTitle="Portal Mahasiswa"
            profileMenuItemsFactory={profileMenuItemsFactory}
            views={views}
        />
    );
};

export default MahasiswaLayout;