// src/components/fragments/KrsView.tsx (atau path yang sesuai)
'use client';

import React, { useState } from 'react';
import StatusBadge from '@/components/elements/StatusBadge';
import Button from '@/components/elements/Button';
import Modal from '@/components/elements/Modal';
import KrsBelumKontrak from '@/components/fragments/KrsBelumKontrak';
import KrsMenungguPersetujuan from '@/components/fragments/KrsMenungguPersetujuan';
import KrsDisetujui from '@/components/fragments/KrsDisetujui';
import { dataKrs } from '@/lib/data'; // <-- 1. Impor data dari data.ts

// Tipe untuk state status KRS
type KrsStatus = 'belum_kontrak' | 'menunggu_persetujuan' | 'disetujui';
type BadgeStatus = 'Belum Kontrak' | 'Menunggu Persetujuan' | 'Disetujui';

// 2. Hapus dataMatakuliah lokal karena sudah dipindah ke data.ts

export default function KrsView() {
  const [status, setStatus] = useState<KrsStatus>('belum_kontrak');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleBukaModalKonfirmasi = () => {
    setIsModalOpen(true);
  };

  const handleAjukanKrs = () => {
    setIsModalOpen(false);
    setStatus('menunggu_persetujuan');

    // Simulasi persetujuan Dosen PA
    setTimeout(() => {
      setStatus('disetujui');
    }, 5000); // Dosen PA menyetujui setelah 5 detik
  };

  const handleReset = () => {
    setStatus('belum_kontrak');
  };

  const renderContent = () => {
    switch (status) {
      case 'menunggu_persetujuan':
        return <KrsMenungguPersetujuan />;
      case 'disetujui':
        return <KrsDisetujui />;
      case 'belum_kontrak':
      default:
        // 3. Gunakan dataKrs.mataKuliah dari hasil impor
        return <KrsBelumKontrak matakuliah={dataKrs.mataKuliah} onAjukan={handleBukaModalKonfirmasi} />;
    }
  };

  const getStatusText = (): BadgeStatus => {
    switch (status) {
      case 'menunggu_persetujuan':
        return 'Menunggu Persetujuan';
      case 'disetujui':
        return 'Disetujui';
      default:
        return 'Belum Kontrak';
    }
  };

  return (
    <>
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
        <h3 className="text-lg font-semibold text-gray-800">Status KRS Anda:</h3>
        <StatusBadge status={getStatusText()} />
      </div>
      
      <div className="mb-8">
        {renderContent()}
      </div>

      <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-center">
        <p className="text-sm text-yellow-700 mb-2">Ini adalah area demonstrasi untuk simulasi.</p>
        <Button onClick={handleReset} variant="secondary">
          Reset Simulasi
        </Button>
      </div>
    </>
  );
}