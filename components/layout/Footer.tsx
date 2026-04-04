"use client";

import { useCallback } from "react";
import { FiGithub, FiLinkedin, FiTwitter, FiDribbble, FiMail } from "react-icons/fi";

const SOCIAL_LINKS = [
  {
    label: "GitHub",
    href: "https://github.com/sujalmovaliya20",
    icon: FiGithub,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/sujal-movaliya-89b529374/",
    icon: FiLinkedin,
  },
  {
    label: "Email",
    href: "sujalmovaliya8@gmail.com",
    icon: FiMail,
  },

];

export default function Footer() {
  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <footer
      style={{
        background: "var(--bg2)",
        borderTop: "1px solid var(--border)",
        padding: "28px 40px",
      }}
    >
      <div
        className="flex flex-col md:flex-row items-center justify-between gap-5"
        style={{ maxWidth: 1200, margin: "0 auto" }}
      >
        {/* LEFT — Copyright */}
        <p
          className="order-3 md:order-1"
          style={{
            fontSize: 12,
            color: "var(--fg3)",
            fontFamily: "var(--font-dm-sans)",
          }}
        >
          © 2026 Sujal Movaliya · Made with Next.js &amp; ☕
        </p>

        {/* CENTER — Social links */}
        <div className="flex items-center gap-3 order-1 md:order-2">
          {SOCIAL_LINKS.map((social) => {
            const Icon = social.icon;
            return (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="group flex items-center justify-center"
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  background: "var(--bg3)",
                  border: "1px solid var(--border)",
                  color: "var(--fg3)",
                  transition: "var(--transition)",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget;
                  el.style.borderColor = "rgba(212, 245, 122, 0.4)";
                  el.style.color = "var(--accent)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget;
                  el.style.borderColor = "var(--border)";
                  el.style.color = "var(--fg3)";
                }}
              >
                <Icon size={16} />
              </a>
            );
          })}
        </div>

        {/* RIGHT — Back to top */}
        <button
          onClick={scrollToTop}
          className="order-2 md:order-3"
          style={{
            fontSize: 12,
            color: "var(--fg3)",
            fontFamily: "var(--font-dm-sans)",
            background: "none",
            border: "none",
            cursor: "pointer",
            transition: "color 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "var(--accent)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "var(--fg3)";
          }}
          aria-label="Back to top"
        >
          Back to top ↑
        </button>
      </div>
    </footer>
  );
}
