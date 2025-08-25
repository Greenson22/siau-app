// DosenLayout.tsx

'use client';

import { User, KeyRound } from 'lucide-react';
import AppLayout from './AppLayout';
import { useDosenProfile } from '@/hooks/useDosenProfile'; // <-- IMPORT HOOK BARU

import { navLinksDosen } from '@/lib/dataDosen';
import DashboardView from '@/components/fragments/DashboardView';
import AcademicView from '@/components/fragments/AcademicView';
import BimbinganAkademikView from '@/components/fragments/dosen/BimbinganAkademikView';
import ProfileView, { KeamananSection } from '@/components/fragments/ProfileView';
import BiodataDosenSection from '@/components/fragments/ProfileView/BiodataDosenSection';
import AkademikDosenSection from '@/components/fragments/ProfileView/AkademikDosenSection';

const DosenProfileWrapper = ({ initialTab }: { initialTab: string }) => {
    const { profile, isLoading, error } = useDosenProfile(); // <-- Gunakan hook di sini

    if (isLoading) return <p>Memuat profil...</p>;
    if (error || !profile) return <p>Gagal memuat profil: {error}</p>;

    const userProfileData = {
        nama: profile.namaLengkap,
        peran: profile.jabatanAkademik,
        idNumber: profile.nidn,
        idLabel: "NIDN",
        status: "Aktif",
        fotoProfil: `https://placehold.co/128x128/93C5FD/1E40AF?text=GM`, // Placeholder
        detail: profile.jabatanAkademik,
    };

    const profileTabs = [
        { id: 'biodata', label: 'Biodata', content: <BiodataDosenSection profile={profile} /> },
        { id: 'akademik', label: 'Info Akademik', content: <AkademikDosenSection profile={profile} /> },
        { id: 'keamanan', label: 'Keamanan', content: <KeamananSection /> },
    ];

    return <ProfileView user={userProfileData} tabs={profileTabs} initialTab={initialTab} />;
};

const DosenLayout = () => {
    const { profile, isLoading } = useDosenProfile(); // <-- Ambil data di level atas

    const userDisplayData = {
        nama: isLoading ? 'Memuat...' : profile?.namaLengkap || 'Dosen',
        peran: isLoading ? '...' : profile?.jabatanAkademik || 'Dosen',
        email: isLoading ? '...' : profile?.emailPribadi || '...',
        fotoProfil: `https://placehold.co/128x128/93C5FD/1E40AF?text=GM`, // Placeholder
    };
    
    const DosenDashboardWrapper = ({ onNavigate }: { onNavigate?: (view: string, tab?: string) => void }) => (
        <DashboardView role="dosen" onNavigate={onNavigate} />
    );
    
    const views = {
        dashboard: DosenDashboardWrapper,
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
            user={userDisplayData}
            navLinks={navLinksDosen}
            portalTitle="Portal Dosen"
            profileMenuItemsFactory={profileMenuItemsFactory}
            views={views}
            initialView="dashboard"
        />
    );
};

export default DosenLayout;