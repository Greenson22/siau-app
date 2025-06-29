import { LogOut, User, Settings } from 'lucide-react';
import React from 'react';

interface ProfileDropdownProps {
  isOpen: boolean;
}

const ProfileDropdown: React.FC<ProfileDropdownProps> = ({ isOpen }) => {
  if (!isOpen) return null;

  return (
    <div className="absolute top-14 right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
      <a href="#" className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
        <User size={16} />
        <span>Profil</span>
      </a>
      <a href="#" className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
        <Settings size={16} />
        <span>Pengaturan</span>
      </a>
      <div className="border-t border-gray-200 my-1"></div>
      <a href="#" className="flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50">
        <LogOut size={16} />
        <span>Logout</span>
      </a>
    </div>
  );
};

export default ProfileDropdown;