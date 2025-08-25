// program/next-js/hooks/useInputNilai.ts
'use client';

import { useState } from 'react';

// Tipe data untuk nilai yang akan dikirim
export interface NilaiInput {
    krsId: number;
    nilaiAkhir: number;
    nilaiHuruf: string;
}

export const useInputNilai = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);

    const submitNilai = async (nilaiList: NilaiInput[]) => {
        setIsSubmitting(true);
        setSubmitError(null);
        setSubmitSuccess(false);
        try {
            const token = localStorage.getItem('authToken');
            if (!token) throw new Error('Sesi tidak valid.');

            // Kirim permintaan update untuk setiap nilai secara paralel
            const promises = nilaiList.map(nilai => {
                // Jangan kirim jika nilai huruf kosong
                if (!nilai.nilaiHuruf) return Promise.resolve();
                
                return fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/krs/${nilai.krsId}/nilai`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        nilaiAkhir: nilai.nilaiAkhir,
                        nilaiHuruf: nilai.nilaiHuruf,
                    }),
                });
            });

            const responses = await Promise.all(promises);

            // Cek apakah ada request yang gagal
            responses.forEach(res => {
                if (res && !res.ok) {
                    throw new Error('Sebagian atau semua nilai gagal disimpan.');
                }
            });

            setSubmitSuccess(true);
        } catch (err: any) {
            setSubmitError(err.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return { submitNilai, isSubmitting, submitError, submitSuccess };
};