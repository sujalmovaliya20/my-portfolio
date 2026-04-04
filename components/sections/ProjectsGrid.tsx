"use client";

import { motion, Variants } from "framer-motion";
import Image from "next/image";
import { FiGithub, FiExternalLink } from "react-icons/fi";
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
  hidden: { opacity: 0, y: 30 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.25, 0.1, 0.25, 1] as const,
    },
  },
};

export default function ProjectsGrid() {
  return (
    <section id="projects" className="section-padding bg-bg relative">
      <div className="container px-6 max-w-[1200px] mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
          <div className="flex-1">
            <ScrollReveal direction="up">
              <h2 className="text-4xl md:text-6xl font-syne font-bold text-fg leading-tight">
                Selected <span className="text-gradient">Projects.</span>
              </h2>
            </ScrollReveal>
          </div>
          <ScrollReveal direction="up" delay={0.2}>
            <p className="text-fg2 font-dm-sans max-w-sm">
              A curated showcase of applications built with modern tools and
              focused user experiences.
            </p>
          </ScrollReveal>
        </div>

        {/* Projects Grid with Stagger */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-12"
        >
          {projects.map((project) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              className="group relative rounded-2xl border border-border bg-bg2 overflow-hidden hover:border-accent/30 transition-all duration-500 will-change-transform"
            >
              {/* Project Image Container */}
              <div className="aspect-[16/10] relative overflow-hidden bg-[var(--bg3)]">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  loading="lazy"
                  className="object-cover group-hover:scale-105 transition-transform duration-1000 ease-out grayscale group-hover:grayscale-0"
                />
                
                {/* Overlay Links */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-400 flex items-center justify-center gap-4 backdrop-blur-[4px]">
                  {project.githubUrl && (
                    <motion.a
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center hover:bg-[var(--accent)] transition-colors"
                      aria-label={`View GitHub repository for ${project.title}`}
                    >
                      <FiGithub size={20} />
                    </motion.a>
                  )}
                  {project.liveUrl && (
                    <motion.a
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center hover:bg-[var(--accent)] transition-colors"
                      aria-label={`View live demo for ${project.title}`}
                    >
                      <FiExternalLink size={20} />
                    </motion.a>
                  )}
                </div>
              </div>

              {/* Project Info */}
              <div className="p-8">
                <div className="flex flex-wrap gap-2.5 mb-5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] md:text-[11px] font-dm-sans uppercase tracking-[0.1em] px-3 py-1 bg-[var(--bg3)] text-[var(--fg2)] border border-[var(--border)] rounded-full group-hover:border-[var(--accent)]/30 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="text-2xl md:text-3xl font-syne font-bold text-fg mb-3 group-hover:text-[var(--accent)] transition-colors">
                  {project.title}
                </h3>
                <p className="text-fg2 font-dm-sans leading-relaxed line-clamp-2">
                  {project.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
