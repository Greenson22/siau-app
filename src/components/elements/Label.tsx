import React from 'react';

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode;
}

const Label: React.FC<LabelProps> = ({ htmlFor, children, className = '' }) => {
  return (
    <label htmlFor={htmlFor} className={`block text-sm font-medium leading-6 text-gray-700 ${className}`}>
      {children}
    </label>
  );
};

export default Label;