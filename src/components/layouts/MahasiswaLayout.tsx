// src/components/layouts/MahasiswaLayout.tsx
import React from 'react';

interface MahasiswaLayoutProps {
  children: React.ReactNode;
  pageTitle: string;
}

const MahasiswaLayout: React.FC<MahasiswaLayoutProps> = ({ children, pageTitle }) => {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <header className="bg-white shadow-sm">
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-blue-600">Portal Mahasiswa STTIS</h1>
          <div className="text-sm">Mahasiswa Logged In</div>
        </nav>
      </header>
      <main className="container mx-auto p-4 sm:p-6 lg:p-8">
         <h2 className="text-3xl font-bold mb-6 text-gray-700">{pageTitle}</h2>
        {children}
      </main>
      <footer className="text-center py-4 text-gray-500 text-sm">
        <p>&copy; {new Date().getFullYear()} Sistem Informasi Akademik STTIS Siau</p>
      </footer>
    </div>
  );
};

export default MahasiswaLayout;