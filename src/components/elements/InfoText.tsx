// src/components/elements/InfoText.tsx
import React from 'react';

interface InfoTextProps {
  message: string;
}

const InfoText: React.FC<InfoTextProps> = ({ message }) => {
  return <p className="text-gray-600">{message}</p>;
};

export default InfoText;