"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    // Check session storage to show loading screen only once
    const isLoadedBefore = sessionStorage.getItem("portfolio_loaded");

    if (isLoadedBefore) {
      setIsLoading(false);
      return;
    }

    // Set timeout to match user request (1.8s)
    const timeout = setTimeout(() => {
      setIsLoading(false);
      sessionStorage.setItem("portfolio_loaded", "true");
    }, 1800);

    return () => clearTimeout(timeout);
  }, []);

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "var(--bg)",
            zIndex: 9998,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            pointerEvents: "none",
          }}
        >
          {/* Centered Content */}
          <div className="flex flex-col items-center">
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="text-5xl font-syne font-extrabold text-fg mb-6"
            >
              SJ
            </motion.h1>

            {/* Progress Bar Container */}
            <div className="w-48 h-[2px] bg-bg2 rounded-full overflow-hidden mb-4 border border-border">
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.5, ease: "linear" }}
                className="h-full bg-accent"
              />
            </div>

            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="text-[11px] font-dm-sans text-fg3 uppercase tracking-[0.15em]"
            >
              Loading...
            </motion.span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
