// src/components/layouts/AdministrasiLayout.tsx
'use client';

import { User, KeyRound } from 'lucide-react';
import AppLayout from './AppLayout';

// Impor data & view khusus administrasi
import { navLinksAdministrasi, administrasi, notifications } from '@/lib/dataAdministrasi';
import DashboardView from '@/components/fragments/DashboardView/AdministrasiDashboardView';
import PendaftaranView from '@/components/fragments/administrasi/PendaftaranView';
import KeuanganView from '@/components/fragments/administrasi/KeuanganView';
import AkademikView from '@/components/fragments/administrasi/AkademikView';
import ProfileView, { KeamananSection } from '@/components/fragments/ProfileView';

// Wrapper untuk ProfileView agar sesuai dengan struktur AppLayout
const AdministrasiProfileWrapper = ({ initialTab }: { initialTab: string }) => {
    const userProfileData = {
        nama: administrasi.nama,
        peran: administrasi.peran,
        idNumber: administrasi.nip,
        idLabel: "NIP",
        status: 'Aktif',
        fotoProfil: administrasi.fotoProfil,
    };

    const profileTabs = [
        { id: 'keamanan', label: 'Keamanan', content: <KeamananSection /> },
    ];

    return <ProfileView user={userProfileData} tabs={profileTabs} initialTab={initialTab} />;
};

const AdministrasiLayout = () => {
    const views = {
        dashboard: DashboardView,
        pendaftaran: PendaftaranView,
        keuangan: KeuanganView,
        akademik: AkademikView,
        profil: AdministrasiProfileWrapper,
    };

    // Factory function untuk membuat item menu profil
    const profileMenuItemsFactory = (handleSetView: (view: string, tab?: string) => void) => [
        { id: 'profil', label: 'Profil Saya', icon: User, action: () => handleSetView('profil', 'keamanan') },
        { id: 'keamanan', label: 'Ganti Password', icon: KeyRound, action: () => handleSetView('profil', 'keamanan') }
    ];

    return (
        <AppLayout
            user={administrasi}
            navLinks={navLinksAdministrasi}
            portalTitle="Portal Administrasi"
            notifications={notifications}
            profileMenuItemsFactory={profileMenuItemsFactory}
            views={views}
            initialView="dashboard"
        />
    );
};

export default AdministrasiLayout;