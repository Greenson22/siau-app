// DosenLayout.tsx

'use client';

import { User, KeyRound } from 'lucide-react';
import AppLayout from './AppLayout';

import { navLinksDosen, dosen } from '@/lib/dataDosen';
import DashboardView from '@/components/fragments/DashboardView';
import AcademicView from '@/components/fragments/AcademicView';
import BimbinganAkademikView from '@/components/fragments/dosen/BimbinganAkademikView';
import ProfileView, { KeamananSection } from '@/components/fragments/ProfileView';
import BiodataDosenSection from '@/components/fragments/ProfileView/BiodataDosenSection';
import AkademikDosenSection from '@/components/fragments/ProfileView/AkademikDosenSection';

const DosenProfileWrapper = ({ initialTab }: { initialTab: string }) => {
    const userProfileData = {
        nama: dosen.nama,
        peran: dosen.peran,
        idNumber: dosen.nidn,
        idLabel: "NIDN",
        status: dosen.peran,
        fotoProfil: dosen.fotoProfil,
        detail: dosen.jabatanAkademik,
    };

    const profileTabs = [
        { id: 'biodata', label: 'Biodata', content: <BiodataDosenSection /> },
        { id: 'akademik', label: 'Info Akademik', content: <AkademikDosenSection /> },
        { id: 'keamanan', label: 'Keamanan', content: <KeamananSection /> },
    ];

    return <ProfileView user={userProfileData} tabs={profileTabs} initialTab={initialTab} />;
};

const DosenLayout = () => {
    const views = {
        dashboard: () => <DashboardView role="dosen" />,
        profil: DosenProfileWrapper,
        bimbingan: BimbinganAkademikView,
        akademik: () => <AcademicView role="dosen" />,
    };

    const profileMenuItemsFactory = (handleSetView: (view: string, tab?: string) => void) => [
        { id: 'profil', label: 'Profil Saya', icon: User, action: () => handleSetView('profil', 'biodata') },
        { id: 'keamanan', label: 'Ganti Password', icon: KeyRound, action: () => handleSetView('profil', 'keamanan') }
    ];

    return (
        <AppLayout
            user={dosen}
            navLinks={navLinksDosen}
            portalTitle="Portal Dosen"
            notifications={[
                { title: '5 Mahasiswa Membutuhkan Validasi KRS', subtitle: 'Batas waktu: 31 Agustus 2025' },
                { title: 'Jadwal Rapat Dosen', subtitle: 'Besok, 10:00 WITA di Ruang Rapat' },
            ]}
            profileMenuItemsFactory={profileMenuItemsFactory}
            views={views}
            initialView="dashboard"
        />
    );
};

export default DosenLayout;