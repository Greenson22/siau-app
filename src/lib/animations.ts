// src/lib/animations.ts
import type { Variants, Transition } from 'framer-motion';

// --- Page Transitions ---
export const pageTransitionVariants: Variants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit:    { opacity: 0 },
};

export const pageTransition: Transition = {
  type: "spring",
  duration: 0.1,
};

// --- Backdrop/Overlay Animation ---
export const backdropVariants: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

// --- Sidebar Animations ---
const sidebarTransition: Transition = {
    type: 'spring',
    stiffness: 300,
    damping: 30,
};

export const sidebarVariants: Variants = {
    open: {
        x: 0,
        transition: sidebarTransition,
    },
    closed: {
        x: '-100%',
        transition: sidebarTransition,
    },
};