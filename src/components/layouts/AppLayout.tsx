// src/components/layouts/AppLayout.tsx

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence, Transition } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';

import Sidebar, { type NavLink } from '@/components/fragments/Sidebar';
import Header from '@/components/fragments/Header';
import ConfirmationModal from '@/components/fragments/Modal/ConfirmationModal';

// Tipe data generik untuk props
type User = {
  nama: string;
  peran: string;
  email: string;
};

type Notification = {
  title: string;
  subtitle: string;
};

// Tipe untuk fungsi yang akan membuat menu item
type ProfileMenuItemsFactory = (setView: (view: string, tab?: string) => void) => {
  id: string;
  label: string;
  icon: LucideIcon;
  action: () => void;
}[];

interface AppLayoutProps {
  user: User;
  navLinks: NavLink[];
  portalTitle: string;
  notifications: Notification[];
  profileMenuItemsFactory: ProfileMenuItemsFactory;
  views: { [key: string]: React.ComponentType<any> };
  initialView?: string;
}

const AppLayout: React.FC<AppLayoutProps> = ({
  user,
  navLinks,
  portalTitle,
  notifications,
  profileMenuItemsFactory,
  views,
  initialView = 'dashboard',
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeView, setActiveView] = useState(initialView);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [targetProfileTab, setTargetProfileTab] = useState('biodata');
  const router = useRouter();

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

  const profileMenuItems = profileMenuItemsFactory(handleSetView);
  const ActiveComponent = views[activeView];
  const pageTitle = navLinks.find(link => link.id === activeView)?.title || 'Dashboard';

  const animationVariants = {
    initial: { opacity: 0, y: 15 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -15 },
  };

  const animationTransition: Transition = {
    type: "tween",
    ease: "easeInOut",
    duration: 0.2,
  };

  return (
    <div className="relative min-h-screen md:flex bg-gray-100 font-sans">
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black bg-opacity-50 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      <Sidebar
        navLinks={navLinks}
        portalTitle={portalTitle}
        activeView={activeView}
        setActiveView={handleSetView}
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
        handleLogout={handleRequestLogout}
      />

      <div className="flex-1 flex flex-col h-screen">
        <Header
          title={pageTitle}
          user={user}
          profileMenuItems={profileMenuItems}
          notifications={notifications}
          toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          handleLogout={handleRequestLogout}
        />
        <main className="flex-1 p-6 lg:p-8 overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeView}
              variants={animationVariants}
              transition={animationTransition}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              {ActiveComponent && <ActiveComponent initialTab={targetProfileTab} />}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      <ConfirmationModal
        isOpen={isLogoutModalOpen}
        onClose={handleCancelLogout}
        onConfirm={handleConfirmLogout}
        title="Konfirmasi Logout"
        message="Apakah Anda yakin ingin keluar?"
      />
    </div>
  );
};

export default AppLayout;