'use client';

import React, { useState } from 'react';
import Modal from '@/components/fragments/Modal/Modal';
import Button from '@/components/elements/Button';

interface KrsRejectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (reason: string) => void;
  mahasiswaName: string;
  isLoading: boolean;
}

const KrsRejectionModal: React.FC<KrsRejectionModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  mahasiswaName,
  isLoading,
}) => {
  const [reason, setReason] = useState('');

  const handleConfirm = () => {
    if (reason.trim()) {
      onConfirm(reason);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={handleConfirm}
      title={`Tolak KRS - ${mahasiswaName}`}
      variant="danger"
    >
      <div className="my-4 space-y-2">
        <p className="text-sm text-gray-600">
          Harap berikan alasan penolakan KRS. Catatan ini akan ditampilkan kepada mahasiswa.
        </p>
        <textarea
          id="rejection-reason"
          rows={4}
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          className="mt-2 block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 transition-colors"
          placeholder="Contoh: SKS yang diambil melebihi batas, ada mata kuliah prasyarat yang belum lulus, dll."
          required
        />
      </div>
    </Modal>
  );
};

export default KrsRejectionModal;