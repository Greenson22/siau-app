'use client';

import { useState } from 'react';
import { Menu, Bell, LogOut, User, ChevronDown } from 'lucide-react';
import { dosen } from '@/lib/dataDosen';

interface HeaderDosenProps {
  title: string;
  toggleSidebar: () => void;
  handleLogout: () => void;
}

const HeaderDosen: React.FC<HeaderDosenProps> = ({ title, toggleSidebar, handleLogout }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm p-4 flex justify-between items-center sticky top-0 z-10">
      <div className="flex items-center gap-4">
        <button onClick={toggleSidebar} className="lg:hidden text-gray-500">
          <Menu size={24} />
        </button>
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800">{title}</h2>
      </div>

      <div className="flex items-center gap-5">
        <button className="relative p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500">
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>
        
        <div className="relative">
          <button onClick={() => setIsProfileOpen(prev => !prev)} className="flex items-center gap-3">
            <img src={dosen.avatar} alt={dosen.nama} className="w-10 h-10 rounded-full" />
            <div className="hidden sm:block text-left">
              <p className="font-semibold text-sm text-gray-800">{dosen.nama}</p>
              <p className="text-xs text-gray-500">{dosen.peran}</p>
            </div>
            <ChevronDown size={16} className={`text-gray-500 transition-transform hidden sm:block ${isProfileOpen ? 'rotate-180' : ''}`} />
          </button>
          
          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border z-20 py-1 animate-fade-in-down">
              <div className="px-4 py-3 border-b">
                <p className="font-semibold text-sm text-gray-800">{dosen.nama}</p>
                <p className="text-xs text-gray-500">{dosen.email}</p>
              </div>
              <ul className="py-1">
                <li>
                  <button className="flex items-center gap-3 w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    <User size={16} />
                    <span>Profil Saya</span>
                  </button>
                </li>
                <li>
                  <button onClick={handleLogout} className="flex items-center gap-3 w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                    <LogOut size={16} />
                    <span>Logout</span>
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default HeaderDosen;