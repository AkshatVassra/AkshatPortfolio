"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const ROLES = ["Full Stack Engineer", "Software Developer", "Game Developer", "AI/ML Enthusiast"];

function TypewriterRole() {
  const [roleIdx, setRoleIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [pause, setPause] = useState(false);

  useEffect(() => {
    const target = ROLES[roleIdx];
    if (pause) {
      const t = setTimeout(() => {
        setDeleting(true);
        setPause(false);
      }, 1400);
      return () => clearTimeout(t);
    }
    if (!deleting) {
      if (displayed.length < target.length) {
        const t = setTimeout(() => setDisplayed(target.slice(0, displayed.length + 1)), 48);
        return () => clearTimeout(t);
      }
      setPause(true);
    } else {
      if (displayed.length > 0) {
        const t = setTimeout(() => setDisplayed((d) => d.slice(0, -1)), 22);
        return () => clearTimeout(t);
      }
      setDeleting(false);
      setRoleIdx((i) => (i + 1) % ROLES.length);
    }
  }, [displayed, deleting, pause, roleIdx]);

  return (
    <span
      className="font-mono"
      style={{
        background: "linear-gradient(90deg,#a855f7,#06b6d4)",
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        WebkitTextFillColor: "transparent",
      }}
    >
      {displayed}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.5, repeat: Infinity }}
        style={{
          display: "inline-block",
          width: 2,
          height: "0.9em",
          background: "#06b6d4",
          marginLeft: 2,
          verticalAlign: "middle",
        }}
      />
    </span>
  );
}

const TAGS = [
  { label: "Full Stack", icon: "⚡", c: 0 },
  { label: "Software Dev", icon: "💻", c: 1 },
  { label: "Game Dev", icon: "🎮", c: 0 },
  { label: "AI / ML", icon: "🧠", c: 1 },
];

const STATS = [
  { label: "Projects", value: "10+", icon: "🚀" },
  { label: "CGPA", value: "8.2", icon: "🎓" },
  { label: "Hackathons", value: "SIH ×2", icon: "🏆" },
  { label: "Status", value: "Open", icon: "✅" },
];

// Shared easing for snappy-but-smooth feel
const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 px-6 overflow-hidden">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
        className="relative z-10 max-w-3xl mx-auto flex flex-col items-center text-center"
      >
        {/* Badge row */}
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 16 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease } },
          }}
          className="flex flex-wrap justify-center gap-2 mb-6"
        >
          {TAGS.map(({ label, icon, c }) => (
            <span
              key={label}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border"
              style={{
                borderColor: c === 0 ? "rgba(168,85,247,0.5)" : "rgba(6,182,212,0.5)",
                color: c === 0 ? "#a855f7" : "#06b6d4",
                background: c === 0 ? "rgba(168,85,247,0.09)" : "rgba(6,182,212,0.09)",
              }}
            >
              <span>{icon}</span>
              {label}
            </span>
          ))}
        </motion.div>

        {/* Name */}
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
          }}
          className="mb-4"
        >
          <h1
            className="text-6xl md:text-8xl font-black leading-[1.05] tracking-tight"
            style={{ willChange: "transform" }}
          >
            <span
              style={{
                backgroundImage: "linear-gradient(135deg,#a855f7 0%,#ec4899 50%,#06b6d4 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
                display: "block",
              }}
            >
              AKSHAT
            </span>
            <span
              style={{
                backgroundImage: "linear-gradient(135deg,#06b6d4 0%,#a855f7 50%,#ec4899 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
                display: "block",
              }}
            >
              VASSRA
            </span>
          </h1>
        </motion.div>

        {/* Typewriter */}
        <motion.div
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { duration: 0.3 } },
          }}
          className="text-xl md:text-2xl font-semibold h-8 mb-4"
        >
          <TypewriterRole />
        </motion.div>

        {/* Bio */}
        <motion.p
          variants={{
            hidden: { opacity: 0, y: 12 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease } },
          }}
          className="text-base mb-8 max-w-xl mx-auto leading-relaxed"
          style={{ color: "rgba(255,255,255,0.6)" }}
        >
          A technology enthusiast skilled in Java, C++, JavaScript, Full-Stack Development, and
          AI-driven applications. I am committed to creating impactful software solutions and
          continuously expanding my technical expertise.
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 12 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease } },
          }}
          className="flex flex-col sm:flex-row gap-4 mb-10"
        >
          <motion.a
            href="#work"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="group inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-lg font-semibold text-white"
            style={{
              background: "linear-gradient(135deg,#a855f7,#ec4899)",
              willChange: "transform",
            }}
          >
            View My Work{" "}
            <ArrowRight
              size={17}
              className="group-hover:translate-x-1 transition-transform duration-150"
            />
          </motion.a>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-lg border-2 font-semibold transition-colors duration-150 hover:bg-cyan-400/10"
            style={{ borderColor: "#06b6d4", color: "#06b6d4", willChange: "transform" }}
          >
            Get In Touch <ArrowRight size={17} />
          </motion.a>
        </motion.div>

        {/* Stats */}
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 12 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease } },
          }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full"
        >
          {STATS.map((s) => (
            <motion.div
              key={s.label}
              whileHover={{ y: -3, scale: 1.02 }}
              transition={{ duration: 0.15 }}
              className="p-3.5 rounded-xl border text-center"
              style={{
                background: "rgba(168,85,247,0.06)",
                borderColor: "rgba(168,85,247,0.22)",
                willChange: "transform",
              }}
            >
              <div className="text-lg mb-0.5">{s.icon}</div>
              <p className="text-xs mb-0.5" style={{ color: "rgba(255,255,255,0.5)" }}>
                {s.label}
              </p>
              <p className="text-base font-bold" style={{ color: "#a855f7" }}>
                {s.value}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="mt-14"
          style={{ willChange: "transform" }}
        >
          <div
            className="w-6 h-10 border-2 rounded-full flex items-start justify-center p-2"
            style={{ borderColor: "rgba(168,85,247,0.4)" }}
          >
            <motion.div
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              className="w-1 h-2 rounded-full"
              style={{ background: "#a855f7" }}
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
