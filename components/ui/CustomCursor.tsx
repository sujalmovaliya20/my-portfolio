"use client";

import React, { useState, useEffect } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export default function CustomCursor() {
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Mouse coordinates using Framer Motion values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for the outer ring (lag effect)
  const springConfig = { damping: 25, stiffness: 150 };
  const ringX = useSpring(mouseX, springConfig);
  const ringY = useSpring(mouseY, springConfig);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Detect touch device
    const touchQuery = window.matchMedia("(pointer: coarse)");
    setIsTouchDevice(touchQuery.matches);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive =
        target.closest("a") ||
        target.closest("button") ||
        target.closest(".project-card") ||
        target.closest(".exp-card") ||
        target.style.cursor === "pointer";

      setIsHovering(!!isInteractive);
    };

    const handleMouseLeaveWindow = () => setIsVisible(false);
    const handleMouseEnterWindow = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseleave", handleMouseLeaveWindow);
    document.addEventListener("mouseenter", handleMouseEnterWindow);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseleave", handleMouseLeaveWindow);
      document.removeEventListener("mouseenter", handleMouseEnterWindow);
    };
  }, [mouseX, mouseY, isVisible]);

  if (!mounted || isTouchDevice || !isVisible) return null;

  return (
    <>
      {/* Inner Dot — Fast Follower */}
      <motion.div
        style={{
          position: "fixed",
          left: mouseX,
          top: mouseY,
          width: isHovering ? 20 : 12,
          height: isHovering ? 20 : 12,
          backgroundColor: "var(--accent)",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 9999,
          translateX: "-50%",
          translateY: "-50%",
          mixBlendMode: "difference",
          transition: "width 0.2s, height 0.2s",
        }}
      />

      {/* Outer Ring — Smooth Lagging Follower */}
      <motion.div
        style={{
          position: "fixed",
          left: ringX,
          top: ringY,
          width: isHovering ? 60 : 40,
          height: isHovering ? 60 : 40,
          border: `1px solid ${isHovering ? "rgba(212, 245, 122, 0.8)" : "rgba(212, 245, 122, 0.5)"}`,
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 9998,
          translateX: "-50%",
          translateY: "-50%",
          transition: "width 0.2s, height 0.2s, border-color 0.2s",
        }}
      />
    </>
  );
}
