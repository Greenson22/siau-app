// src/hooks/useLoginForm.ts

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export const useLoginForm = () => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          // Menggunakan nama field yang umum, sesuaikan jika perlu (misal: 'username' atau 'email')
          username: identifier,
          password: password,
        }),
      });
      
      const data = await response.json();

      if (!response.ok) {
        // Jika server memberikan pesan error, tampilkan pesan tersebut.
        // Jika tidak, tampilkan pesan generik.
        throw new Error(data.message || 'Terjadi kesalahan saat login.');
      }
      
      // Asumsi server mengembalikan token dan informasi peran (role)
      const { token, user } = data;

      // Simpan token untuk sesi pengguna (misal: di localStorage)
      localStorage.setItem('authToken', token);

      // Arahkan pengguna berdasarkan peran (role)
      switch (user.role) {
        case 'Mahasiswa':
          router.push('/mahasiswa');
          break;
        case 'Dosen':
          router.push('/dosen');
          break;
        case 'Admin':
          router.push('/administrasi');
          break;
        default:
          throw new Error('Peran pengguna tidak dikenali.');
      }

    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    identifier,
    setIdentifier,
    password,
    setPassword,
    isLoading,
    error,
    handleSubmit,
  };
};