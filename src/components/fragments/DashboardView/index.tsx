'use client';

import React from 'react';
import MahasiswaDashboardView from './MahasiswaDashboardView';
import DosenDashboardView from './DosenDashboardView';

type UserRole = 'mahasiswa' | 'dosen';

interface DashboardViewProps {
  role: UserRole;
}

const DashboardView: React.FC<DashboardViewProps> = ({ role }) => {
  // Tampilkan komponen yang sesuai berdasarkan peran
  if (role === 'dosen') {
    return <DosenDashboardView />;
  }
  
  // Jika bukan dosen, tampilkan dashboard mahasiswa sebagai default
  return <MahasiswaDashboardView />;
};

export default DashboardView;