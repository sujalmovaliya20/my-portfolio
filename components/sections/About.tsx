"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Brain, Code2, Database, Terminal, Briefcase, Trophy, GraduationCap, ShieldAlert, Sparkles } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function About() {
  const [activeTab, setActiveTab] = useState<"expertise" | "milestones">("expertise");

  const personalityTags = [
    "AI Engineer", "Agentic Systems", "3D Graphics",
    "Hackathon Finalist", "Clean Code Advocate", "UAV & Embedded Systems"
  ];

  const skillCategories = [
    {
      title: "AI & Agentic Systems",
      icon: <Brain className="w-5 h-5 text-[var(--accent)]" />,
      description: "Developing intelligent agents, RAG pipelines, and reasoning graphs.",
      skills: ["RAG", "LangChain", "LangGraph", "VectorDB", "Mem0", "MCP", "Gen AI", "Agentic AI"]
    },
    {
      title: "Frontend & 3D Web",
      icon: <Code2 className="w-5 h-5 text-[var(--accent)]" />,
      description: "Crafting immersive, high-performance, and motion-heavy user interfaces.",
      skills: ["React.js", "Next.js", "Three.js", "HTML", "Tailwind CSS", "GSAP"]
    },
    {
      title: "Backend & Databases",
      icon: <Database className="w-5 h-5 text-[var(--accent)]" />,
      description: "Designing scalable servers and robust, optimized databases.",
      skills: ["Node.js", "Express.js", "MongoDB", "PostgreSQL", "WebSockets"]
    },
    {
      title: "Languages & Tools",
      icon: <Terminal className="w-5 h-5 text-[var(--accent)]" />,
      description: "Writing clean, compiled code and managing containerized devops pipelines.",
      skills: ["Python", "TypeScript", "JavaScript", "C/C++", "Java", "Docker", "Git", "Supabase"]
    }
  ];

  const milestones = [
    {
      type: "work",
      title: "Artificial Intelligence Intern",
      organization: "Codlens Innovations",
      date: "05/2026 — 06/2026",
      location: "Surat, India",
      role: "FitLook — AI Virtual Trial Room (Lead Developer)",
      description: "Architected an end-to-end AI virtual trial room for tailors/fabrics. Integrated multi-image diffusion models, photo pipeline, and GSAP-driven scroll 3D effects.",
      badge: "Internship"
    },
    {
      type: "hackathon",
      title: "Codeversity National Hackathon",
      organization: "IIT Gandhinagar",
      date: "2026",
      location: "Gandhinagar, India",
      role: "Smart Kisan App (Team Coffee&&Commit)",
      description: "Ranked Top 5 Finalist. Built an AI decision-support web platform providing farmers real-time risk assessment, crop analysis, and LLM chat interfaces.",
      badge: "Top 5"
    },
    {
      type: "education",
      title: "B.Tech in Computer Engineering",
      organization: "Uka Tarsadia University",
      date: "2023 — Present",
      location: "Bardoli, India",
      role: "CGPA: 8.83/10",
      description: "Studying core computer science curriculum, focusing on artificial intelligence, database architecture, and full-stack software systems.",
      badge: "Academic"
    },
    {
      type: "training",
      title: "UAV Mechanics & Autonomous Navigation",
      organization: "SVNIT, Surat",
      date: "2024",
      location: "Surat, India",
      role: "Hands-on Drone Tech Training",
      description: "Mastered UAV flight controller calibration, embedded systems mechanics, and autonomous path navigation algorithms.",
      badge: "Specialization"
    }
  ];

  return (
    <section
      id="about"
      className="relative bg-[var(--bg)] py-[100px] overflow-hidden"
    >
      {/* Background Accent Gradients */}
      <div className="absolute top-[20%] right-[-10%] w-[400px] h-[400px] rounded-full bg-[rgba(var(--accent-rgb),0.02)] blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-[10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-[rgba(var(--accent-rgb),0.01)] blur-[150px] pointer-events-none -z-10" />

      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-16 lg:gap-20 items-start">
          
          {/* 1. Left Column: Introduction & Copy */}
          <div className="flex flex-col">
            <ScrollReveal direction="left">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-7 h-[1.5px] bg-[var(--accent)]" />
                <span className="text-[11px] font-bold text-[var(--accent)] uppercase tracking-[0.15em]">
                  About me
                </span>
              </div>
              <h2 className="text-[clamp(28px,3.5vw,46px)] font-extrabold font-syne text-[var(--fg)] leading-[1.1] tracking-[-1px] mb-6">
                Engineering intelligent products that connect AI with human interaction.
              </h2>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.2}>
              <div className="space-y-6 mb-8 text-[15px] text-[var(--fg2)] leading-[1.8] font-dm-sans">
                <p>
                  I'm a B.Tech Computer Engineering student and AI Engineer focused on building intelligent web systems that connect complex AI logic with premium user experiences. I specialize in developing autonomous agents, RAG systems, and interactive 3D interfaces.
                </p>
                <p>
                  From architecting an AI-powered virtual try-on product during my internship at Codlens Innovations to building crop risk assessment platforms for national hackathons, I love translating advanced algorithms into fast, responsive, and intuitive products.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.3}>
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
                <span className="relative font-syne uppercase tracking-wider text-xs font-semibold">
                  Download Resume PDF
                  <span className="absolute left-0 bottom-0 w-0 h-[1.5px] bg-[var(--accent)] transition-all duration-300 group-hover:w-full" />
                </span>
              </a>
            </ScrollReveal>
          </div>

          {/* 2. Right Column: Stateful Dashboard */}
          <div className="w-full">
            <ScrollReveal direction="right" delay={0.1}>
              {/* Tab Selector Headers */}
              <div className="flex gap-8 mb-8 border-b border-[var(--border)] pb-3 relative">
                <button
                  onClick={() => setActiveTab("expertise")}
                  className={`relative pb-3 text-[13px] font-bold font-syne uppercase tracking-wider transition-colors duration-300 ${
                    activeTab === "expertise" ? "text-[var(--fg)]" : "text-[var(--fg3)] hover:text-[var(--fg2)]"
                  }`}
                >
                  Expertise
                  {activeTab === "expertise" && (
                    <motion.div
                      layoutId="activeTabIndicator"
                      className="absolute bottom-[-1.5px] left-0 right-0 h-[2px] bg-[var(--accent)]"
                      transition={{ type: "spring", stiffness: 350, damping: 25 }}
                    />
                  )}
                </button>
                
                <button
                  onClick={() => setActiveTab("milestones")}
                  className={`relative pb-3 text-[13px] font-bold font-syne uppercase tracking-wider transition-colors duration-300 ${
                    activeTab === "milestones" ? "text-[var(--fg)]" : "text-[var(--fg3)] hover:text-[var(--fg2)]"
                  }`}
                >
                  Milestones
                  {activeTab === "milestones" && (
                    <motion.div
                      layoutId="activeTabIndicator"
                      className="absolute bottom-[-1.5px] left-0 right-0 h-[2px] bg-[var(--accent)]"
                      transition={{ type: "spring", stiffness: 350, damping: 25 }}
                    />
                  )}
                </button>
              </div>

              {/* Tab Contents */}
              <div className="min-h-[420px]">
                <AnimatePresence mode="wait">
                  {activeTab === "expertise" ? (
                    <motion.div
                      key="expertise"
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      transition={{ duration: 0.35, ease: "easeInOut" }}
                      className="grid grid-cols-1 md:grid-cols-2 gap-5"
                    >
                      {skillCategories.map((cat, idx) => (
                        <div
                          key={idx}
                          className="relative bg-[var(--bg2)] border border-[var(--border)] rounded-[16px] p-6 
                                     hover:border-[rgba(var(--accent-rgb),0.2)] transition-all duration-300 
                                     hover:shadow-[0_10px_30px_rgba(0,0,0,0.15)] group hover:-translate-y-1"
                        >
                          <div className="flex items-center gap-3 mb-3">
                            <div className="p-2 bg-[var(--bg3)] rounded-lg group-hover:bg-[rgba(var(--accent-rgb),0.1)] transition-colors duration-300">
                              {cat.icon}
                            </div>
                            <h3 className="text-[15px] font-bold font-syne text-[var(--fg)]">
                              {cat.title}
                            </h3>
                          </div>
                          <p className="text-[12px] text-[var(--fg2)] leading-relaxed mb-4">
                            {cat.description}
                          </p>
                          <div className="flex flex-wrap gap-1.5">
                            {cat.skills.map((skill, sIdx) => (
                              <span
                                key={sIdx}
                                className="px-2.5 py-1 bg-white/[0.02] border border-white/[0.05] text-[11px] font-semibold rounded-md text-[var(--fg2)] font-dm-sans transition-all duration-300 hover:text-[var(--fg)] hover:border-white/25 hover:bg-white/[0.08]"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </motion.div>
                  ) : (
                    <motion.div
                      key="milestones"
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      transition={{ duration: 0.35, ease: "easeInOut" }}
                      className="relative border-l border-[var(--border2)] ml-4 pl-8 space-y-8"
                    >
                      {milestones.map((milestone, idx) => (
                        <div key={idx} className="relative group">
                          {/* Timeline Dot Indicator */}
                          <div className="absolute left-[-41px] top-1.5 w-[18px] h-[18px] rounded-full bg-[var(--bg)] border-2 border-[var(--border2)] group-hover:border-[var(--accent)] transition-colors duration-300 flex items-center justify-center">
                            <div className="w-[6px] h-[6px] rounded-full bg-[var(--border2)] group-hover:bg-[var(--accent)] transition-colors duration-300" />
                          </div>

                          {/* Content Card */}
                          <div className="bg-[var(--bg2)] border border-[var(--border)] rounded-[16px] p-6 hover:border-[rgba(var(--accent-rgb),0.15)] transition-all duration-300 hover:shadow-[0_8px_25px_rgba(0,0,0,0.1)]">
                            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                              <span className="text-[11px] font-semibold font-dm-sans text-[var(--accent)] uppercase tracking-wider bg-[rgba(var(--accent-rgb),0.06)] px-2.5 py-1 rounded border border-[rgba(var(--accent-rgb),0.15)]">
                                {milestone.badge}
                              </span>
                              <span className="text-[11px] text-[var(--fg3)] font-medium">
                                {milestone.date}
                              </span>
                            </div>

                            <h3 className="text-[15px] font-bold font-syne text-[var(--fg)] mb-0.5">
                              {milestone.title}
                            </h3>

                            <div className="text-[12px] text-[var(--fg2)] font-medium mb-3 flex items-center gap-1.5">
                              <span className="text-[var(--fg)]">{milestone.organization}</span>
                              <span className="text-[var(--fg3)]">•</span>
                              <span className="italic">{milestone.role}</span>
                            </div>

                            <p className="text-[12px] text-[var(--fg2)] leading-relaxed">
                              {milestone.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </ScrollReveal>
          </div>

        </div>
      </div>
    </section>
  );
}
