'use client';

import React from 'react';
import { AlertTriangle } from 'lucide-react';
import Button from '@/components/elements/Button';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ isOpen, onClose, onConfirm, title, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md m-4 transform transition-all">
        <div className="p-6">
          <div className="flex items-start">
            <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
              <AlertTriangle className="h-6 w-6 text-red-600" aria-hidden="true" />
            </div>
            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                {title}
              </h3>
              <div className="mt-2">
                <p className="text-sm text-gray-500">
                  {message}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse rounded-b-lg">
          {/* --- Cukup panggil variant="danger" --- */}
          <Button
            onClick={onConfirm}
            variant="danger" // <-- Gunakan variant yang baru
            className="w-full sm:w-auto sm:ml-3" // className untuk layout tetap ada
          >
            Konfirmasi
          </Button>
          <Button
            onClick={onClose}
            variant="secondary"
            className="mt-3 w-full sm:w-auto sm:mt-0"
          >
            Batal
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;