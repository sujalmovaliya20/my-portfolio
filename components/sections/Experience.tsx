"use client";

import React from "react";
import { motion } from "framer-motion";
import { experience } from "@/data/experience";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { Sparkles, Terminal, Activity, CheckCircle2, Server, Cpu, Database, GitBranch } from "lucide-react";

export default function Experience() {
  const exp = experience[0]; 

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case "core":
        return <Terminal className="w-5 h-5 text-[var(--accent)]" />;
      case "ml":
        return <Cpu className="w-5 h-5 text-cyan-400" />;
      case "llm":
        return <Sparkles className="w-5 h-5 text-purple-400" />;
      case "backend":
        return <Server className="w-5 h-5 text-blue-400" />;
      case "data":
        return <Database className="w-5 h-5 text-emerald-400" />;
      case "devops":
        return <GitBranch className="w-5 h-5 text-orange-400" />;
      default:
        return <Activity className="w-5 h-5 text-gray-400" />;
    }
  };

  const getCategoryColorClass = (category: string) => {
    switch (category.toLowerCase()) {
      case "core":
        return "border-[rgba(212,245,122,0.15)] bg-[rgba(212,245,122,0.03)] text-[var(--accent)] hover:border-[rgba(212,245,122,0.4)]";
      case "ml":
        return "border-[rgba(34,211,238,0.15)] bg-[rgba(34,211,238,0.03)] text-cyan-400 hover:border-[rgba(34,211,238,0.4)]";
      case "llm":
        return "border-[rgba(192,132,252,0.15)] bg-[rgba(192,132,252,0.03)] text-purple-400 hover:border-[rgba(192,132,252,0.4)]";
      case "backend":
        return "border-[rgba(96,165,250,0.15)] bg-[rgba(96,165,250,0.03)] text-blue-400 hover:border-[rgba(96,165,250,0.4)]";
      case "data":
        return "border-[rgba(52,211,153,0.15)] bg-[rgba(52,211,153,0.03)] text-emerald-400 hover:border-[rgba(52,211,153,0.4)]";
      case "devops":
        return "border-[rgba(249,115,22,0.15)] bg-[rgba(249,115,22,0.03)] text-orange-400 hover:border-[rgba(249,115,22,0.4)]";
      default:
        return "border-[var(--border)] bg-[var(--bg3)] text-[var(--fg2)] hover:border-[var(--border2)]";
    }
  };

  const getCategoryTextColorClass = (category: string) => {
    switch (category.toLowerCase()) {
      case "core":
        return "text-[var(--accent)]/90";
      case "ml":
        return "text-cyan-400/90";
      case "llm":
        return "text-purple-400/90";
      case "backend":
        return "text-blue-400/90";
      case "data":
        return "text-emerald-400/90";
      case "devops":
        return "text-orange-400/90";
      default:
        return "text-[var(--fg2)]";
    }
  };

  const groupedSkills = exp.skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill.label);
    return acc;
  }, {} as Record<string, string[]>);

  return (
    <section 
      id="experience" 
      className="relative bg-[var(--bg)] py-[140px] border-t border-[var(--border)] overflow-hidden"
    >
      {/* Visual background details */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(212,245,122,0.025)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(168,200,90,0.015)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        
        {/* Section Header */}
        <ScrollReveal direction="up" className="mb-20 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
            <div className="w-7 h-[1.5px] bg-[var(--accent)]" />
            <span className="text-[11px] font-bold text-[var(--accent)] uppercase tracking-[0.15em]">
              Professional Path
            </span>
          </div>
          <h2 className="text-[40px] md:text-[60px] font-extrabold font-syne text-[var(--fg)] leading-tight tracking-tight">
            Latest <span className="text-gradient">Experience.</span>
          </h2>
        </ScrollReveal>

        {/* Experience Presentation Deck */}
        <div className="relative">
          {/* Subtle grid backdrop decoration */}
          <div className="absolute inset-0 border border-[rgba(212,245,122,0.04)] rounded-[32px] pointer-events-none [mask-image:linear-gradient(to_bottom,white_30%,transparent)]" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch relative z-10">
            
            {/* LEFT COLUMN: Role Information (5 cols) */}
            <ScrollReveal direction="left" className="lg:col-span-5 flex">
              <div className="w-full bg-[var(--bg2)]/40 backdrop-blur-md border border-[var(--border)] rounded-[28px] p-8 md:p-10 flex flex-col justify-between relative overflow-hidden group hover:border-[var(--accent)]/30 hover:shadow-[0_20px_50px_rgba(0,0,0,0.3),0_0_40px_rgba(212,245,122,0.02)] transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]">
                {/* Neon vertical stripe decoration */}
                <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-gradient-to-b from-[var(--accent)] via-[rgba(212,245,122,0.3)] to-transparent" />
                
                <div>
                  {/* Period & Active Indicator */}
                  <div className="flex items-center justify-between mb-10">
                    <span className="px-5 py-2.5 bg-[var(--bg3)]/80 border border-[var(--border)] rounded-full text-[14px] font-semibold text-[var(--accent)] tracking-[0.05em]">
                      {exp.period}
                    </span>
                    
                    {exp.current && (
                      <div className="flex items-center gap-2.5">
                        <span className="relative flex h-3 w-3">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent)] opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-3 w-3 bg-[var(--accent)]"></span>
                        </span>
                        <span className="text-[13px] font-bold text-[var(--accent)] uppercase tracking-[0.1em]">
                          Active Role
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Company & Role */}
                  <div className="mb-8">
                    <h3 className="text-[34px] md:text-[42px] font-extrabold font-syne text-[var(--fg)] leading-[1.1] tracking-tight mb-3.5">
                      {exp.role}
                    </h3>
                    <div className="text-[18px] text-[var(--fg2)] font-semibold font-dm-sans flex items-center gap-3">
                      <span>{exp.company}</span>
                      <span className="text-[var(--border)]">•</span>
                      <span className="text-[var(--accent)] text-[14px] uppercase tracking-wider font-bold">{exp.type}</span>
                    </div>
                  </div>

                  {/* Deep Description */}
                  <p className="text-[16px] md:text-[17px] text-[var(--fg3)] font-dm-sans leading-[1.8] mb-8">
                    {exp.description}
                  </p>
                </div>

                {/* Decorative Tech HUD Footer */}
                <div className="border-t border-[var(--border)] pt-6 mt-6 flex items-center justify-between text-[12px] text-[var(--fg3)] uppercase tracking-widest font-mono">
                  <span>Loc: Onsite</span>
                  <span>ID: CODLENS-2026-AI</span>
                </div>
              </div>
            </ScrollReveal>

            {/* RIGHT COLUMN: Impact & Tech Stack (7 cols) */}
            <ScrollReveal direction="right" className="lg:col-span-7 flex flex-col gap-8">
              
              {/* Box 1: Key Impact Highlights */}
              <div className="bg-[var(--bg2)]/40 backdrop-blur-md border border-[var(--border)] rounded-[28px] p-8 md:p-10 relative overflow-hidden flex-1 hover:border-[var(--accent)]/30 hover:shadow-[0_20px_50px_rgba(0,0,0,0.3),0_0_40px_rgba(212,245,122,0.02)] transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]">
                <h4 className="text-[22px] md:text-[24px] font-bold font-syne text-[var(--fg)] mb-6 flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6 text-[var(--accent)]" />
                  Key Impact & Contributions
                </h4>
                
                <ul className="space-y-5">
                  {exp.highlights.map((highlight, idx) => (
                    <motion.li 
                      key={idx}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1, duration: 0.6, ease: "easeOut" }}
                      viewport={{ once: true }}
                      className="flex items-start gap-4 text-[16px] md:text-[17px] text-[var(--fg2)] font-dm-sans leading-[1.7]"
                    >
                      <span className="mt-2.5 w-2 h-2 rounded-full bg-[var(--accent)] flex-shrink-0 shadow-[0_0_8px_var(--accent)]" />
                      <span>{highlight}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Box 2: Categorized AI / ML Engine Stack */}
              <div className="bg-[var(--bg2)]/40 backdrop-blur-md border border-[var(--border)] rounded-[28px] p-8 md:p-10 relative overflow-hidden hover:border-[var(--accent)]/30 hover:shadow-[0_20px_50px_rgba(0,0,0,0.3),0_0_40px_rgba(212,245,122,0.02)] transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]">
                <h4 className="text-[22px] md:text-[24px] font-bold font-syne text-[var(--fg)] mb-6 flex items-center gap-3">
                  <Cpu className="w-6 h-6 text-[var(--accent)]" />
                  AI & Engineering Stack
                </h4>
                
                <div className="space-y-6">
                  {Object.entries(groupedSkills).map(([category, labels], catIdx) => (
                    <div key={category} className="flex flex-col md:flex-row md:items-center gap-4">
                      {/* Category Title / Pill */}
                      <div className={`md:w-[160px] flex-shrink-0 flex items-center gap-3 font-mono text-[14px] font-extrabold uppercase tracking-[0.1em] ${getCategoryTextColorClass(category)}`}>
                        {getCategoryIcon(category)}
                        <span>{category}</span>
                      </div>
                      
                      {/* Badges */}
                      <div className="flex flex-wrap gap-2.5">
                        {labels.map((label, labelIdx) => (
                          <span 
                            key={labelIdx}
                            className={`px-4 py-2 border rounded-full text-[14px] font-medium tracking-[0.02em] transition-all duration-300 hover:-translate-y-1 ${getCategoryColorClass(category)}`}
                          >
                            {label}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </ScrollReveal>

          </div>
        </div>

      </div>
    </section>
  );
}
