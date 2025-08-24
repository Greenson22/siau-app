'use client';

import React, { useState, useEffect, ElementType } from 'react';
import Button from '../../elements/Button';
import { AlertTriangle, Info } from 'lucide-react'; // Impor kedua ikon

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  children: React.ReactNode;
  variant?: 'info' | 'danger';
}

const Modal: React.FC<ModalProps> = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title, 
  children, 
  variant = 'info'
}) => {
  const [isRendered, setIsRendered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const theme = {
    info: {
      Icon: Info,
      iconBg: 'bg-blue-100',
      iconText: 'text-blue-600',
      confirmButtonVariant: 'primary' as const,
    },
    danger: {
      Icon: AlertTriangle,
      iconBg: 'bg-red-100',
      iconText: 'text-red-600',
      confirmButtonVariant: 'danger' as const,
    },
  };

  const currentTheme = theme[variant];

  useEffect(() => {
    let openTimeout: NodeJS.Timeout;
    let closeTimeout: NodeJS.Timeout;
    if (isOpen) {
      setIsRendered(true);
      openTimeout = setTimeout(() => setIsVisible(true), 20);
    } else {
      setIsVisible(false);
      closeTimeout = setTimeout(() => setIsRendered(false), 300);
    }
    return () => {
      clearTimeout(openTimeout);
      clearTimeout(closeTimeout);
    };
  }, [isOpen]);

  if (!isRendered) {
    return null;
  }

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition-colors duration-300 ${isVisible ? 'bg-black/60' : 'bg-transparent'}`}
      onClick={onClose}
    >
      <div
        className={`relative w-full max-w-md transform rounded-2xl bg-white text-left shadow-xl transition-all duration-300 ease-in-out ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4 rounded-t-2xl">
          <div className="sm:flex sm:items-start">
            <div className={`mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full sm:mx-0 sm:h-10 sm:w-10 ${currentTheme.iconBg}`}>
              <currentTheme.Icon className={`h-6 w-6 ${currentTheme.iconText}`} />
            </div>
            <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
              <h3 className="text-lg font-semibold leading-6 text-gray-900">{title}</h3>
              <div className="mt-2">
                {/* --- PERUBAHAN DI SINI --- */}
                <div className="text-sm text-gray-500">{children}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 rounded-b-2xl">
          <Button onClick={onConfirm} variant={currentTheme.confirmButtonVariant}>
            Ya, Konfirmasi
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