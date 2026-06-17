"use client";

import { motion, Variants } from "framer-motion";
import Image from "next/image";
import { FiGithub, FiExternalLink } from "react-icons/fi";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/data/projects";
import ScrollReveal from "@/components/ui/ScrollReveal";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1], // Custom premium ease-out
    },
  },
};

export default function ProjectsGrid() {
  return (
    <section id="projects" className="pt-24 pb-12 bg-bg relative overflow-hidden">
      
      {/* Premium ambient background glows */}
      <div className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] bg-gradient-to-tr from-[rgba(212,245,122,0.04)] to-transparent rounded-full filter blur-[100px] pointer-events-none -z-10" />
      <div className="absolute bottom-[20%] right-[-10%] w-[500px] h-[500px] bg-gradient-to-bl from-[rgba(212,245,122,0.03)] to-transparent rounded-full filter blur-[120px] pointer-events-none -z-10" />

      <div className="container px-6 max-w-[1200px] mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-6">
          <div className="flex-1">
            <ScrollReveal direction="up">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-7 h-[1.5px] bg-[var(--accent)]" />
                <span className="text-[11px] font-bold text-[var(--accent)] uppercase tracking-[0.15em]">
                  My Work
                </span>
              </div>
              <h2 className="text-4xl md:text-6xl font-syne font-bold text-fg leading-tight">
                Selected <span className="text-gradient">Projects.</span>
              </h2>
            </ScrollReveal>
          </div>
          <ScrollReveal direction="up" delay={0.2}>
            <p className="text-fg2 font-dm-sans max-w-sm text-sm md:text-base leading-relaxed">
              A curated showcase of applications built with modern tools, focused user experience, and artificial intelligence.
            </p>
          </ScrollReveal>
        </div>

        {/* Projects Grid with Stagger */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.05 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-12"
        >
          {projects.map((project, index) => {
            const isFeatured = index === 0;
            return (
              <motion.div
                key={project.id}
                variants={itemVariants}
                className={`group relative rounded-2xl border border-white/[0.04] bg-white/[0.01] overflow-hidden hover:border-white/10 hover:bg-white/[0.015] hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)] hover:-translate-y-1.5 transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] will-change-transform ${
                  isFeatured ? "md:col-span-2 flex flex-col md:flex-row md:items-stretch" : "flex flex-col"
                }`}
              >
                {/* Project Image Container */}
                <div className={`relative overflow-hidden bg-white/[0.01] ${
                  isFeatured
                    ? "aspect-[16/10] md:aspect-auto md:w-[58%] border-b md:border-b-0 md:border-r border-white/[0.04] min-h-[240px] md:min-h-[380px]"
                    : "aspect-[16/10] border-b border-white/[0.04]"
                }`}>
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes={isFeatured ? "(max-width: 768px) 100vw, 700px" : "(max-width: 768px) 100vw, 584px"}
                    loading="lazy"
                    className="object-cover scale-100 group-hover:scale-[1.02] transition-transform duration-[1000ms] ease-[cubic-bezier(0.25,1,0.5,1)] opacity-95 group-hover:opacity-100 transition-all"
                  />
                  
                  {/* Overlay Links */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-400 flex items-center justify-center gap-4 backdrop-blur-[4px]">
                    {project.githubUrl && (
                      <motion.a
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 rounded-full bg-white/10 text-white border border-white/20 backdrop-blur-md flex items-center justify-center hover:bg-[var(--accent)] hover:text-[#0a0a0a] hover:border-[var(--accent)] transition-all duration-300 shadow-xl"
                        aria-label={`View GitHub repository for ${project.title}`}
                      >
                        <FiGithub size={20} />
                      </motion.a>
                    )}
                    {project.liveUrl && (
                      <motion.a
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 rounded-full bg-white/10 text-white border border-white/20 backdrop-blur-md flex items-center justify-center hover:bg-[var(--accent)] hover:text-[#0a0a0a] hover:border-[var(--accent)] transition-all duration-300 shadow-xl"
                        aria-label={`View live demo for ${project.title}`}
                      >
                        <FiExternalLink size={20} />
                      </motion.a>
                    )}
                  </div>
                </div>

                {/* Project Info */}
                <div className={`p-8 md:p-10 flex flex-col justify-between ${
                  isFeatured ? "md:w-[42%]" : "flex-1"
                }`}>
                  <div>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 bg-white/[0.02] border border-white/[0.05] text-[11px] font-semibold rounded-md text-[var(--fg2)] font-dm-sans transition-all duration-300 group-hover:text-white group-hover:border-white/20 group-hover:bg-white/[0.06]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <h3 className="text-2xl md:text-3xl font-syne font-bold text-fg mb-4 group-hover:text-[var(--accent)] transition-colors flex items-center justify-between">
                      {project.title}
                      <ArrowUpRight className="w-5 h-5 text-[var(--fg3)] group-hover:text-[var(--accent)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 ease-out" />
                    </h3>
                    
                    <p className="text-fg2 font-dm-sans text-[14px] md:text-[15px] leading-relaxed line-clamp-4 group-hover:text-fg transition-colors duration-300">
                      {project.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}
