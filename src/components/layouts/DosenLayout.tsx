'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

// --- 1. Impor Sidebar generik ---
import Sidebar from '@/components/fragments/Sidebar'; 
import HeaderDosen from '@/components/fragments/dosen/HeaderDosen';
import ConfirmationModal from '@/components/fragments/ConfirmationModal';
import DashboardDosenView from '@/components/fragments/dosen/DashboardDosenView';
import BimbinganAkademikView from '@/components/fragments/dosen/BimbinganAkademikView';
import AkademikDosenView from '@/components/fragments/dosen/AkademikDosenView';
// --- 2. Impor navLinksDosen ---
import { navLinksDosen, NavLinkIdDosen } from '@/lib/dataDosen'; 
import ProfileDosenView from '@/components/fragments/dosen/ProfileDosenView';

const views: { [key in NavLinkIdDosen]: React.ComponentType<any> } = {
  dashboard: DashboardDosenView,
  bimbingan: BimbinganAkademikView,
  akademik: AkademikDosenView,
  profil: ProfileDosenView, // <-- Daftarkan di sini
};

const DosenLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeView, setActiveView] = useState<NavLinkIdDosen>('dashboard');
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const router = useRouter();

  const ActiveComponent = views[activeView];
  const pageTitle = navLinksDosen.find(link => link.id === activeView)?.title || 'Dashboard';

  const handleSetView = (view: string) => {
    setActiveView(view as NavLinkIdDosen);
    if (window.innerWidth < 1024) {
      setIsSidebarOpen(false);
    }
  };

  const handleConfirmLogout = () => {
    setIsLogoutModalOpen(false);
    router.push('/login');
  };

  const animationVariants = {
    initial: { opacity: 0, y: 15 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -15 },
  };

  return (
    <div className="relative min-h-screen lg:flex bg-gray-100 font-sans">
      {isSidebarOpen && (
        <div className="fixed inset-0 z-20 bg-black/50 lg:hidden" onClick={() => setIsSidebarOpen(false)}></div>
      )}

      {/* --- 3. Gunakan komponen Sidebar yang baru --- */}
      <Sidebar
        navLinks={navLinksDosen}
        activeView={activeView} 
        setActiveView={handleSetView}
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
        handleLogout={() => setIsLogoutModalOpen(true)}
        portalTitle="Portal Dosen" // Kirim judul portal
      />
      
      <div className="flex-1 flex flex-col h-screen">
      <HeaderDosen 
        title={pageTitle} 
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} 
        handleLogout={() => setIsLogoutModalOpen(true)}
        setActiveView={(view) => handleSetView(view)} // <-- Tambahkan ini
      />
        <main className="flex-1 p-6 lg:p-8 overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeView}
              variants={animationVariants}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <ActiveComponent />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      <ConfirmationModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={handleConfirmLogout}
        title="Konfirmasi Logout"
        message="Apakah Anda yakin ingin keluar?"
      />
    </div>
  );
};

export default DosenLayout;