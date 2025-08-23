// program/next-js/hooks/useBimbinganAkademik.ts
'use client';

import { useState, useEffect, useCallback, ReactNode } from 'react';
import type { Mahasiswa, KrsData } from '@/types'; // Menggunakan tipe data yang sudah ada

// Definisikan tipe data spesifik untuk mahasiswa bimbingan dari API
export interface MahasiswaBimbingan extends Mahasiswa {
    namaJurusan: ReactNode;
    fotoProfil: string | Blob | undefined;
    krs: KrsData[]; // Menampung data KRS mahasiswa
}

export const useBimbinganAkademik = () => {
    const [mahasiswaList, setMahasiswaList] = useState<MahasiswaBimbingan[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Fungsi untuk mengambil data dari backend
    const fetchData = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const token = localStorage.getItem('authToken');
            if (!token) throw new Error('Sesi tidak valid.');

            // Ambil daftar mahasiswa bimbingan
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/dosen/pa/mahasiswa`, {
                headers: { 'Authorization': `Bearer ${token}` },
            });
            if (!res.ok) throw new Error('Gagal mengambil data mahasiswa bimbingan.');
            
            const dataMahasiswa: MahasiswaBimbingan[] = await res.json();
            
            // Untuk setiap mahasiswa, ambil detail KRS mereka
            const promises = dataMahasiswa.map(mhs => 
                fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/dosen/pa/mahasiswa/${mhs.mahasiswaId}/krs`, {
                    headers: { 'Authorization': `Bearer ${token}` },
                }).then(res => res.json())
            );

            const krsDetails = await Promise.all(promises);

            // Gabungkan data mahasiswa dengan data KRS mereka
            const mahasiswaWithKrs = dataMahasiswa.map((mhs, index) => ({
                ...mhs,
                krs: krsDetails[index]
            }));

            setMahasiswaList(mahasiswaWithKrs);

        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    // Fungsi untuk memvalidasi KRS
    const validateKrs = async (krsId: number, status: 'DISETUJUI' | 'DITOLAK') => {
        try {
            const token = localStorage.getItem('authToken');
            if (!token) throw new Error('Sesi tidak valid.');

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/krs/${krsId}/persetujuan`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ statusPersetujuan: status }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Gagal memvalidasi KRS.');
            }

            // Ambil ulang data untuk merefresh tampilan
            await fetchData(); 

        } catch (err: any) {
            setError(err.message);
        }
    };

    return { mahasiswaList, isLoading, error, validateKrs };
};