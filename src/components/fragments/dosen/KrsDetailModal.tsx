// program/next-js/components/fragments/dosen/KrsDetailModal.tsx
'use client';

import React from 'react';
import Modal from '@/components/fragments/Modal/Modal';
import type { KrsData } from '@/types';

interface KrsDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  mahasiswaName: string;
  krsDetails: KrsData[];
}

const KrsDetailModal: React.FC<KrsDetailModalProps> = ({ isOpen, onClose, mahasiswaName, krsDetails }) => {
  // Hitung total SKS dari rincian KRS
  const totalSks = krsDetails.reduce((sum, item) => sum + item.sks, 0);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={onClose} // Tombol konfirmasi hanya akan menutup modal
      title={`Rincian KRS - ${mahasiswaName}`}
      variant="info"
    >
      <div className="my-4 max-h-96 overflow-y-auto">
        <p className="text-sm text-gray-600 mb-4">
          Berikut adalah daftar mata kuliah yang diajukan oleh mahasiswa ini.
        </p>
        <div className="overflow-x-auto border rounded-lg">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th className="px-4 py-2">Kode MK</th>
                <th className="px-4 py-2">Nama Mata Kuliah</th>
                <th className="px-4 py-2 text-center">SKS</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {krsDetails.map((krs) => (
                <tr key={krs.krsId}>
                  <td className="px-4 py-3 font-mono">{krs.kodeMataKuliah}</td>
                  <td className="px-4 py-3 font-medium">{krs.namaMataKuliah}</td>
                  <td className="px-4 py-3 text-center">{krs.sks}</td>
                </tr>
              ))}
            </tbody>
            <tfoot className="font-bold bg-gray-100">
              <tr>
                <td colSpan={2} className="px-4 py-2 text-right">Total SKS Diajukan</td>
                <td className="px-4 py-2 text-center text-indigo-600">{totalSks}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </Modal>
  );
};

export default KrsDetailModal;