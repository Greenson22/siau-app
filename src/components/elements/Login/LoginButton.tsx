import React from 'react';
import Button from '../Button';

interface LoginButtonProps {
  isLoading: boolean;
}

const LoginButton: React.FC<LoginButtonProps> = ({ isLoading }) => {
  return (
    <Button type="submit" className="w-full" isLoading={isLoading}>
      Login
    </Button>
  );
};

export default LoginButton;