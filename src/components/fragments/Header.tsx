'use client';

import { useState, useRef, useEffect } from 'react';
import { Bell, Menu, LogOut } from 'lucide-react';
import { mahasiswa, notifikasi } from '@/lib/data';

// --- 1. Tambahkan prop handleLogout ---
interface HeaderProps {
    title: string;
    toggleSidebar: () => void;
    handleLogout: () => void; // Prop untuk fungsi logout
}

const Header: React.FC<HeaderProps> = ({ title, toggleSidebar, handleLogout }) => {
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

    return (
        <header className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-4">
                <button onClick={toggleSidebar} className="md:hidden text-gray-600 hover:text-gray-800">
                    <Menu size={24} />
                </button>
                <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
            </div>
            <div className="flex items-center gap-4">
                {/* Notifikasi Dropdown */}
                <div ref={notifRef} className="relative">
                    <button onClick={() => setIsNotifOpen(prev => !prev)} className="relative p-2 rounded-full hover:bg-gray-100">
                        <Bell size={20} className="text-gray-500" />
                        <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                    </button>
                    {isNotifOpen && (
                        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                            <div className="p-3 border-b">
                                <p className="font-semibold text-gray-800">Notifikasi</p>
                            </div>
                            <ul>
                                {notifikasi.map(item => (
                                    <li key={item.id} className="border-b last:border-b-0 hover:bg-gray-50">
                                        <a href="#" className="block p-3 text-sm">
                                            <p className="text-gray-700">{item.pesan}</p>
                                            <p className="text-xs text-gray-400 mt-1">{item.waktu}</p>
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
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
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                            <ul>
                                <li>
                                    {/* --- 2. Tambahkan onClick untuk memanggil handleLogout --- */}
                                    <button 
                                        onClick={handleLogout} 
                                        className="flex items-center gap-3 w-full text-left p-3 text-sm text-red-600 hover:bg-red-50 rounded-lg"
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