'use client';

import { Menu } from 'lucide-react';
import type { HeaderProps } from '@/types';
import NotificationDropdown from './NotificationDropdown';
import ProfileDropdown from './ProfileDropdown';
import Button from '@/components/elements/Button'; // <-- 1. Impor Button

const Header: React.FC<HeaderProps> = ({
  title,
  user,
  profileMenuItems,
  notifications,
  toggleSidebar,
  handleLogout,
}) => {
  return (
    <header className="bg-white shadow-sm p-4 flex justify-between items-center mb-6">
      {/* Bagian Kiri */}
      <div className="flex items-center gap-4">
        <Button 
            onClick={toggleSidebar} 
            variant="ghost" 
            className="md:hidden !p-2"
        >
          <Menu size={24} />
        </Button>
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800">{title}</h2>
      </div>

      {/* Bagian Kanan (tidak berubah) */}
      <div className="flex items-center gap-3 sm:gap-5">
        <NotificationDropdown notifications={notifications} />
        <div className="w-px h-8 bg-gray-200 hidden sm:block"></div>
        <ProfileDropdown 
          user={user} 
          profileMenuItems={profileMenuItems} 
          handleLogout={handleLogout} 
        />
      </div>
    </header>
  );
};

export default Header;