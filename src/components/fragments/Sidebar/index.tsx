// src/components/fragments/Sidebar.tsx
'use client';

import { motion, AnimatePresence } from 'framer-motion';
import SidebarHeader from './SidebarHeader';
import SidebarNav from './SidebarNav';
import SidebarFooter from './SidebarFooter';
import type { NavLink } from '@/types';

interface SidebarProps {
  navLinks: NavLink[];
  activeView: string;
  setActiveView: (view: string) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  handleLogout: () => void;
  portalTitle: string;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  navLinks, 
  activeView, 
  setActiveView, 
  isOpen, 
  setIsOpen, 
  handleLogout,
  portalTitle 
}) => {
  interface SidebarVariants {
    open: {
      x: number;
      transition: {
        type: string;
        stiffness: number;
        damping: number;
      };
    };
    closed: { x: string; transition: { type: string; stiffness: number; damping: number } };
  }  const sidebarVariants: SidebarVariants = {
    // Posisi saat sidebar terbuka (terlihat)
    open: {
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
    // Posisi saat sidebar tertutup (tersembunyi)
    closed: {
      x: "-100%",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
  };

  return (
    <>
      <AnimatePresence>
        {/*
          Wrapper ini hanya untuk tampilan mobile, 
          memastikan sidebar dan overlay muncul/hilang dengan animasi.
        */}
        {isOpen && (
          <>
            {/* Backdrop/Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-20 bg-black/50 md:hidden"
            />
            
            <motion.aside
              initial="closed"
              animate="open"
              exit="closed"
              variants={sidebarVariants}
              className={`
                fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-lg
                flex flex-col text-gray-700
                md:hidden 
              `}
            >
              <SidebarHeader portalTitle={portalTitle} onClose={() => setIsOpen(false)} />
              <SidebarNav navLinks={navLinks} activeView={activeView} setActiveView={setActiveView} />
              <SidebarFooter onLogout={handleLogout} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
      
      {/* Sidebar untuk tampilan desktop. 
        Selalu terlihat dan tidak dianimasikan.
      */}
      <aside 
        className={`
          hidden md:flex flex-col w-64 bg-white text-gray-700
        `}
      >
        <SidebarHeader portalTitle={portalTitle} onClose={() => {}} />
        <SidebarNav navLinks={navLinks} activeView={activeView} setActiveView={setActiveView} />
        <SidebarFooter onLogout={handleLogout} />
      </aside>
    </>
  );
};

export default Sidebar;