'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { User, KeyRound } from 'lucide-react';

import Sidebar from '@/components/fragments/Sidebar'; 
import Header from '@/components/fragments/Header';
import ConfirmationModal from '@/components/fragments/Modal/ConfirmationModal';
import ProfileView, { KeamananSection } from '@/components/fragments/ProfileView';
import DashboardView from '@/components/fragments/DashboardView'; 
import AcademicView from '@/components/fragments/AcademicView';
import BimbinganAkademikView from '@/components/fragments/dosen/BimbinganAkademikView';
import BiodataDosenSection from '@/components/fragments/ProfileView/BiodataDosenSection';
import AkademikDosenSection from '@/components/fragments/ProfileView/AkademikDosenSection';

import { navLinksDosen, dosen } from '@/lib/dataDosen'; 
import type { NavLinkIdDosen } from '@/lib/dataDosen';

// Wrapper untuk komponen yang membutuhkan role
const DosenDashboardWrapper = () => <DashboardView role="dosen" />;
const DosenAcademicWrapper = () => <AcademicView role="dosen" />;

const DosenLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeView, setActiveView] = useState<NavLinkIdDosen>('dashboard');
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [targetProfileTab, setTargetProfileTab] = useState('biodata');
  const router = useRouter();

  const handleSetView = (view: string, tab?: string) => {
    setActiveView(view as NavLinkIdDosen);
    if (tab) {
        setTargetProfileTab(tab);
    }
    if (window.innerWidth < 1024) {
      setIsSidebarOpen(false);
    }
  };

  const handleConfirmLogout = () => {
    setIsLogoutModalOpen(false);
    router.push('/login');
  };

  const profileMenuItemsDosen = [
    { id: 'profil', label: 'Profil Saya', icon: User, action: () => handleSetView('profil', 'biodata') },
    { id: 'keamanan', label: 'Ganti Password', icon: KeyRound, action: () => handleSetView('profil', 'keamanan') }
  ];

  const notificationsDosen = [
    { title: '5 Mahasiswa Membutuhkan Validasi KRS', subtitle: 'Batas waktu: 31 Agustus 2025' },
    { title: 'Jadwal Rapat Dosen', subtitle: 'Besok, 10:00 WITA di Ruang Rapat' },
  ];
  
  const pageTitle = navLinksDosen.find(link => link.id === activeView)?.title || 'Dashboard';
  const animationVariants = {
    initial: { opacity: 0, y: 15 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -15 },
  };

  const userProfileData = {
    nama: dosen.nama,
    peran: dosen.peran,
    idNumber: dosen.nidn,
    idLabel: "NIDN",
    status: dosen.peran,
    fotoProfil: dosen.fotoProfil,
    detail: dosen.jabatanAkademik,
  };

  const profileTabs = [
    { id: 'biodata', label: 'Biodata', content: <BiodataDosenSection /> },
    { id: 'akademik', label: 'Info Akademik', content: <AkademikDosenSection /> },
    { id: 'keamanan', label: 'Keamanan', content: <KeamananSection /> },
  ];

  const renderActiveComponent = () => {
      const views: { [key: string]: React.ComponentType<any> } = {
          dashboard: DosenDashboardWrapper,
          profil: () => <ProfileView user={userProfileData} tabs={profileTabs} initialTab={targetProfileTab} />,
          bimbingan: BimbinganAkademikView,
          akademik: DosenAcademicWrapper,
      };
      const Component = views[activeView];
      return Component ? <Component /> : null;
  };

  return (
    <div className="relative min-h-screen lg:flex bg-gray-100 font-sans">
      {isSidebarOpen && (
        <div className="fixed inset-0 z-20 bg-black/50 lg:hidden" onClick={() => setIsSidebarOpen(false)}></div>
      )}

      <Sidebar
        navLinks={navLinksDosen}
        activeView={activeView} 
        setActiveView={handleSetView}
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
        handleLogout={() => setIsLogoutModalOpen(true)}
        portalTitle="Portal Dosen"
      />
      
      <div className="flex-1 flex flex-col h-screen">
        <Header 
          title={pageTitle}
          user={dosen}
          profileMenuItems={profileMenuItemsDosen}
          notifications={notificationsDosen}
          toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          handleLogout={() => setIsLogoutModalOpen(true)}
        />
        <main className="flex-1 p-6 lg:p-8 overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeView}
              variants={animationVariants}
              transition={{ duration: 0.1, ease: 'easeInOut' }}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              {renderActiveComponent()}
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