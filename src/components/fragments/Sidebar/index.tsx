// src/components/fragments/Sidebar.tsx
'use client';

import { motion, AnimatePresence } from 'framer-motion';
import SidebarHeader from './SidebarHeader';
import SidebarNav from './SidebarNav';
import SidebarFooter from './SidebarFooter';
import type { SidebarProps } from '@/types';

import { sidebarVariants, backdropVariants } from '@/lib/animations';
const Sidebar: React.FC<SidebarProps> = ({
  navLinks,
  activeView,
  setActiveView,
  isOpen,
  setIsOpen,
  handleLogout,
  portalTitle,
}) => {

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop menggunakan varian yang diimpor */}
            <motion.div
              variants={backdropVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-20 bg-black/50 md:hidden"
            />

            <motion.aside
              variants={sidebarVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="fixed inset-y-0 left-0 z-30 flex w-64 flex-col bg-white text-gray-700 shadow-lg md:hidden"
            >
              <SidebarHeader portalTitle={portalTitle} onClose={() => setIsOpen(false)} />
              <SidebarNav navLinks={navLinks} activeView={activeView} setActiveView={setActiveView} />
              <SidebarFooter onLogout={handleLogout} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Sidebar untuk tampilan desktop */}
      <aside className="hidden w-64 flex-col bg-white text-gray-700 md:flex">
        <SidebarHeader portalTitle={portalTitle} onClose={() => {}} />
        <SidebarNav navLinks={navLinks} activeView={activeView} setActiveView={setActiveView} />
        <SidebarFooter onLogout={handleLogout} />
      </aside>
    </>
  );
};

export default Sidebar;