'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AnimatePresence } from 'framer-motion';

import Sidebar from '@/components/fragments/Sidebar';
import Header from '@/components/fragments/Header'; // Pastikan Header diimpor
import ConfirmationModal from '@/components/fragments/ConfirmationModal';

// Impor views dan data lainnya...
import DashboardView from '@/components/fragments/DashboardView';
import ProfileView from '@/components/fragments/ProfileView';
import FinanceView from '@/components/fragments/FinanceView';
import AcademicView from '@/components/fragments/AcademicView';
import SuccessLogin from '@/components/fragments/SuccessLogin';
import { navLinks, NavLinkId } from '@/lib/data';

const views: { [key in NavLinkId]: React.ComponentType } = {
  dashboard: DashboardView,
  profil: ProfileView,
  keuangan: FinanceView,
  akademik: AcademicView,
};

const MahasiswaLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeView, setActiveView] = useState<NavLinkId>('dashboard');
  const [showLoginAnimation, setShowLoginAnimation] = useState(true);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const router = useRouter();

  const ActiveComponent = views[activeView];
  const pageTitle = navLinks.find(link => link.id === activeView)?.title || 'Dashboard';

  const handleSetView = (view: NavLinkId) => {
    setActiveView(view);
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

  return (
    <div className="relative min-h-screen md:flex bg-gray-100 font-sans">
      <AnimatePresence>
        {showLoginAnimation && (
          <SuccessLogin onAnimationComplete={() => setShowLoginAnimation(false)} />
        )}
      </AnimatePresence>
      
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black opacity-50 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      <Sidebar 
        activeView={activeView} 
        setActiveView={handleSetView}
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
        handleLogout={handleRequestLogout}
      />
      
      <div className="flex-1 flex flex-col">
          {/* --- Teruskan handleRequestLogout ke Header --- */}
          <Header 
            title={pageTitle} 
            toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} 
            handleLogout={handleRequestLogout} // <-- Prop diteruskan di sini
          />
        <main className="flex-1 p-6 lg:p-8 overflow-y-auto">
          <ActiveComponent />
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