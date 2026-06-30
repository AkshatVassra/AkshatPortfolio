'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { Sparkles, Zap, Server, Globe, Cpu, Database, Code2, Layers, Terminal, Braces } from 'lucide-react';
import { cn } from '@/lib/utils';

const TECH_STACK = [
  { name: 'React', icon: '⚛️', category: 'Frontend', power: 96, color: '#61dafb' },
  { name: 'TypeScript', icon: '📘', category: 'Language', power: 94, color: '#3178c6' },
  { name: 'Node.js', icon: '🟢', category: 'Backend', power: 92, color: '#68a063' },
  { name: 'Python', icon: '🐍', category: 'Language', power: 95, color: '#ffd43b' },
  { name: 'MongoDB', icon: '🍃', category: 'Database', power: 88, color: '#4db33d' },
  { name: 'TensorFlow', icon: '🧠', category: 'AI/ML', power: 90, color: '#ff6f00' },
  { name: 'Docker', icon: '🐳', category: 'DevOps', power: 87, color: '#2496ed' },
  { name: 'Git', icon: '🔀', category: 'Tools', power: 99, color: '#f05032' },
  { name: 'Tailwind', icon: '🎨', category: 'Frontend', power: 91, color: '#38bdf8' },
  { name: 'Framer', icon: '✨', category: 'Motion', power: 89, color: '#a855f7' },
];

