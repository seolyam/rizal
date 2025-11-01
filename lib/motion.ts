import type { Variants } from "framer-motion";

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  show: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export const staggerChildren: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

export const tiltHover = {
  whileHover: {
    rotateX: -4,
    rotateY: 4,
    translateY: -4,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
  },
  whileTap: {
    rotateX: 0,
    rotateY: 0,
    translateY: 0,
  },
};
