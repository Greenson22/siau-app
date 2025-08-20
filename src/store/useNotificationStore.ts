import {create} from 'zustand';
import type { Notification } from '@/types';

// Tipe data dari endpoint /api/pengumuman
interface PengumumanDTO {
  judul: string;
  tanggalTerbit: string;
}

interface NotificationState {
  notifications: Notification[];
  isLoading: boolean;
  error: string | null;
  fetchNotifications: () => Promise<void>;
}

/**
 * Wadah global (store) untuk mengelola notifikasi di seluruh aplikasi.
 */
export const useNotificationStore = create<NotificationState>((set) => ({
  notifications: [],
  isLoading: true,
  error: null,
  
  /**
   * Fungsi untuk mengambil (atau mengambil ulang) daftar notifikasi dari server.
   */
  fetchNotifications: async () => {
    set({ isLoading: true, error: null });
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
      
      const formattedNotifications = data.map(item => ({
        title: item.judul,
        subtitle: `Diterbitkan pada: ${new Date(item.tanggalTerbit).toLocaleString('id-ID')}`
      }));

      set({ notifications: formattedNotifications, isLoading: false });
    } catch (e: any) {
      set({ error: e.message, isLoading: false });
    }
  },
}));