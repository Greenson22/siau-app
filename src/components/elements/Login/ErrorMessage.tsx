import React from 'react';

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  if (!message) return null;
  return (
    <p className="text-sm text-center text-red-600 animate-shake">{message}</p>
  );
};

export default ErrorMessage;