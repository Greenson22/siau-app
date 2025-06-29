import React from 'react';
import { getInitials } from '@/lib/utils';

interface AvatarProps {
  src?: string;
  name: string;
  className?: string;
}

const Avatar: React.FC<AvatarProps> = ({ src, name, className = '' }) => {
  if (src) {
    return <img src={src} alt={name} className={`rounded-full object-cover ${className}`} />;
  }

  const initials = getInitials(name);

  return (
    <div
      className={`
        flex items-center justify-center rounded-full bg-gray-200 text-gray-700 font-bold
        ${className}
      `}
    >
      {initials}
    </div>
  );
};

export default Avatar;