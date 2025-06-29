'use client';

import { Bell, Menu } from 'lucide-react';
import { mahasiswa, notifications } from '@/lib/data';
import Card from '../elements/Card';

interface HeaderProps {
    title: string;
    toggleSidebar: () => void;
    isNotificationOpen: boolean;
    toggleNotification: () => void;
}

const Header: React.FC<HeaderProps> = ({ title, toggleSidebar, isNotificationOpen, toggleNotification }) => (
    <header className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
            <button onClick={toggleSidebar} className="md:hidden text-gray-600 hover:text-gray-800">
                <Menu size={24} />
            </button>
            <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
        </div>
        <div className="flex items-center gap-4">
            {/* Tombol Notifikasi */}
            <div className="relative">
                <button 
                    onClick={(e) => {
                        e.stopPropagation(); // Mencegah layout menutup popover saat dibuka
                        toggleNotification();
                    }} 
                    className="relative text-gray-500 hover:text-gray-800"
                >
                    <Bell size={20} />
                    {/* Indikator Notifikasi */}
                    <span className="absolute -top-1 -right-1 flex h-3 w-3">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                    </span>
                </button>
                
                {/* Popover Notifikasi */}
                {isNotificationOpen && (
                    <Card 
                        className="absolute right-0 mt-2 w-80 max-h-96 overflow-y-auto z-40 p-0 shadow-xl"
                        onClick={(e) => e.stopPropagation()} // Mencegah penutupan saat klik di dalam
                    >
                        <div className="p-4 border-b border-gray-200">
                            <h4 className="font-bold text-gray-800">Notifikasi</h4>
                        </div>
                        <ul className="divide-y divide-gray-100">
                            {notifications.map(notif => (
                                <li key={notif.id} className="p-4 hover:bg-gray-50 cursor-pointer">
                                    <p className="text-sm text-gray-700">{notif.text}</p>
                                    <p className="text-xs text-gray-400 mt-1">{notif.time}</p>
                                </li>
                            ))}
                            {notifications.length === 0 && (
                                <p className="p-4 text-sm text-center text-gray-500">Tidak ada notifikasi baru.</p>
                            )}
                        </ul>
                    </Card>
                )}
            </div>
            
            {/* Profil Pengguna */}
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

export default Header;