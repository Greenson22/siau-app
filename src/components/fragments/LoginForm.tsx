'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Logo from '@/components/elements/Logo';
import Label from '@/components/elements/Label';
import Input from '@/components/elements/Input';
import Button from '@/components/elements/Button';

const LoginForm = () => {
  const [nim, setNim] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // --- Simulasi Proses Login ---
    // Di aplikasi nyata, ganti ini dengan panggilan API ke backend Anda
    setTimeout(() => {
      if (nim === '20210118' && password === 'password') {
        // Jika berhasil, arahkan ke dashboard
        router.push('/mahasiswa');
      } else {
        setError('NIM atau Password salah. Silakan coba lagi.');
        setIsLoading(false);
      }
    }, 1500);
  };

  return (
    <div className="flex flex-col items-center">
      <Logo />
      <h2 className="mt-4 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Portal Mahasiswa
      </h2>
      <p className="text-sm text-gray-600">Login untuk melanjutkan</p>

      <form className="mt-8 w-full space-y-6" onSubmit={handleSubmit}>
        <div>
          <Label htmlFor="nim">NIM (Nomor Induk Mahasiswa)</Label>
          <div className="mt-2">
            <Input
              id="nim"
              name="nim"
              type="text"
              placeholder="Contoh: 20210118"
              value={nim}
              onChange={(e) => setNim(e.target.value)}
              required label={''}            />
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
              required label={''}            />
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