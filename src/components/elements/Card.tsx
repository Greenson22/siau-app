// src/components/elements/Card.tsx
import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div className={`bg-white shadow-md rounded-xl p-6 md:p-8 ${className}`}>
      {children}
    </div>
  );
};

export default Card;