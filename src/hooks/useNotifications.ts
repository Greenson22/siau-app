'use client';

import { useState, useEffect } from 'react';
import type { Notification } from '@/types';

// Tipe data dari endpoint /api/pengumuman
interface PengumumanDTO {
  judul: string;
  tanggalTerbit: string;
}

export const useNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      setIsLoading(true);
      try {
        const token = localStorage.getItem('authToken');
        if (!token) throw new Error('Token tidak ditemukan');

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/pengumuman`, {
          headers: { 'Authorization': `Bearer ${token}` },
        });

        if (!response.ok) {
          throw new Error('Gagal mengambil notifikasi.');
        }

        const data: PengumumanDTO[] = await response.json();
        
        // Transformasi data DTO ke tipe Notifikasi yang dibutuhkan komponen
        const formattedNotifications = data.map(item => ({
          title: item.judul,
          subtitle: `Diterbitkan pada: ${new Date(item.tanggalTerbit).toLocaleString('id-ID')}`
        }));

        setNotifications(formattedNotifications);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  return { notifications, isLoading, error };
};