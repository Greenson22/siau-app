"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

// 1. Tambahkan prop textColor
interface LogoProps {
  showText?: boolean;
  textColor?: string; // Contoh: 'text-white', 'text-gray-800'
}

// 2. Terima prop baru dengan nilai default
const Logo: React.FC<LogoProps> = ({ showText = true, textColor = 'text-white' }) => {
  return (
    <div className="flex items-center gap-3">
      <motion.div
        className="p-1 rounded-full shadow-sm"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <Image 
          src="/images/logo.png" 
          alt="Logo STTIS Siau" 
          width={160}
          height={40}
          className='h-10 w-full rounded-full object-cover'
          priority
        />
      </motion.div>
      {showText && (
        <motion.span 
          // 3. Gunakan prop textColor di className
          className={`text-xl font-bold ${textColor} overflow-hidden`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
        >
          STTIS Siau
        </motion.span>
      )}
    </div>
  );
};

export default Logo;