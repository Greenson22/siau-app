'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AnimatePresence } from 'framer-motion';

import Sidebar from '@/components/fragments/Sidebar';
import Header from '@/components/fragments/Header';
import ConfirmationModal from '@/components/fragments/ConfirmationModal';
import ProfileView from '@/components/fragments/ProfileView'; // Impor ProfileView
import DashboardView from '@/components/fragments/DashboardView';
import FinanceView from '@/components/fragments/FinanceView';
import AcademicView from '@/components/fragments/AcademicView';
import { navLinks, NavLinkId, ProfileTab } from '@/lib/data'; // Impor ProfileTab

const views: { [key in NavLinkId]: React.ComponentType<any> } = {
  dashboard: DashboardView,
  profil: ProfileView, // ProfileView ada di sini
  keuangan: FinanceView,
  akademik: AcademicView,
};

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeView, setActiveView] = useState<NavLinkId>('dashboard');
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  
  // --- 1. State untuk menyimpan tab tujuan ---
  const [targetProfileTab, setTargetProfileTab] = useState<ProfileTab>('biodata');
  
  const router = useRouter();

  const ActiveComponent = views[activeView];
  const pageTitle = navLinks.find(link => link.id === activeView)?.title || 'Dashboard';

  // --- 2. Perbarui handleSetView ---
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

  return (
    <div className="relative min-h-screen md:flex bg-gray-100 font-sans">
        {/* ... (AnimatePresence, Overlay, Sidebar tidak berubah) ... */}
        <AnimatePresence>
            {/* ... */}
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
          <Header 
            title={pageTitle} 
            toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} 
            handleLogout={handleRequestLogout}
            setActiveView={handleSetView} 
          />
        <main className="flex-1 p-6 lg:p-8 overflow-y-auto">
          {/* --- 3. Render komponen dengan prop --- */}
          <ActiveComponent initialTab={targetProfileTab} />
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

export default DashboardLayout;