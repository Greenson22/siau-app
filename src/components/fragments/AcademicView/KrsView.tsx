// program/next-js/components/fragments/AcademicView/KrsView.tsx
'use client';

import React, { useState, useEffect } from 'react';
import StatusBadge from '@/components/elements/StatusBadge';
import Button from '@/components/elements/Button';
import Modal from '@/components/fragments/Modal/Modal';
import KrsBelumKontrak from '@/components/fragments/AcademicView/Krs/KrsBelumKontrak';
import KrsMenungguPersetujuan from '@/components/fragments/AcademicView/Krs/KrsMenungguPersetujuan';
import KrsDisetujui from '@/components/fragments/AcademicView/Krs/KrsDisetujui';
import { useKrsPackage } from '@/hooks/useKrsPackage';
import { useKrs } from '@/hooks/useKrs'; // <-- 1. Impor hook baru
import { AlertCircle } from 'lucide-react';
import Card from '@/components/elements/Card';

type KrsStatus = 'belum_kontrak' | 'menunggu_persetujuan' | 'disetujui' | 'ditolak';
type BadgeStatus = 'Belum Kontrak' | 'Menunggu Persetujuan' | 'Disetujui' | 'Ditolak';

export default function KrsView() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // -- MENGGUNAKAN HOOK BARU --
  const { krsPackage, isLoading: isLoadingPackage, error: errorPackage } = useKrsPackage();
  const { krsData, status, isLoading: isLoadingKrs, error: errorKrs, ajukanKrs } = useKrs(); // <-- 2. Gunakan hook krs

  const handleBukaModalKonfirmasi = () => {
    setIsModalOpen(true);
  };

  // -- FUNGSI UNTUK MENGAJUKAN KRS KE BACKEND --
  const handleAjukanKrs = async () => {
    if (!krsPackage) return;
    
    // Ambil daftar kelas dari paket
    const kelasUntukDiajukan = krsPackage.detailPaket.map(mk => mk.kodeMk);

    // Panggil fungsi ajukanKrs dari hook
    await ajukanKrs(kelasUntukDiajukan);

    setIsModalOpen(false);
  };

  // -- RENDER KONTEN BERDASARKAN STATUS DARI BACKEND --
  const renderContent = () => {
    if (isLoadingPackage || isLoadingKrs) {
      return <Card><p className="text-center text-gray-500 py-8">Memuat data Kartu Rencana Studi Anda...</p></Card>;
    }

    const anyError = errorPackage || errorKrs;
    if (anyError) {
      return (
        <Card className="bg-red-50 border-red-200 text-red-700">
          <div className="flex items-center gap-4 p-4">
            <AlertCircle />
            <div>
              <h4 className="font-bold">Gagal Memuat Data KRS</h4>
              <p className="text-sm">{anyError}</p>
            </div>
          </div>
        </Card>
      );
    }

    switch (status) {
      case 'menunggu_persetujuan':
        return <KrsMenungguPersetujuan krsDiajukan={krsData} />;
      case 'disetujui':
        return <KrsDisetujui krsDisetujui={krsData}/>;
      // TODO: Tambahkan view untuk status DITOLAK jika diperlukan
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
      case 'ditolak':
        return 'Ditolak';
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
        variant="info"
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
    </>
  );
}