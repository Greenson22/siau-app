import type { LucideIcon } from 'lucide-react';

// Anda mungkin juga ingin memindahkan NavLink ke sini jika digunakan di banyak tempat
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

export type ProfileMenuItemsFactory = (setView: (view: string, tab?: string) => void) => {
  id: string;
  label: string;
  icon: LucideIcon;
  action: () => void;
}[];

export interface AppLayoutProps {
  user: User;
  navLinks: NavLink[];
  portalTitle: string;
  notifications: Notification[];
  profileMenuItemsFactory: ProfileMenuItemsFactory;
  views: { [key: string]: React.ComponentType<any> };
  initialView?: string;
}