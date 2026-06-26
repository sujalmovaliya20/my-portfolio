"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ArrowDown } from "lucide-react";
import MagneticButton from "@/components/ui/MagneticButton";
import SketchPortrait from "@/components/ui/SketchPortrait";
import dynamic from "next/dynamic";

const HeroBackground3D = dynamic(
  () => import("@/components/ui/HeroBackground3D"),
  { ssr: false }
);

/** ============================================
 *  WALKING MAN SVG COMPONENT
 *  ============================================ */
function WalkingMan() {
  const strideDuration = 0.8; // Slower stride for visibility (0.8s vs 0.5s)
  
  return (
    <svg width="40" height="60" viewBox="0 0 40 60" className="overflow-visible">
      {/* Head */}
      <motion.circle
        cx="15"
        cy="11"
        r="5"
        fill="var(--accent)"
        className="drop-shadow-[0_0_8px_rgba(var(--accent-rgb),0.6)]"
        animate={{ y: [0, -2, 0] }}
        transition={{ duration: strideDuration / 2, repeat: Infinity, ease: "easeInOut" }}
      />
      
      {/* Torso (Leaning slightly forward) */}
      <motion.line
        x1="20"
        y1="35"
        x2="16"
        y2="17"
        stroke="var(--accent)"
        strokeWidth="3.5"
        strokeLinecap="round"
        className="drop-shadow-[0_0_8px_rgba(var(--accent-rgb),0.6)]"
        animate={{ y: [0, -2, 0] }}
        transition={{ duration: strideDuration / 2, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Left Arm */}
      <motion.g
        style={{ originX: "16px", originY: "20px" }}
        animate={{ rotate: [-25, 30, -25], y: [0, -2, 0] }}
        transition={{ 
          rotate: { duration: strideDuration, repeat: Infinity, ease: "easeInOut" },
          y: { duration: strideDuration / 2, repeat: Infinity, ease: "easeInOut" }
        }}
      >
        <line
          x1="16"
          y1="20"
          x2="9"
          y2="31"
          stroke="var(--accent)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </motion.g>

      {/* Right Arm */}
      <motion.g
        style={{ originX: "16px", originY: "20px" }}
        animate={{ rotate: [30, -25, 30], y: [0, -2, 0] }}
        transition={{ 
          rotate: { duration: strideDuration, repeat: Infinity, ease: "easeInOut" },
          y: { duration: strideDuration / 2, repeat: Infinity, ease: "easeInOut" }
        }}
      >
        <line
          x1="16"
          y1="20"
          x2="23"
          y2="31"
          stroke="var(--accent)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </motion.g>

      {/* Left Leg (Skeletal structure with knee bending) */}
      <motion.g
        style={{ originX: "20px", originY: "35px" }}
        animate={{ rotate: [-30, 20, -30] }}
        transition={{ duration: strideDuration, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Thigh */}
        <line
          x1="20"
          y1="35"
          x2="16"
          y2="44"
          stroke="var(--accent)"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        {/* Calf (Knee bends when swinging back) */}
        <motion.line
          x1="16"
          y1="44"
          x2="12"
          y2="53"
          stroke="var(--accent)"
          strokeWidth="3.5"
          strokeLinecap="round"
          style={{ originX: "16px", originY: "44px" }}
          animate={{ rotate: [0, 30, 0] }}
          transition={{ duration: strideDuration, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.g>

      {/* Right Leg (Skeletal structure with knee bending) */}
      <motion.g
        style={{ originX: "20px", originY: "35px" }}
        animate={{ rotate: [20, -30, 20] }}
        transition={{ duration: strideDuration, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Thigh */}
        <line
          x1="20"
          y1="35"
          x2="24"
          y2="44"
          stroke="var(--accent)"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        {/* Calf (Knee bends when swinging back) */}
        <motion.line
          x1="24"
          y1="44"
          x2="28"
          y2="53"
          stroke="var(--accent)"
          strokeWidth="3.5"
          strokeLinecap="round"
          style={{ originX: "24px", originY: "44px" }}
          animate={{ rotate: [30, 0, 30] }}
          transition={{ duration: strideDuration, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.g>
    </svg>
  );
}

/** ============================================
 *  PARTICLE BLAST EXPLOSION EFFECT
 *  ============================================ */
function BlastEffect() {
  const particleCount = 28;
  const colors = ["var(--accent)", "#ffffff", "#ffd700", "#ff6b6b", "rgba(var(--accent-rgb), 0.6)"];
  
  return (
    <div className="absolute left-[30px] bottom-[30px] pointer-events-none z-30">
      {Array.from({ length: particleCount }).map((_, i) => {
        const angle = (i * 2 * Math.PI) / particleCount + (Math.random() - 0.5) * 0.15;
        const velocity = 60 + Math.random() * 120;
        const targetX = Math.cos(angle) * velocity;
        const targetY = Math.sin(angle) * velocity;
        const randomColor = colors[i % colors.length];
        const size = 3 + Math.random() * 5;

        return (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: size,
              height: size,
              background: randomColor,
              boxShadow: `0 0 12px ${randomColor}`,
            }}
            initial={{ x: 0, y: 0, scale: 1.2, opacity: 1 }}
            animate={{ 
              x: targetX, 
              y: targetY, 
              scale: 0, 
              opacity: 0 
            }}
            transition={{ 
              duration: 0.9, 
              ease: [0.1, 0.8, 0.2, 1] 
            }}
          />
        );
      })}
    </div>
  );
}

/** ============================================
 *  HERO SECTION COMPONENT
 *  ============================================ */
export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();
  
  const [animStage, setAnimStage] = useState<"walking" | "blast" | "revealed">("walking");
  const [startX, setStartX] = useState(350);

  useEffect(() => {
    if (window.innerWidth < 768) {
      setStartX(150);
    } else {
      setStartX(350);
    }

    const walkTimeout = setTimeout(() => {
      setAnimStage("blast");
    }, 3600);

    const revealTimeout = setTimeout(() => {
      setAnimStage("revealed");
    }, 3950);

    return () => {
      clearTimeout(walkTimeout);
      clearTimeout(revealTimeout);
    };
  }, []);

  // Parallax effects
  const gridY = useTransform(scrollY, [0, 1000], [0, 300]);
  const glowY = useTransform(scrollY, [0, 1000], [0, 150]);
  const yTranslate = useTransform(scrollY, [0, 500], [0, -80]);
  const opacityFade = useTransform(scrollY, [0, 400], [1, 0]);

  // Roles for rotating animation
  const roles = [
    "building scalable apps",
    "crafting pixel-perfect UIs",
    "shipping fast products",
    "turning ideas into reality"
  ];
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 2500);
    return () => clearInterval(timer);
  }, [roles.length]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden
                 px-6 md:px-10 pt-[120px] pb-20 md:pb-32"
      id="home"
    >
      {/* 
       * ============================================
       * 1. BACKGROUND EFFECTS — THREE.JS 3D CANVAS
       * ============================================ 
       */}

      {/* Full-viewport Three.js 3D WebGL background */}
      <HeroBackground3D />

      {/* Radial vignette overlay to blend 3D into page */}
      <div
        className="absolute inset-0 pointer-events-none -z-[9]"
        style={{
          background:
            "radial-gradient(ellipse 120% 100% at 50% 0%, transparent 30%, rgba(10,10,10,0.6) 70%, #0a0a0a 100%)",
        }}
      />

      {/* Top-left accent bloom (layered on top of 3D) */}
      <motion.div
        className="absolute w-[700px] h-[700px] -top-[200px] -left-[300px] pointer-events-none -z-[8] opacity-30"
        style={{
          y: glowY,
          background: "radial-gradient(circle, rgba(212,245,122,0.15) 0%, transparent 65%)",
        }}
      />

      {/* 
       * ============================================
       * 2. MAIN CONTENT
       * ============================================ 
       */}
      <motion.div
        style={{ y: yTranslate, opacity: opacityFade }}
        className="relative z-10 w-full max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-[1fr_auto] gap-[60px] items-center"
      >
        {/* Left Column: All Existing Content */}
        <div className="flex flex-col">
          {/* A. AVAILABILITY BADGE */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="inline-flex items-center gap-2.5 px-[18px] py-[7px] 
                       bg-[rgba(212,245,122,0.08)] border border-[rgba(212,245,122,0.2)] 
                       rounded-full mb-4 max-w-fit"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent)] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--accent)]"></span>
            </span>
            <span className="text-[12px] font-medium text-[var(--accent)] uppercase tracking-[0.08em]">
              ✦ Available for freelance & full-time work
            </span>
          </motion.div>

          {/* A.2 "HELLO, I AM" ANIMATION ENGINE */}
          <div className="relative h-[60px] md:h-[80px] w-full flex items-end mb-4 z-20 overflow-visible">
            {animStage === "walking" && (
              <motion.div
                initial={{ x: startX, opacity: 0, scaleX: -1 }}
                animate={{ x: 0, opacity: [0, 1, 1] }}
                transition={{
                  duration: 3.6,
                  ease: "linear",
                }}
                className="absolute bottom-0"
              >
                <WalkingMan />
              </motion.div>
            )}

            {animStage === "blast" && <BlastEffect />}

            {(animStage === "blast" || animStage === "revealed") && (
              <motion.div
                initial={{ scale: 0, opacity: 0, filter: "blur(12px)" }}
                animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
                transition={{
                  type: "spring",
                  stiffness: 90,
                  damping: 12,
                  mass: 0.9,
                  delay: 0.05,
                }}
                className="select-none origin-left"
              >
                <MagneticButton distance={0.35}>
                  <motion.div
                    className="cursor-pointer py-1.5"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.96 }}
                  >
                    <h2 
                      className="font-syne text-3xl md:text-5xl font-extrabold tracking-[-0.04em] leading-none"
                      style={{ 
                        textShadow: "0 0 35px rgba(var(--accent-rgb), 0.18)",
                      }}
                    >
                      <span className="text-gradient">Hello,</span>{" "}
                      <span className="text-[var(--fg)]">I AM</span>
                    </h2>
                  </motion.div>
                </MagneticButton>
              </motion.div>
            )}
          </div>

          {/* B. HERO NAME (Giant Display Heading) */}
          <div className="mb-6 overflow-hidden">
            <motion.h1
              className="flex flex-col gap-0 leading-[0.88] tracking-[-0.04em] font-syne font-extrabold"
              style={{ fontSize: "clamp(60px, 10vw, 130px)" }}
            >
              <motion.span
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="text-[var(--fg)]"
              >
                SUJAL
              </motion.span>
              <motion.span
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="text-gradient font-extrabold"
                style={{
                  textShadow: "0 0 30px rgba(var(--accent-rgb), 0.2)",
                  filter: "drop-shadow(0 4px 16px rgba(0,0,0,0.6))"
                }}
              >
                MOVALIYA
              </motion.span>
            </motion.h1>
          </div>

          {/* C. ROLE SUBTITLE with rotating words */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-[17px] md:text-[20px] text-[var(--fg2)] max-w-[580px] font-dm-sans mb-10"
          >
            I&apos;m an AI Engineer{" "}
            <span className="block mt-1 sm:inline sm:mt-0 font-medium text-[var(--accent)] h-[24px]">
              <AnimatePresence mode="wait">
                <motion.span
                  key={roles[roleIndex]}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                  className="inline-block"
                >
                  {roles[roleIndex]}
                </motion.span>
              </AnimatePresence>
            </span>
          </motion.div>

          {/* D. CTA BUTTONS ROW */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex flex-wrap gap-4 mb-20"
          >
            <MagneticButton>
              <a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="group px-7 py-3.5 bg-[var(--accent)] text-[#0a0a0a] rounded-full 
                          font-syne font-semibold text-sm flex items-center gap-3
                          hover:bg-[var(--accent2)] transition-all duration-300"
                aria-label="View my projects"
              >
                View Projects
                <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
              </a>
            </MagneticButton>
            <MagneticButton>
              <a
                href="/resume.pdf"
                target="_blank"
                className="px-7 py-3.5 border border-[var(--border2)] text-[var(--fg)] rounded-full
                          font-syne font-semibold text-sm hover:border-[rgba(255,255,255,0.4)]
                          hover:bg-[rgba(255,255,255,0.03)] transition-all duration-300"
                aria-label="View my Resume"
              >
                Download Resume
              </a>
            </MagneticButton>
          </motion.div>


        </div>

        {/* Right Column Spacer: Reserves space for the 3D holographic sketch core floating in the WebGL scene */}
        <div className="hidden md:block w-[280px] h-[340px] lg:w-[340px] lg:h-[420px] pointer-events-none" />
      </motion.div>

      {/* 
       * ============================================
       * 3. SCROLL INDICATOR
       * ============================================ 
       */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-9 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-20"
      >
        <div className="relative w-[1px] h-[40px] bg-[var(--border)] overflow-hidden">
          <motion.div
            animate={{
              y: ["-100%", "100%"]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-[var(--accent)] to-transparent"
          />
        </div>
        <span className="text-[10px] uppercase font-medium text-[var(--fg3)] tracking-[0.2em]">
          Scroll
        </span>
      </motion.div>
    </section>
  );
}
