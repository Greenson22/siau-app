// src/components/fragments/Sidebar.tsx
'use client';

import SidebarHeader from './Sidebar/SidebarHeader';
import SidebarNav from './Sidebar/SidebarNav';
import SidebarFooter from './Sidebar/SidebarFooter';
import type { NavLink } from '@/types';

interface SidebarProps {
  navLinks: NavLink[];
  activeView: string;
  setActiveView: (view: string) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  handleLogout: () => void;
  portalTitle: string;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  navLinks, 
  activeView, 
  setActiveView, 
  isOpen, 
  setIsOpen, 
  handleLogout,
  portalTitle 
}) => {
  return (
    <aside 
      className={`
        fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-lg
        flex flex-col text-gray-700
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        md:relative md:translate-x-0 md:shadow-none
      `}
    >
      <SidebarHeader portalTitle={portalTitle} onClose={() => setIsOpen(false)} />
      <SidebarNav navLinks={navLinks} activeView={activeView} setActiveView={setActiveView} />
      <SidebarFooter onLogout={handleLogout} />
    </aside>
  );
};

export default Sidebar;