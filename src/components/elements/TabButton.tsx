import React from 'react';

interface TabButtonProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const TabButton: React.FC<TabButtonProps> = ({ label, isActive, onClick }) => {
  const baseClasses = 'py-4 px-4 font-medium text-sm focus:outline-none transition-colors';
  const activeClasses = 'bg-indigo-100 text-indigo-700 font-semibold rounded-t-md'; // Contoh warna tema
  const inactiveClasses = 'text-gray-500 hover:text-gray-700';

  return (
    <button
      className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default TabButton;