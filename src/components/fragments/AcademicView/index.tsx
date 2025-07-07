'use client';

import React from 'react';
import MahasiswaAcademicView from './MahasiswaAcademicView';
import DosenAcademicView from './DosenAcademicView';

// Tipe untuk peran pengguna
type UserRole = 'mahasiswa' | 'dosen';

interface AcademicViewProps {
  role: UserRole;
}

const AcademicView: React.FC<AcademicViewProps> = ({ role }) => {
  // Tampilkan komponen yang sesuai berdasarkan peran
  if (role === 'dosen') {
    return <DosenAcademicView />;
  }
  
  // Default ke tampilan mahasiswa
  return <MahasiswaAcademicView />;
};

export default AcademicView;