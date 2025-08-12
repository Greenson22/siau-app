// src/hooks/useMahasiswaProfile.ts
'use client';

import { useState, useEffect } from 'react';

// --- (Interface DTO) ---
interface UserProfileDTO {
    namaLengkap: string;
    nim: string;
    status: string;
    mahasiswaInfo: {
        namaJurusan: string;
    };
    fotoProfil: string;
}

interface BiodataMahasiswaDTO {
    tempatLahir: string;
    tanggalLahir: string;
    emailPribadi: string;
    nomorTelepon: string;
    alamat: string;
    jenisKelamin: string; // Penambahan jenisKelamin
}

// DTO untuk endpoint summary
interface MahasiswaSummaryDTO {
    totalSks: number;
    ipk: number;
}


interface MahasiswaProfile {
    nama: string;
    prodi: string;
    nim: string;
    status: string;
    fotoProfil: string;
    ttl: string;
    email: string;
    telepon: string;
    alamat: string;
    dosenPA: string;
    semester: number;
    ipk: number;
    totalSKS: number;
    jenisKelamin: string; // Penambahan jenisKelamin
}


export const useMahasiswaProfile = () => {
    const [mahasiswa, setMahasiswa] = useState<MahasiswaProfile | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProfileData = async () => {
            setIsLoading(true);
            try {
                const token = localStorage.getItem('authToken');
                if (!token) throw new Error('Token tidak ditemukan');

                const headers = { 'Authorization': `Bearer ${token}` };

                // Menambahkan fetch untuk endpoint summary
                const [meRes, biodataRes, summaryRes] = await Promise.all([
                    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/me`, { headers }),
                    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/mahasiswa/me/biodata`, { headers }),
                    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/mahasiswa/me/summary`, { headers })
                ]);

                if (!meRes.ok || !biodataRes.ok || !summaryRes.ok) {
                    throw new Error('Gagal mengambil data profil');
                }

                const meData: UserProfileDTO = await meRes.json();
                const biodataData: BiodataMahasiswaDTO = await biodataRes.json();
                const summaryData: MahasiswaSummaryDTO = await summaryRes.json(); // Data summary
                console.log(summaryData)

                // Buat inisial dengan aman, pastikan namaLengkap ada.
                const inisial = (meData.namaLengkap && meData.namaLengkap.length > 0) 
                    ? meData.namaLengkap.charAt(0) 
                    : '?';

                const formattedProfile: MahasiswaProfile = {
                    nama: meData.namaLengkap || 'Nama tidak ditemukan',
                    nim: meData.nim,
                    prodi: meData.mahasiswaInfo?.namaJurusan || 'Jurusan tidak ditemukan',
                    status: meData.status,
                    fotoProfil: meData.fotoProfil || `https://placehold.co/128x128/FCA5A5/991B1B?text=${inisial}`,
                    ttl: `${biodataData.tempatLahir}, ${new Date(biodataData.tanggalLahir).toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' })}`,
                    email: biodataData.emailPribadi,
                    telepon: biodataData.nomorTelepon,
                    alamat: biodataData.alamat,
                    jenisKelamin: biodataData.jenisKelamin, // Menggunakan data jenisKelamin dari API
                    dosenPA: 'Dr. Glenn Maramis, S.Kom., M.CompSc',
                    semester: 7,
                    ipk: summaryData.ipk, // Menggunakan data IPK dari API
                    totalSKS: summaryData.totalSks, // Menggunakan data SKS dari API
                };

                setMahasiswa(formattedProfile);

            } catch (e: any) {
                setError(e.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProfileData();
    }, []);

    return { mahasiswa, isLoading, error };
};