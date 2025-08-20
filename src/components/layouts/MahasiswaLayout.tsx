// program/next-js/components/layouts/MahasiswaLayout.tsx
'use client';

import { useMahasiswaProfile } from '@/hooks/useMahasiswaProfile';
import AppLayout from './AppLayout';
import { navLinks } from '@/lib/dataMahasiswa'; // Data notifikasi statis tidak diimpor lagi
import ProfileView, { KeamananSection } from '@/components/fragments/ProfileView';
import BiodataMahasiswaSection from '../fragments/ProfileView/BiodataMahasiswaSection';
import AkademikMahasiswaSection from '../fragments/ProfileView/AkademikMahasiswaSection';
import DashboardView from '@/components/fragments/DashboardView';
import FinanceView from '@/components/fragments/FinanceView';
import AcademicView from '@/components/fragments/AcademicView';
import { User, KeyRound } from 'lucide-react';


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
            // Prop 'notifications' tidak lagi diteruskan dari sini
            profileMenuItemsFactory={profileMenuItemsFactory}
            views={views}
        />
    );
};

export default MahasiswaLayout;