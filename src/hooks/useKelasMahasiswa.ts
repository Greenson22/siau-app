// program/next-js/hooks/useKelasMahasiswa.ts
'use client';

import { useState, useEffect } from 'react';
import type { KrsData } from '@/types'; // Menggunakan tipe yang sudah ada

// Tipe data spesifik untuk mahasiswa yang diambil dari endpoint kelas
export interface MahasiswaDiKelas {
    krsId: number; // ID KRS yang unik untuk setiap mahasiswa di kelas itu
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

                // 1. Ambil daftar mahasiswa di kelas tersebut
                const mhsResponse = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/kelas/${kelasId}/mahasiswa`, {
                    headers: { 'Authorization': `Bearer ${token}` },
                });

                if (!mhsResponse.ok) throw new Error('Gagal memuat daftar mahasiswa kelas.');
                const mhsData: { mahasiswaId: number; nim: string; namaLengkap: string; }[] = await mhsResponse.json();

                // 2. Ambil semua data KRS mahasiswa bimbingan dosen (untuk mendapatkan krsId dan nilai yang sudah ada)
                // Ini pendekatan sementara, idealnya API mahasiswa kelas sudah menyertakan krsId dan nilai.
                const allKrsResponse = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/dosen/pa/mahasiswa`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if(!allKrsResponse.ok) throw new Error('Gagal mengambil data KRS mahasiswa');
                const allMahasiswaBimbingan: {mahasiswaId: number, krs: KrsData[]}[] = await allKrsResponse.json();

                // 3. Gabungkan data
                const combinedData = mhsData.map(mhs => {
                    let krsInfo: KrsData | undefined;
                    
                    // Cari mahasiswa di daftar bimbingan
                    const bimbingan = allMahasiswaBimbingan.find(b => b.mahasiswaId === mhs.mahasiswaId);
                    if(bimbingan) {
                        // Cari KRS yang cocok dengan kelas ini
                        krsInfo = bimbingan.krs.find(k => k.kelasId === kelasId);
                    }

                    return {
                        ...mhs,
                        krsId: krsInfo?.krsId || 0, // Fallback ke 0 jika tidak ditemukan
                        nilaiAkhir: krsInfo?.nilaiAkhir,
                        nilaiHuruf: krsInfo?.nilaiHuruf
                    };
                });
                
                setMahasiswaList(combinedData);

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