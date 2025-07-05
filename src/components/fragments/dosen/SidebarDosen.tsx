'use client';
import { LogOut, X } from 'lucide-react';
import Image from 'next/image';
import { navLinksDosen, NavLinkIdDosen } from '@/lib/dataDosen';

interface SidebarDosenProps {
  activeView: NavLinkIdDosen;
  setActiveView: (view: NavLinkIdDosen) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  handleLogout: () => void;
}

const SidebarDosen: React.FC<SidebarDosenProps> = ({ activeView, setActiveView, isOpen, setIsOpen, handleLogout }) => {
  return (
    <aside className={`fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-lg flex flex-col transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:relative lg:translate-x-0 lg:shadow-none`}>
      <div className="flex items-center justify-between px-6 py-5 border-b">
        <div className="flex items-center gap-3">
            <Image src="/images/logo.png" alt="Logo STTIS Siau" width={40} height={40} className="rounded-full"/>
            <span className="text-xl font-bold text-gray-800">Portal Dosen</span>
        </div>
        <button onClick={() => setIsOpen(false)} className="lg:hidden text-gray-500">
          <X size={24} />
        </button>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-2">
        {navLinksDosen.map((link) => (
          <a key={link.id} href="#" onClick={(e) => { e.preventDefault(); setActiveView(link.id as NavLinkIdDosen); }}
            className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${activeView === link.id ? 'bg-indigo-100 text-indigo-700 font-semibold' : 'text-gray-600 hover:bg-gray-50'}`}>
            <link.icon size={20} />
            <span>{link.title}</span>
          </a>
        ))}
      </nav>

      <div className="px-6 py-4 border-t">
        <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 py-2 px-4 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700">
          <LogOut size={16} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default SidebarDosen;