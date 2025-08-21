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
    namaLengkap: any;
    mahasiswaId: any;
    id: number;
    nama: string;
    nim: string;
    prodi: string;
    semester: number;
    statusKrs: KrsStatus;
    avatar: string;
}

// --- Tipe dari Sidebar ---
export interface SidebarProps {
  navLinks: NavLink[];
  activeView: string;
  setActiveView: (view: string) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  handleLogout: () => void;
  portalTitle: string;
}

export interface SidebarVariants {
  open: {
    x: number;
    transition: {
      type: string;
      stiffness: number;
      damping: number;
    };
  };
  closed: {
    x: string;
    transition: {
      type: string;
      stiffness: number;
      damping: number;
    };
  };
}

// --- Tipe DTO dari Backend ---
export interface KhsDTO {
  kodeMataKuliah: string;
  namaMataKuliah: string;
  sks: number;
  tahunAkademik: string;
  semester: string;
  nilaiAkhir: number;
  nilaiHuruf: string;
}

export interface JadwalDTO {
  hari: string;
  jadwal: string; // contoh: "08:00 - 10:30"
  namaMataKuliah: string;
  dosenPengajar: string;
  ruangan: string;
}