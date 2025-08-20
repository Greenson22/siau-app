// program/next-js/components/layouts/AppLayout.tsx
'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useAppLayout } from '@/hooks/useAppLayout';
import { useNotificationStore } from '@/store/useNotificationStore'; // <-- Impor dari store
import type { AppLayoutProps } from '@/types';
import { useEffect } from 'react';

import Sidebar from '@/components/fragments/Sidebar';
import Header from '@/components/fragments/Header';
import ConfirmationModal from '@/components/fragments/Modal/ConfirmationModal';
import { pageTransitionVariants, pageTransition } from '@/lib/animations';

const AppLayout: React.FC<Omit<AppLayoutProps, 'notifications'>> = (props) => {
  const {
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
    setIsSidebarOpen,
  } = useAppLayout(props);

  // Ambil state dan fungsi dari wadah global
  const { notifications, fetchNotifications } = useNotificationStore();

  // Panggil fetchNotifications sekali saat komponen pertama kali dimuat
  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  return (
    <div className="relative min-h-screen md:flex bg-gray-100 font-sans">
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/50 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      <Sidebar
        navLinks={props.navLinks}
        portalTitle={props.portalTitle}
        activeView={activeView}
        setActiveView={handleSetView}
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
        handleLogout={handleRequestLogout}
      />

      <div className="flex-1 flex flex-col h-screen">
        <Header
          title={pageTitle}
          user={props.user}
          profileMenuItems={profileMenuItems}
          notifications={notifications} // <-- Teruskan notifikasi dari store
          toggleSidebar={toggleSidebar}
          handleLogout={handleRequestLogout}
        />
        <main className="flex-1 p-6 lg:p-8 overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeView}
              variants={pageTransitionVariants}
              transition={pageTransition}
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