'use client';

import { useState, useRef, useEffect } from 'react';
import { Bell } from 'lucide-react';
import type { Notification } from '@/types';

const NOTIFICATION_CHECK_KEY = 'lastCheckedNotificationTimestamp';

interface NotificationDropdownProps {
  notifications: Notification[];
}

const NotificationDropdown: React.FC<NotificationDropdownProps> = ({ notifications }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasUnread, setHasUnread] = useState(false);
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

  // Efek untuk memeriksa apakah ada notifikasi yang belum dibaca
  useEffect(() => {
    if (notifications.length > 0) {
      const lastCheckedTimestamp = localStorage.getItem(NOTIFICATION_CHECK_KEY);
      const latestNotificationTimestamp = notifications[0].tanggalTerbit; // Asumsi notifikasi terbaru ada di indeks 0

      if (!lastCheckedTimestamp || new Date(latestNotificationTimestamp) > new Date(lastCheckedTimestamp)) {
        setHasUnread(true);
      }
    }
  }, [notifications]);

  const handleToggleDropdown = () => {
    setIsOpen(prev => !prev);
    // Jika ada notifikasi baru dan dropdown dibuka, tandai sebagai sudah dibaca
    if (notifications.length > 0) {
      setHasUnread(false);
      // Simpan timestamp notifikasi terbaru ke localStorage
      localStorage.setItem(NOTIFICATION_CHECK_KEY, notifications[0].tanggalTerbit);
    }
  };

  return (
    <div ref={ref} className="relative">
      <button
        onClick={handleToggleDropdown}
        className="relative p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-700 transition-colors"
      >
        <Bell size={20} />
        {/* Tampilkan titik merah hanya jika hasUnread bernilai true */}
        {hasUnread && notifications.length > 0 && 
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        }
      </button>
      {isOpen && (
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
  );
};

export default NotificationDropdown;