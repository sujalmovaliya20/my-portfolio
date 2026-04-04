import type { Metadata, Viewport } from "next";
import { Syne, DM_Sans } from "next/font/google";
import { ThemeProvider } from "@/components/ui/ThemeProvider";
import { PageWrapper } from "@/components/ui/PageWrapper";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CustomCursor from "@/components/ui/CustomCursor";
import LoadingScreen from "@/components/ui/LoadingScreen";
import "./globals.css";

/* ============================================
   GOOGLE FONTS — loaded via next/font for
   automatic self-hosting & zero layout shift
   ============================================ */

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "700", "800"],
  variable: "--font-syne",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  variable: "--font-dm-sans",
  display: "swap",
});

/* ============================================
   METADATA & VIEWPORT
   ============================================ */

export const metadata: Metadata = {
  title: "Sujal Movaliya | Ai Engineer",
  description:
    "Ai Engineer specializing in modern web applications with React, Next.js, and TypeScript. Explore my projects, skills, and experience.",
  keywords: [
    "Ai Engineer",
    "portfolio",
    "react",
    "next.js",
    "typescript",
    "web developer",
    "frontend",
    "backend",
    "software engineer",
  ],
  authors: [{ name: "Sujal Movaliya" }],
  creator: "Sujal Movaliya",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
    title: "Sujal Movaliya | Ai Engineer",
    description:
      "Ai Engineer specializing in modern web applications with React, Next.js, and TypeScript.",
    siteName: "Sujal Movaliya — Portfolio",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Sujal Movaliya — Ai Engineer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sujal Movaliya | Ai Engineer",
    description:
      "Ai Engineer specializing in modern web applications.",
    images: ["/images/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
    { media: "(prefers-color-scheme: light)", color: "#fafaf8" },
  ],
};

/* ============================================
   ROOT LAYOUT
   ============================================ */

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${syne.variable} ${dmSans.variable}`}
    >
      <body className="antialiased overflow-x-hidden">
        <LoadingScreen />
        <CustomCursor />
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="dark"
          enableSystem={false}
        >
          <Navbar />
          <PageWrapper>{children}</PageWrapper>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
