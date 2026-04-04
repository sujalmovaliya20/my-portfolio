"use client";

import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import Hero from "@/components/sections/Hero";
import SkillsMarquee from "@/components/ui/SkillsMarquee";
import About from "@/components/sections/About";
import ProjectsGrid from "@/components/sections/ProjectsGrid";
import Experience from "@/components/sections/Experience";
import Testimonials from "@/components/sections/Testimonials";
import Contact from "@/components/sections/Contact";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* 1. HERO SECTION */}
      <Hero />

      {/* 1.1 SKILLS MARQUEE */}
      <SkillsMarquee />

      {/* 2. ABOUT SECTION */}
      <About />

      {/* 3. PROJECTS SECTION */}
      <ProjectsGrid />

      {/* 4. EXPERIENCE SECTION */}
      <Experience />

      {/* 5. TESTIMONIALS SECTION */}
      <Testimonials />

      {/* 6. CONTACT SECTION */}
      <Contact />
    </main>
  );
}
