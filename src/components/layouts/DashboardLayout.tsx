'use client';
import { useState } from 'react';
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
  const [isNotificationOpen, setIsNotificationOpen] = useState(false); // State untuk notifikasi
  
  const ActiveComponent = views[activeView];
  const pageTitle = navLinks.find(link => link.id === activeView)?.title || 'Dashboard';

  const handleSetView = (view: NavLinkId) => {
    setActiveView(view);
    if (window.innerWidth < 768) {
      setIsSidebarOpen(false);
    }
  };

  const handleLayoutClick = () => {
    // Menutup popover notifikasi jika sedang terbuka
    if (isNotificationOpen) {
      setIsNotificationOpen(false);
    }
  };

  return (
    <div className="relative min-h-screen md:flex bg-gray-100 font-sans" onClick={handleLayoutClick}>
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
      />
      
      <div className="flex-1">
        <main className="p-6 lg:p-8">
          <Header 
            title={pageTitle} 
            toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
            isNotificationOpen={isNotificationOpen}
            toggleNotification={() => setIsNotificationOpen(!isNotificationOpen)}
          />
          <ActiveComponent />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;