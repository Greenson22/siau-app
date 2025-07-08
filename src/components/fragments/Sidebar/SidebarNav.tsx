// src/components/fragments/Sidebar/SidebarNav.tsx
import type { NavLink } from '@/types';
import SidebarNavItem from './SidebarNavItem';

interface SidebarNavProps {
  navLinks: NavLink[];
  activeView: string;
  setActiveView: (view: string) => void;
}

const SidebarNav: React.FC<SidebarNavProps> = ({ navLinks, activeView, setActiveView }) => (
  <nav className="flex-1 px-4 py-4 space-y-2 overflow-y-auto">
    {navLinks.map((link) => (
      <SidebarNavItem
        key={link.id}
        link={link}
        isActive={activeView === link.id}
        onClick={() => setActiveView(link.id)}
      />
    ))}
  </nav>
);

export default SidebarNav;