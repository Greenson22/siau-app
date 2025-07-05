'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion'; // Impor motion dan AnimatePresence

import Sidebar from '@/components/fragments/Sidebar';
import Header from '@/components/fragments/Header';
import ConfirmationModal from '@/components/fragments/ConfirmationModal';
import ProfileView from '@/components/fragments/ProfileView';
import DashboardView from '@/components/fragments/DashboardView';
import FinanceView from '@/components/fragments/FinanceView';
import AcademicView from '@/components/fragments/AcademicView';
import { navLinks, NavLinkId, ProfileTab } from '@/lib/data';

const views: { [key in NavLinkId]: React.ComponentType<any> } = {
  dashboard: DashboardView,
  profil: ProfileView,
  keuangan: FinanceView,
  akademik: AcademicView,
};

// Pastikan nama komponen dan file adalah MahasiswaLayout
const MahasiswaLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeView, setActiveView] = useState<NavLinkId>('dashboard');
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [targetProfileTab, setTargetProfileTab] = useState<ProfileTab>('biodata');
  
  const router = useRouter();

  const ActiveComponent = views[activeView];
  const pageTitle = navLinks.find(link => link.id === activeView)?.title || 'Dashboard';

  const handleSetView = (view: NavLinkId, tab?: ProfileTab) => {
    setActiveView(view);
    if (tab) {
        setTargetProfileTab(tab);
    }
    if (window.innerWidth < 768) {
      setIsSidebarOpen(false);
    }
  };

  const handleRequestLogout = () => {
    setIsLogoutModalOpen(true);
  };

  const handleConfirmLogout = () => {
    setIsLogoutModalOpen(false);
    router.push('/login'); 
  };
  
  const handleCancelLogout = () => {
    setIsLogoutModalOpen(false);
  };

  // Definisikan varian animasi untuk transisi halaman
  const animationVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  // Definisikan properti transisi
  const animationTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.1
  };

  return (
    <div className="relative min-h-screen md:flex bg-gray-100 font-sans">
      {/* Overlay, hanya muncul saat sidebar terbuka di mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black opacity-50 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <Sidebar 
        activeView={activeView} 
        setActiveView={handleSetView}
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
        handleLogout={handleRequestLogout}
      />
      
      {/* Konten Utama */}
      <div className="flex-1 flex flex-col h-screen">
        <Header 
          title={pageTitle} 
          toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} 
          handleLogout={handleRequestLogout}
          setActiveView={handleSetView} 
        />
        <main className="flex-1 p-6 lg:p-8 overflow-y-auto">
          {/* AnimatePresence menangani animasi komponen saat masuk dan keluar */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeView} // Key penting untuk mendeteksi pergantian komponen
              variants={animationVariants}
              transition={animationTransition}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <ActiveComponent initialTab={targetProfileTab} />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* Modal Konfirmasi Logout */}
      <ConfirmationModal
        isOpen={isLogoutModalOpen}
        onClose={handleCancelLogout}
        onConfirm={handleConfirmLogout}
        title="Konfirmasi Logout"
        message="Apakah Anda yakin ingin keluar dari Portal Mahasiswa?"
      />
    </div>
  );
};

export default MahasiswaLayout;