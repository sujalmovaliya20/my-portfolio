export interface ExperienceData {
  id: string;
  role: string;
  company: string;
  type: string;
  period: string;
  description: string;
  highlights: string[];
  skills: { label: string; category: string }[];
  current?: boolean;
}

export const experience: ExperienceData[] = [
  {
    id: "1",
    role: "Artificial Intelligence Intern",
    company: "Codlens Innovations",
    type: "Internship",
    period: "05/2026 — 06/2026",
    current: true,
    description:
      "Served as Lead Developer for FitLook — an AI-powered virtual trial room platform designed for fabrics and tailor shops. Managed the end-to-end development cycle, from integrating state-of-the-art diffusion models to building an immersive, scroll-driven 3D web presentation layer.",
    highlights: [
      "Architected an end-to-end virtual trial room enabling customers to visualize unstitched fabric on themselves as finished garments in real-time.",
      "Integrated Multi-image Diffusion Model, custom photo upload pipeline, and garment type selector for high-fidelity overlays.",
      "Designed a highly engaging, scroll-driven 3D immersive landing experience with GSAP, boosting user interaction.",
      "Engineered full payment integrations with Razorpay and robust server pipelines using FastAPI and Next.js.",
    ],
    skills: [
      // AI & ML
      { label: "RAG", category: "AI & ML" },
      { label: "LangChain", category: "AI & ML" },
      { label: "LangGraph", category: "AI & ML" },
      { label: "VectorDB", category: "AI & ML" },
      { label: "Mem0", category: "AI & ML" },
      { label: "MCP", category: "AI & ML" },
      { label: "Gen AI", category: "AI & ML" },
      { label: "Agentic AI", category: "AI & ML" },

      // Frontend
      { label: "React.js", category: "Frontend" },
      { label: "Next.js", category: "Frontend" },
      { label: "Three.js", category: "Frontend" },
      { label: "HTML", category: "Frontend" },
      { label: "Tailwind CSS", category: "Frontend" },
      { label: "GSAP", category: "Frontend" },

      // Backend
      { label: "Node.js", category: "Backend" },
      { label: "Express.js", category: "Backend" },
      { label: "MongoDB", category: "Backend" },
      { label: "PostgreSQL", category: "Backend" },
      { label: "WebSockets", category: "Backend" },
      { label: "FastAPI", category: "Backend" },

      // Languages
      { label: "Python", category: "Languages" },
      { label: "TypeScript", category: "Languages" },
      { label: "JavaScript", category: "Languages" },
      { label: "C/C++", category: "Languages" },
      { label: "Java", category: "Languages" },

      // Tools
      { label: "Git", category: "Tools" },
      { label: "GitHub", category: "Tools" },
      { label: "Docker", category: "Tools" },
      { label: "Supabase", category: "Tools" },
      { label: "Vercel", category: "Tools" },
      { label: "Render", category: "Tools" },
    ],
  },
];
