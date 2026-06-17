export interface ProjectData {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
}

export const projects: ProjectData[] = [
  {
    id: "1",
    title: "InterviewAI",
    description:
      "A real-time AI interview coaching assistant featuring live audio transcription, LangGraph-powered coaching agents, and resume-aware question generation using NVIDIA NIM and Groq LLMs.",
    image: "/images/interview_ai.png",
    tags: ["Next.js", "FastAPI", "Supabase", "Redis", "LangGraph", "Mem0", "Docker"],
    githubUrl: "https://interview-ai-iota-three.vercel.app/",
    featured: true,
  },
  {
    id: "2",
    title: "Smart Kisan App",
    description:
      "An AI-powered web solution architected during a national hackathon to provide small-holder farmers with crop risk analysis, weather/market tracking, and an interactive AI chat assistant.",
    image: "/images/smart_kisan.png",
    tags: ["React.js", "Node.js", "MongoDB", "Tailwind CSS", "Generative AI"],
    githubUrl: "https://github.com/sujalmovaliya20",
    featured: true,
  },
  {
    id: "4",
    title: "FitLook",
    description:
      "An AI-powered virtual trial room platform for tailors and fabric shops, integrating multi-image diffusion models for garment overlays and scroll-driven GSAP 3D visuals.",
    image: "/images/fitlook.png",
    tags: ["Next.js", "React.js", "FastAPI", "Supabase", "Python", "Hugging Face", "GSAP"],
    githubUrl: "https://tailorai-plum.vercel.app/",
    featured: true,
  },
  {
    id: "3",
    title: "SciViz 3D",
    description:
      "An interactive 3D science education platform containing over 60 physics, chemistry, and biology experiments with real-time hand gesture controls powered by MediaPipe and webcam.",
    image: "/images/sciviz_3d.png",
    tags: ["React.js", "Three.js", "Node.js", "MongoDB", "FastAPI", "MediaPipe", "Claude AI"],
    githubUrl: "https://github.com/sujalmovaliya20",
    featured: true,
  },
  {
    id: "5",
    title: "College Feedback System",
    description:
      "A native Android application designed for streamlined institutional student feedback collection, featuring a secure offline database architecture.",
    image: "/images/college_feedback.png",
    tags: ["Android", "Java", "SQLite", "XML"],
    githubUrl: "https://github.com/sujalmovaliya20",
    featured: true,
  },
];
