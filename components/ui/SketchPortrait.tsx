"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

/** ============================================
 *  SKETCH PORTRAIT COMPONENT
 *  Premium illustration with decorative accents,
 *  theme-aware filters, and staggered entrance.
 *  ============================================ */
export default function SketchPortrait() {
  const [imageExists, setImageExists] = useState(true);

  // Fallback check
  useEffect(() => {
    const img = new (window as any).Image();
    img.src = "/images/sketch.png";
    img.onload = () => setImageExists(true);
    img.onerror = () => setImageExists(false);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1], delay: 0.3 }}
      className="relative hidden md:flex items-center justify-center shrink-0 
                 w-[280px] h-[340px] lg:w-[340px] lg:h-[420px] group"
    >
      {/* 
       * ============================================
       * 1. BACKGROUND DECORATIVE ELEMENTS
       * ============================================ 
       */}
      
      {/* Dotted Grid Pattern */}
      <div 
        className="absolute -top-5 -right-5 w-[180px] h-[180px] opacity-35 -z-10 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, var(--fg3) 1px, transparent 1px)",
          backgroundSize: "18px 18px"
        }}
      />

      {/* Decorative Ring (Accent Circle) */}
      <div className="absolute -bottom-4 -left-4 w-[100px] h-[100px] rounded-full border-2 border-[rgba(var(--accent-rgb),0.25)] -z-10 pointer-events-none" />

      {/* Floating Accent Square */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        @keyframes pulse-custom {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.2); opacity: 0.7; }
        }
        .animate-float {
          animation: float 3s infinite ease-in-out;
        }
        .animate-pulse-custom {
          animation: pulse-custom 2s infinite ease-in-out;
        }
      `}</style>
      <div className="absolute top-5 -right-3 w-6 h-6 bg-[var(--accent)] opacity-40 rounded-md animate-float -z-10 pointer-events-none" />

      {/* 
       * ============================================
       * 2. IMAGE CONTAINER
       * ============================================ 
       */}
      <div className="relative z-10 w-full h-full rounded-[24px] overflow-hidden border border-[var(--border2)] bg-[var(--bg2)]">
        
        {/* Corner Accents */}
        <div className="absolute top-0 left-0 w-10 h-10 border-t-2 border-l-2 border-[var(--accent)] rounded-tl-[24px] z-20 pointer-events-none group-hover:opacity-70 transition-opacity duration-400" />
        <div className="absolute bottom-0 right-0 w-10 h-10 border-b-2 border-r-2 border-[var(--accent)] rounded-br-[24px] z-20 pointer-events-none group-hover:opacity-70 transition-opacity duration-400" />

        {/* The Sketch Image or Fallback */}
        {imageExists ? (
          <div className="relative w-full h-full">
            <Image
              src="/images/sketch.png"
              alt="Sujal Movaliya - Sketch Portrait"
              fill
              className="object-cover object-top filter brightness-[0.9] contrast-[1.1] transition-all duration-400 group-hover:scale-[1.03]
                         [data-theme='light']:brightness-[0.85] [data-theme='light']:contrast-[1.2]"
              style={{
                // Explicitly handled for dynamic theme filter overrides
                transition: "filter 0.3s ease, transform 0.4s ease"
              }}
            />
          </div>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[var(--bg2)] to-[var(--bg3)] text-center p-6">
            <span className="text-[48px] mb-2">🎨</span>
            <span className="text-[13px] text-[var(--fg3)] font-medium">Your sketch here</span>
          </div>
        )}

        {/* Floating "Available for work" Badge */}
        <div className="absolute bottom-6 -left-5 bg-[var(--bg2)] border border-[var(--border2)] rounded-[14px] px-4 py-2.5 flex items-center gap-2.5 shadow-[0_8px_32px_rgba(0,0,0,0.4)] z-30">
          <span className="relative flex h-2 w-2">
            <span className="animate-pulse-custom absolute inline-flex h-full w-full rounded-full bg-[var(--accent)] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--accent)]"></span>
          </span>
          <span className="text-[11px] lg:text-[12px] font-medium text-[var(--fg)] tracking-tight">Available for work</span>
        </div>
      </div>
    </motion.div>
  );
}
