'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence, Transition } from 'framer-motion';
import {
    User, KeyRound, Mail, Phone, Home, Calendar, VenetianMask, UserSquare, BookOpen, Star
} from 'lucide-react';

import Sidebar from '@/components/fragments/Sidebar';
import Header from '@/components/fragments/Header';
import ConfirmationModal from '@/components/fragments/Modal/ConfirmationModal';
// --- 1. Impor DashboardView yang sudah digabung ---
import DashboardView from '@/components/fragments/DashboardView'; 
import FinanceView from '@/components/fragments/FinanceView';
import AcademicView from '@/components/fragments/AcademicView';
import ProfileView, { KeamananSection, InfoItem } from '@/components/fragments/ProfileView';
import { navLinks, NavLinkId, ProfileTab, mahasiswa } from '@/lib/data';

import BiodataMahasiswaSection from '@/components/fragments/ProfileView/BiodataMahasiswaSection';
import AkademikMahasiswaSection from '@/components/fragments/ProfileView/AkademikMahasiswaSection';

// Wrapper untuk komponen-komponen yang membutuhkan role
const MahasiswaProfileWrapper = ({ initialTab }: { initialTab: ProfileTab }) => {
    const userProfileData = {
        nama: mahasiswa.nama,
        peran: mahasiswa.peran,
        idNumber: mahasiswa.nim,
        idLabel: "NIM",
        status: mahasiswa.status,
        fotoProfil: mahasiswa.fotoProfil,
        detail: mahasiswa.prodi,
    };
    const profileTabs = [
        { id: 'biodata', label: 'Biodata', content: <BiodataMahasiswaSection mahasiswa={mahasiswa}/> },
        { id: 'akademik', label: 'Info Akademik', content: <AkademikMahasiswaSection mahasiswa={mahasiswa}/> },
        { id: 'keamanan', label: 'Keamanan', content: <KeamananSection /> },
    ];
    return <ProfileView user={userProfileData} tabs={profileTabs} initialTab={initialTab} />;
};
const MahasiswaAcademicWrapper = () => <AcademicView role="mahasiswa" />;
const MahasiswaDashboardWrapper = () => <DashboardView role="mahasiswa" />;

const views: { [key in NavLinkId]: React.ComponentType<any> } = {
  dashboard: MahasiswaDashboardWrapper,
  profil: MahasiswaProfileWrapper,
  keuangan: FinanceView,
  akademik: MahasiswaAcademicWrapper,
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

  const profileMenuItemsMhs = [
    { id: 'profil', label: 'Profil Saya', icon: User, action: () => handleSetView('profil', 'biodata') },
    { id: 'keamanan', label: 'Ganti Password', icon: KeyRound, action: () => handleSetView('profil', 'keamanan') }
  ];

  const notificationsMhs = [
      { title: 'Batas Akhir Pembayaran UKT', subtitle: '30 Juli 2025' },
      { title: 'Validasi KRS oleh Dosen PA', subtitle: '25-31 Agustus 2025' },
      { title: 'Perkuliahan Semester Ganjil Dimulai', subtitle: '1 September 2025' },
  ];

  const animationVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  const animationTransition: Transition = {
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

      <Sidebar 
        navLinks={navLinks}
        portalTitle="Portal Mahasiswa"
        activeView={activeView} 
        setActiveView={(view) => handleSetView(view as NavLinkId)}
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
        handleLogout={handleRequestLogout}
      />
      
      <div className="flex-1 flex flex-col h-screen">
        <Header 
          title={pageTitle} 
          user={mahasiswa}
          profileMenuItems={profileMenuItemsMhs}
          notifications={notificationsMhs}
          toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} 
          handleLogout={handleRequestLogout}
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