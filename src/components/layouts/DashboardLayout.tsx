// src/components/layouts/DashboardLayout.tsx

'use client';
import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Sidebar from '@/components/fragments/Sidebar';
import Header from '@/components/fragments/Header';
import DashboardView from '@/components/fragments/DashboardView';
import ProfileView from '@/components/fragments/ProfileView';
import FinanceView from '@/components/fragments/FinanceView';
import AcademicView from '@/components/fragments/AcademicView';
import SuccessLogin from '@/components/fragments/SuccessLogin'; // <-- Import komponen baru
import { navLinks, NavLinkId } from '@/lib/data';

const views: { [key in NavLinkId]: React.ComponentType } = {
  dashboard: DashboardView,
  profil: ProfileView,
  keuangan: FinanceView,
  akademik: AcademicView,
};

const DashboardLayout = () => {
  // State untuk mengontrol visibilitas sidebar dan animasi login
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeView, setActiveView] = useState<NavLinkId>('dashboard');
  const [showLoginAnimation, setShowLoginAnimation] = useState(true); // <-- State baru

  const ActiveComponent = views[activeView];
  const pageTitle = navLinks.find(link => link.id === activeView)?.title || 'Dashboard';

  const handleSetView = (view: NavLinkId) => {
    setActiveView(view);
    // Selalu tutup sidebar saat navigasi di tampilan mobile
    if (window.innerWidth < 768) {
      setIsSidebarOpen(false);
    }
  };

  return (
    <div className="relative min-h-screen md:flex bg-gray-100 font-sans">
      {/* Animasi Login Berhasil sebagai Overlay */}
      <AnimatePresence>
        {showLoginAnimation && (
          <SuccessLogin onAnimationComplete={() => setShowLoginAnimation(false)} />
        )}
      </AnimatePresence>
      
      {/* Overlay Sidebar untuk Mobile */}
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
      />
      
      {/* Konten Utama */}
      <div className="flex-1">
        <main className="p-6 lg:p-8">
          <Header title={pageTitle} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} isNotificationOpen={false} toggleNotification={function (): void {
            throw new Error('Function not implemented.');
          } } />
          <ActiveComponent />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;