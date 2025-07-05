// src/app/login/page.tsx
import type { Metadata } from 'next';
import LoginLayout from '@/components/layouts/LoginLayout';

export const metadata: Metadata = {
  title: "Login - Portal STTIS Siau",
  description: "Halaman login untuk mahasiswa, dosen, dan administrasi STTIS Siau.",
};

export default function LoginPage() {
  return (
    <LoginLayout />
  );
}