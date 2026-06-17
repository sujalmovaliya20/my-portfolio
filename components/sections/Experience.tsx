"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { experience } from "@/data/experience";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { 
  Sparkles, Brain, Code2, Database, Terminal, 
  Wrench, CheckCircle2, Play, RefreshCw, Layers, MapPin 
} from "lucide-react";

export default function Experience() {
  const exp = experience[0]; 

  // FitLook AI Virtual Trial Room Sandbox States
  const [selectedFabric, setSelectedFabric] = useState<string>("Indigo Denim");
  const [isInferenceRunning, setIsInferenceRunning] = useState<boolean>(false);
  const [inferenceProgress, setInferenceProgress] = useState<string>("idle"); // idle, processing, success
  const [visualizedFabric, setVisualizedFabric] = useState<string>("");

  const fabrics = [
    { name: "Indigo Denim", color: "bg-blue-600", hex: "#2563eb", desc: "Heavyweight 12oz indigo-dyed cotton" },
    { name: "Forest Linen", color: "bg-emerald-600", hex: "#059669", desc: "Breathable open-weave flax linen" },
    { name: "Classic Tweed", color: "bg-amber-700", hex: "#b45309", desc: "Traditional textured wool herringbone" },
    { name: "Royal Silk", color: "bg-yellow-500", hex: "#eab308", desc: "High-sheen mulberry filament silk" }
  ];

  const handleInference = () => {
    if (isInferenceRunning) return;
    setIsInferenceRunning(true);
    setInferenceProgress("fusing");

    // Cycle through mock pipeline steps
    setTimeout(() => {
      setInferenceProgress("diffusing");
    }, 1200);

    setTimeout(() => {
      setInferenceProgress("rendering");
    }, 2400);

    setTimeout(() => {
      setIsInferenceRunning(false);
      setInferenceProgress("success");
      setVisualizedFabric(selectedFabric);
    }, 3600);
  };

  const handleReset = () => {
    setIsInferenceRunning(false);
    setInferenceProgress("idle");
    setVisualizedFabric("");
  };

  const getCategoryIcon = (category: string) => {
    const iconClass = "w-4 h-4 text-white/50 group-hover:text-[var(--accent)] transition-colors duration-300";
    switch (category.toLowerCase()) {
      case "ai & ml":
        return <Brain className={iconClass} />;
      case "frontend":
        return <Code2 className={iconClass} />;
      case "backend":
        return <Database className={iconClass} />;
      case "languages":
        return <Terminal className={iconClass} />;
      case "tools":
        return <Wrench className={iconClass} />;
      default:
        return <Sparkles className={iconClass} />;
    }
  };

  const getCategorySubtitle = (category: string) => {
    switch (category.toLowerCase()) {
      case "ai & ml":
        return "Agents & Reasoning";
      case "frontend":
        return "Interfaces & 3D";
      case "backend":
        return "Services & API";
      case "languages":
        return "Syntax & Systems";
      case "tools":
        return "Workflow & Cloud";
      default:
        return "Technologies";
    }
  };

  const getCategoryBorderHoverClass = (category: string) => {
    return "hover:border-white/15 hover:bg-white/[0.02]";
  };

  const getSkillBadgeHoverClass = (category: string) => {
    return "hover:text-[var(--fg)] hover:border-white/25 hover:bg-white/[0.08]";
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
      className="relative bg-[var(--bg)] pt-12 pb-24 border-t border-[var(--border)] overflow-hidden"
    >
      {/* Background Lighting Detail */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(212,245,122,0.025)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(168,200,90,0.015)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        
        {/* Section Header */}
        <ScrollReveal direction="up" className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-7 h-[1.5px] bg-[var(--accent)]" />
            <span className="text-[11px] font-bold text-[var(--accent)] uppercase tracking-[0.15em]">
              Professional Experience
            </span>
          </div>
          <h2 className="text-[40px] md:text-[54px] font-extrabold font-syne text-[var(--fg)] leading-tight tracking-tight">
            Latest <span className="text-gradient">Internship.</span>
          </h2>
        </ScrollReveal>

        {/* Experience Core Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT PANEL: Internship Details & Bullets (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6 h-full">
            <ScrollReveal direction="left" className="h-full flex">
              <div className="w-full bg-[var(--bg2)]/40 backdrop-blur-md border border-[var(--border)] rounded-[24px] p-8 flex flex-col justify-between relative overflow-hidden hover:border-[rgba(var(--accent-rgb),0.15)] transition-colors duration-300">
                <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-[var(--accent)] to-transparent" />
                
                <div>
                  {/* Period badge & active marker */}
                  <div className="flex items-center justify-between mb-8">
                    <span className="px-4 py-1.5 bg-[var(--bg3)] border border-[var(--border)] rounded-full text-xs font-semibold text-[var(--accent)] tracking-[0.05em]">
                      {exp.period}
                    </span>
                    <div className="flex items-center gap-2 text-[12px] font-semibold text-[var(--fg2)] uppercase font-dm-sans tracking-wider">
                      <MapPin size={12} />
                      <span>Surat, India</span>
                    </div>
                  </div>

                  {/* Company/Role Title */}
                  <div className="mb-6">
                    <h3 className="text-[26px] md:text-[32px] font-extrabold font-syne text-[var(--fg)] leading-tight mb-2">
                      {exp.role}
                    </h3>
                    <div className="text-[15px] text-[var(--fg2)] font-semibold font-dm-sans flex items-center gap-2.5">
                      <span>{exp.company}</span>
                      <span className="text-[var(--border)]">•</span>
                      <span className="text-[var(--accent)] text-[11px] uppercase tracking-wider font-bold">{exp.type}</span>
                    </div>
                  </div>

                  {/* Project description & bullets */}
                  <p className="text-[13.5px] text-[var(--fg2)] leading-relaxed mb-6 font-dm-sans">
                    {exp.description}
                  </p>

                  <ul className="space-y-4 mb-6">
                    {exp.highlights.map((highlight, idx) => (
                      <motion.li
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1, duration: 0.5 }}
                        viewport={{ once: true }}
                        className="flex items-start gap-3 text-[13px] text-[var(--fg2)] leading-relaxed font-dm-sans"
                      >
                        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[var(--accent)] flex-shrink-0 shadow-[0_0_6px_var(--accent)]" />
                        <span>{highlight}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                <div className="border-t border-[var(--border)] pt-5 mt-4 flex items-center justify-between text-[11px] text-[var(--fg2)] uppercase tracking-wider font-dm-sans">
                  <span>ROLE: Lead Developer</span>
                  <span>ID: FITLOOK-AI-2026</span>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* RIGHT PANEL: Interactive FitLook Simulator Widget (7 cols) */}
          <div className="lg:col-span-7">
            <ScrollReveal direction="right" delay={0.1}>
              <div className="bg-[var(--bg2)]/40 backdrop-blur-md border border-[var(--border)] rounded-[24px] p-8 relative overflow-hidden hover:border-[rgba(var(--accent-rgb),0.15)] transition-colors duration-300">
                <div className="flex flex-col gap-2 mb-6">
                  <h4 className="text-[18px] font-bold font-syne text-[var(--fg)] flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-[var(--accent)]" />
                    FitLook AI Virtual Trial Room
                  </h4>
                  <p className="text-[12px] text-[var(--fg2)]">
                    Interactive prototype of the diffusion-powered garment visualization engine built during the internship.
                  </p>
                </div>

                {/* Simulated Device Sandbox */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center bg-[var(--bg3)]/40 border border-[var(--border)] rounded-[16px] p-6 relative">
                  
                  {/* Mannequin Display (Left inside Sandbox) */}
                  <div className="md:col-span-6 flex flex-col items-center justify-center min-h-[260px] relative border border-[var(--border)] bg-[var(--bg)]/50 rounded-xl p-4 overflow-hidden">
                    
                    {/* Glowing Grid Background inside Mannequin Display */}
                    <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                         style={{ backgroundImage: "linear-gradient(var(--fg) 1px, transparent 1px), linear-gradient(90deg, var(--fg) 1px, transparent 1px)", backgroundSize: "16px 16px" }} />
                    
                    {/* SVG Crewneck Shirt display */}
                    <svg viewBox="0 0 100 100" className="w-36 h-36 mx-auto relative z-10 transition-colors duration-500" fill="currentColor">
                      <path d="M50,12 C52,12 54,10 54,8 C54,5.5 52,4 50,4 C48,4 46,5.5 46,8 C46,10 48,12 50,12 Z M50,12 L50,16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none" className="text-gray-600" />
                      <path
                        d="M32,18 C40,22 60,22 68,18 L88,32 C89,33 89,35 87,36 L78,44 C77,45 75,44 75,42 L74,32 L74,86 C74,88 72,90 70,90 L30,90 C28,90 26,88 26,86 L26,32 L25,42 C25,44 23,45 22,44 L13,36 C11,35 11,33 12,32 Z"
                        className={`transition-all duration-700 ${
                          isInferenceRunning
                            ? "animate-pulse text-gray-800"
                            : visualizedFabric === "Indigo Denim"
                            ? "text-blue-600/75 drop-shadow-[0_0_15px_rgba(37,99,235,0.4)]"
                            : visualizedFabric === "Forest Linen"
                            ? "text-emerald-600/75 drop-shadow-[0_0_15px_rgba(5,150,105,0.4)]"
                            : visualizedFabric === "Classic Tweed"
                            ? "text-amber-700/75 drop-shadow-[0_0_15px_rgba(180,83,9,0.4)]"
                            : visualizedFabric === "Royal Silk"
                            ? "text-yellow-500/75 drop-shadow-[0_0_15px_rgba(234,179,8,0.4)]"
                            : "text-[var(--bg2)] stroke-[var(--border2)] stroke-2"
                        }`}
                      />
                    </svg>

                    {/* AI Scanline effect during inference */}
                    <AnimatePresence>
                       {isInferenceRunning && (
                        <motion.div
                          initial={{ top: "10%" }}
                          animate={{ top: "85%" }}
                          exit={{ opacity: 0 }}
                          transition={{ repeat: Infinity, repeatType: "reverse", duration: 1.2, ease: "easeInOut" }}
                          className="absolute left-4 right-4 h-[2px] bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent z-20 drop-shadow-[0_0_8px_var(--accent)]"
                        />
                      )}
                    </AnimatePresence>

                    {/* HUD Status label */}
                    <div className="mt-4 text-[12px] font-dm-sans text-[var(--fg2)] uppercase tracking-wider relative z-10 bg-[var(--bg3)]/80 border border-[var(--border)] px-3.5 py-1.5 rounded-lg">
                      {isInferenceRunning ? (
                        <span className="flex items-center gap-1.5 text-[var(--accent)] font-semibold">
                          <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-ping" />
                          {inferenceProgress === "fusing" && "Fusing user photo..."}
                          {inferenceProgress === "diffusing" && "Diffusion model denoising..."}
                          {inferenceProgress === "rendering" && "Fusing texture map..."}
                        </span>
                      ) : visualizedFabric ? (
                        <span className="text-[var(--accent)] font-bold flex items-center gap-1">
                          <CheckCircle2 size={10} />
                          Render Ready
                        </span>
                      ) : (
                        "Ready for Fabric Denoise"
                      )}
                    </div>
                  </div>

                  {/* Controls (Right inside Sandbox) */}
                  <div className="md:col-span-6 flex flex-col justify-between h-full gap-4">
                    <div>
                      <span className="text-[12px] font-semibold font-dm-sans text-[var(--fg2)] uppercase tracking-wider block mb-2">
                        1. Select Textile Fabric
                      </span>
                      
                      <div className="grid grid-cols-2 gap-2">
                        {fabrics.map((fabric) => (
                          <button
                            key={fabric.name}
                            onClick={() => setSelectedFabric(fabric.name)}
                            disabled={isInferenceRunning}
                            className={`flex items-center gap-2 p-2 border rounded-lg text-left transition-all duration-300 text-[11.5px] font-medium ${
                              selectedFabric === fabric.name
                                ? "border-[var(--accent)] bg-[rgba(var(--accent-rgb),0.04)] text-[var(--fg)]"
                                : "border-[var(--border)] hover:border-[var(--border2)] text-[var(--fg2)]"
                            }`}
                          >
                            <span className={`w-3.5 h-3.5 rounded-full ${fabric.color} flex-shrink-0`} />
                            <span className="truncate">{fabric.name}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <span className="text-[12px] font-semibold font-dm-sans text-[var(--fg2)] uppercase tracking-wider block mb-1">
                        Selected Textile Details
                      </span>
                      <p className="text-[11.5px] text-[var(--fg2)] italic mb-4 leading-relaxed font-dm-sans min-h-[34px]">
                        {fabrics.find(f => f.name === selectedFabric)?.desc}
                      </p>

                      <div className="flex gap-2">
                        <button
                          onClick={handleInference}
                          disabled={isInferenceRunning}
                          className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 bg-[var(--accent)] text-[#0a0a0a] rounded-lg text-xs font-semibold hover:bg-[var(--accent2)] disabled:bg-gray-800 disabled:text-gray-500 transition-colors duration-300 shadow-sm"
                        >
                          <Play size={12} fill="currentColor" />
                          {isInferenceRunning ? "Inference..." : "Run AI Visualizer"}
                        </button>
                        
                        <button
                          onClick={handleReset}
                          disabled={isInferenceRunning || !visualizedFabric}
                          className="p-2.5 border border-[var(--border)] text-[var(--fg2)] rounded-lg hover:bg-[var(--bg3)] hover:text-[var(--fg)] disabled:opacity-30 transition-all duration-300"
                          title="Reset"
                        >
                          <RefreshCw size={12} />
                        </button>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </ScrollReveal>
          </div>

        </div>

        {/* Unified Tech Stack Grid (5 Columns) */}
        <ScrollReveal direction="up" delay={0.2} className="mt-20">
          <div className="bg-white/[0.01] border border-white/[0.04] rounded-3xl p-8 md:p-10 relative overflow-hidden transition-all duration-500">
            {/* Header branding */}
            <div className="flex items-center justify-between mb-10 border-b border-white/[0.04] pb-6">
              <h4 className="text-[18px] font-bold font-syne text-[var(--fg)] flex items-center gap-3">
                <Layers className="w-4 h-4 text-[var(--accent)]" />
                Unified Technology Stack
              </h4>
              <span className="text-[11px] font-dm-sans text-[var(--fg2)] uppercase tracking-wider hidden md:block">
                30+ CORE TECHNOLOGIES & TOOLS
              </span>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
              {Object.entries(groupedSkills).map(([category, labels], idx) => (
                <div 
                  key={category} 
                  className={`bg-white/[0.015] border border-white/[0.04] rounded-2xl p-5 transition-all duration-300 flex flex-col justify-between group ${getCategoryBorderHoverClass(category)}`}
                >
                  <div>
                    {/* Category Header */}
                    <div className="mb-4 pb-3 border-b border-white/[0.04]">
                      <div className="flex items-center gap-2 font-dm-sans text-xs font-bold uppercase tracking-wider text-[var(--fg2)] mb-1">
                        {getCategoryIcon(category)}
                        <span className="text-[var(--fg)]">{category}</span>
                      </div>
                      <span className="text-[11px] text-[var(--fg2)] font-semibold uppercase tracking-wider block font-dm-sans">
                        {getCategorySubtitle(category)}
                      </span>
                    </div>
                    
                    {/* Category Skills */}
                    <div className="flex flex-wrap gap-2">
                      {labels.map((label, lIdx) => (
                        <span
                          key={lIdx}
                          className={`px-3 py-1.5 bg-white/[0.02] border border-white/[0.05] text-[11px] font-semibold rounded-md text-[var(--fg2)] font-dm-sans transition-all duration-300 inline-block ${getSkillBadgeHoverClass(category)}`}
                        >
                          {label}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}
