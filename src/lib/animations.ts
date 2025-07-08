import type { Variants, Transition } from 'framer-motion';

export const pageTransitionVariants: Variants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit:    { opacity: 0 },
};

export const pageTransition: Transition = {
  type: "spring",
  duration: 0.1,
};