import React from 'react';

// 1. Tambahkan 'id' dan 'label' ke dalam interface props
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  className?: string;
}

const Input: React.FC<InputProps> = ({ id, label, className = '', ...props }) => {
  return (
    // 2. Bungkus input dan label dalam satu div
    <div>
      <label htmlFor={id} className="block text-sm font-medium leading-6 text-gray-900">
        {label}
      </label>
      <div className="mt-2">
        <input
          id={id}
          name={id}
          {...props}
          className={`block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 transition-colors ${className}`}
        />
      </div>
    </div>
  );
};

export default Input;