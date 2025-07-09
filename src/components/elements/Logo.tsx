import React from 'react';
import Image from 'next/image';

interface LogoProps {
  showText?: boolean;
}

const Logo: React.FC<LogoProps> = ({ showText = true }) => {
  return (
    <div className="flex items-center gap-3">
      <div className="p-1">
        <Image 
          src="/images/logo.png" 
          alt="Logo STTIS Siau" 
          width={160}
          height={40}
          className='h-10 w-full rounded-full object-cover'
          priority
        />
      </div>
      {showText && (
        <span className="text-xl font-bold text-white">STTIS Siau</span>
      )}
    </div>
  );
};

export default Logo;