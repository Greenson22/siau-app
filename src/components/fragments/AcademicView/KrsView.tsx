// program/next-js/components/fragments/AcademicView/KrsView.tsx
'use client';

import React, { useState } from 'react';
import StatusBadge from '@/components/elements/StatusBadge';
import Button from '@/components/elements/Button';
import Modal from '@/components/fragments/Modal/Modal';
import KrsBelumKontrak from '@/components/fragments/AcademicView/Krs/KrsBelumKontrak';
import KrsMenungguPersetujuan from '@/components/fragments/AcademicView/Krs/KrsMenungguPersetujuan';
import KrsDisetujui from '@/components/fragments/AcademicView/Krs/KrsDisetujui';
import { useKrsPackage } from '@/hooks/useKrsPackage';
import { AlertCircle } from 'lucide-react';
import Card from '@/components/elements/Card';

type KrsStatus = 'belum_kontrak' | 'menunggu_persetujuan' | 'disetujui';
type BadgeStatus = 'Belum Kontrak' | 'Menunggu Persetujuan' | 'Disetujui';

export default function KrsView() {
  const [status, setStatus] = useState<KrsStatus>('belum_kontrak');
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const { krsPackage, isLoading, error } = useKrsPackage();

  const handleBukaModalKonfirmasi = () => {
    setIsModalOpen(true);
  };

  const handleAjukanKrs = () => {
    setIsModalOpen(false);
    setStatus('menunggu_persetujuan');
    // Simulasi proses persetujuan oleh Dosen PA
    setTimeout(() => {
      setStatus('disetujui');
    }, 5000); // Status akan menjadi 'Disetujui' setelah 5 detik
  };

  const handleResetSimulasi = () => {
    setStatus('belum_kontrak');
  };

  const renderContent = () => {
    if (isLoading) {
      return <Card><p className="text-center text-gray-500 py-8">Memuat paket mata kuliah untuk semester Anda...</p></Card>;
    }

    if (error) {
      return (
        <Card className="bg-red-50 border-red-200 text-red-700">
          <div className="flex items-center gap-4 p-4">
            <AlertCircle />
            <div>
              <h4 className="font-bold">Gagal Memuat Data KRS</h4>
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
        if (krsPackage) {
          return <KrsBelumKontrak 
                    namaPaket={krsPackage.namaPaket}
                    matakuliah={krsPackage.detailPaket}
                    totalSks={krsPackage.totalSks}
                    onAjukan={handleBukaModalKonfirmasi} 
                 />;
        }
        return <Card><p className="text-center text-gray-500 py-8">Paket KRS untuk semester ini tidak ditemukan.</p></Card>;
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
        variant="info" // Menggunakan varian 'info' untuk tampilan yang lebih sesuai
      >
        Apakah Anda yakin ingin mengontrak semua mata kuliah yang ada di paket ini?
        Setelah diajukan, Anda tidak dapat mengubahnya hingga Dosen PA memberikan persetujuan.
      </Modal>

      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-800">Status KRS Semester Ini:</h3>
        <StatusBadge status={getStatusText()} />
      </div>
      
      <div className="mb-8">
        {renderContent()}
      </div>

      <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-center">
        <p className="text-sm text-yellow-700 mb-2">Ini adalah halaman simulasi untuk demonstrasi alur KRS.</p>
        <Button onClick={handleResetSimulasi} variant="secondary">
          Reset Simulasi
        </Button>
      </div>
    </>
  );
}