'use client';

import { User, KeyRound } from 'lucide-react';
import AppLayout from './AppLayout';
import { navLinksAdministrasi, notifications } from '@/lib/dataAdministrasi';
import DashboardView from '@/components/fragments/DashboardView/AdministrasiDashboardView';
import KeuanganView from '@/components/fragments/administrasi/KeuanganView';
import AkademikView from '@/components/fragments/administrasi/AkademikView';
import ProfileView, { KeamananSection } from '@/components/fragments/ProfileView';
import UserManagementView from '@/components/fragments/administrasi/UserManagementView';
import SystemView from '@/components/fragments/administrasi/SystemView';
import BiodataAdminSection from '@/components/fragments/ProfileView/BiodataAdminSection';
import { useAdminProfile } from '@/hooks/useAdminProfile'; // <-- Impor hook baru

const AdministrasiProfileWrapper = ({ initialTab }: { initialTab: string }) => {
    const { profile, isLoading, error } = useAdminProfile(); // Gunakan hook di sini

    if (isLoading) return <p>Memuat profil...</p>;
    if (error || !profile) return <p>Gagal memuat profil: {error}</p>;

    const userProfileData = {
        nama: profile.namaLengkap,
        peran: profile.jabatan,
        idNumber: profile.nip,
        idLabel: "NIP",
        status: 'Aktif',
        fotoProfil: profile.fotoProfil,
    };

    const profileTabs = [
        { id: 'biodata', label: 'Biodata', content: <BiodataAdminSection profile={profile} /> },
        { id: 'keamanan', label: 'Keamanan', content: <KeamananSection /> },
    ];

    return <ProfileView user={userProfileData} tabs={profileTabs} initialTab={initialTab} />;
};

const AdministrasiLayout = () => {
    const { profile, isLoading } = useAdminProfile(); // Ambil data di level atas

    const userDisplayData = {
        nama: isLoading ? 'Memuat...' : profile?.namaLengkap || 'Admin',
        peran: isLoading ? '...' : profile?.jabatan || 'Administrator',
        email: isLoading ? '...' : profile?.email || '...',
    };
    
    const views = {
        dashboard: DashboardView,
        pengguna: UserManagementView,
        keuangan: KeuanganView,
        akademik: AkademikView,
        sistem: SystemView,
        profil: AdministrasiProfileWrapper,
    };

    const profileMenuItemsFactory = (handleSetView: (view: string, tab?: string) => void) => [
        { id: 'profil', label: 'Profil Saya', icon: User, action: () => handleSetView('profil', 'biodata') },
        { id: 'keamanan', label: 'Ganti Password', icon: KeyRound, action: () => handleSetView('profil', 'keamanan') }
    ];

    return (
        <AppLayout
            user={userDisplayData}
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