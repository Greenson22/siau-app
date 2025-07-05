'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Logo from '@/components/elements/Logo';
import Label from '@/components/elements/Label';
import Input from '@/components/elements/Input';
import Button from '@/components/elements/Button';

const LoginForm = () => {
  // Mengubah 'nim' menjadi 'identifier' agar lebih generik
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // --- Simulasi Proses Login dengan Pengecekan Peran---
    setTimeout(() => {
      // Cek kredensial mahasiswa
      if (identifier === '20210118' && password === 'password') {
        router.push('/mahasiswa');
      
      // --- TAMBAHAN: Cek kredensial dosen ---
      } else if (identifier === 'dosen' && password === 'dosen') {
        router.push('/dosen');
        
      } else {
        // Jika keduanya gagal, tampilkan error
        setError('NIM/NIDN atau Password salah. Silakan coba lagi.');
        setIsLoading(false);
      }
    }, 1500);
  };

  return (
    <div className="flex flex-col items-center">
      <Logo />
      {/* Mengubah judul agar lebih umum */}
      <h2 className="mt-4 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Portal Akademik STTIS Siau
      </h2>
      <p className="text-sm text-gray-600">Login untuk melanjutkan</p>

      <form className="mt-8 w-full space-y-6" onSubmit={handleSubmit}>
        <div>
          {/* Mengubah label dan placeholder */}
          <Label htmlFor="identifier">NIM / NIDN</Label>
          <div className="mt-2">
            <Input
              id="identifier"
              name="identifier"
              type="text"
              placeholder="Masukkan NIM atau NIDN Anda"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              required
              label={''} 
            />
          </div>
        </div>

        <div>
            <Label htmlFor="password">Password</Label>
          <div className="mt-2">
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              label={''} 
            />
          </div>
        </div>
        
        {error && (
            <p className="text-sm text-red-600">{error}</p>
        )}

        <div className="flex items-center justify-between">
            <div className="text-sm">
                <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                Lupa password?
                </a>
            </div>
        </div>

        <div>
          <Button type="submit" className="w-full" isLoading={isLoading}>
            Login
          </Button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;