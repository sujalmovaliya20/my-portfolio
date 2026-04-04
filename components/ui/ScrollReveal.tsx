"use client";

import React, { ReactNode } from "react";
import { motion } from "framer-motion";

/** ============================================
 *  SCROLL REVEAL COMPONENT
 *  ============================================ */
interface ScrollRevealProps {
  children: ReactNode;
  delay?: number;
  direction?: "up" | "left" | "right";
  className?: string;
  width?: "auto" | "full";
}

export default function ScrollReveal({
  children,
  delay = 0,
  direction = "up",
  className = "",
  width = "auto",
}: ScrollRevealProps) {
  // Define directional offsets
  const offsets = {
    up: { y: 40, x: 0 },
    left: { y: 0, x: -40 },
    right: { y: 0, x: 40 },
  };

  return (
    <div 
      className={`${className} ${width === "full" ? "w-full" : "w-auto"}`}
      style={{ overflow: "visible" }}
    >
      <motion.div
        initial={{ 
          opacity: 0, 
          y: offsets[direction].y, 
          x: offsets[direction].x 
        }}
        whileInView={{ 
          opacity: 1, 
          y: 0, 
          x: 0 
        }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ 
          duration: 0.7, 
          delay: delay, 
          ease: [0.25, 0.1, 0.25, 1] // Custom cubic bezier
        }}
        style={{ willChange: "transform, opacity" }}
      >
        {children}
      </motion.div>
    </div>
  );
}
