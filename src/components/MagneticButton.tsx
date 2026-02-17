"use client";

import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import type { MouseEvent, ReactNode } from "react";

type MagneticButtonProps = {
  href?: string;
  className?: string;
  children: ReactNode;
  type?: "button" | "submit" | "reset";
};

const MagneticButton = ({ href, className = "", children, type = "button" }: MagneticButtonProps) => {
  const reduceMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Respect user's reduced-motion preference by returning a plain control
  if (reduceMotion) {
    const baseClass = `relative inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition-colors ${className}`;
    if (href) {
      return (
        <a href={href} className={baseClass}>
          {children}
        </a>
      );
    }

    return (
      <button type={type} className={baseClass}>
        {children}
      </button>
    );
  }

  const xSpring = useSpring(x, { stiffness: 180, damping: 12, mass: 0.2 });
  const ySpring = useSpring(y, { stiffness: 180, damping: 12, mass: 0.2 });

  const handleMove = (event: MouseEvent<HTMLElement>) => {
    const target = event.currentTarget.getBoundingClientRect();
    const mx = event.clientX - target.left - target.width / 2;
    const my = event.clientY - target.top - target.height / 2;
    x.set(mx * 0.3);
    y.set(my * 0.3);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  const baseClass = `relative inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition-colors ${className}`;

  if (href) {
    return (
      <motion.a
        href={href}
        className={baseClass}
        style={{ x: xSpring, y: ySpring }}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      type={type}
      className={baseClass}
      style={{ x: xSpring, y: ySpring }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      {children}
    </motion.button>
  );
};

export default MagneticButton;
