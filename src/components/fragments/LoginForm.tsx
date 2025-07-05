'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Logo from '@/components/elements/Logo';
import Label from '@/components/elements/Label';
import Input from '@/components/elements/Input';
import Button from '@/components/elements/Button';
import { User, Lock } from 'lucide-react'; // Impor ikon

const LoginForm = () => {
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
      } else if (identifier === '0912048801' && password === 'passworddosen') {
        router.push('/dosen');
      } else {
        setError('NIM/NIDN atau Password salah. Silakan coba lagi.');
        setIsLoading(false);
      }
    }, 1500);
  };

  return (
    <div className="flex flex-col">
      {/* Logo hanya ditampilkan di mobile, karena di desktop sudah ada di panel kiri */}
      <div className="md:hidden flex flex-col items-center mb-6">
        <Logo />
      </div>
      
      <div className="text-center">
        <h2 className="text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Login ke Akun Anda
        </h2>
        <p className="text-sm text-gray-600 mt-1">
          Selamat datang kembali!
        </p>
      </div>

      <form className="mt-8 w-full space-y-6" onSubmit={handleSubmit}>
        <div>
          <Label htmlFor="identifier">NIM / NIDN</Label>
          <div className="mt-2 relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              id="identifier"
              name="identifier"
              type="text"
              placeholder="Masukkan NIM atau NIDN"
              className="pl-10" // Tambahkan padding untuk ikon
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              required
              label={''} 
            />
          </div>
        </div>

        <div>
          <Label htmlFor="password">Password</Label>
          <div className="mt-2 relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              className="pl-10" // Tambahkan padding untuk ikon
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              label={''} 
            />
          </div>
        </div>
        
        {error && (
          <p className="text-sm text-center text-red-600 animate-shake">{error}</p>
        )}

        <div className="flex items-center justify-end">
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