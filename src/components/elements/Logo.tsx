"use client"; // Diperlukan untuk komponen dengan animasi

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion'; // 1. Impor motion dari framer-motion

interface LogoProps {
  showText?: boolean;
}

const Logo: React.FC<LogoProps> = ({ showText = true }) => {
  return (
    <div className="flex items-center gap-3">
      {/* 2. Animasi untuk gambar logo */}
      <motion.div
        className="p-1"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <Image 
          src="/images/logo.png" 
          alt="Logo STTIS Siau" 
          width={160}
          height={40}
          className='h-10 w-full object-cover' // Disesuaikan agar rasio benar
          priority
        />
      </motion.div>

      {/* 3. Animasi untuk teks */}
      {showText && (
        <motion.span 
          className="text-xl font-bold text-white overflow-hidden"
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