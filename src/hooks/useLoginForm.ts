'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export const useLoginForm = () => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    setTimeout(() => {
      if (identifier === '20210118' && password === 'password') {
        router.push('/mahasiswa');
      } else if (identifier === 'dosen' && password === 'dosen') {
        router.push('/dosen');
      } else if (identifier === 'admin' && password === 'admin') {
        router.push('/administrasi');
      } else {
        setError('NIM/NIDN atau Password salah. Silakan coba lagi.');
        setIsLoading(false);
      }
    }, 1500);
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