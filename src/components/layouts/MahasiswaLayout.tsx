'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
    User, KeyRound, Mail, Phone, Home, Calendar, VenetianMask, UserSquare, BookOpen, Star
} from 'lucide-react';

import Sidebar from '@/components/fragments/Sidebar';
import Header from '@/components/fragments/Header';
import ConfirmationModal from '@/components/fragments/ConfirmationModal';
import DashboardView from '@/components/fragments/DashboardView';
import FinanceView from '@/components/fragments/FinanceView';
// --- 1. Impor AcademicView yang sudah digabung ---
import AcademicView from '@/components/fragments/AcademicView';
import ProfileView, { KeamananSection, InfoItem } from '@/components/fragments/ProfileView';
import { navLinks, NavLinkId, ProfileTab, mahasiswa } from '@/lib/data';

// Komponen section untuk profil mahasiswa tetap sama
const BiodataMahasiswaSection = () => (
    <div className="space-y-4 text-sm">
        <h4 className="font-bold text-lg text-gray-700 mb-4">Informasi Pribadi</h4>
        <InfoItem icon={<Calendar size={16} />} label="Tempat, Tanggal Lahir" value={mahasiswa.ttl} />
        <InfoItem icon={<VenetianMask size={16} />} label="Jenis Kelamin" value={mahasiswa.jenisKelamin} />
        <InfoItem icon={<Mail size={16} />} label="Email" value={mahasiswa.email} />
        <InfoItem icon={<Phone size={16} />} label="No. Telepon" value={mahasiswa.telepon} />
        <InfoItem icon={<Home size={16} />} label="Alamat" value={mahasiswa.alamat} isBlock />
    </div>
);

const AkademikMahasiswaSection = () => (
    <div className="space-y-4 text-sm">
        <h4 className="font-bold text-lg text-gray-700 mb-4">Informasi Akademik</h4>
        <InfoItem icon={<UserSquare size={16} />} label="Dosen Pembimbing Akademik" value={mahasiswa.dosenPA} />
        <InfoItem icon={<BookOpen size={16} />} label="Semester" value={mahasiswa.semester} />
        <InfoItem icon={<Star size={16} />} label="Total SKS Ditempuh" value={mahasiswa.totalSKS} />
        <InfoItem icon={<Star size={16} />} label="Indeks Prestasi Kumulatif (IPK)" value={mahasiswa.ipk.toFixed(2)} />
    </div>
);

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
        { id: 'biodata', label: 'Biodata', content: <BiodataMahasiswaSection /> },
        { id: 'akademik', label: 'Info Akademik', content: <AkademikMahasiswaSection /> },
        { id: 'keamanan', label: 'Keamanan', content: <KeamananSection /> },
    ];

    return <ProfileView user={userProfileData} tabs={profileTabs} initialTab={initialTab} />;
};

// --- 2. Buat wrapper untuk AcademicView Mahasiswa ---
// Komponen ini akan memberikan prop `role` yang sesuai
const MahasiswaAcademicWrapper = () => (
    <AcademicView role="mahasiswa" />
);


// --- 3. Perbarui `views` object ---
const views: { [key in NavLinkId]: React.ComponentType<any> } = {
  dashboard: DashboardView,
  profil: MahasiswaProfileWrapper,
  keuangan: FinanceView,
  // Gunakan wrapper AcademicView untuk mahasiswa
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
                {/* Komponen aktif akan dirender di sini, 
                    jika `activeView` adalah 'akademik', maka `MahasiswaAcademicWrapper` yang akan dipanggil.
                */}
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