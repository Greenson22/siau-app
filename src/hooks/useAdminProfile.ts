'use client';

import { useState, useEffect } from 'react';

// Interface untuk mencocokkan AdminProfileDTO dari backend
export interface AdminProfile {
    namaLengkap: string;
    nip: string;
    jabatan: string;
    email: string;
    teleponKantor: string;
    lokasiKantor: string;
    fotoProfil: string;
}

export const useAdminProfile = () => {
  const [profile, setProfile] = useState<AdminProfile | null>(null);
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

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/admin/me/profile`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Gagal memuat profil administrator.');
        }

        const data: AdminProfile = await response.json();
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