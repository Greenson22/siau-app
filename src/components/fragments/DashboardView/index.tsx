'use client';

import React from 'react';
import MahasiswaDashboardView from './MahasiswaDashboardView';
import DosenDashboardView from './DosenDashboardView';

type UserRole = 'mahasiswa' | 'dosen';

interface DashboardViewProps {
  role: UserRole;
  onNavigate?: (view: string, tab?: string) => void; // Prop opsional
}

const DashboardView: React.FC<DashboardViewProps> = ({ role, onNavigate }) => {
  // Tampilkan komponen yang sesuai berdasarkan peran
  if (role === 'dosen') {
    return <DosenDashboardView onNavigate={onNavigate} />; // Teruskan prop
  }
  
  // Jika bukan dosen, tampilkan dashboard mahasiswa sebagai default
  return <MahasiswaDashboardView />;
};

export default DashboardView;