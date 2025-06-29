'use client';
import { LogOut, X } from 'lucide-react';
import { navLinks, NavLinkId } from '@/lib/data';

interface SidebarProps {
  activeView: NavLinkId;
  setActiveView: (view: NavLinkId) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeView, setActiveView, isOpen, setIsOpen }) => {
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
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
        <div>
          <h1 className="text-xl font-bold text-gray-800">STTIS Siau</h1>
          <p className="text-sm text-gray-500">Portal Mahasiswa</p>
        </div>
        <button onClick={() => setIsOpen(false)} className="md:hidden text-gray-500 hover:text-gray-800">
          <X size={24} />
        </button>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-2 overflow-y-auto">
        {navLinks.map((link) => (
          <a
            key={link.id}
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setActiveView(link.id as NavLinkId);
            }}
            className={`flex items-center gap-3 px-3 py-2 rounded-md transition ${
              activeView === link.id
                ? 'bg-gray-200 text-gray-900 font-semibold'
                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'
            }`}
          >
            <link.icon size={20} />
            <span>{link.title}</span>
          </a>
        ))}
      </nav>

      <div className="px-6 py-4 border-t border-gray-200">
        <button className="w-full flex items-center justify-center gap-2 py-2 px-4 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 transition">
          <LogOut size={16} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;