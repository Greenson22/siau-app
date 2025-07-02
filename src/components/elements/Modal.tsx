// src/components/elements/Modal.tsx
import React, { useState, useEffect } from 'react';
import Button from './Button';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onConfirm, title, children }) => {
  // isRendered: untuk memasukkan/mengeluarkan komponen dari DOM
  const [isRendered, setIsRendered] = useState(false);
  // isVisible: untuk mengontrol kelas CSS transisi (opacity, scale)
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let openTimeout: NodeJS.Timeout;
    let closeTimeout: NodeJS.Timeout;

    if (isOpen) {
      // 1. Masukkan komponen ke DOM
      setIsRendered(true);
      // 2. Beri jeda sesaat, lalu jalankan animasi masuk
      openTimeout = setTimeout(() => {
        setIsVisible(true);
      }, 20); // Jeda 20ms sudah cukup
    } else {
      // 1. Jalankan animasi keluar
      setIsVisible(false);
      // 2. Setelah animasi selesai, keluarkan komponen dari DOM
      closeTimeout = setTimeout(() => {
        setIsRendered(false);
      }, 300); // Sesuaikan dengan durasi transisi
    }

    // Membersihkan timeout jika komponen unmount di tengah jalan
    return () => {
      clearTimeout(openTimeout);
      clearTimeout(closeTimeout);
    };
  }, [isOpen]);

  // Jika tidak perlu dirender, return null
  if (!isRendered) {
    return null;
  }

  return (
    <div
      className={`
        fixed inset-0 z-50 flex items-center justify-center transition-colors duration-300
        ${isVisible ? 'bg-black/60' : 'bg-transparent'}
      `}
      aria-modal="true"
      role="dialog"
      onClick={onClose}
    >
      <div
        className={`
          relative w-full max-w-md transform rounded-2xl bg-white text-left shadow-xl
          transition-all duration-300 ease-in-out
          ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}
        `}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4 rounded-t-2xl">
          <div className="sm:flex sm:items-start">
            <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
              <svg className="h-6 w-6 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
              </svg>
            </div>
            <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
              <h3 className="text-lg font-semibold leading-6 text-gray-900" id="modal-title">
                {title}
              </h3>
              <div className="mt-2">
                <p className="text-sm text-gray-500">
                  {children}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 rounded-b-2xl">
          <Button onClick={onConfirm} variant="primary">
            Ya, Saya Yakin
          </Button>
          <div className="mr-2">
            <Button onClick={onClose} variant="secondary">
              Batal
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;