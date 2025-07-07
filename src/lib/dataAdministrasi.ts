import { LayoutDashboard, UserPlus, Wallet, GraduationCap, User } from 'lucide-react';

export type NavLinkIdAdministrasi = 'dashboard' | 'pendaftaran' | 'keuangan' | 'akademik' | 'profil';

export const administrasi = {
  nama: 'Admin Sistem',
  nip: 'ADMIN001',
  peran: 'Administrator',
  email: 'admin@sttis.ac.id',
  fotoProfil: `https://placehold.co/128x128/A78BFA/4C1D95?text=AD`,
};

export const navLinksAdministrasi = [
  { id: 'dashboard', title: 'Dashboard', icon: LayoutDashboard },
  { id: 'pendaftaran', title: 'Manajemen Pendaftaran', icon: UserPlus },
  { id: 'keuangan', title: 'Manajemen Keuangan', icon: Wallet },
  { id: 'akademik', title: 'Manajemen Akademik', icon: GraduationCap },
  { id: 'profil', title: 'Profil Saya', icon: User },
];