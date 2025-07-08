import type { LucideIcon } from 'lucide-react';

// --- Tipe yang sudah ada ---
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

// --- Tipe BARU dari Header.tsx ---
export interface ProfileMenuItem {
  id: string;
  label: string;
  icon: LucideIcon;
  action: () => void;
}

export interface HeaderProps {
  title: string;
  user: User; // Menggunakan tipe User yang sudah ada
  profileMenuItems: ProfileMenuItem[];
  notifications: Notification[]; // Menggunakan tipe Notification yang sudah ada
  toggleSidebar: () => void;
  handleLogout: () => void;
}

// --- Tipe yang sudah ada lainnya ---
export type ProfileMenuItemsFactory = (setView: (view: string, tab?: string) => void) => ProfileMenuItem[]; // Diperbarui untuk menggunakan ProfileMenuItem

export interface AppLayoutProps {
  user: User;
  navLinks: NavLink[];
  portalTitle: string;
  notifications: Notification[];
  profileMenuItemsFactory: ProfileMenuItemsFactory;
  views: { [key: string]: React.ComponentType<any> };
  initialView?: string;
}