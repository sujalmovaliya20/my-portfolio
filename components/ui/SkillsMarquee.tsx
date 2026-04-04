import React from "react";

/** ============================================
 *  SKILLS MARQUEE COMPONENT
 *  ============================================ */
export default function SkillsMarquee() {
  const skills = [
    "React.js", "Next.js", "TypeScript", "Node.js", "Express.js", 
    "MongoDB", "PostgreSQL", "GraphQL", "Redis", "Docker", "AWS", 
    "TailwindCSS", "Framer Motion", "Prisma", "Socket.io", 
    "REST APIs", "Git", "Figma", "Vercel", "GitHub Actions"
  ];

  return (
    <div className="relative w-full bg-[var(--bg2)] border-y border-[var(--border)] py-[26px] overflow-hidden group">
      {/* 
       * ============================================
       * FADE GRADIENTS (Edge Shadows)
       * ============================================ 
       */}
      <div className="absolute top-0 left-0 h-full w-[80px] bg-gradient-to-r from-[var(--bg2)] to-transparent z-[1] pointer-events-none" />
      <div className="absolute top-0 right-0 h-full w-[80px] bg-gradient-to-l from-[var(--bg2)] to-transparent z-[1] pointer-events-none" />

      {/* 
       * ============================================
       * MARQUEE TRACK (Infinite Loop)
       * ============================================ 
       */}
      <div className="flex w-fit whitespace-nowrap animate-[marquee_30s_linear_infinite] group-hover:[animation-play-state:paused]">
        {/* Set 1 */}
        <div className="flex items-center">
          {skills.map((skill, index) => (
            <div 
              key={`skill-1-${index}`}
              className="flex items-center gap-[10px] px-7 transition-colors duration-300 hover:text-[var(--fg)] text-[var(--fg3)]"
            >
              <div className="w-1 h-1 bg-[var(--accent)] rounded-full flex-shrink-0" />
              <span className="text-[13px] font-medium uppercase tracking-[0.07em] whitespace-nowrap">
                {skill}
              </span>
            </div>
          ))}
        </div>

        {/* Set 2 (Duplicate for seamless loop) */}
        <div className="flex items-center">
          {skills.map((skill, index) => (
            <div 
              key={`skill-2-${index}`}
              className="flex items-center gap-[10px] px-7 transition-colors duration-300 hover:text-[var(--fg)] text-[var(--fg3)]"
            >
              <div className="w-1 h-1 bg-[var(--accent)] rounded-full flex-shrink-0" />
              <span className="text-[13px] font-medium uppercase tracking-[0.07em] whitespace-nowrap">
                {skill}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
