"use client";

import { motion, useScroll, useTransform, useSpring, MotionValue } from "framer-motion";
import { ExternalLink, ArrowUpRight, Sparkles } from "lucide-react";
import { useState, useRef, useEffect } from "react";

const projects = [
  {
    id: 0,
    title: "Pulse Cycle",
    subtitle: "Phygital E-Waste Management Ecosystem (UAE)",
    description:
      "An innovative phygital ecosystem combining Pulse Vault smart recycling kiosks, a mobile app, and a Tech Butler doorstep pickup service. Ensures secure data destruction, transparent disposal, sustainability certificates, and rewards — promoting circular economy principles for responsible e-waste recycling.",
    skills: ["React Native", "IoT", "Sustainability", "Mobile App", "Circular Economy"],
    link: "https://pulse-cycle-app.vercel.app/",
    highlight: true,
    year: "2024",
  },
  {
    id: 1,
    title: "FRA Digital Integration & DSS System",
    subtitle: "AI-Powered Geospatial Decision Support System",
    description:
      "Developed an AI-powered WebGIS-based Decision Support System for real-time monitoring of Forest Rights Act implementation across Indian states. Integrated geospatial data layers, ML classification models, and interactive dashboards to aid policymakers.",
    skills: ["React.js", "Python", "WebGIS", "Leaflet.js", "Machine Learning"],
    link: "https://forestt-act-project.vercel.app/",
    highlight: true,
    year: "2024",
  },
  {
    id: 2,
    title: "POWERGRID - Cost & Timeline Predictor",
    subtitle: "AI-Powered Project Risk Dashboard (SIH 2025)",
    description:
      "Designed and built a dashboard-based AI prototype predicting cost overruns and timeline delays in large-scale power transmission projects using regression and anomaly detection models. Processed project data and visualized predictions for stakeholder reporting.",
    skills: ["Python", "Machine Learning", "Pandas", "Scikit-learn", "Data Visualization"],
    link: "https://powergridcostcp.vercel.app/",
    highlight: true,
    year: "2025",
  },
  {
    id: 3,
    title: "Strategic Interview Portal",
    subtitle: "Web-Based Applicant Selector (SIH 2024)",
    description:
      "Created a full-stack web platform for simulating and managing applicant selection workflows. Features automated scoring, role-based access control, and real-time candidate tracking with objective assessment metrics.",
    skills: ["MERN Stack", "REST APIs", "MongoDB", "Node.js", "React"],
    link: "https://ai-interview-portal-orpin.vercel.app",
    highlight: false,
    year: "2024",
  },
  {
    id: 4,
    title: "Aarna Enterprises Website",
    subtitle: "Premium ID Accessories Manufacturer",
    description:
      "Professional business website with modern UI/UX design and mobile responsiveness. Focused on customer engagement, lead generation, and showcasing enterprise solutions with clean and intuitive interface.",
    skills: ["Frontend", "HTML/CSS", "JavaScript", "UI/UX Design", "Responsive"],
    link: "https://aarnaenterprises-delta.vercel.app/",
    highlight: false,
    year: "2023",
  },
];

