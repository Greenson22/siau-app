'use client';

import { useState, useRef, useEffect } from 'react';
import { LogOut, ChevronDown } from 'lucide-react';
import type { User, ProfileMenuItem } from '@/types';
import { getInitials } from '@/lib/utils';

interface ProfileDropdownProps {
  user: User;
  profileMenuItems: ProfileMenuItem[];
  handleLogout: () => void;
}

const ProfileDropdown: React.FC<ProfileDropdownProps> = ({ user, profileMenuItems, handleLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleItemClick = (action: () => void) => {
    action();
    setIsOpen(false);
  }

  return (
    <div ref={ref} className="relative">
      <button onClick={() => setIsOpen(prev => !prev)} className="flex items-center gap-3 p-1 rounded-lg hover:bg-gray-100">
        <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-lg">
          {getInitials(user.nama)}
        </div>
        <div className="hidden sm:block text-left">
          <p className="font-semibold text-sm">{user.nama}</p>
          <p className="text-xs text-gray-500">{user.peran}</p>
        </div>
        <ChevronDown size={16} className={`text-gray-500 transition-transform hidden sm:block ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 z-20 py-1 animate-fade-in-down">
          <div className="px-4 py-3 border-b border-gray-200">
            <p className="font-semibold text-sm">{user.nama}</p>
            <p className="text-xs text-gray-500">{user.email}</p>
          </div>
          <ul className="py-1">
            {profileMenuItems.map((item) => (
              <li key={item.id}>
                <button onClick={() => handleItemClick(item.action)} className="flex items-center gap-3 w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  <item.icon size={16} />
                  <span>{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
          <hr className="my-1 border-gray-100" />
          <ul>
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
  );
};

export default ProfileDropdown;