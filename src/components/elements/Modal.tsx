// src/components/elements/Modal.tsx
import React, { Fragment } from 'react';
import Button from './Button';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onConfirm, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300" aria-modal="true" role="dialog">
      <div className="relative w-full max-w-md p-4">
        <div className="relative transform rounded-2xl bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
          <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4 rounded-t-2xl">
            <div className="sm:flex sm:items-start">
              <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                {/* Heroicon: information-circle */}
                <svg className="h-6 w-6 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.25 5.25m.25-5.25v.25m0 0l-5.25-.25m5.25.25l5.25-.25M11.25 11.25v-5.25m0 5.25h.25-5.25m0 0h5.25m-5.25 0h.25" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9.75a.75.75 0 01.75.75v3.375a.75.75 0 01-1.5 0V10.5a.75.75 0 01.75-.75zM12 21a9 9 0 100-18 9 9 0 000 18z" />
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
            <div className="mr-2"> {/* Spacer */}
              <Button onClick={onClose} variant="secondary">
                Batal
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;