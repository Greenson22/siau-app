import React from 'react';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  isLoading?: boolean;
}

const Button = ({
  children,
  variant = 'primary',
  className = '',
  isLoading = false,
  ...props
}: ButtonProps) => {
  const baseClasses = 'flex items-center justify-center rounded-md px-4 py-2 font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors disabled:cursor-wait disabled:opacity-50';

  const variantClasses = {
    primary: 'bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-400',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
    ghost: 'bg-transparent text-gray-500 hover:bg-gray-100 hover:text-gray-700 focus:ring-indigo-500', // <-- Kelas untuk tombol transparan
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      disabled={isLoading}
      {...props}
    >
      {children}
      {isLoading && (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      )}
    </button>
  );
};

export default Button;