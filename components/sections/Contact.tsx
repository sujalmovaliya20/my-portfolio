"use client";

import { motion } from "framer-motion";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";

/** ============================================
 *  CONTACT SECTION COMPONENT
 *  Centered, minimalist redesign with 
 *  staggered animations and accent-stroked title.
 *  ============================================ */
export default function Contact() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  return (
    <section
      id="contact"
      className="relative flex flex-col items-center justify-center text-center overflow-hidden border-t border-[var(--border)] bg-[var(--bg)] py-[120px] px-[40px]"
    >
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[rgba(var(--accent-rgb),0.05)] rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-[600px] mx-auto w-full">
        {/* Section Label */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-center gap-3 mb-5"
        >
          <span className="w-7 h-[1px] bg-[var(--accent)]" />
          <span className="text-[12px] text-[var(--accent)] uppercase tracking-[0.18em] font-medium">
            Get in touch
          </span>
          <span className="w-7 h-[1px] bg-[var(--accent)]" />
        </motion.div>

        {/* Main Title */}
        <motion.h2
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] as const }}
          className="font-syne font-extrabold text-[clamp(40px,6vw,72px)] leading-[1] tracking-[-2px] text-[var(--fg)] mb-[18px]"
        >
          Connect With{" "}
          <span
            className="text-transparent"
            style={{ WebkitTextStroke: "1.5px var(--accent)" }}
          >
            Me
          </span>
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] as const }}
          className="text-[15px] text-[var(--fg2)] leading-[1.7] max-w-[400px] mx-auto mb-[48px] font-dm-sans"
        >
          Have a project, an idea, or just want to say hello? I'd love to hear from you.
        </motion.p>

        {/* Icon Buttons Row */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex items-center justify-center gap-4"
        >
          {[
            {
              icon: <FaGithub size={24} />,
              href: "https://github.com/sujalmovaliya20",
              label: "GitHub"
            },
            {
              icon: <FaLinkedinIn size={24} />,
              href: "https://www.linkedin.com/in/sujal-movaliya-89b529374/",
              label: "LinkedIn"
            },
            {
              icon: <HiOutlineMail size={24} />,
              href: "/email",
              label: "Email"
            },
          ].map((social, idx) => (
            <motion.a
              key={idx}
              variants={itemVariants}
              href={social.href}
              target={social.href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              className="w-16 h-16 rounded-[18px] bg-[var(--bg2)] border border-[var(--border2)] flex items-center justify-center text-[var(--fg2)] transition-all duration-250 cubic-bezier(0.4, 0, 0.2, 1) hover:bg-[var(--bg3)] hover:border-[rgba(212,245,122,0.4)] hover:text-[var(--accent)] hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(212,245,122,0.08)]"
              aria-label={social.label}
            >
              {social.icon}
            </motion.a>
          ))}
        </motion.div>

        {/* Bottom Note with Pulsing Dot */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-8 flex items-center justify-center gap-2 text-[12px] text-[var(--fg3)] font-dm-sans"
        >
          Usually replies within 24 hours ·
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent)] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[var(--accent)]"></span>
          </span>
        </motion.div>
      </div>
    </section>
  );
}
