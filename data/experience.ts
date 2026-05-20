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
    company: "Codlens Innovation",
    type: "Internship",
    period: "2026 — Present",
    current: true,
    description:
      "Building and deploying intelligent AI systems using cutting-edge machine learning frameworks. Developing LLM-powered applications, fine-tuning large language models, and architecting end-to-end AI pipelines that solve real-world business problems. Collaborating with cross-functional product and engineering teams to integrate AI capabilities into scalable, production-grade systems.",
    highlights: [
      "Engineered LLM-powered chatbot reducing support tickets by 60%",
      "Fine-tuned open-source models for domain-specific classification tasks",
      "Built real-time AI inference API serving 10k+ daily requests",
    ],
    skills: [
      { label: "Python",        category: "Core" },
      { label: "PyTorch",       category: "ML" },
      { label: "TensorFlow",    category: "ML" },
      { label: "LangChain",     category: "LLM" },
      { label: "OpenAI API",    category: "LLM" },
      { label: "Hugging Face",  category: "LLM" },
      { label: "FastAPI",       category: "Backend" },
      { label: "Docker",        category: "DevOps" },
      { label: "PostgreSQL",    category: "Data" },
      { label: "Pandas",        category: "Data" },
      { label: "NumPy",         category: "Data" },
      { label: "Git",           category: "DevOps" },
    ],
  },
];
