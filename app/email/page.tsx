"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";

/** ============================================
 *  EMAIL DISPLAY PAGE
 *  Minimalist page showing the contact email
 *  with a return link to the portfolio.
 *  ============================================ */
export default function EmailPage() {
  return (
    <main className="min-h-screen bg-[var(--bg)] flex flex-col items-center justify-center p-6 text-center">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[rgba(var(--accent-rgb),0.03)] rounded-full blur-[100px] pointer-events-none -z-10" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-xl w-full"
      >
        <span className="text-[12px] text-[var(--accent)] uppercase tracking-[0.2em] font-medium mb-6 block">
          Contact Me
        </span>
        
        <h1 className="text-3xl md:text-5xl font-syne font-bold text-[var(--fg)] mb-12 tracking-tight">
          sujalmovaliya8@gmail.com
        </h1>

        <Link 
          href="/"
          className="inline-flex items-center gap-2 text-[14px] text-[var(--fg2)] hover:text-[var(--accent)] transition-colors duration-300 group font-dm-sans"
        >
          <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
          Back to Portfolio
        </Link>
      </motion.div>
    </main>
  );
}
