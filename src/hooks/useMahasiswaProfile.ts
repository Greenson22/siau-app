// program/next-js/hooks/useMahasiswaProfile.ts
'use client';

import { useState, useEffect } from 'react';

interface UserProfileDTO {
    // ... (Definisi DTO lainnya tidak perlu diubah)
    mahasiswaInfo: {
        namaLengkap: string;
        nim: string;
        status: string;
        namaJurusan: string;
        namaDosenPA: string;
        fotoProfil: string; // <-- Properti ini sekarang datang dari backend
    };
}

interface BiodataMahasiswaDTO {
    tempatLahir: string;
    tanggalLahir: string;
    emailPribadi: string;
    nomorTelepon: string;
    alamat: string;
    jenisKelamin: string;
}

interface MahasiswaSummaryDTO {
    semesterAktif: number;
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
    jenisKelamin: string;
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

                const [meRes, biodataRes, summaryRes] = await Promise.all([
                    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/me`, { headers }),
                    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/mahasiswa/me/biodata`, { headers }),
                    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/mahasiswa/me/summary`, { headers })
                ]);

                if (!meRes.ok || !biodataRes.ok || !summaryRes.ok) {
                    throw new Error('Gagal mengambil data profil');
                }

                const meData = await meRes.json();
                const biodataData: BiodataMahasiswaDTO = await biodataRes.json();
                const summaryData: MahasiswaSummaryDTO = await summaryRes.json();
                
                const formattedProfile: MahasiswaProfile = {
                    nama: meData.mahasiswaInfo.namaLengkap || 'Nama tidak ditemukan',
                    nim: meData.mahasiswaInfo.nim,
                    prodi: meData.mahasiswaInfo.namaJurusan || 'Jurusan Belum Ada',
                    status: meData.mahasiswaInfo.status,
                    fotoProfil: meData.mahasiswaInfo.fotoProfil, // Langsung gunakan dari API
                    ttl: `${biodataData.tempatLahir}, ${new Date(biodataData.tanggalLahir).toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' })}`,
                    email: biodataData.emailPribadi,
                    telepon: biodataData.nomorTelepon,
                    alamat: biodataData.alamat,
                    jenisKelamin: biodataData.jenisKelamin,
                    dosenPA: meData.mahasiswaInfo.namaDosenPA,
                    semester: summaryData.semesterAktif,
                    ipk: summaryData.ipk,
                    totalSKS: summaryData.totalSks,
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