'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { User, KeyRound } from 'lucide-react';

import Sidebar from '@/components/fragments/Sidebar';
import Header from '@/components/fragments/Header';
import ConfirmationModal from '@/components/fragments/Modal/ConfirmationModal';
import { navLinksAdministrasi, administrasi, NavLinkIdAdministrasi } from '@/lib/dataAdministrasi';
import DashboardView from '@/components/fragments/DashboardView/AdministrasiDashboardView';
import PendaftaranView from '@/components/fragments/administrasi/PendaftaranView';
import KeuanganView from '@/components/fragments/administrasi/KeuanganView';
import AkademikView from '@/components/fragments/administrasi/AkademikView';
import ProfileView, { KeamananSection } from '@/components/fragments/ProfileView';

const AdministrasiLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeView, setActiveView] = useState<NavLinkIdAdministrasi>('dashboard');
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [targetProfileTab, setTargetProfileTab] = useState('biodata');
  const router = useRouter();

  const handleSetView = (view: string, tab?: string) => {
    setActiveView(view as NavLinkIdAdministrasi);
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

  const profileMenuItems = [
    { id: 'profil', label: 'Profil Saya', icon: User, action: () => handleSetView('profil', 'biodata') },
    { id: 'keamanan', label: 'Ganti Password', icon: KeyRound, action: () => handleSetView('profil', 'keamanan') }
  ];

  const notifications = [
    { title: '10 Pendaftar Baru', subtitle: 'Memerlukan validasi pembayaran' },
    { title: 'Laporan Keuangan Bulanan Siap', subtitle: 'Periode Juni 2025 telah digenerate' },
  ];

  const pageTitle = navLinksAdministrasi.find(link => link.id === activeView)?.title || 'Dashboard';
  const animationVariants = {
    initial: { opacity: 0, y: 15 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -15 },
  };

  const userProfileData = {
    nama: administrasi.nama,
    peran: administrasi.peran,
    idNumber: administrasi.nip,
    idLabel: "NIP",
    status: 'Aktif',
    fotoProfil: administrasi.fotoProfil,
  };

  const profileTabs = [
    { id: 'keamanan', label: 'Keamanan', content: <KeamananSection /> },
  ];

  const renderActiveComponent = () => {
      const views: { [key in NavLinkIdAdministrasi]: React.ComponentType<any> } = {
          dashboard: DashboardView,
          pendaftaran: PendaftaranView,
          keuangan: KeuanganView,
          akademik: AkademikView,
          profil: () => <ProfileView user={userProfileData} tabs={profileTabs} initialTab={targetProfileTab} />,
      };
      const Component = views[activeView];
      return Component ? <Component /> : null;
  };

  return (
    <div className="relative min-h-screen lg:flex bg-gray-100 font-sans">
      <Sidebar
        navLinks={navLinksAdministrasi}
        activeView={activeView}
        setActiveView={handleSetView}
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
        handleLogout={() => setIsLogoutModalOpen(true)}
        portalTitle="Portal Administrasi"
      />

      <div className="flex-1 flex flex-col h-screen">
        <Header
          title={pageTitle}
          user={administrasi}
          profileMenuItems={profileMenuItems}
          notifications={notifications}
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

export default AdministrasiLayout;