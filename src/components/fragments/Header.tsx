'use client'; // Diperlukan untuk hooks seperti useState, useRef, useEffect

import { useState, useRef, useEffect } from 'react';
import { Bell, Menu } from 'lucide-react';
import { mahasiswa, notifikasi } from '@/lib/data';

interface HeaderProps {
    title: string;
    toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ title, toggleSidebar }) => {
    const [isNotifOpen, setIsNotifOpen] = useState(false);
    const notifRef = useRef<HTMLDivElement>(null);

    // Menutup notifikasi jika klik di luar area
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
                setIsNotifOpen(false);
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
                {/* --- AWAL PERUBAHAN --- */}
                <div ref={notifRef} className="relative">
                    <button onClick={() => setIsNotifOpen(prev => !prev)} className="relative">
                        <Bell size={20} className="text-gray-500" />
                        <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
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
                {/* --- AKHIR PERUBAHAN --- */}

                <div className="flex items-center gap-3">
                    <img src={mahasiswa.avatar} alt="User Avatar" className="w-10 h-10 rounded-full"/>
                    <div className="hidden sm:block">
                        <p className="font-semibold text-gray-700">{mahasiswa.nama}</p>
                        <p className="text-sm text-gray-500">{mahasiswa.peran}</p>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;