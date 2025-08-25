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
    const [selectedMahasiswaIds, setSelectedMahasiswaIds] = useState<Set<number>>(new Set());

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

    // Fungsi untuk memvalidasi KRS tunggal
    const validateKrs = async (krsId: number, status: 'DISETUJUI' | 'DITOLAK', reason: string = '') => {
        try {
            const token = localStorage.getItem('authToken');
            if (!token) throw new Error('Sesi tidak valid.');

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/krs/${krsId}/persetujuan`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                  statusPersetujuan: status,
                  catatanPenolakan: reason
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Gagal memvalidasi KRS.');
            }

        } catch (err: any) {
            // Set error agar bisa ditangkap di UI jika perlu
            setError(err.message);
            // Lemparkan error lagi agar Promise.all bisa menangkapnya
            throw err;
        }
    };

    // --- FUNGSI BARU UNTUK VALIDASI MASSAL ---
    const validateMultipleKrs = async (mahasiswaIds: number[], status: 'DISETUJUI' | 'DITOLAK', reason: string = '') => {
        try {
            const allKrsToValidate: { krsId: number }[] = [];
            mahasiswaIds.forEach(id => {
                const mahasiswa = mahasiswaList.find(m => m.mahasiswaId === id);
                if (mahasiswa) {
                    const krsDiajukan = mahasiswa.krs
                        .filter(k => k.statusPersetujuan === 'DIAJUKAN')
                        .map(k => ({ krsId: k.krsId }));
                    allKrsToValidate.push(...krsDiajukan);
                }
            });

            if (allKrsToValidate.length === 0) {
                return; // Tidak ada KRS yang perlu divalidasi
            }

            // Kirim semua request validasi secara paralel
            const validationPromises = allKrsToValidate.map(k => validateKrs(k.krsId, status, reason));
            await Promise.all(validationPromises);

            // Ambil ulang data untuk merefresh tampilan setelah semua berhasil
            await fetchData();
            setSelectedMahasiswaIds(new Set()); // Kosongkan seleksi setelah berhasil

        } catch (err: any) {
            // Error sudah di-set di dalam `validateKrs`, jadi kita cukup menampilkannya
            console.error("Gagal melakukan validasi massal:", err);
        }
    };


    // --- FUNGSI BARU UNTUK MENGELOLA SELEKSI ---
    const toggleMahasiswaSelection = (mahasiswaId: number) => {
        setSelectedMahasiswaIds(prev => {
            const newSet = new Set(prev);
            if (newSet.has(mahasiswaId)) {
                newSet.delete(mahasiswaId);
            } else {
                newSet.add(mahasiswaId);
            }
            return newSet;
        });
    };

    const toggleSelectAll = () => {
        setSelectedMahasiswaIds(prev => {
            if (prev.size === mahasiswaList.filter(mhs => getOverallKrsStatus(mhs.krs) === 'Menunggu Persetujuan').length) {
                return new Set<number>(); // Jika semua sudah terpilih, batalkan semua
            } else {
                const allPendingIds = mahasiswaList
                    .filter(mhs => getOverallKrsStatus(mhs.krs) === 'Menunggu Persetujuan')
                    .map(mhs => mhs.mahasiswaId);
                return new Set(allPendingIds); // Pilih semua yang pending
            }
        });
    };

    // Helper yang dipindahkan ke dalam hook agar bisa diakses di sini
    const getOverallKrsStatus = (krsList: KrsData[]): 'Disetujui' | 'Menunggu Persetujuan' | 'Belum Kontrak' => {
        if (!krsList || krsList.length === 0) return 'Belum Kontrak';
        if (krsList.some(k => k.statusPersetujuan === 'DIAJUKAN')) return 'Menunggu Persetujuan';
        return 'Disetujui';
    };


    return { 
        mahasiswaList, 
        isLoading, 
        error, 
        validateKrs,
        validateMultipleKrs, // Ekspor fungsi baru
        selectedMahasiswaIds, // Ekspor state seleksi
        toggleMahasiswaSelection, // Ekspor handler seleksi
        toggleSelectAll, // Ekspor handler pilih semua
        getOverallKrsStatus // Ekspor helper status
    };
};