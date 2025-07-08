import React from 'react';
import Input from '../Input';
import Label from '../Label';
import { LucideIcon } from 'lucide-react';

interface LoginInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  Icon: LucideIcon;
}

const LoginInput: React.FC<LoginInputProps> = ({ id, label, Icon, ...props }) => {
  return (
    <div>
      <Label htmlFor={id}>{label}</Label>
      <div className="mt-2 relative">
        <Icon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <Input
          id={id}
          name={id}
          className="pl-10"
          label=""
          {...props}
        />
      </div>
    </div>
  );
};

export default LoginInput;