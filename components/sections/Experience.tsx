"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { experience } from "@/data/experience";
import ScrollReveal from "@/components/ui/ScrollReveal";

/** ============================================
 *  EXPERIENCE SECTION COMPONENT
 *  ============================================ */
export default function Experience() {
  // Find current job ID as default active card
  const currentJob = experience.find(exp => exp.current) || experience[0];
  const [activeId, setActiveId] = useState(currentJob.id);

  return (
    <section 
      id="experience" 
      className="relative bg-[var(--bg)] py-[100px] border-t border-[var(--border)] overflow-hidden"
    >
      <div className="max-w-[1200px] mx-auto px-10">
        
        {/* Section Header */}
        <ScrollReveal direction="up" className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-7 h-[1.5px] bg-[var(--accent)]" />
            <span className="text-[11px] font-bold text-[var(--accent)] uppercase tracking-[0.15em]">
              Career
            </span>
          </div>
          <h2 className="text-[36px] md:text-[48px] font-extrabold font-syne text-[var(--fg)] leading-none">
            Experience
          </h2>
        </ScrollReveal>

        {/* Experience Grid */}
        <motion.div 
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          variants={{
            hidden: {},
            show: {
              transition: {
                staggerChildren: 0.15
              }
            }
          }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-4"
        >
          {experience.map((exp) => (
            <motion.div
              key={exp.id}
              variants={{
                hidden: { y: 20, opacity: 0 },
                show: { y: 0, opacity: 1, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } }
              }}
              onClick={() => setActiveId(exp.id)}
              className={`
                group relative bg-[var(--bg2)] border rounded-[16px] p-[30px] cursor-pointer 
                transition-all duration-300 overflow-hidden will-change-transform
                ${activeId === exp.id 
                  ? "border-[rgba(212,245,122,0.2)] bg-[var(--bg3)] shadow-lg" 
                  : "border-[var(--border)] hover:border-[rgba(255,255,255,0.1)] hover:bg-[rgba(255,255,255,0.02)]"}
              `}
            >
              {/* Left Accent Bar */}
              <div 
                className={`
                  absolute left-0 top-0 bottom-0 w-[3px] rounded-r-[2px] transition-all duration-300
                  ${activeId === exp.id ? "bg-[var(--accent)]" : "bg-[var(--bg4)] group-hover:bg-[rgba(255,255,255,0.2)]"}
                `}
              />

              {/* Card Content Top: Period & Badge */}
              <div className="mb-4">
                <span className="text-[11px] font-bold text-[var(--accent)] uppercase tracking-[0.1em]">
                  {exp.period}
                </span>
                
                {exp.current && (
                  <div className="flex items-center gap-2 mt-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent)] opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--accent)]"></span>
                    </span>
                    <span className="text-[11px] font-medium text-[var(--accent)]">
                      Currently working here
                    </span>
                  </div>
                )}
              </div>

              {/* Role & Company */}
              <h3 className="text-[20px] font-bold font-syne text-[var(--fg)] leading-tight tracking-[-0.3px] mb-1">
                {exp.role}
              </h3>
              <div className="text-[14px] text-[var(--fg2)] font-dm-sans mb-4">
                {exp.company} <span className="opacity-40 mx-1">•</span> {exp.type}
              </div>

              {/* Description */}
              <p className="text-[13px] text-[var(--fg3)] font-dm-sans leading-[1.7] mb-6 line-clamp-3 group-hover:line-clamp-none transition-all duration-300">
                {exp.description}
              </p>

              {/* Skills Tags */}
              <div className="flex flex-wrap gap-1.5 mt-auto pt-2">
                {exp.skills.map((skill, idx) => (
                  <span 
                    key={idx}
                    className="px-2.5 py-1 bg-[rgba(212,245,122,0.06)] border border-[rgba(212,245,122,0.12)] 
                               rounded-full text-[11px] font-medium text-[var(--accent)] transition-all duration-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
