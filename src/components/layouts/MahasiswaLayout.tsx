// MahasiswaLayout.tsx

'use client';

import { User, KeyRound } from 'lucide-react';
import AppLayout from './AppLayout'; // Ganti dengan AppLayout

// Impor data & view khusus mahasiswa
import { notifications, mahasiswa, navLinks } from '@/lib/dataMahasiswa';

import DashboardView from '@/components/fragments/DashboardView';
import FinanceView from '@/components/fragments/FinanceView';
import AcademicView from '@/components/fragments/AcademicView';
import ProfileView, { KeamananSection } from '@/components/fragments/ProfileView';
import BiodataMahasiswaSection from '../fragments/ProfileView/BiodataMahasiswaSection';
import AkademikMahasiswaSection from '../fragments/ProfileView/AkademikMahasiswaSection';

const MahasiswaProfileWrapper = ({ initialTab }: { initialTab: string }) => {
    const userProfileData = {
        nama: mahasiswa.nama,
        peran: mahasiswa.peran,
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
            user={mahasiswa}
            navLinks={navLinks}
            portalTitle="Portal Mahasiswa"
            notifications={notifications}
            profileMenuItemsFactory={profileMenuItemsFactory}
            views={views}
        />
    );
};

export default MahasiswaLayout;