export function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Global mouse tracking for the spotlight effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section
      id="work"
      ref={containerRef}
      className="py-32 px-6 relative overflow-hidden bg-background"
    >
      {/* Dynamic Global Spotlight */}
      <div
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(1200px circle at ${mousePos.x}px ${mousePos.y}px, oklch(0.62 0.26 29 / 0.08), transparent 40%)`,
        }}
      />

      {/* Background Animated Beams/Orbs */}
      <div className="absolute inset-0 -z-10 overflow-hidden opacity-50">
        <motion.div
          animate={{
            rotate: [0, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute top-[20%] left-[-10%] w-[50vw] h-[50vw] rounded-full blur-[120px] bg-primary/10"
        />
        <motion.div
          animate={{
            rotate: [360, 0],
            scale: [1, 1.5, 1],
          }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[10%] right-[-10%] w-[60vw] h-[60vw] rounded-full blur-[150px] bg-secondary/10"
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-32 text-center md:text-left flex flex-col items-center md:items-start"
        >
          <div className="flex items-center gap-3 mb-6 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-md">
            <Sparkles className="w-5 h-5 text-primary animate-pulse" />
            <span className="text-sm font-bold tracking-widest uppercase text-primary">
              Featured Work
            </span>
          </div>

          <h2 className="text-5xl md:text-7xl font-black mb-8 leading-[1.1] tracking-tight">
            <span className="block text-foreground">Transforming Ideas</span>
            <span className="block bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
              Into Digital Reality
            </span>
          </h2>
          <p className="text-lg md:text-xl text-foreground/70 max-w-2xl leading-relaxed">
            A showcase of innovative projects combining full-stack development, AI/ML, and strategic
            problem-solving. Experience the journey from concept to scalable production.
          </p>
        </motion.div>

        {/* Projects Showcase Container */}
        <div className="flex flex-col gap-24 md:gap-40">
          {projects.map((project, index) => (
            <ProjectItem key={project.id} project={project} index={index} mousePos={mousePos} />
          ))}
        </div>

        {/* Footer Stats / CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mt-40 pt-16 border-t border-primary/20 grid grid-cols-1 md:grid-cols-3 gap-12"
        >
          {[
            { label: "Completed Projects", value: "5+", icon: "🚀" },
            { label: "Hackathon Wins", value: "SIH ×2", icon: "🏆" },
            { label: "System Impact", value: "Global Scale", icon: "🌍" },
          ].map((stat, i) => (
            <div
              key={i}
              className="flex flex-col items-center justify-center p-8 rounded-3xl bg-background/50 border border-white/5 backdrop-blur-md hover:border-primary/30 transition-colors duration-500 group"
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {stat.icon}
              </div>
              <div className="text-4xl font-black bg-linear-to-br from-white to-white/60 bg-clip-text text-transparent mb-2">
                {stat.value}
              </div>
              <div className="text-sm font-medium tracking-wide text-primary/80 uppercase">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function ProjectItem({
  project,
  index,
  mousePos,
}: {
  project: (typeof projects)[0];
  index: number;
  mousePos: { x: number; y: number };
}) {
  const ref = useRef<HTMLDivElement>(null);

  // Advanced Scroll Animations
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0 1", "1.2 1"], // Start animating when top enters, finish when slightly above bottom
  });

  // Smooth out the progress
  const smoothProgress = useSpring(scrollYProgress, {
    damping: 20,
    stiffness: 100,
  });

  // Calculate transforms
  const isEven = index % 2 === 0;

  // Elements slide in from alternating sides
  const xTransform = useTransform(smoothProgress, [0, 1], [isEven ? -100 : 100, 0]);
  const opacityTransform = useTransform(smoothProgress, [0, 0.8, 1], [0, 0.8, 1]);
  const scaleTransform = useTransform(smoothProgress, [0, 1], [0.8, 1]);
  // 3D Rotation for depth
  const rotateY = useTransform(smoothProgress, [0, 1], [isEven ? 15 : -15, 0]);
  const rotateX = useTransform(smoothProgress, [0, 1], [10, 0]);

  // Card internal mouse hover effect
  const cardRef = useRef<HTMLDivElement>(null);
  const [hoverPos, setHoverPos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setHoverPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      ref={ref}
      style={{
        opacity: opacityTransform,
        x: xTransform,
        scale: scaleTransform,
        rotateY,
        rotateX,
        perspective: 1200,
      }}
      className={`relative w-full flex flex-col ${isEven ? "md:flex-row" : "md:flex-row-reverse"} gap-8 md:gap-16 items-center`}
    >
      {/* Huge Background Number */}
      <div
        className={`absolute top-0 ${isEven ? "right-0 md:left-[-5%]" : "left-0 md:right-[-5%]"} text-[15rem] md:text-[25rem] font-black leading-none text-white/[0.02] select-none -z-10 pointer-events-none`}
      >
        0{index + 1}
      </div>

      {/* Main Card Element */}
      <div
        className="w-full md:w-3/5 group"
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <motion.div
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="relative rounded-[2.5rem] bg-card/40 border border-white/10 backdrop-blur-xl overflow-hidden p-8 md:p-12 h-full"
        >
          {/* Card Hover Spotlight (Internal) */}
          <div
            className="pointer-events-none absolute -inset-px rounded-[2.5rem] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{
              background: `radial-gradient(600px circle at ${hoverPos.x}px ${hoverPos.y}px, rgba(255,255,255,0.1), transparent 40%)`,
            }}
          />

          {/* Glowing Border on Hover */}
          <div
            className="pointer-events-none absolute inset-0 rounded-[2.5rem] opacity-0 transition-opacity duration-500 group-hover:opacity-100 border-2 border-primary/50 mix-blend-overlay"
            style={{
              maskImage: `radial-gradient(400px circle at ${hoverPos.x}px ${hoverPos.y}px, black, transparent 100%)`,
              WebkitMaskImage: `radial-gradient(400px circle at ${hoverPos.x}px ${hoverPos.y}px, black, transparent 100%)`,
            }}
          />

          <div className="relative z-10">
            {/* Header / Badges */}
            <div className="flex flex-wrap items-center gap-3 mb-8">
              <span className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm font-semibold tracking-wide">
                {project.year}
              </span>
              {project.highlight && (
                <span className="px-4 py-1.5 rounded-full bg-linear-to-r from-primary/20 to-secondary/20 border border-primary/30 text-primary text-sm font-bold flex items-center gap-1.5 shadow-[0_0_15px_rgba(var(--color-primary),0.3)]">
                  <Sparkles size={14} /> Featured
                </span>
              )}
            </div>

            {/* Title */}
            <h3 className="text-3xl md:text-5xl font-black mb-4 leading-tight group-hover:bg-linear-to-r group-hover:from-white group-hover:to-white/70 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
              {project.title}
            </h3>

            {/* Subtitle */}
            <p className="text-lg md:text-xl font-medium text-primary/90 mb-6">
              {project.subtitle}
            </p>

            {/* Description */}
            <p className="text-foreground/70 text-base md:text-lg leading-relaxed mb-10">
              {project.description}
            </p>

            {/* Skill Pills */}
            <div className="flex flex-wrap gap-2.5 mb-10">
              {project.skills.map((skill: string, i: number) => (
                <span
                  key={i}
                  className="px-4 py-2 rounded-xl bg-white/[0.03] border border-white/5 text-sm font-medium hover:bg-primary/20 hover:border-primary/40 hover:text-primary transition-colors duration-300 cursor-default"
                >
                  {skill}
                </span>
              ))}
            </div>

            {/* CTA Button */}
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-white text-black font-bold text-lg hover:bg-primary hover:text-white hover:scale-105 active:scale-95 transition-all duration-300 shadow-xl shadow-black/20 group/btn overflow-hidden relative"
              >
                <span className="relative z-10 flex items-center gap-2">
                  View Live Project
                  <ArrowUpRight className="w-5 h-5 group-hover/btn:rotate-45 transition-transform duration-300" />
                </span>
                {/* Button hover glow */}
                <div className="absolute inset-0 bg-linear-to-r from-primary to-secondary opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
              </a>
            )}
          </div>
        </motion.div>
      </div>

      {/* Decorative Side Element (Instead of image) */}
      <div className="hidden md:flex w-2/5 justify-center items-center relative">
        <motion.div
          animate={{
            rotate: isEven ? [0, 10, 0] : [0, -10, 0],
            y: [0, -20, 0],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="relative w-64 h-64 flex justify-center items-center"
        >
          {/* Abstract glowing shapes */}
          <div className="absolute inset-0 rounded-full bg-linear-to-br from-primary/30 to-secondary/10 blur-3xl" />
          <div className="relative w-32 h-32 rounded-3xl bg-linear-to-tr from-white/10 to-white/5 border border-white/20 backdrop-blur-3xl shadow-2xl flex justify-center items-center rotate-12 group-hover:rotate-0 transition-transform duration-700 ease-out">
            <ExternalLink className="w-12 h-12 text-white/50 group-hover:text-primary transition-colors duration-500" />
          </div>
          <div className="absolute -bottom-8 -right-8 w-20 h-20 rounded-full bg-primary/20 border border-primary/30 backdrop-blur-xl -rotate-12 group-hover:scale-150 transition-transform duration-700 ease-out" />
        </motion.div>
      </div>
    </motion.div>
  );
}
