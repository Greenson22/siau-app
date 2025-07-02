// src/app/mahasiswa/krs/page.tsx
'use client';

import React, { useState } from 'react';
import MahasiswaLayout from '@/components/layouts/MahasiswaLayout';
import StatusBadge from '@/components/elements/StatusBadge';
import KrsBelumKontrak from '@/components/fragments/KrsBelumKontrak';
import KrsMenungguPersetujuan from '@/components/fragments/KrsMenungguPersetujuan';
import KrsDisetujui from '@/components/fragments/KrsDisetujui';
import Button from '@/components/elements/Button';
import Modal from '@/components/elements/Modal'; // <-- Import komponen Modal

// Tipe untuk state status KRS
type KrsStatus = 'belum_kontrak' | 'menunggu_persetujuan' | 'disetujui';

// Data matakuliah contoh
const dataMatakuliah = [
  { kode: 'TEO301', nama: 'Teologi Sistematika III', sks: 3 },
  { kode: 'PAK301', nama: 'Metodologi Pengajaran PAK', sks: 3 },
  { kode: 'BIB301', nama: 'Eksegesis Perjanjian Baru', sks: 3 },
  { kode: 'PRA301', nama: 'Praktik Pelayanan Jemaat', sks: 2 },
  { kode: 'SEJ301', nama: 'Sejarah Gereja Asia', sks: 2 },
  { kode: 'FIL301', nama: 'Filsafat Agama', sks: 2 },
];

export default function KrsPage() {
  const [status, setStatus] = useState<KrsStatus>('belum_kontrak');
  const [isModalOpen, setIsModalOpen] = useState(false); // <-- State untuk kontrol modal

  // Fungsi untuk membuka modal
  const handleBukaModalKonfirmasi = () => {
    setIsModalOpen(true);
  };

  // Fungsi yang dijalankan saat konfirmasi disetujui
  const handleAjukanKrs = () => {
    setIsModalOpen(false); // Tutup modal
    setStatus('menunggu_persetujuan');

    // Simulasi persetujuan Dosen PA setelah beberapa detik
    setTimeout(() => {
      setStatus('disetujui');
    }, 5000); // Dosen PA menyetujui setelah 5 detik
  };
  
  const handleReset = () => {
    setStatus('belum_kontrak');
  }

  const renderContent = () => {
    switch (status) {
      case 'menunggu_persetujuan':
        return <KrsMenungguPersetujuan />;
      case 'disetujui':
        return <KrsDisetujui />;
      case 'belum_kontrak':
      default:
        // Pass fungsi untuk membuka modal ke komponen anak
        return <KrsBelumKontrak matakuliah={dataMatakuliah} onAjukan={handleBukaModalKonfirmasi} />;
    }
  };

  const getStatusText = (): 'Belum Kontrak' | 'Menunggu Persetujuan' | 'Disetujui' => {
     switch (status) {
      case 'menunggu_persetujuan':
        return 'Menunggu Persetujuan';
      case 'disetujui':
        return 'Disetujui';
      default:
        return 'Belum Kontrak';
     }
  }

  return (
    <MahasiswaLayout pageTitle="Kartu Rencana Studi (KRS)">
      {/* --- Komponen Modal --- */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleAjukanKrs}
        title="Konfirmasi Pengajuan KRS"
      >
        Apakah Anda yakin ingin mengontrak semua mata kuliah yang ada di paket ini? 
        Setelah diajukan, Anda tidak dapat mengubahnya hingga Dosen PA memberikan persetujuan.
      </Modal>

      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold">Status KRS Anda:</h3>
        <StatusBadge status={getStatusText()} />
      </div>
      
      <div className="mb-8">
        {renderContent()}
      </div>

      <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-center">
          <p className="text-sm text-yellow-700 mb-2">Ini adalah area demonstrasi.</p>
          <Button onClick={handleReset} variant="secondary">
            Reset Simulasi
          </Button>
      </div>
    </MahasiswaLayout>
  );
}