// src/components/layouts/MahasiswaLayout.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation'; // <-- Impor useRouter
import { AnimatePresence } from 'framer-motion';

// Impor komponen yang diperlukan
import Sidebar from '@/components/fragments/Sidebar';
import Header from '@/components/fragments/Header';
import ConfirmationModal from '@/components/fragments/ConfirmationModal'; // <-- Impor Modal Konfirmasi

// Impor view dan data
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
  
  // --- 1. State untuk mengelola modal konfirmasi logout ---
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

  // --- 2. Logika untuk alur logout ---
  
  // Fungsi ini dipanggil saat tombol Logout di Sidebar diklik
  const handleRequestLogout = () => {
    setIsLogoutModalOpen(true); // Membuka modal konfirmasi
  };

  // Fungsi ini dijalankan saat pengguna menekan "Konfirmasi" di modal
  const handleConfirmLogout = () => {
    setIsLogoutModalOpen(false); // Menutup modal
    console.log('Pengguna telah logout.');
    // Mengarahkan pengguna ke halaman login
    router.push('/login'); 
  };
  
  // Fungsi ini dijalankan saat pengguna menekan "Batal"
  const handleCancelLogout = () => {
    setIsLogoutModalOpen(false); // Hanya menutup modal
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

      {/* --- 3. Prop handleLogout di Sidebar sekarang memanggil fungsi untuk membuka modal --- */}
      <Sidebar 
        activeView={activeView} 
        setActiveView={handleSetView}
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
        handleLogout={handleRequestLogout} // <-- Menggunakan handleRequestLogout
      />
      
      <div className="flex-1 flex flex-col">
        <Header 
          title={pageTitle}
          toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} isNotificationOpen={false} toggleNotification={function (): void {
            throw new Error('Function not implemented.');
          } }        />
        <main className="flex-1 p-6 lg:p-8 overflow-y-auto">
          <ActiveComponent />
        </main>
      </div>

      {/* --- 4. Render komponen ConfirmationModal di sini --- */}
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