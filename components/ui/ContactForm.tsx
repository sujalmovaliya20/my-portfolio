"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FiSend, FiCheck, FiAlertCircle } from "react-icons/fi";

type FormStatus = "idle" | "loading" | "success" | "error";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.error || "Something went wrong.");
        setStatus("error");
      }
    } catch (error) {
      setErrorMessage("Connection failed. Please try again later.");
      setStatus("error");
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label
              htmlFor="name"
              className="text-sm font-dm-sans text-fg3 uppercase tracking-widest pl-2"
            >
              Full Name
            </label>
            <input
              required
              id="name"
              type="text"
              placeholder="John Doe"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full px-6 py-4 bg-bg2 border border-border rounded-xl focus:border-accent text-fg font-dm-sans outline-none transition-colors"
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="text-sm font-dm-sans text-fg3 uppercase tracking-widest pl-2"
            >
              Email Address
            </label>
            <input
              required
              id="email"
              type="email"
              placeholder="john@example.com"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full px-6 py-4 bg-bg2 border border-border rounded-xl focus:border-accent text-fg font-dm-sans outline-none transition-colors"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="message"
            className="text-sm font-dm-sans text-fg3 uppercase tracking-widest pl-2"
          >
            Message
          </label>
          <textarea
            required
            id="message"
            rows={5}
            placeholder="Tell me about your project..."
            value={formData.message}
            onChange={(e) =>
              setFormData({ ...formData, message: e.target.value })
            }
            className="w-full px-6 py-4 bg-bg2 border border-border rounded-xl focus:border-accent text-fg font-dm-sans outline-none transition-colors resize-none"
          />
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          disabled={status === "loading"}
          className={`w-full py-5 rounded-full font-syne font-bold flex items-center justify-center gap-3 transition-all duration-300 ${
            status === "success"
              ? "bg-green-500 text-white"
              : status === "error"
                ? "bg-red-500 text-white"
                : "bg-fg text-bg hover:bg-accent hover:text-bg-dark"
          }`}
        >
          {status === "idle" && (
            <>
              <FiSend size={20} />
              Send Message
            </>
          )}
          {status === "loading" && (
            <div className="w-6 h-6 border-2 border-current border-t-transparent rounded-full animate-spin" />
          )}
          {status === "success" && (
            <>
              <FiCheck size={20} />
              Message Sent!
            </>
          )}
          {status === "error" && (
            <>
              <FiAlertCircle size={20} />
              {errorMessage}
            </>
          )}
        </motion.button>
      </form>
    </div>
  );
}
