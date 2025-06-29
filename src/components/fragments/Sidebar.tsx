'use client';
import { LogOut } from 'lucide-react';
import { navLinks, NavLinkId } from '@/lib/data';

interface SidebarProps {
  activeView: NavLinkId;
  setActiveView: (view: NavLinkId) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeView, setActiveView }) => {
  return (
    <aside className="w-72 bg-white flex flex-col border-r border-gray-200">
      <div className="px-8 py-6 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-indigo-600">STTIS Siau</h1>
        <p className="text-sm text-gray-500">Portal Mahasiswa</p>
      </div>
      <nav className="flex-1 px-6 py-6 space-y-3">
        {navLinks.map((link) => (
          <a
            key={link.id}
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setActiveView(link.id as NavLinkId);
            }}
            className={`flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-200 ${
              activeView === link.id
                ? 'bg-indigo-500 text-white shadow-md'
                : 'text-gray-600 hover:bg-indigo-50 hover:text-indigo-600'
            }`}
          >
            <link.icon size={22} />
            <span className="font-medium">{link.title}</span>
          </a>
        ))}
      </nav>
      <div className="px-6 py-6 border-t border-gray-200">
        <button className="w-full flex items-center justify-center gap-3 py-3 px-4 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600 transition-colors">
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;