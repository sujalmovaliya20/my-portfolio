"use client";

import React, { useRef, useState, ReactNode } from "react";
import { motion, useSpring, useMotionValue, useTransform } from "framer-motion";

/** ============================================
 *  MAGNETIC BUTTON COMPONENT
 *  ============================================ */
export default function MagneticButton({
  children,
  className = "",
  distance = 0.4, // Sensitivity (0.1 to 1.0)
}: {
  children: ReactNode;
  className?: string;
  distance?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  
  // Motion values for x and y translation
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Transition parameters for smooth return
  const config = { stiffness: 150, damping: 15, mass: 0.1 };
  const springX = useSpring(x, config);
  const springY = useSpring(y, config);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    
    // Calculate relative mouse position from the center of the button
    const middleX = left + width / 2;
    const middleY = top + height / 2;
    
    const deltaX = clientX - middleX;
    const deltaY = clientY - middleY;
    
    // Limit translation (max 8px)
    x.set(deltaX * distance);
    y.set(deltaY * distance);
  };

  const handleMouseLeave = () => {
    // Reset to center on leave
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        x: springX,
        y: springY,
        display: "inline-flex",
        willChange: "transform",
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
