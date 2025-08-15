// src/components/fragments/AcademicView/KrsView.tsx
'use client';

import React, { useState } from 'react';
import StatusBadge from '@/components/elements/StatusBadge';
import Button from '@/components/elements/Button';
import Modal from '@/components/fragments/Modal/Modal';
import KrsBelumKontrak from '@/components/fragments/AcademicView/Krs/KrsBelumKontrak';
import KrsMenungguPersetujuan from '@/components/fragments/AcademicView/Krs/KrsMenungguPersetujuan';
import KrsDisetujui from '@/components/fragments/AcademicView/Krs/KrsDisetujui';
import { useKrsPackage } from '@/hooks/useKrsPackage'; // <-- 1. Impor hook baru
import { AlertCircle } from 'lucide-react'; // <-- 2. Impor ikon untuk pesan error
import Card from '@/components/elements/Card';

type KrsStatus = 'belum_kontrak' | 'menunggu_persetujuan' | 'disetujui';
type BadgeStatus = 'Belum Kontrak' | 'Menunggu Persetujuan' | 'Disetujui';

export default function KrsView() {
  const [status, setStatus] = useState<KrsStatus>('belum_kontrak');
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // 3. Panggil hook untuk mendapatkan data, status loading, dan error
  const { krsPackage, isLoading, error } = useKrsPackage();

  const handleBukaModalKonfirmasi = () => {
    setIsModalOpen(true);
  };

  const handleAjukanKrs = () => {
    setIsModalOpen(false);
    setStatus('menunggu_persetujuan');
    setTimeout(() => {
      setStatus('disetujui');
    }, 5000);
  };

  const handleReset = () => {
    setStatus('belum_kontrak');
  };

  const renderContent = () => {
    // 4. Handle state loading
    if (isLoading) {
      return <Card><p className="text-center text-gray-500 py-8">Memuat paket mata kuliah...</p></Card>;
    }

    // 5. Handle state error
    if (error) {
      return (
        <Card className="bg-red-50 border-red-200 text-red-700">
          <div className="flex items-center gap-4 p-4">
            <AlertCircle />
            <div>
              <h4 className="font-bold">Gagal Memuat Data</h4>
              <p className="text-sm">{error}</p>
            </div>
          </div>
        </Card>
      );
    }

    switch (status) {
      case 'menunggu_persetujuan':
        return <KrsMenungguPersetujuan />;
      case 'disetujui':
        return <KrsDisetujui />;
      case 'belum_kontrak':
      default:
        // 6. Jika data ada, teruskan ke komponen KrsBelumKontrak
        if (krsPackage) {
          return <KrsBelumKontrak 
                    namaPaket={krsPackage.namaPaket}
                    matakuliah={krsPackage.detailPaket}
                    totalSks={krsPackage.totalSks}
                    onAjukan={handleBukaModalKonfirmasi} 
                 />;
        }
        return null; // Atau tampilkan pesan jika paket tidak ada
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