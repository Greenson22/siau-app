import { LayoutDashboard, UserCircle, Landmark, GraduationCap } from 'lucide-react';

export const navLinks = [
    { id: 'dashboard', title: 'Dashboard', icon: LayoutDashboard },
    { id: 'profil', title: 'Profil Mahasiswa', icon: UserCircle },
    { id: 'keuangan', title: 'Keuangan', icon: Landmark },
    { id: 'akademik', title: 'Akademik', icon: GraduationCap },
];

export type NavLinkId = 'dashboard' | 'profil' | 'keuangan' | 'akademik';