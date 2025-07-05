// src/app/page.tsx
import { redirect } from 'next/navigation';

export default function Home() {
  // Langsung arahkan pengguna ke halaman login
  redirect('/login');

  // Tidak ada JSX yang akan dirender karena sudah dialihkan
  return null; 
}