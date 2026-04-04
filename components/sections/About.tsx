"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";

/** ============================================
 *  SKILL BAR COMPONENT (Animates Fill on Scroll)
 *  ============================================ */
function SkillBar({ name, percentage, delay = 0 }: { name: string; percentage: number; delay?: number }) {
  return (
    <div className="flex flex-col gap-1.5 mb-5 last:mb-0">
      <div className="flex justify-between items-center text-[13px] font-medium font-dm-sans">
        <span className="text-[var(--fg2)]">{name}</span>
        <span className="text-[var(--accent)]">{percentage}%</span>
      </div>
      <div className="relative w-full h-[3px] bg-[var(--bg3)] rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${percentage}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, delay, ease: "easeOut" }}
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-[var(--accent2)] to-[var(--accent)]"
        />
      </div>
    </div>
  );
}

/** ============================================
 *  ABOUT SECTION COMPONENT
 *  ============================================ */
export default function About() {
  const personalityTags = [
    "Problem Solver", "UI/UX Enthusiast", "Open Source Contributor",
    "Performance Obsessed", "Clean Code Advocate", "Team Player"
  ];

  const skills = [
    { name: "React / Next.js", percentage: 95 },
    { name: "Node.js / Express", percentage: 90 },
    { name: "TypeScript", percentage: 88 },
    { name: "MongoDB / PostgreSQL", percentage: 85 },
    { name: "AWS / DevOps", percentage: 75 },
    { name: "UI/UX & Figma", percentage: 80 }
  ];

  const microStats = [
    { value: "3+ yrs", label: "MERN Stack" },
    { value: "40+", label: "Projects Built" },
    { value: "99%", label: "Client Satisfaction" },
    { value: "Top 5%", label: "GitHub Activity" }
  ];

  return (
    <section 
      id="about" 
      className="relative bg-[var(--bg)] py-[100px] overflow-hidden"
    >
      <div className="max-w-[1200px] mx-auto px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          
          {/* Card Side */}
          <ScrollReveal direction="right" className="order-first lg:order-last w-full">
            <div className="space-y-10">
              {/* Skill Proficiency Card */}
              <div className="relative bg-[var(--bg2)] border border-[var(--border)] rounded-[20px] p-8 overflow-hidden shadow-2xl">
                <div 
                  className="absolute top-0 left-5 right-5 h-[2px]"
                  style={{ background: "linear-gradient(90deg, transparent, var(--accent), transparent)" }}
                />
                <h3 className="text-[16px] font-bold font-syne text-[var(--fg)] mb-6">
                  Tech Stack Proficiency
                </h3>
                <div className="space-y-4">
                  {skills.map((skill, idx) => (
                    <SkillBar 
                      key={idx} 
                      name={skill.name} 
                      percentage={skill.percentage} 
                      delay={0.2 + (idx * 0.1)}
                    />
                  ))}
                </div>
              </div>

              {/* Micro Stats Grid */}
              <div className="grid grid-cols-2 gap-4">
                {microStats.map((stat, idx) => (
                  <div 
                    key={idx} 
                    className="bg-[var(--bg3)] border border-[var(--border)] rounded-[12px] p-4 text-center group hover:border-[rgba(212,245,122,0.2)] transition-colors duration-300"
                  >
                    <div className="text-[18px] font-bold font-syne text-[var(--fg)] group-hover:text-[var(--accent)] transition-colors">
                      {stat.value}
                    </div>
                    <div className="text-[11px] font-medium font-dm-sans text-[var(--fg3)] uppercase tracking-[0.05em] mt-1">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Content Side */}
          <div className="flex flex-col">
            <ScrollReveal direction="left">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-7 h-[1.5px] bg-[var(--accent)]" />
                <span className="text-[11px] font-bold text-[var(--accent)] uppercase tracking-[0.15em]">
                  About me
                </span>
              </div>
              <h2 className="text-[clamp(28px,3.5vw,46px)] font-extrabold font-syne text-[var(--fg)] leading-[1.1] tracking-[-1px] mb-6">
                Building things people love on the web.
              </h2>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.2}>
              <div className="space-y-5 mb-8">
                <p className="text-[15px] text-[var(--fg2)] leading-[1.8] font-dm-sans">
                  I&apos;m an Ai Engineer with 3+ years of experience building high-performance web applications. I specialize in the MERN stack and Next.js, creating products that scale beautifully and delight users.
                </p>
                <p className="text-[15px] text-[var(--fg2)] leading-[1.8] font-dm-sans">
                  When I&apos;m not shipping code, I&apos;m exploring new design patterns, contributing to open-source, or mentoring junior developers. I believe great software is equal parts engineering and empathy.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.4}>
              <div className="flex flex-wrap gap-2.5 mb-10">
                {personalityTags.map((tag, idx) => (
                  <div 
                    key={idx}
                    className="px-4 py-1.5 bg-[var(--bg3)] border border-[var(--border)] rounded-full 
                               text-[12px] font-medium text-[var(--fg2)] transition-all duration-300
                               hover:border-[rgba(212,245,122,0.3)] hover:text-[var(--accent)]"
                  >
                    {tag}
                  </div>
                ))}
              </div>

              <a 
                href="/resume.pdf"
                target="_blank"
                className="inline-flex items-center gap-2 text-[var(--accent)] font-bold text-[14px] group"
                aria-label="Download my resume"
              >
                <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                <span className="relative">
                  Download Resume
                  <span className="absolute left-0 bottom-0 w-0 h-[1.5px] bg-[var(--accent)] transition-all duration-300 group-hover:w-full" />
                </span>
              </a>
            </ScrollReveal>
          </div>

        </div>
      </div>
    </section>
  );
}
