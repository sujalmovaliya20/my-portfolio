export interface ExperienceData {
  id: string;
  role: string;
  company: string;
  type: string;
  period: string;
  description: string;
  skills: string[];
  current?: boolean;
}

export const experience: ExperienceData[] = [
  {
    id: "1",
    role: "Senior Ai Engineer",
    company: "TechPulse Solutions",
    type: "Full-time",
    period: "2022 — Present",
    current: true,
    description:
      "Leading development of a distributed microservices platform, optimizing API latency by 40%, and mentoring a team of 8 junior developers.",
    skills: ["React", "Go", "AWS", "Docker", "Kubernetes", "Next.js"],
  },
  {
    id: "2",
    role: "Frontend Engineer",
    company: "Digital Design Studio",
    type: "Full-time",
    period: "2020 — 2022",
    description:
      "Engineered pixel-perfect, highly responsive interfaces for Fortune 500 clients, focusing on accessibility and core web vitals.",
    skills: ["React", "TypeScript", "TailwindCSS", "Framer Motion", "Jest"],
  },
  {
    id: "3",
    role: "Junior Web Developer",
    company: "StarUp Lab",
    type: "Full-time",
    period: "2018 — 2020",
    description:
      "Built and maintained responsive landing pages and internal dashboards using modern JavaScript frameworks.",
    skills: ["JavaScript", "HTML5", "CSS3", "Firebase", "Vue.js"],
  },
];
