// program/next-js/components/fragments/AcademicView/KrsView.tsx
'use client';

import React, { useState } from 'react';
import StatusBadge from '@/components/elements/StatusBadge';
import Modal from '@/components/fragments/Modal/Modal';
import KrsBelumKontrak from '@/components/fragments/AcademicView/Krs/KrsBelumKontrak';
import KrsMenungguPersetujuan from '@/components/fragments/AcademicView/Krs/KrsMenungguPersetujuan';
import KrsDisetujui from '@/components/fragments/AcademicView/Krs/KrsDisetujui';
import { useKrsPackage } from '@/hooks/useKrsPackage';
import { useKrs } from '@/hooks/useKrs';
import { AlertCircle } from 'lucide-react';
import Card from '@/components/elements/Card';

type BadgeStatus = 'Belum Kontrak' | 'Menunggu Persetujuan' | 'Disetujui' | 'Ditolak';

// Terima prop onSwitchTab
interface KrsViewProps {
  onSwitchTab: (tabId: string) => void;
}

export default function KrsView({ onSwitchTab }: KrsViewProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const { krsPackage, isLoading: isLoadingPackage, error: errorPackage } = useKrsPackage();
  const { krsData, status, isLoading: isLoadingKrs, error: errorKrs, ajukanKrs } = useKrs();

  const handleBukaModalKonfirmasi = () => {
    setIsModalOpen(true);
  };

  const handleAjukanKrs = async () => {
    if (!krsPackage) return;
    
    const kelasUntukDiajukan = krsPackage.detailPaket.map(mk => mk.kodeMk);
    await ajukanKrs(kelasUntukDiajukan);

    setIsModalOpen(false);
  };

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
        // Teruskan prop ke KrsDisetujui
        return <KrsDisetujui krsDisetujui={krsData} onNavigateToJadwal={() => onSwitchTab('jadwal')} />;
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