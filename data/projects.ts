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
    title: "Smart Kisan App",
    description:
      "An AI-powered web solution architected during a national hackathon to provide small-holder farmers with crop risk analysis, weather/market tracking, and an interactive AI chat assistant.",
    image: "/images/smart_kisan.png",
    tags: ["React.js", "Node.js", "MongoDB", "Tailwind CSS", "Generative AI"],
    githubUrl: "https://github.com/sujalmovaliya20",
    featured: true,
  },
  {
    id: "2",
    title: "SciViz 3D",
    description:
      "An interactive 3D science education platform containing over 60 physics, chemistry, and biology experiments with real-time hand gesture controls powered by MediaPipe and webcam.",
    image: "/images/sciviz_3d.png",
    tags: ["React.js", "Three.js", "Node.js", "MongoDB", "FastAPI", "MediaPipe", "Claude AI"],
    githubUrl: "https://github.com/sujalmovaliya20",
    featured: true,
  },
  {
    id: "3",
    title: "V-Try",
    description:
      "An AI-powered virtual try-on application utilizing Image-to-Image diffusion models to execute realistic clothing overlays for users in real-time.",
    image: "/images/v_try.png",
    tags: ["React.js", "Node.js", "MongoDB", "Tailwind CSS", "Hugging Face AI"],
    githubUrl: "https://github.com/sujalmovaliya20",
    featured: true,
  },
  {
    id: "4",
    title: "College Feedback System",
    description:
      "A native Android application designed for streamlined institutional student feedback collection, featuring a secure offline database architecture.",
    image: "/images/college_feedback.png",
    tags: ["Android", "Java", "SQLite", "XML"],
    githubUrl: "https://github.com/sujalmovaliya20",
    featured: true,
  },
];
