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
    title: "AI-Powered SaaS Platform",
    description:
      "A complete multi-tenant SaaS with real-time AI content generation, Stripe subscriptions, and a modern dashboard.",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1600",
    tags: ["Next.js 14", "TypeScript", "Tailwind", "OpenAI", "Prisma"],
    liveUrl: "https://ai-platform-demo.com",
    githubUrl: "https://github.com",
    featured: true,
  },
  {
    id: "2",
    title: "Crypto Analytics Dashboard",
    description:
      "High-performance visualization for cryptocurrency trends, integrating real-time market data and social sentiment analysis.",
    image:
      "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=1600",
    tags: ["React", "Python", "WebSockets", "D3.js", "Redis"],
    liveUrl: "https://crypto-dashboard.com",
    githubUrl: "https://github.com",
    featured: true,
  },
  {
    id: "3",
    title: "E-commerce Mobile App",
    description:
      "A cross-platform React Native app with biometric login, offline sync, and a seamless checkout experience.",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1600",
    tags: ["React Native", "Firebase", "Redux", "Stripe"],
    liveUrl: "https://ecommerce-mobile.com",
    githubUrl: "https://github.com",
    featured: false,
  },
  {
    id: "4",
    title: "Collaborative Whiteboard",
    description:
      "A real-time shared drawing tool using WebRTC and Canvas API for low-latency collaboration.",
    image:
      "https://images.unsplash.com/photo-1512314889357-e157c22f938d?auto=format&fit=crop&q=80&w=1600",
    tags: ["TypeScript", "Socket.io", "Canvas API", "Node.js"],
    liveUrl: "https://whiteboard-demo.com",
    githubUrl: "https://github.com",
    featured: false,
  },
];
