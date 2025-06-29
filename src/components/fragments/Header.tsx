'use client';

import { Bell, Menu } from 'lucide-react';
import { mahasiswa } from '@/lib/data';
import Avatar from '@/components/elements/Avatar';
import ProfileDropdown from './ProfileDropdown';
import { useState } from 'react';

interface HeaderProps {
    title: string;
    toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ title, toggleSidebar }) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="flex justify-between items-center mb-6">
      <div className="flex items-center gap-4">
        <button onClick={toggleSidebar} className="md:hidden text-gray-600 hover:text-gray-800">
          <Menu size={24} />
        </button>
        <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
      </div>
      <div className="flex items-center gap-4">
        <div className="relative">
          <Bell size={20} className="text-gray-500" />
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
        </div>
        <div className="relative">
          <button onClick={() => setDropdownOpen(!isDropdownOpen)} className="flex items-center gap-3">
            <Avatar src={mahasiswa.avatar} name={mahasiswa.nama} className="w-10 h-10" />
            <div className="hidden sm:block text-left">
              <p className="font-semibold text-gray-700">{mahasiswa.nama}</p>
              <p className="text-sm text-gray-500">{mahasiswa.peran}</p>
            </div>
          </button>
          <ProfileDropdown isOpen={isDropdownOpen} />
        </div>
      </div>
    </header>
  );
};

export default Header;