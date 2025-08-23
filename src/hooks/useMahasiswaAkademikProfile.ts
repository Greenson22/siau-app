// program/next-js/hooks/useMahasiswaAkademikProfile.ts
'use client';

import { useState, useEffect } from 'react';
import type { KhsDTO } from '@/types';

// Tipe data yang akan kita ambil dari backend
interface MahasiswaAkademikProfile {
    summary: {
        ipk: number;
        totalSks: number;
        semesterAktif: number;
    };
    khsData: KhsDTO[];
    ipsHistory: {
        labels: string[];
        data: number[];
    };
}

export const useMahasiswaAkademikProfile = (mahasiswaId: number | null) => {
    const [profileData, setProfileData] = useState<MahasiswaAkademikProfile | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!mahasiswaId) {
            setProfileData(null);
            return;
        }

        const fetchProfile = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const token = localStorage.getItem('authToken');
                if (!token) throw new Error('Sesi tidak valid.');

                const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/dosen/pa/mahasiswa/${mahasiswaId}/akademik`, {
                    headers: { 'Authorization': `Bearer ${token}` },
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || 'Gagal memuat profil akademik.');
                }
                
                const data: MahasiswaAkademikProfile = await response.json();
                setProfileData(data);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProfile();
    }, [mahasiswaId]);

    return { profileData, isLoading, error };
};