'use client';

import { useState, useRef, useEffect } from 'react';
import { Bell, Menu, LogOut, User, KeyRound } from 'lucide-react';
import { mahasiswa } from '@/lib/data';
import type { NavLinkId, ProfileTab } from '@/lib/data'; // Impor ProfileTab

// --- 1. Perbarui definisi prop setActiveView ---
interface HeaderProps {
    title: string;
    toggleSidebar: () => void;
    handleLogout: () => void;
    setActiveView: (view: NavLinkId, tab?: ProfileTab) => void; // Tambahkan argumen opsional
}

const Header: React.FC<HeaderProps> = ({ title, toggleSidebar, handleLogout, setActiveView }) => {
    // ... (state tidak berubah)
    const [isNotifOpen, setIsNotifOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    
    const notifRef = useRef<HTMLDivElement>(null);
    const profileRef = useRef<HTMLDivElement>(null);

    // ... (useEffect tidak berubah)
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

    // --- 2. Perbarui handleMenuClick untuk mengirim tab ---
    const handleMenuClick = (view: NavLinkId, tab?: ProfileTab) => {
        setActiveView(view, tab);
        setIsProfileOpen(false); // Tutup dropdown setelah diklik
    };

    return (
        <header className="flex justify-between items-center mb-6">
            {/* ... (bagian kiri header tidak berubah) ... */}
            <div className="flex items-center gap-4">
                 <button onClick={toggleSidebar} className="md:hidden text-gray-600 hover:text-gray-800">
                    <Menu size={24} />
                </button>
                <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
            </div>
            <div className="flex items-center gap-4">
                {/* ... (notifikasi tidak berubah) ... */}
                <div ref={notifRef} className="relative">
                    <button onClick={() => setIsNotifOpen(prev => !prev)} className="relative p-2 rounded-full hover:bg-gray-100">
                        <Bell size={20} className="text-gray-500" />
                        <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                    </button>
                </div>
                {/* Profil Dropdown */}
                <div ref={profileRef} className="relative">
                     <button onClick={() => setIsProfileOpen(prev => !prev)} className="flex items-center gap-3 p-1 rounded-lg hover:bg-gray-100">
                         <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-500 font-bold text-lg">
                           {mahasiswa.nama.charAt(0)}{mahasiswa.nama.split(' ')[1]?.charAt(0)}
                        </div>
                        <div className="hidden sm:block text-left">
                            <p className="font-semibold text-gray-700">{mahasiswa.nama}</p>
                            <p className="text-sm text-gray-500">{mahasiswa.peran}</p>
                        </div>
                    </button>

                    {isProfileOpen && (
                        <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 z-10 py-1">
                            <ul>
                                <li>
                                    <button 
                                        onClick={() => handleMenuClick('profil', 'biodata')} // Arahkan ke tab biodata
                                        className="flex items-center gap-3 w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                        <User size={16} />
                                        <span>Lihat Profil</span>
                                    </button>
                                </li>
                                <li>
                                    {/* --- 3. Arahkan ke tab keamanan --- */}
                                    <button
                                        onClick={() => handleMenuClick('profil', 'keamanan')}
                                        className="flex items-center gap-3 w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                        <KeyRound size={16} />
                                        <span>Ganti Password</span>
                                    </button>
                                </li>
                                <li className="my-1">
                                    <hr className="border-gray-200" />
                                </li>
                                <li>
                                    <button 
                                        onClick={handleLogout} 
                                        className="flex items-center gap-3 w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                                    >
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