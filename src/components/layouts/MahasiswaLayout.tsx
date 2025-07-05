'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

import Sidebar from '@/components/fragments/Sidebar'; // Menggunakan Sidebar generik
import Header from '@/components/fragments/Header';
import ConfirmationModal from '@/components/fragments/ConfirmationModal';
import ProfileView from '@/components/fragments/ProfileView';
import DashboardView from '@/components/fragments/DashboardView';
import FinanceView from '@/components/fragments/FinanceView';
import AcademicView from '@/components/fragments/AcademicView';
import { navLinks, NavLinkId, ProfileTab } from '@/lib/data'; // navLinks sudah diimpor

const views: { [key in NavLinkId]: React.ComponentType<any> } = {
  dashboard: DashboardView,
  profil: ProfileView,
  keuangan: FinanceView,
  akademik: AcademicView,
};

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

  const animationVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  const animationTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.1
  };

  return (
    <div className="relative min-h-screen md:flex bg-gray-100 font-sans">
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black opacity-50 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* --- Perubahan di sini --- */}
      <Sidebar 
        navLinks={navLinks} // Prop navLinks ditambahkan
        portalTitle="Portal Mahasiswa" // Prop portalTitle ditambahkan
        activeView={activeView} 
        setActiveView={(view) => handleSetView(view as NavLinkId)}
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
        handleLogout={handleRequestLogout}
      />
      
      <div className="flex-1 flex flex-col h-screen">
        <Header 
          title={pageTitle} 
          toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} 
          handleLogout={handleRequestLogout}
          setActiveView={handleSetView} 
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
              <ActiveComponent initialTab={targetProfileTab} />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

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