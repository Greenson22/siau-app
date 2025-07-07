'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Mail, Phone, Building, BookCheck, BrainCircuit, GraduationCap, KeyRound } from 'lucide-react';

import Sidebar from '@/components/fragments/Sidebar'; 
import Header from '@/components/fragments/Header';
import ConfirmationModal from '@/components/fragments/Modal/ConfirmationModal';
import ProfileView, { KeamananSection, InfoItem } from '@/components/fragments/ProfileView';
import { navLinksDosen, dosen } from '@/lib/dataDosen'; 
import type { NavLinkIdDosen } from '@/lib/dataDosen';
// --- 1. Hapus impor DashboardDosenView ---
// import DashboardDosenView from '@/components/fragments/dosen/DashboardDosenView';
// --- 2. Impor DashboardView dan AcademicView yang sudah digabung ---
import DashboardView from '@/components/fragments/DashboardView'; 
import AcademicView from '@/components/fragments/AcademicView';
import BimbinganAkademikView from '@/components/fragments/dosen/BimbinganAkademikView';

// Komponen section untuk profil tidak berubah
const BiodataDosenSection = () => (
    <div className="space-y-4 text-sm">
        <h4 className="font-bold text-lg text-gray-700 mb-4">Informasi Kontak & Pribadi</h4>
        <InfoItem icon={<Mail size={16} />} label="Alamat Email" value={dosen.email} />
        <InfoItem icon={<Phone size={16} />} label="No. Telepon" value={dosen.telepon} />
        <InfoItem icon={<Building size={16} />} label="Alamat Kantor" value={dosen.alamatKantor} isBlock />
    </div>
);

const AkademikDosenSection = () => (
    <div className="space-y-6 text-sm">
        <div>
            <h4 className="font-bold text-lg text-gray-700 mb-4">Informasi Akademik</h4>
            <div className="space-y-4">
                <InfoItem icon={<BookCheck size={16} />} label="Jabatan Fungsional" value={dosen.jabatanAkademik} />
                <InfoItem icon={<BrainCircuit size={16} />} label="Bidang Keahlian" value={dosen.spesialisasi} isBlock />
            </div>
        </div>
         <div>
            <h4 className="font-bold text-lg text-gray-700 mt-6 mb-4">Riwayat Pendidikan</h4>
            <ul className="space-y-3">
                {dosen.riwayatPendidikan.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                        <GraduationCap className="text-indigo-500 mt-1 flex-shrink-0" size={18} />
                        <div>
                            <p className="font-semibold text-gray-800">{item.jenjang}</p>
                            <p className="text-gray-600">{item.institusi} - Lulus {item.tahun}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    </div>
);

// --- 3. Buat wrapper untuk komponen yang membutuhkan role ---
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

  // --- 4. Perbarui logika render komponen ---
  const renderActiveComponent = () => {
      const views: { [key: string]: React.ComponentType<any> } = {
          // Gunakan wrapper DashboardView yang baru
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