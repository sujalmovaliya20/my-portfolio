"use client";

import React from "react";
import { FiArrowLeft, FiPrinter, FiMail, FiPhone, FiMapPin, FiLinkedin, FiGithub } from "react-icons/fi";
import Link from "next/link";

/** ============================================
 *  RESUME PAGE Component
 *  Clean, professional, and print-ready.
 *  ============================================ */

export default function ResumePage() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-black selection:text-white">
      {/* 
       * Header / Navigation (Hidden on Print) 
       */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 print:hidden">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link 
            href="/" 
            className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-black transition-colors"
          >
            <FiArrowLeft size={16} />
            Back to Portfolio
          </Link>
          
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-1.5 bg-black text-white text-sm font-semibold rounded-full hover:bg-gray-800 transition-all shadow-sm"
          >
            <FiPrinter size={16} />
            Print Resume
          </button>
        </div>
      </nav>

      {/* 
       * Resume Container 
       */}
      <main className="max-w-4xl mx-auto px-8 md:px-16 py-12 md:py-20">
        
        {/* 1. Header Section */}
        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 font-serif">
            Sujal Movaliya
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-8 text-sm text-gray-600">
            <a href="tel:+918511847785" className="flex items-center gap-2 hover:text-black">
              <FiPhone size={14} className="text-gray-400" />
              +91 8511847785
            </a>
            <a href="mailto:sujalmovaliya8@gmail.com" className="flex items-center gap-2 hover:text-black">
              <FiMail size={14} className="text-gray-400" />
              sujalmovaliya8@gmail.com
            </a>
            <span className="flex items-center gap-2">
              <FiMapPin size={14} className="text-gray-400" />
              Surat, Gujarat, India
            </span>
            <div className="flex items-center gap-4 mt-2 md:mt-0">
              <a href="https://linkedin.com/in/sujal-movaliya" target="_blank" className="hover:text-black">
                <FiLinkedin size={16} />
              </a>
              <a href="https://github.com/sujalmovaliya20" target="_blank" className="hover:text-black">
                <FiGithub size={16} />
              </a>
            </div>
          </div>
        </header>

        {/* 2. Education */}
        <section className="mb-10">
          <h2 className="text-xs uppercase tracking-widest font-bold text-gray-400 mb-6 border-b border-gray-100 pb-2">
            Education
          </h2>
          <div className="space-y-6">
            <div className="relative">
              <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-1">
                <h3 className="text-lg font-bold">B.Tech in Computer Engineering</h3>
                <span className="text-sm font-medium text-gray-500">2023 — Present</span>
              </div>
              <p className="text-gray-700">
                Chhotubhai Gopalbhai Patel Institute of Technology, Uka Tarsadia University, bardoli
              </p>
              <p className="text-sm font-semibold mt-1">CGPA: 8.83/10</p>
            </div>
            
            <div>
              <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-1">
                <h3 className="text-lg font-bold">Ashadeep iit, Surat (HSC)</h3>
                <span className="text-sm font-medium text-gray-500">Schooling</span>
              </div>
              <p className="text-gray-700">Science Stream</p>
              <p className="text-sm font-semibold mt-1">Marks: 72.10%</p>
            </div>
          </div>
        </section>

        {/* 3. Projects */}
        <section className="mb-10">
          <h2 className="text-xs uppercase tracking-widest font-bold text-gray-400 mb-6 border-b border-gray-100 pb-2">
            Technical Projects
          </h2>
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-bold flex items-center gap-2">
                Smart Kisan App
                <span className="text-[10px] font-normal px-2 py-0.5 bg-gray-100 text-gray-500 rounded uppercase tracking-wider">
                  Hackathon Finalist
                </span>
              </h3>
              <p className="text-xs font-medium text-gray-500 mb-2 italic">
                React.js, Node.js, MongoDB, Tailwind CSS, Generative AI
              </p>
              <ul className="list-disc list-outside ml-4 space-y-2 text-sm text-gray-700">
                <li>Architected an AI-powered web solution for small-holder farmers providing real-time risk assessment.</li>
                <li>Integrated AI crop analysis, weather tracking, and an AI chat assistant for data-driven farming.</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold">V-Try (AI-Powered Virtual Try-On)</h3>
              <p className="text-xs font-medium text-gray-500 mb-2 italic">
                React.js, Node.js, MongoDB, Hugging Face AI Model
              </p>
              <ul className="list-disc list-outside ml-4 space-y-2 text-sm text-gray-700">
                <li>Developed a web platform utilizing Image-to-Image models for realistic virtual apparel overlays.</li>
                <li>Enabled high-fidelity visualization for users to virtually try clothing items through seamless AI generation.</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold">College Feedback System</h3>
              <p className="text-xs font-medium text-gray-500 mb-2 italic">
                Native Android, Java, XML, SQLite
              </p>
              <ul className="list-disc list-outside ml-4 space-y-2 text-sm text-gray-700">
                <li>Designed a native Android application for streamlined institutional student feedback collection.</li>
                <li>Implemented a robust local database architecture for secure, offline data management.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 4. Skills */}
        <section className="mb-10">
          <h2 className="text-xs uppercase tracking-widest font-bold text-gray-400 mb-6 border-b border-gray-100 pb-2">
            Skills
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
            <div>
              <h4 className="text-xs font-bold text-gray-800 uppercase mb-2">Languages</h4>
              <p className="text-sm text-gray-600">Python, TypeScript, JavaScript, C/C++, Java</p>
            </div>
            <div>
              <h4 className="text-xs font-bold text-gray-800 uppercase mb-2">Frontend</h4>
              <p className="text-sm text-gray-600">React.js, Next.js, Three.js, HTML, CSS, Tailwind</p>
            </div>
            <div>
              <h4 className="text-xs font-bold text-gray-800 uppercase mb-2">Backend & Databases</h4>
              <p className="text-sm text-gray-600">Node.js, Express.js, MongoDB, Supabase, WebSockets</p>
            </div>
            <div>
              <h4 className="text-xs font-bold text-gray-800 uppercase mb-2">AI & Machine Learning</h4>
              <p className="text-sm text-gray-600">MCP Protocol, Hugging Face, Generative AI, Predictive Modeling</p>
            </div>
            <div>
              <h4 className="text-xs font-bold text-gray-800 uppercase mb-2">Tools & DevOps</h4>
              <p className="text-sm text-gray-600">Docker, Git, GitHub</p>
            </div>
            <div>
              <h4 className="text-xs font-bold text-gray-800 uppercase mb-2">Additional</h4>
              <p className="text-sm text-gray-600">SEO, Unit Testing, Load Testing</p>
            </div>
          </div>
        </section>

        {/* 5. Achievements & Hackathons */}
        <section className="mb-10">
          <h2 className="text-xs uppercase tracking-widest font-bold text-gray-400 mb-6 border-b border-gray-100 pb-2">
            Achievements
          </h2>
          <div className="space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-gray-900">Codeversity National Hackathon</h3>
                <p className="text-sm text-gray-600">Ranked Top 5 Finalist — Functional prototype in AI domain.</p>
              </div>
            </div>
            <div>
              <h3 className="font-bold text-gray-900">Smart India Hackathon (SIH)</h3>
              <p className="text-sm text-gray-600">Participant in national-level initiative solving digital challenges.</p>
            </div>
            <div>
              <h3 className="font-bold text-gray-900">InnoSprint</h3>
              <p className="text-sm text-gray-600">Achieved Top Finalist status in competitive inter-college hackathon.</p>
            </div>
          </div>
        </section>

        {/* 6. Certifications */}
        <section>
          <h2 className="text-xs uppercase tracking-widest font-bold text-gray-400 mb-6 border-b border-gray-100 pb-2">
            Certifications
          </h2>
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-bold">Artificial Intelligence Workshop</h3>
              <p className="text-sm text-gray-600">IIT Gandhinagar — Specialized AI workshop.</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-bold">Drone Technology Hands-on Training</h3>
              <p className="text-sm text-gray-600">SVNIT, Surat — UAV mechanics, flight dynamics, and embedded systems.</p>
            </div>
          </div>
        </section>

      </main>

      {/* Footer Branding */}
      <footer className="max-w-4xl mx-auto px-16 pb-20 pt-10 text-center border-t border-gray-100 print:hidden">
        <p className="text-gray-400 text-xs font-medium uppercase tracking-widest">
          Sujal Movaliya <span className="mx-2">·</span> SJ.
        </p>
      </footer>

      {/* Global CSS for Print Optimization */}
      <style jsx global>{`
        @media print {
          body {
            background-color: white !important;
            color: black !important;
          }
          nav {
            display: none !important;
          }
          @page {
            margin: 2cm;
          }
        }
      `}</style>
    </div>
  );
}
