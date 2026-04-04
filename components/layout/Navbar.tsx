"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Moon, Sun, Menu, X } from "lucide-react";
import { useTheme } from "next-themes";
import MagneticButton from "@/components/ui/MagneticButton";
import ThemeToggle from "@/components/ui/ThemeToggle";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

/* ============================================
   ANIMATION VARIANTS
   ============================================ */

const navItemVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.05 * i,
      duration: 0.4,
      ease: [0.4, 0, 0.2, 1] as const,
    },
  }),
};

const drawerVariants = {
  closed: {
    x: "100%",
    transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] as const },
  },
  open: {
    x: 0,
    transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] as const },
  },
};

const drawerItemVariants = {
  closed: { opacity: 0, x: 30 },
  open: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: 0.08 * i + 0.15,
      duration: 0.35,
      ease: [0.4, 0, 0.2, 1] as const,
    },
  }),
};

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { theme } = useTheme();


  /* ---- Scroll detection ---- */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ---- IntersectionObserver for active link ---- */
  useEffect(() => {
    const ids = NAV_LINKS.map((l) => l.href.slice(1));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  /* ---- Lock body scroll when drawer is open ---- */
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleNavClick = useCallback((href: string) => {
    setDrawerOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <>
      {/* ============ NAVBAR ============ */}
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between"
        style={{
          height: 68,
          padding: "0 40px",
          borderBottom: "1px solid var(--border)",
          background: scrolled
            ? "var(--bg)"
            : "transparent",
          backdropFilter: scrolled ? "blur(20px) saturate(180%)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(20px) saturate(180%)" : "none",
          boxShadow: scrolled ? "0 1px 20px rgba(0, 0, 0, 0.1)" : "none",
          transition: "background 0.3s ease, box-shadow 0.3s ease, backdrop-filter 0.3s ease",
        }}
      >
        {/* LEFT — Logo */}
        <motion.button
          custom={0}
          variants={navItemVariants}
          initial="hidden"
          animate="visible"
          onClick={scrollToTop}
          className="flex items-center gap-0 select-none"
          style={{
            fontFamily: "var(--font-syne)",
            fontWeight: 800,
            fontSize: 20,
            color: "var(--fg)",
            background: "none",
            border: "none",
          }}
          aria-label="Scroll to top"
        >
          SJ<span style={{ color: "var(--accent)" }}>.</span>
        </motion.button>

        {/* CENTER — Desktop links */}
        <ul className="hidden md:flex items-center gap-8 list-none m-0 p-0">
          {NAV_LINKS.map((link, i) => {
            const isActive = activeSection === link.href.slice(1);
            return (
              <motion.li
                key={link.href}
                custom={i + 1}
                variants={navItemVariants}
                initial="hidden"
                animate="visible"
              >
                <button
                  onClick={() => handleNavClick(link.href)}
                  className="group relative bg-transparent border-none py-2"
                  style={{
                    fontFamily: "var(--font-dm-sans)",
                    fontSize: 13,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    color: isActive ? "var(--accent)" : "var(--fg2)",
                    transition: "color 0.3s ease",
                    cursor: "pointer",
                  }}
                  aria-label={`Navigate to ${link.label}`}
                >
                  {link.label}
                  {/* Underline */}
                  <span
                    className={`absolute bottom-0 left-0 h-[1.5px] bg-[var(--accent)] transition-all duration-300 ease-out 
                    ${isActive ? "w-full" : "w-0 group-hover:w-full"}`}
                  />
                </button>
              </motion.li>
            );
          })}
        </ul>

        {/* RIGHT — Theme toggle + CTA + Hamburger */}
        <div className="flex items-center gap-3">
          {/* Theme toggle */}
          <motion.div
            custom={NAV_LINKS.length + 1}
            variants={navItemVariants}
            initial="hidden"
            animate="visible"
          >
            <ThemeToggle />
          </motion.div>

          {/* CTA — Desktop only */}
          <div className="hidden md:block">
            <MagneticButton>
              <motion.button
                custom={NAV_LINKS.length + 2}
                variants={navItemVariants}
                initial="hidden"
                animate="visible"
                onClick={() => handleNavClick("#contact")}
                className="flex items-center"
                style={{
                  padding: "10px 22px",
                  borderRadius: 100,
                  background: "var(--accent)",
                  color: "#0a0a0a",
                  fontFamily: "var(--font-dm-sans)",
                  fontSize: 13,
                  fontWeight: 600,
                  border: "none",
                  cursor: "pointer",
                  transition: "background 0.3s ease",
                }}
                whileHover={{ backgroundColor: "var(--accent2)" }}
                aria-label="Start a conversation"
              >
                Let&apos;s talk&nbsp;→
              </motion.button>
            </MagneticButton>
          </div>

          {/* Hamburger — Mobile only */}
          <button
            className="flex md:hidden items-center justify-center"
            onClick={() => setDrawerOpen(!drawerOpen)}
            style={{
              width: 36,
              height: 36,
              borderRadius: "50%",
              background: "var(--bg3)",
              border: "1px solid var(--border)",
              color: "var(--fg2)",
              cursor: "pointer",
              transition: "var(--transition)",
            }}
            aria-label={drawerOpen ? "Close menu" : "Open menu"}
          >
            {drawerOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </motion.nav>

      {/* ============ MOBILE DRAWER ============ */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDrawerOpen(false)}
              className="fixed inset-0 z-[99]"
              style={{ background: "rgba(0, 0, 0, 0.5)" }}
            />

            {/* Drawer panel */}
            <motion.div
              variants={drawerVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="fixed top-0 right-0 bottom-0 z-[101] flex flex-col"
              style={{
                width: "min(320px, 85vw)",
                background: "rgba(10, 10, 10, 0.95)",
                backdropFilter: "blur(30px)",
                WebkitBackdropFilter: "blur(30px)",
                borderLeft: "1px solid var(--border)",
              }}
            >
              {/* Close button */}
              <div
                className="flex justify-end"
                style={{ padding: "16px 20px" }}
              >
                <button
                  onClick={() => setDrawerOpen(false)}
                  className="flex items-center justify-center"
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    background: "var(--bg3)",
                    border: "1px solid var(--border)",
                    color: "var(--fg2)",
                    cursor: "pointer",
                  }}
                  aria-label="Close menu"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Drawer links */}
              <nav
                className="flex flex-col flex-1"
                style={{ padding: "20px 32px", gap: 8 }}
              >
                {NAV_LINKS.map((link, i) => {
                  const isActive = activeSection === link.href.slice(1);
                  return (
                    <motion.button
                      key={link.href}
                      custom={i}
                      variants={drawerItemVariants}
                      initial="closed"
                      animate="open"
                      exit="closed"
                      onClick={() => handleNavClick(link.href)}
                      className="text-left bg-transparent border-none"
                      style={{
                        fontFamily: "var(--font-syne)",
                        fontSize: 24,
                        fontWeight: 700,
                        padding: "14px 0",
                        color: isActive ? "var(--accent)" : "var(--fg)",
                        borderBottom: "1px solid var(--border)",
                        cursor: "pointer",
                        transition: "color 0.3s ease",
                      }}
                    >
                      {link.label}
                    </motion.button>
                  );
                })}

                {/* Mobile CTA */}
                <motion.button
                  custom={NAV_LINKS.length}
                  variants={drawerItemVariants}
                  initial="closed"
                  animate="open"
                  exit="closed"
                  onClick={() => handleNavClick("#contact")}
                  className="mt-6"
                  style={{
                    padding: "14px 28px",
                    borderRadius: 100,
                    background: "var(--accent)",
                    color: "#0a0a0a",
                    fontFamily: "var(--font-dm-sans)",
                    fontSize: 15,
                    fontWeight: 600,
                    border: "none",
                    cursor: "pointer",
                    textAlign: "center",
                  }}
                >
                  Let&apos;s talk →
                </motion.button>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
