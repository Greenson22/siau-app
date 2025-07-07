'use client';

import React from 'react';
import Modal from '@/components/fragments/Modal/Modal'; // <-- Impor Modal yang sudah pintar

// Definisikan props yang sama seperti sebelumnya
interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
}) => {
  // Cukup panggil komponen Modal dengan variant 'danger'
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={onConfirm}
      title={title}
      variant="danger" // <-- Berikan variant yang sesuai
    >
      {message} 
    </Modal>
  );
};

export default ConfirmationModal;