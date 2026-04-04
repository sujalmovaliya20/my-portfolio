"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { testimonials } from "@/data/testimonials";
import ScrollReveal from "@/components/ui/ScrollReveal";

/** ============================================
 *  HELPER: GET INITIALS FROM NAME
 *  ============================================ */
function getInitials(name: string) {
  const words = name.split(" ");
  if (words.length >= 2) {
    return `${words[0][0]}${words[1][0]}`.toUpperCase();
  }
  return words[0][0].toUpperCase();
}

/** ============================================
 *  TESTIMONIALS SECTION COMPONENT
 *  ============================================ */
export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // 1. Navigation Handlers
  const nextTestimonial = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prevTestimonial = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, []);

  // 2. Auto-Rotation Logic
  useEffect(() => {
    if (!isPaused) {
      timerRef.current = setInterval(nextTestimonial, 5000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, nextTestimonial]);

  const activeTestimonial = testimonials[activeIndex];

  return (
    <section 
      id="testimonials" 
      className="relative bg-[var(--bg2)] py-[100px] border-t border-[var(--border)] text-center overflow-hidden"
    >
      <div className="container px-6">
        
        {/* Section Header */}
        <ScrollReveal direction="up" className="mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-7 h-[1.5px] bg-[var(--accent)]" />
            <span className="text-[11px] font-bold text-[var(--accent)] uppercase tracking-[0.15em]">
              Kind Words
            </span>
          </div>
          <h2 className="text-[36px] md:text-[48px] font-extrabold font-syne text-[var(--fg)] leading-none mb-4">
            Testimonials
          </h2>
          <p className="text-[16px] text-[var(--fg2)] font-dm-sans max-w-[400px] mx-auto mt-4">
            What clients & colleagues say about working with me.
          </p>
        </ScrollReveal>

        {/* Testimonial Carousel Box */}
        <div className="relative max-w-[800px] mx-auto group">
          
          {/* Main Box Wrapper */}
          <ScrollReveal direction="up" delay={0.2}>
            <motion.div
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              className="relative bg-[var(--bg3)] border border-[var(--border)] rounded-[24px] p-8 md:p-[52px] shadow-2xl overflow-hidden"
            >
              {/* Decorative Quote Mark */}
              <span className="absolute top-[20px] left-[36px] font-syne font-extrabold text-[100px] text-[var(--accent)] opacity-[0.12] leading-none pointer-events-none select-none">
                &quot;
              </span>

              {/* Inner Content with AnimatePresence for Fading */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTestimonial.id}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.3 }}
                  className="relative z-10"
                >
                  {/* 1. Testimonial Text */}
                  <p className="text-[17px] md:text-[18px] text-[var(--fg2)] font-dm-sans leading-[1.8] italic mb-10">
                    {activeTestimonial.content}
                  </p>

                  {/* 2. Author Row */}
                  <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                    
                    {/* Initials Avatar */}
                    <div className="w-[48px] h-[48px] rounded-full flex items-center justify-center text-[16px] font-bold text-[#0a0a0a] flex-shrink-0"
                         style={{ background: "linear-gradient(135deg, var(--accent2), var(--accent))" }}>
                      {getInitials(activeTestimonial.name)}
                    </div>

                    {/* Info Details */}
                    <div className="text-center md:text-left">
                      <div className="text-[15px] font-semibold text-[var(--fg)]">
                        {activeTestimonial.name}
                      </div>
                      <div className="text-[13px] text-[var(--fg3)] font-medium font-dm-sans">
                        {activeTestimonial.role} <span className="opacity-40 mx-1">•</span> {activeTestimonial.company}
                      </div>
                      {/* Stars */}
                      <div className="flex items-center justify-center md:justify-start gap-1 mt-1 text-[var(--accent)]">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star key={s} size={13} fill="currentColor" />
                        ))}
                      </div>
                    </div>

                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Navigation Arrows (Desktop overlay or group hover visible) */}
              <button 
                onClick={prevTestimonial}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-9 h-9 items-center justify-center rounded-full bg-[var(--bg4)] border border-[var(--border)] text-[var(--fg2)] transition-all duration-300 hover:bg-[var(--bg2)] hover:border-[var(--border2)] hidden lg:flex"
                aria-label="Previous Testimonial"
              >
                <ChevronLeft size={18} />
              </button>
              <button 
                onClick={nextTestimonial}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-9 h-9 items-center justify-center rounded-full bg-[var(--bg4)] border border-[var(--border)] text-[var(--fg2)] transition-all duration-300 hover:bg-[var(--bg2)] hover:border-[var(--border2)] hidden lg:flex"
                aria-label="Next Testimonial"
              >
                <ChevronRight size={18} />
              </button>
            </motion.div>
          </ScrollReveal>

          {/* Dot Indicators */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`
                  transition-all duration-500 ease-out 
                  ${activeIndex === idx 
                    ? "w-[20px] h-[6px] rounded-[3px] bg-[var(--accent)]" 
                    : "w-1.5 h-1.5 rounded-full bg-[var(--fg3)] opacity-40 hover:opacity-100"}
                `}
                aria-label={`Go to testimonial ${idx + 1}`}
              />
            ))}
          </div>

          {/* Mobile Navigation Arrows (Bottom/Below Box for accessibility) */}
          <div className="flex lg:hidden items-center justify-center gap-10 mt-6">
            <button onClick={prevTestimonial} className="text-[var(--fg2)] hover:text-[var(--accent)] transition-colors" aria-label="Previous">
              <ChevronLeft size={24} />
            </button>
            <button onClick={nextTestimonial} className="text-[var(--fg2)] hover:text-[var(--accent)] transition-colors" aria-label="Next">
              <ChevronRight size={24} />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
