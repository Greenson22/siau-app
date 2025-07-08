import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { AppLayoutProps } from '@/types';

// Ambil hanya props yang dibutuhkan untuk logika, bukan semuanya
type UseAppLayoutProps = Pick<
  AppLayoutProps, 
  'initialView' | 'navLinks' | 'views' | 'profileMenuItemsFactory'
>;

export const useAppLayout = ({
  initialView = 'dashboard',
  navLinks,
  views,
  profileMenuItemsFactory,
}: UseAppLayoutProps) => {
  // Semua state ada di sini
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeView, setActiveView] = useState(initialView);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [targetProfileTab, setTargetProfileTab] = useState('biodata');
  const router = useRouter();

  // Semua handler ada di sini
  const handleSetView = (view: string, tab?: string) => {
    setActiveView(view);
    if (tab) {
      setTargetProfileTab(tab);
    }
    if (window.innerWidth < 1024) {
      setIsSidebarOpen(false);
    }
  };

  const handleRequestLogout = () => setIsLogoutModalOpen(true);
  const handleConfirmLogout = () => {
    setIsLogoutModalOpen(false);
    router.push('/login');
  };
  const handleCancelLogout = () => setIsLogoutModalOpen(false);
  const toggleSidebar = () => setIsSidebarOpen(prev => !prev);
  
  // Semua data turunan ada di sini
  const profileMenuItems = profileMenuItemsFactory(handleSetView);
  const ActiveComponent = views[activeView];
  const pageTitle = navLinks.find(link => link.id === activeView)?.title || 'Dashboard';

  // Kembalikan semua yang dibutuhkan oleh JSX
  return {
    isSidebarOpen,
    isLogoutModalOpen,
    activeView,
    targetProfileTab,
    pageTitle,
    profileMenuItems,
    ActiveComponent,
    handleSetView,
    handleRequestLogout,
    handleConfirmLogout,
    handleCancelLogout,
    toggleSidebar,
    setIsSidebarOpen, // Dibutuhkan oleh overlay
  };
};