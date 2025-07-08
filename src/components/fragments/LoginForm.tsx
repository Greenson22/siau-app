'use client';

import { useLoginForm } from '@/hooks/useLoginForm';
import Logo from '@/components/elements/Logo';
import LoginInput from '@/components/elements/Login/LoginInput';
import LoginButton from '@/components/elements/Login/LoginButton';
import ErrorMessage from '@/components/elements/Login/ErrorMessage';
import { User, Lock } from 'lucide-react';

const LoginForm = () => {
  const {
    identifier,
    setIdentifier,
    password,
    setPassword,
    isLoading,
    error,
    handleSubmit,
  } = useLoginForm();

  return (
    <div className="flex flex-col">
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
        <LoginInput
          id="identifier"
          label="NIM / NIDN / User ID"
          Icon={User}
          type="text"
          placeholder="Masukkan ID Anda"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          required
        />

        <LoginInput
          id="password"
          label="Password"
          Icon={Lock}
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <ErrorMessage message={error} />

        <div className="flex items-center justify-end">
          <div className="text-sm">
            <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
              Lupa password?
            </a>
          </div>
        </div>

        <div>
          <LoginButton isLoading={isLoading} />
        </div>
      </form>
    </div>
  );
};

export default LoginForm;