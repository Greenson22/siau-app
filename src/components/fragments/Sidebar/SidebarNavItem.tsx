// src/components/fragments/Sidebar/SidebarNavItem.tsx
import type { NavLink } from '@/types';

interface SidebarNavItemProps {
  link: NavLink;
  isActive: boolean;
  onClick: () => void;
}

const SidebarNavItem: React.FC<SidebarNavItemProps> = ({ link, isActive, onClick }) => (
  <a
    href="#"
    onClick={(e) => {
      e.preventDefault();
      onClick();
    }}
    className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors duration-200 ${
      isActive
        ? 'bg-indigo-100 text-indigo-700 font-semibold'
        : 'text-gray-600 hover:bg-indigo-50 hover:text-indigo-600'
    }`}
  >
    <link.icon size={20} />
    <span>{link.title}</span>
  </a>
);

export default SidebarNavItem;