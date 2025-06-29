import React from 'react';

// Perluas interface untuk menerima semua atribut standar dari elemen div
interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  // className sudah termasuk dalam HTMLAttributes, tapi kita bisa definisikan ulang jika perlu
}

const Card: React.FC<CardProps> = ({ children, className = '', ...props }) => {
  return (
    // teruskan sisa props (...props) ke elemen div
    <div {...props} className={`bg-white p-6 rounded-xl border border-gray-200 shadow-sm ${className}`}>
      {children}
    </div>
  );
};

export default Card;