function BentoCard({ children, className, mousePos }: { children: React.ReactNode, className?: string, mousePos: { x: number, y: number } }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hoverPos, setHoverPos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // 3D Tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    setHoverPos({ x: mouseX, y: mouseY });
    
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={cn("relative rounded-[2rem] bg-card/40 border border-white/10 backdrop-blur-xl overflow-hidden group/bento", className)}
    >
      <div
        className="pointer-events-none absolute -inset-px rounded-[2rem] opacity-0 transition-opacity duration-300 group-hover/bento:opacity-100"
        style={{
          background: `radial-gradient(400px circle at ${hoverPos.x}px ${hoverPos.y}px, rgba(255,255,255,0.08), transparent 40%)`,
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 rounded-[2rem] opacity-0 transition-opacity duration-500 group-hover/bento:opacity-100 border-2 border-primary/40 mix-blend-overlay"
        style={{
          maskImage: `radial-gradient(300px circle at ${hoverPos.x}px ${hoverPos.y}px, black, transparent 100%)`,
          WebkitMaskImage: `radial-gradient(300px circle at ${hoverPos.x}px ${hoverPos.y}px, black, transparent 100%)`,
        }}
      />
      <div className="relative z-10 h-full w-full p-8" style={{ transform: "translateZ(30px)" }}>
        {children}
      </div>
    </motion.div>
  );
}

export function TechStackFun() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

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
    <section id="stack" ref={containerRef} className="py-32 px-6 relative overflow-hidden bg-background">
      {/* Global Dynamic Spotlight */}
      <div
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(1200px circle at ${mousePos.x}px ${mousePos.y}px, oklch(0.62 0.26 29 / 0.08), transparent 40%)`,
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20 text-center md:text-left flex flex-col items-center md:items-start"
        >
          <div className="flex items-center gap-3 mb-6 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-md">
            <Sparkles className="w-5 h-5 text-primary animate-pulse" />
            <span className="text-sm font-bold tracking-widest uppercase text-primary">Tech Arsenal</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-black mb-8 leading-[1.1] tracking-tight">
            <span className="block text-foreground">Next-Gen</span>
            <span className="block bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
              Stack Architecture
            </span>
          </h2>
          <p className="text-lg md:text-xl text-foreground/70 max-w-2xl leading-relaxed">
            A carefully curated ecosystem of modern tools and frameworks designed for speed, scale, and uncompromising user experiences.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(320px,auto)]">
          
          {/* Main Core Stack (Spans 2 columns, 2 rows) */}
          <BentoCard mousePos={mousePos} className="md:col-span-2 md:row-span-2 flex flex-col justify-between overflow-visible">
            <div className="flex justify-between items-start mb-8">
              <div>
                <h3 className="text-3xl font-black mb-2 text-foreground">Core Ecosystem</h3>
                <p className="text-foreground/60 text-lg">The foundation of everything I build.</p>
              </div>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 shadow-lg">
                <Globe className="w-8 h-8 text-primary" />
              </div>
            </div>

            <div className="relative h-72 w-full flex items-center justify-center perspective-[1000px] my-8">
               {/* 3D Orbiting Elements / Abstract Visual */}
               <motion.div 
                 animate={{ rotateZ: 360 }}
                 transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                 className="absolute w-[280px] h-[280px] md:w-[350px] md:h-[350px] border border-primary/20 rounded-full"
               />
               <motion.div 
                 animate={{ rotateZ: -360, rotateX: 60 }}
                 transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                 className="absolute w-[350px] h-[350px] md:w-[450px] md:h-[450px] border border-dashed border-secondary/30 rounded-full"
               />
               <div className="absolute w-32 h-32 rounded-full bg-primary/20 blur-[50px]" />
               <div className="relative z-10 w-24 h-24 bg-background/80 backdrop-blur-xl border border-primary/50 rounded-3xl shadow-[0_0_50px_rgba(var(--color-primary),0.3)] flex items-center justify-center group-hover/bento:scale-110 transition-transform duration-500">
                 <Code2 className="w-12 h-12 text-primary" />
               </div>
               
               {/* Floating Tech Icons */}
               {TECH_STACK.slice(0, 6).map((tech, i) => {
                 const angle = (i / 6) * Math.PI * 2;
                 const radiusX = 140;
                 const radiusY = 100;
                 return (
                   <motion.div
                     key={tech.name}
                     className="absolute w-14 h-14 bg-background/90 border border-white/10 rounded-2xl flex items-center justify-center text-3xl backdrop-blur-md shadow-2xl z-20"
                     animate={{ 
                       x: [Math.cos(angle) * radiusX, Math.cos(angle + Math.PI) * radiusX, Math.cos(angle) * radiusX],
                       y: [Math.sin(angle) * radiusY, Math.sin(angle + Math.PI) * radiusY, Math.sin(angle) * radiusY],
                       rotate: [0, 180, 360],
                     }}
                     transition={{ duration: 30 + i * 2, repeat: Infinity, ease: "linear" }}
                   >
                     {tech.icon}
                   </motion.div>
                 );
               })}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              {['React', 'TypeScript', 'Node.js', 'Python'].map(tech => (
                <span key={tech} className="px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-sm font-semibold hover:bg-primary/20 hover:text-primary hover:border-primary/50 transition-colors cursor-default">
                  {tech}
                </span>
              ))}
            </div>
          </BentoCard>

          {/* AI & ML */}
          <BentoCard mousePos={mousePos} className="flex flex-col justify-between">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-2xl font-bold mb-1 text-foreground">AI Intelligence</h3>
                <p className="text-sm text-foreground/60">Powering smart features</p>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <Cpu className="w-6 h-6 text-secondary" />
              </div>
            </div>
            <div className="space-y-6 mt-4">
              {['TensorFlow', 'Scikit-learn', 'Pandas'].map((tech, i) => (
                <div key={tech} className="space-y-2 group">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium text-foreground/80 group-hover:text-primary transition-colors">{tech}</span>
                    <span className="text-secondary/80 font-mono tracking-wider">9{i}0%</span>
                  </div>
                  <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: `9${i}0%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, delay: 0.2 * i, ease: "easeOut" }}
                      className="h-full bg-linear-to-r from-secondary to-primary rounded-full relative" 
                    >
                      <div className="absolute top-0 right-0 bottom-0 w-10 bg-gradient-to-r from-transparent to-white/50 blur-[2px]" />
                    </motion.div>
                  </div>
                </div>
              ))}
            </div>
          </BentoCard>

          {/* Database & Cloud */}
          <BentoCard mousePos={mousePos} className="flex flex-col justify-between bg-linear-to-br from-card/40 to-primary/5">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-2xl font-bold mb-1 text-foreground">Data & Scale</h3>
                <p className="text-sm text-foreground/60">Reliable infrastructure</p>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <Database className="w-6 h-6 text-primary" />
              </div>
            </div>
            <div className="flex flex-col gap-6 relative mt-4">
              <div className="absolute left-[11px] top-4 bottom-4 w-[2px] bg-white/10" />
              {['MongoDB', 'PostgreSQL', 'Docker', 'Vercel'].map((tech, i) => (
                <motion.div 
                  key={tech}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, duration: 0.5 }}
                  className="flex items-center gap-6 relative z-10 group cursor-default"
                >
                  <div className="w-6 h-6 rounded-full bg-background border-2 border-primary/50 flex items-center justify-center group-hover:border-primary group-hover:shadow-[0_0_15px_rgba(var(--color-primary),0.5)] transition-all">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                  </div>
                  <span className="font-semibold text-foreground/90 text-lg group-hover:text-primary transition-colors">{tech}</span>
                </motion.div>
              ))}
            </div>
          </BentoCard>

          {/* Frontend Mastery (Spans full width on bottom) */}
          <BentoCard mousePos={mousePos} className="md:col-span-3 flex flex-col md:flex-row items-center gap-8 md:gap-16 p-8 md:p-12">
            <div className="w-full md:w-2/5">
               <div className="flex items-center gap-4 mb-6">
                 <div className="p-4 rounded-2xl bg-white/5 border border-white/10 shadow-lg">
                   <Terminal className="w-8 h-8 text-primary" />
                 </div>
                 <h3 className="text-3xl font-black text-foreground">Frontend Mastery</h3>
               </div>
               <p className="text-foreground/70 text-lg leading-relaxed mb-8">
                 Crafting buttery-smooth animations, accessible interfaces, and pixel-perfect responsive designs using modern utility frameworks and motion libraries.
               </p>
               <motion.a 
                 href="#work"
                 whileHover={{ scale: 1.05 }}
                 whileTap={{ scale: 0.95 }}
                 className="inline-flex px-8 py-4 rounded-2xl bg-white text-black font-bold text-lg hover:bg-primary hover:text-white transition-all duration-300 shadow-xl shadow-white/10"
               >
                 View My Work
               </motion.a>
            </div>
            <div className="w-full md:w-3/5 grid grid-cols-2 md:grid-cols-3 gap-4">
               {['Tailwind CSS', 'Framer Motion', 'React Native', 'Vite', 'Next.js', 'Redux'].map((tech, i) => (
                 <motion.div 
                   key={tech} 
                   initial={{ opacity: 0, y: 20 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                   transition={{ delay: i * 0.1 }}
                   className="px-6 py-5 rounded-2xl bg-white/5 border border-white/10 hover:border-primary/50 hover:bg-primary/10 hover:-translate-y-1 transition-all duration-300 flex items-center gap-3 group cursor-default shadow-lg"
                 >
                   <Braces className="w-5 h-5 text-white/40 group-hover:text-primary transition-colors" />
                   <span className="font-semibold tracking-wide">{tech}</span>
                 </motion.div>
               ))}
            </div>
          </BentoCard>

        </div>
      </div>
    </section>
  );
}
