'use client';
import { useState, useEffect } from 'react';
import Sidebar from '@/components/fragments/Sidebar';
import Header from '@/components/fragments/Header';
import DashboardView from '@/components/fragments/DashboardView';
import ProfileView from '@/components/fragments/ProfileView';
import FinanceView from '@/components/fragments/FinanceView';
import AcademicView from '@/components/fragments/AcademicView';
import { navLinks, NavLinkId } from '@/lib/data';

const views: { [key in NavLinkId]: React.ComponentType } = {
  dashboard: DashboardView,
  profil: ProfileView,
  keuangan: FinanceView,
  akademik: AcademicView,
};

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeView, setActiveView] = useState<NavLinkId>('dashboard');

  // Efek untuk memuat state dari localStorage saat komponen dimuat
  useEffect(() => {
    const savedItemJSON = localStorage.getItem('activeView');
    
    if (savedItemJSON) {
      try {
        const item = JSON.parse(savedItemJSON);
        const now = new Date().getTime();
        const oneMinuteInMs = 60 * 1000;

        // Periksa apakah item belum kedaluwarsa (kurang dari 1 menit)
        if (now - item.timestamp < oneMinuteInMs) {
          if (item.view && navLinks.some(link => link.id === item.view)) {
            setActiveView(item.view as NavLinkId);
          }
        } else {
          // Jika sudah kedaluwarsa, hapus dari localStorage
          localStorage.removeItem('activeView');
        }
      } catch (error) {
        // Jika ada error saat parsing JSON, hapus item yang salah format
        localStorage.removeItem('activeView');
      }
    }
  }, []);

  // Efek untuk menyimpan state ke localStorage setiap kali activeView berubah
  useEffect(() => {
    const item = {
      view: activeView,
      timestamp: new Date().getTime() // Simpan waktu saat ini
    };
    localStorage.setItem('activeView', JSON.stringify(item));
  }, [activeView]);
  
  const ActiveComponent = views[activeView];
  const pageTitle = navLinks.find(link => link.id === activeView)?.title || 'Dashboard';

  const handleSetView = (view: NavLinkId) => {
    setActiveView(view);
    if (window.innerWidth < 768) {
      setIsSidebarOpen(false);
    }
  };

  return (
    <div className="relative min-h-screen md:flex bg-gray-100 font-sans">
      <Sidebar 
        activeView={activeView} 
        setActiveView={handleSetView}
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
      />
      
      <div className="flex-1">
        <main className="p-6 lg:p-8">
          <Header title={pageTitle} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
          <ActiveComponent />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;