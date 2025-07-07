'use client';

import { useState, useRef, useEffect } from 'react';
import { Bell, Menu, LogOut, ChevronDown, LucideIcon } from 'lucide-react';

// --- Tipe Data Generik ---
interface UserData {
  nama: string;
  peran: string;
  email: string;
}

interface ProfileMenuItem {
  id: string;
  label: string;
  icon: LucideIcon;
  action: () => void;
}

interface NotificationItem {
    title: string;
    subtitle: string;
}

interface HeaderProps {
  title: string;
  user: UserData;
  profileMenuItems: ProfileMenuItem[];
  notifications: NotificationItem[];
  toggleSidebar: () => void;
  handleLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({
  title,
  user,
  profileMenuItems,
  notifications,
  toggleSidebar,
  handleLogout,
}) => {
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setIsNotifOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const getInitials = (name: string) => {
    const names = name.split(' ');
    if (names.length > 1) {
      return `${names[0].charAt(0)}${names[1].charAt(0)}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  const handleItemClick = (action: () => void) => {
      action();
      setIsProfileOpen(false);
  }

  return (
    <header className="bg-white shadow-sm p-4 flex justify-between items-center mb-6">
      {/* Bagian Kiri */}
      <div className="flex items-center gap-4">
        <button onClick={toggleSidebar} className="md:hidden text-gray-500 hover:text-gray-700 transition-colors">
          <Menu size={24} />
        </button>
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800">{title}</h2>
      </div>

      {/* Bagian Kanan */}
      <div className="flex items-center gap-3 sm:gap-5">
        {/* Notifikasi */}
        <div ref={notifRef} className="relative">
          <button
            onClick={() => setIsNotifOpen(prev => !prev)}
            className="relative p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-700 transition-colors"
          >
            <Bell size={20} />
            {notifications.length > 0 && 
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            }
          </button>
          {isNotifOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 z-20 animate-fade-in-down">
              <div className="px-4 py-3 border-b border-gray-200"><h3 className="font-semibold">Notifikasi</h3></div>
              <ul className="py-2 max-h-80 overflow-y-auto">
                {notifications.length > 0 ? (
                    notifications.map((item, index) => (
                        <li key={index} className="px-4 py-3 hover:bg-gray-50 cursor-pointer">
                            <p className="font-semibold text-sm">{item.title}</p>
                            <p className="text-xs text-gray-500">{item.subtitle}</p>
                        </li>
                    ))
                ) : (
                    <li className="px-4 py-3 text-sm text-gray-500">Tidak ada notifikasi baru.</li>
                )}
              </ul>
            </div>
          )}
        </div>

        {/* Garis Pemisah */}
        <div className="w-px h-8 bg-gray-200 hidden sm:block"></div>

        {/* Profil */}
        <div ref={profileRef} className="relative">
          <button onClick={() => setIsProfileOpen(prev => !prev)} className="flex items-center gap-3 p-1 rounded-lg hover:bg-gray-100">
            <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-lg">
              {getInitials(user.nama)}
            </div>
            <div className="hidden sm:block text-left">
              <p className="font-semibold text-sm">{user.nama}</p>
              <p className="text-xs text-gray-500">{user.peran}</p>
            </div>
            <ChevronDown size={16} className={`text-gray-500 transition-transform hidden sm:block ${isProfileOpen ? 'rotate-180' : ''}`} />
          </button>
          {/* Menu Profil */}
          {isProfileOpen && (
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
      </div>
    </header>
  );
};

export default Header;