"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ArrowDown } from "lucide-react";
import MagneticButton from "@/components/ui/MagneticButton";
import SketchPortrait from "@/components/ui/SketchPortrait";

/** ============================================
 *  COUNTER COMPONENT
 *  ============================================ */
function Counter({ value, suffix }: { value: string; suffix: string }) {
  const [displayValue, setDisplayValue] = useState(0);
  const targetValue = parseInt(value) || 0;
  const ref = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const duration = 2000;
          const startTime = performance.now();

          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeOutQuad = (t: number) => t * (2 - t);
            const currentCount = Math.floor(easeOutQuad(progress) * targetValue);

            setDisplayValue(currentCount);

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setDisplayValue(targetValue);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [targetValue, hasAnimated]);

  return (
    <span ref={ref}>
      {displayValue === 0 && value === "∞" ? "∞" : displayValue}
      <span className="text-[var(--accent)] ml-0.5">{suffix}</span>
    </span>
  );
}

/** ============================================
 *  HERO SECTION COMPONENT
 *  ============================================ */
export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();

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
       * 1. BACKGROUND EFFECTS (with Parallax)
       * ============================================ 
       */}

      {/* CSS Grid Pattern with Radial Mask */}
      <motion.div
        className="absolute inset-0 pointer-events-none -z-10"
        style={{
          y: gridY,
          backgroundImage: `
            linear-gradient(var(--border) 1px, transparent 1px),
            linear-gradient(90deg, var(--border) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          maskImage: "radial-gradient(ellipse 80% 80% at 50% 40%, black, transparent)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 80% at 50% 40%, black, transparent)"
        }}
      />

      {/* Accent Glow */}
      <motion.div
        className="absolute w-[600px] h-[600px] -top-[100px] -left-[200px] pointer-events-none -z-10 opacity-40"
        style={{
          y: glowY,
          background: "radial-gradient(circle, rgba(212,245,122,0.08) 0%, transparent 70%)"
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
                       rounded-full mb-6 max-w-fit"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent)] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--accent)]"></span>
            </span>
            <span className="text-[12px] font-medium text-[var(--accent)] uppercase tracking-[0.08em]">
              ✦ Available for freelance & full-time work
            </span>
          </motion.div>

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
                className="text-transparent"
                style={{ WebkitTextStroke: "1.5px rgba(214, 255, 6, 0.89)" }}
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
            I&apos;m a Ai Engineer{" "}
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
                href="/resume"
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

          {/* E. STATS ROW */}
          <div className="border-t border-[var(--border)] pt-10">
            <div className="grid grid-cols-2 lg:flex lg:gap-16 gap-y-10 group">
              {[
                { number: "5", suffix: "+", label: "Years experience" },
                { number: "40", suffix: "+", label: "Projects delivered" },
                { number: "20", suffix: "+", label: "Happy clients" },
                { number: "∞", suffix: "", label: "Lines of code" }
              ].map((stat, idx) => (
                <div key={idx} className="flex flex-col">
                  <div className="flex items-baseline font-syne font-extrabold text-[38px] md:text-[44px] text-[var(--fg)] leading-none">
                    <Counter value={stat.number} suffix={stat.suffix} />
                  </div>
                  <span className="text-[12px] text-[var(--fg3)] uppercase tracking-[0.07em] mt-1.5 font-medium">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Sketch Portrait (Hidden on Mobile) */}
        <SketchPortrait />
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
