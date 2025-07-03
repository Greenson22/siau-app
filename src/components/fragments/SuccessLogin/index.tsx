// src/components/fragments/SuccessLogin/index.tsx

'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import Card from '@/components/elements/Card';

interface SuccessLoginProps {
  onAnimationComplete: () => void;
}

const SuccessLogin: React.FC<SuccessLoginProps> = ({ onAnimationComplete }) => {
  // Secara otomatis menghilangkan animasi setelah 2 detik
  useEffect(() => {
    const timer = setTimeout(() => {
      onAnimationComplete();
    }, 2000); // 2 detik

    return () => clearTimeout(timer);
  }, [onAnimationComplete]);

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0, transition: { duration: 0.5 } }
  };

  const cardVariants = {
    hidden: { scale: 0.5, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1, 
      transition: { type: 'spring', stiffness: 260, damping: 20 } 
    },
    exit: { scale: 0.5, opacity: 0, transition: { duration: 0.3 } }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={overlayVariants}
      >
        <motion.div variants={cardVariants}>
          <Card className="flex flex-col items-center justify-center gap-4 p-8 bg-white">
            <CheckCircle className="text-green-500" size={64} />
            <h2 className="text-2xl font-bold text-gray-800">Login Berhasil!</h2>
            <p className="text-gray-600">Selamat datang kembali.</p>
          </Card>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SuccessLogin;