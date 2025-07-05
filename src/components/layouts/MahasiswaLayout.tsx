'use client';
import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Sidebar from '@/components/fragments/Sidebar';
import Header from '@/components/fragments/Header';
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

  const ActiveComponent = views[activeView];
  const pageTitle = navLinks.find(link => link.id === activeView)?.title || 'Dashboard';

  const handleSetView = (view: NavLinkId) => {
    setActiveView(view);
    if (window.innerWidth < 768) {
      setIsSidebarOpen(false);
    }
  };

  // --- 1. Logika untuk logout ditambahkan kembali ---
  const handleLogout = () => {
    // Logika untuk membersihkan sesi dan mengarahkan ke halaman login
    console.log('Pengguna telah logout.');
    alert('Anda telah berhasil logout!');
    // Contoh: window.location.href = '/login';
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

      {/* --- 2. Prop handleLogout diteruskan ke Sidebar --- */}
      <Sidebar 
        activeView={activeView} 
        setActiveView={handleSetView}
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
        handleLogout={handleLogout} // <-- Prop diteruskan di sini
      />
      
      <div className="flex-1">
        <main className="p-6 lg:p-8">
          <Header 
            title={pageTitle} 
            toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} 
            isNotificationOpen={false} 
            toggleNotification={() => {}} 
          />
          <ActiveComponent />
        </main>
      </div>
    </div>
  );
};

export default MahasiswaLayout;