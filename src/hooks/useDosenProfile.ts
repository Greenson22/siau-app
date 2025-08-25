// program/next-js/hooks/useDosenProfile.ts
'use client';

import { useState, useEffect } from 'react';

// Tipe data untuk mencocokkan DTO dari backend
export interface DosenProfile {
    namaLengkap: string;
    nidn: string;
    namaJurusan: string;
    alamat: string;
    nomorTelepon: string;
    emailPribadi: string;
    spesialisasi: string;
    jabatanAkademik: string;
}

export const useDosenProfile = () => {
  const [profile, setProfile] = useState<DosenProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem('authToken');
        if (!token) {
          throw new Error('Sesi tidak valid.');
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/dosen/me/profile`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Gagal memuat profil dosen.');
        }

        const data: DosenProfile = await response.json();
        setProfile(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, []);

  return { profile, isLoading, error };
};