// program/next-js/hooks/useActionItems.ts
'use client';

import { useState, useEffect } from 'react';

// --- Interface untuk Data dari API ---
interface PendingPembayaran {
    pembayaranId: number;
    namaMahasiswa: string;
    deskripsiTagihan: string;
    jumlahBayar: number;
    tanggalBayar: string;
}

// Interface baru untuk log aktivitas
interface ActivityLog {
    logId: number;
    username: string;
    aksi: string;
    deskripsi: string;
    timestamp: string;
}

export interface ActionItemData {
    pembayaranMenungguVerifikasi: PendingPembayaran[];
    latestActivities: ActivityLog[]; // <-- DITAMBAHKAN
}

// --- Custom Hook ---
export const useActionItems = () => {
  const [actionItems, setActionItems] = useState<ActionItemData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchActionItems = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem('authToken');
        if (!token) {
          throw new Error('Sesi tidak valid.');
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/dashboard/action-items`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Gagal memuat daftar tugas.');
        }

        const data: ActionItemData = await response.json();
        setActionItems(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchActionItems();
  }, []);

  return { actionItems, isLoading, error };
};