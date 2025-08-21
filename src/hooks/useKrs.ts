// program/next-js/hooks/useKrs.ts
'use client';

import { useState, useEffect, useCallback } from 'react';

// --- Interface & Tipe Data ---

// Tipe untuk status KRS yang dikelola oleh hook
type KrsStatus = 'belum_kontrak' | 'menunggu_persetujuan' | 'disetujui' | 'ditolak';

// Tipe data KRS yang diterima dari backend
export interface KrsData {
    krsId: number;
    kelasId: number;
    kodeMataKuliah: string;
    namaMataKuliah: string;
    sks: number;
    namaDosen: string;
    statusPersetujuan: 'DIAJUKAN' | 'DISETUJUI' | 'DITOLAK';
    jadwal: string;
}

// Tipe data Kelas yang diterima dari backend
interface Kelas {
    kelasId: number;
    kodeMataKuliah: string;
}


// --- Custom Hook Utama ---
export const useKrs = () => {
    const [krsData, setKrsData] = useState<KrsData[]>([]);
    const [status, setStatus] = useState<KrsStatus>('belum_kontrak');
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Fungsi untuk mengambil data KRS dari backend
    const fetchKrsData = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const token = localStorage.getItem('authToken');
            if (!token) throw new Error('Sesi tidak valid.');

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/mahasiswa/me/krs`, {
                headers: { 'Authorization': `Bearer ${token}` },
            });

            if (!response.ok) {
                // Jika status 404 atau lainnya, anggap belum ada data
                if (response.status === 404) {
                    setKrsData([]);
                    setStatus('belum_kontrak');
                    return;
                }
                throw new Error('Gagal mengambil data KRS.');
            }

            const data: KrsData[] = await response.json();
            setKrsData(data);

            // Tentukan status berdasarkan data yang diterima
            if (data.length === 0) {
                setStatus('belum_kontrak');
            } else {
                // Cek status persetujuan dari entri pertama (asumsi semua sama)
                const firstKrsStatus = data[0].statusPersetujuan;
                if (firstKrsStatus === 'DISETUJUI') {
                    setStatus('disetujui');
                } else if (firstKrsStatus === 'DITOLAK') {
                    setStatus('ditolak');
                } else {
                    setStatus('menunggu_persetujuan');
                }
            }
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    }, []);

    // Panggil fetchKrsData saat hook pertama kali digunakan
    useEffect(() => {
        fetchKrsData();
    }, [fetchKrsData]);

    // Fungsi untuk mengajukan KRS ke backend
    const ajukanKrs = async (kodeMataKuliahList: string[]) => {
        setIsLoading(true);
        setError(null);
        try {
            const token = localStorage.getItem('authToken');
            if (!token) throw new Error('Sesi tidak valid.');
            
            // 1. Ambil semua kelas yang ditawarkan untuk mendapatkan kelasId
            const kelasRes = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/kelas`, {
                headers: { 'Authorization': `Bearer ${token}` },
            });
            if (!kelasRes.ok) throw new Error('Gagal mengambil daftar kelas yang tersedia.');
            const semuaKelas: Kelas[] = await kelasRes.json();
            
            // 2. Buat promise untuk setiap request POST penambahan kelas
            const promises = kodeMataKuliahList.map(kodeMk => {
                const kelasTerkait = semuaKelas.find(k => k.kodeMataKuliah === kodeMk);
                if (!kelasTerkait) {
                    console.warn(`Tidak ditemukan kelas untuk kode MK: ${kodeMk}`);
                    return Promise.resolve(); // Lewati jika tidak ditemukan
                }

                return fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/mahasiswa/me/krs`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ kelasId: kelasTerkait.kelasId }),
                });
            });

            // 3. Jalankan semua promise
            await Promise.all(promises);
            
            // 4. Ambil ulang data KRS untuk memperbarui UI
            await fetchKrsData();

        } catch (err: any) {
             setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };


    return { krsData, status, isLoading, error, ajukanKrs, refetchKrs: fetchKrsData };
};