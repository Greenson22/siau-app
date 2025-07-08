import type { LucideIcon } from 'lucide-react';

// --- Tipe Generik ---
export interface NavLink {
  id: string;
  title: string;
  icon: LucideIcon;
}

export interface User {
  nama: string;
  peran: string;
  email: string;
}

export interface Notification {
  title: string;
  subtitle: string;
}

// --- Tipe dari Header ---
export interface ProfileMenuItem {
  id: string;
  label: string;
  icon: LucideIcon;
  action: () => void;
}

export interface HeaderProps {
  title: string;
  user: User;
  profileMenuItems: ProfileMenuItem[];
  notifications: Notification[];
  toggleSidebar: () => void;
  handleLogout: () => void;
}

// --- Tipe dari AppLayout ---
export type ProfileMenuItemsFactory = (setView: (view: string, tab?: string) => void) => ProfileMenuItem[];

export interface AppLayoutProps {
  user: User;
  navLinks: NavLink[];
  portalTitle: string;
  notifications: Notification[];
  profileMenuItemsFactory: ProfileMenuItemsFactory;
  views: { [key: string]: React.ComponentType<any> };
  initialView?: string;
}

// --- Tipe dari KRS ---
export type KrsStatus = 'belum_kontrak' | 'menunggu_persetujuan' | 'disetujui';
export type BadgeStatus = 'Belum Kontrak' | 'Menunggu Persetujuan' | 'Disetujui';

// --- Tipe dari ProfileView ---
export interface UserProfile {
  nama: string;
  peran: string;
  idNumber: string; // Bisa NIM atau NIDN
  idLabel: string; // "NIM" atau "NIDN"
  status: string;
  fotoProfil: string;
  detail?: string; // Prodi untuk mahasiswa, Jabatan untuk dosen
}

export interface ProfileTab {
  id: string;
  label: string;
  content: React.ReactNode;
}

// --- Tipe dari BimbinganAkademikView ---
export interface Mahasiswa {
    id: number;
    nama: string;
    nim: string;
    prodi: string;
    semester: number;
    statusKrs: KrsStatus;
    avatar: string;
}