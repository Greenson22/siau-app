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
    const [activeView, setActiveView] = useState<NavLinkId>('dashboard');
    const ActiveComponent = views[activeView];
    const pageTitle = navLinks.find(link => link.id === activeView)?.title || 'Dashboard';

    return (
        <div className="flex h-screen bg-gray-50 font-sans">
            <Sidebar activeView={activeView} setActiveView={setActiveView} />
            <div className="flex-1 flex flex-col">
                <main className="flex-1 p-8 overflow-y-auto">
                    <Header title={pageTitle} />
                    <ActiveComponent />
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;