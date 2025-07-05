'use client';

import { useState, useRef, useEffect } from 'react';
import { Bell, Menu, LogOut, User, ChevronDown } from 'lucide-react';
import { dosen } from '@/lib/dataDosen';
import type { NavLinkIdDosen } from '@/lib/dataDosen';

interface HeaderDosenProps {
  title: string;
  toggleSidebar: () => void;
  handleLogout: () => void;
  // setActiveView dapat ditambahkan jika diperlukan navigasi dari header
}

const HeaderDosen: React.FC<HeaderDosenProps> = ({ title, toggleSidebar, handleLogout }) => {
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
    // Mengambil inisial dari nama depan dan gelar
    if (names.length > 1) {
      return `${names[0].charAt(0)}${names[1].charAt(0)}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  return (
    <header className="bg-white shadow-sm p-4 flex justify-between items-center mb-6">
      {/* Bagian Kiri Header */}
      <div className="flex items-center gap-4">
        <button onClick={toggleSidebar} className="md:hidden text-gray-500 hover:text-gray-700 transition-colors">
          <Menu size={24} />
        </button>
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800">{title}</h2>
      </div>

      {/* Bagian Kanan Header */}
      <div className="flex items-center gap-3 sm:gap-5">
        {/* Tombol Notifikasi */}
        <div ref={notifRef} className="relative">
          <button
            onClick={() => setIsNotifOpen(prev => !prev)}
            className="relative p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-700 transition-colors"
          >
            <Bell size={20} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
          </button>
          {isNotifOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-100 z-20 transition-all duration-300 ease-in-out transform-gpu origin-top-right animate-fade-in-down">
              <div className="px-4 py-3 border-b">
                <h3 className="font-semibold text-gray-800">Notifikasi</h3>
              </div>
              <ul className="py-2 max-h-80 overflow-y-auto">
                <li className="px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors">
                  <p className="font-semibold text-sm text-gray-800">5 Mahasiswa Membutuhkan Validasi KRS</p>
                  <p className="text-xs text-gray-500">Batas waktu: 31 Agustus 2025</p>
                </li>
                <li className="px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors">
                  <p className="font-semibold text-sm text-gray-800">Jadwal Rapat Dosen</p>
                  <p className="text-xs text-gray-500">Besok, 10:00 WITA di Ruang Rapat</p>
                </li>
              </ul>
              <div className="px-4 py-2 border-t text-center">
                 <a href="#" className="text-sm text-indigo-600 hover:underline">Lihat semua notifikasi</a>
              </div>
            </div>
          )}
        </div>

        {/* Garis Pemisah */}
        <div className="w-px h-8 bg-gray-200 hidden sm:block"></div>

        {/* Dropdown Profil */}
        <div ref={profileRef} className="relative">
          <button onClick={() => setIsProfileOpen(prev => !prev)} className="flex items-center gap-3 p-1 rounded-lg transition-colors hover:bg-gray-100">
            <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-lg">
              {getInitials(dosen.nama)}
            </div>
            <div className="hidden sm:block text-left">
              <p className="font-semibold text-sm text-gray-800">{dosen.nama}</p>
              <p className="text-xs text-gray-500">{dosen.peran}</p>
            </div>
            <ChevronDown size={16} className={`text-gray-500 transition-transform hidden sm:block ${isProfileOpen ? 'rotate-180' : ''}`} />
          </button>
          
          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-100 z-20 py-1 transition-all duration-300 ease-in-out transform-gpu origin-top-right animate-fade-in-down">
                <div className="px-4 py-3 border-b">
                    <p className="font-semibold text-sm text-gray-800">{dosen.nama}</p>
                    <p className="text-xs text-gray-500">{dosen.email}</p>
                </div>
                <ul className="py-1">
                    <li>
                        <button className="flex items-center gap-3 w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">
                            <User size={16} />
                            <span>Profil Saya</span>
                        </button>
                    </li>
                </ul>
                <hr className="border-gray-100 my-1" />
                <ul>
                    <li>
                        <button onClick={handleLogout}
                                className="flex items-center gap-3 w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors">
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