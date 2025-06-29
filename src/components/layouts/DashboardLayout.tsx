'use client';
import { useState } from 'react';
import Sidebar from '@/components/fragments/Sidebar';
import Header from '@/components/fragments/Header';
import DashboardView from '@/components/fragments/DashboardView';
import ProfileView from '@/components/fragments/ProfileView';
// Import FinanceView and AcademicView similarly
// import FinanceView from '@/components/fragments/FinanceView'; 
// import AcademicView from '@/components/fragments/AcademicView';
import { navLinks, NavLinkId } from '@/lib/data';

const views: { [key in NavLinkId]: React.ComponentType } = {
  dashboard: DashboardView,
  profil: ProfileView,
  keuangan: () => <div>Konten Keuangan</div>, // Ganti dengan komponen asli
  akademik: () => <div>Konten Akademik</div>,   // Ganti dengan komponen asli
};

const DashboardLayout = () => {
    const [activeView, setActiveView] = useState<NavLinkId>('dashboard');
    const ActiveComponent = views[activeView];
    const pageTitle = navLinks.find(link => link.id === activeView)?.title || 'Dashboard';

    return (
        <div className="flex h-screen bg-gray-100 font-sans">
            <Sidebar activeView={activeView} setActiveView={setActiveView} />
            <main className="flex-1 p-6 lg:p-8 overflow-y-auto">
                <Header title={pageTitle} />
                <ActiveComponent />
            </main>
        </div>
    );
};

export default DashboardLayout;