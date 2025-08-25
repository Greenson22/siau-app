// program/next-js/hooks/useKelasMahasiswa.ts
'use client';

import { useState, useEffect } from 'react';

// Tipe data spesifik untuk mahasiswa yang diambil dari endpoint kelas
export interface MahasiswaDiKelas {
    krsId: number;
    mahasiswaId: number;
    nim: string;
    namaLengkap: string;
    nilaiAkhir?: number;
    nilaiHuruf?: string;
}

export const useKelasMahasiswa = (kelasId: number | null) => {
    const [mahasiswaList, setMahasiswaList] = useState<MahasiswaDiKelas[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!kelasId) {
            setMahasiswaList([]);
            return;
        }

        const fetchMahasiswa = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const token = localStorage.getItem('authToken');
                if (!token) throw new Error('Sesi tidak valid.');

                // Cukup panggil satu endpoint yang sudah diperbarui
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/kelas/${kelasId}/mahasiswa`, {
                    headers: { 'Authorization': `Bearer ${token}` },
                });

                if (!response.ok) throw new Error('Gagal memuat daftar mahasiswa kelas.');
                
                const data: MahasiswaDiKelas[] = await response.json();
                setMahasiswaList(data);

            } catch (err: any) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchMahasiswa();
    }, [kelasId]);

    return { mahasiswaList, isLoading, error };
};