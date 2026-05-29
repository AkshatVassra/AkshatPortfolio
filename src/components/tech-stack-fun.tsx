'use client';

import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Zap, Shuffle } from 'lucide-react';

type TechItem = {
  name: string;
  icon: string;
  category: string;
  vibe: string;
  power: number;
  color: string;
};

const TECH_STACK: TechItem[] = [
  { name: 'React', icon: '⚛️', category: 'Frontend', vibe: 'Component chaos, beautifully tamed', power: 96, color: '#61dafb' },
  { name: 'TypeScript', icon: '📘', category: 'Language', vibe: 'Catches bugs before you ship them', power: 94, color: '#3178c6' },
  { name: 'Node.js', icon: '🟢', category: 'Backend', vibe: 'JavaScript on both ends — no mercy', power: 92, color: '#68a063' },
  { name: 'Python', icon: '🐍', category: 'Language', vibe: 'ML pipelines & scripts in one breath', power: 95, color: '#ffd43b' },
  { name: 'MongoDB', icon: '🍃', category: 'Database', vibe: 'Documents flex harder than JSON', power: 88, color: '#4db33d' },
  { name: 'TensorFlow', icon: '🧠', category: 'AI/ML', vibe: 'Neurons go brrr responsibly', power: 90, color: '#ff6f00' },
  { name: 'Docker', icon: '🐳', category: 'DevOps', vibe: 'It works on my machine → everyone\'s', power: 87, color: '#2496ed' },
  { name: 'Git', icon: '🔀', category: 'Tools', vibe: 'Time travel for code (use wisely)', power: 99, color: '#f05032' },
  { name: 'Tailwind', icon: '🎨', category: 'Frontend', vibe: 'Utility classes, infinite power', power: 91, color: '#38bdf8' },
  { name: 'Framer', icon: '✨', category: 'Motion', vibe: 'Butter-smooth UI animations', power: 89, color: '#a855f7' },
];

const COMBOS: Record<string, string> = {
  'React+TypeScript+Node.js': '🚀 Full-stack express lane — ship features, not excuses.',
  'Python+TensorFlow+MongoDB': '🤖 AI data pipeline unlocked — models meet real storage.',
  'React+Tailwind+Framer': '🎬 Frontend cinema mode — pixels with personality.',
  'Docker+Git+Node.js': '🛠️ Deploy-ready dev loop — commit, containerize, conquer.',
  'Python+MongoDB+React': '🌐 Data-to-dashboard speedrun — backend brains, frontend face.',
};

function pickCombo(techs: TechItem[]): string {
  const key = techs
    .map((t) => t.name)
    .sort()
    .join('+');
  if (COMBOS[key]) return COMBOS[key];

  const categories = [...new Set(techs.map((t) => t.category))];
  if (categories.length === 3) {
    return `🎯 Triple threat: ${techs.map((t) => t.name).join(' + ')} — cross-domain synergy engaged.`;
  }
  return `⚡ ${techs[0].name} × ${techs[1].name} × ${techs[2].name} — experimental stack, dangerously effective.`;
}

function randomPick<T>(arr: T[], count: number): T[] {
  const copy = [...arr];
  const picked: T[] = [];
  while (picked.length < count && copy.length > 0) {
    const i = Math.floor(Math.random() * copy.length);
    picked.push(copy.splice(i, 1)[0]);
  }
  return picked;
}

export function TechStackFun() {
  const [active, setActive] = useState<TechItem | null>(TECH_STACK[0]);
  const [combo, setCombo] = useState<string | null>(null);
  const [comboTechs, setComboTechs] = useState<TechItem[]>([]);
  const [spinning, setSpinning] = useState(false);

  const orbitTechs = useMemo(() => TECH_STACK.slice(0, 8), []);

  const spinStack = () => {
    setSpinning(true);
    setCombo(null);
    const picked = randomPick(TECH_STACK, 3);
    setTimeout(() => {
      setComboTechs(picked);
      setCombo(pickCombo(picked));
      setActive(picked[0]);
      setSpinning(false);
    }, 700);
  };

  return (
    <section id="stack" className="py-24 px-6 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
          style={{
            background: 'radial-gradient(circle, oklch(0.66 0.24 305 / 0.25) 0%, transparent 70%)',
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center md:text-left"
        >
          <p className="text-accent font-bold text-sm tracking-widest mb-3">TECH ARSENAL</p>
          <h2 className="text-5xl font-bold mb-4">
            Stack <span className="text-accent">Playground</span>
          </h2>
          <p className="text-foreground-secondary text-lg max-w-2xl mx-auto md:mx-0">
            Hover the orbit, click a tool, or spin for a random power combo — because great devs
            know their stack and have fun with it.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 items-center">
          {/* Orbital ring */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative mx-auto w-full max-w-[380px] aspect-square"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 48, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0"
            >
              {orbitTechs.map((tech, i) => {
                const angle = (i / orbitTechs.length) * 360;
                const isActive = active?.name === tech.name;
                return (
                  <div
                    key={tech.name}
                    className="absolute left-1/2 top-1/2"
                    style={{
                      transform: `rotate(${angle}deg) translateX(150px)`,
                    }}
                  >
                    <motion.button
                      type="button"
                      onClick={() => {
                        setActive(tech);
                        setCombo(null);
                      }}
                      whileHover={{ scale: 1.15 }}
                      whileTap={{ scale: 0.95 }}
                      style={{ transform: `rotate(-${angle}deg)` }}
                      className={`flex flex-col items-center gap-1 px-3 py-2 rounded-xl border text-xs font-mono transition-colors ${
                        isActive
                          ? 'border-accent bg-accent/15 shadow-lg shadow-accent/20'
                          : 'border-primary/40 bg-background-secondary/90 hover:border-accent/60'
                      }`}
                    >
                      <span className="text-2xl">{tech.icon}</span>
                      <span className="text-foreground font-semibold">{tech.name}</span>
                    </motion.button>
                  </div>
                );
              })}
            </motion.div>

            {/* Center core */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <motion.div
                animate={{ scale: [1, 1.04, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="w-28 h-28 rounded-full border-2 border-accent/50 flex flex-col items-center justify-center font-mono text-center"
                style={{
                  background:
                    'radial-gradient(circle, oklch(0.66 0.24 305 / 0.35) 0%, oklch(0.12 0.04 295) 70%)',
                  boxShadow: '0 0 40px oklch(0.66 0.24 305 / 0.35)',
                }}
              >
                <Zap className="text-accent mb-1" size={22} />
                <span className="text-[10px] tracking-widest text-accent">AV.CORE</span>
                <span className="text-lg font-black text-foreground">v2.0</span>
              </motion.div>
            </div>

            {/* Orbit rings */}
            <div className="absolute inset-8 rounded-full border border-primary/20" />
            <div className="absolute inset-16 rounded-full border border-dashed border-accent/25" />
          </motion.div>

          {/* Detail panel */}
          <div className="space-y-6">
            <AnimatePresence mode="wait">
              {active && (
                <motion.div
                  key={active.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="p-6 rounded-2xl border border-primary/30 bg-background-secondary/80 backdrop-blur-sm"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <span className="text-4xl">{active.icon}</span>
                    <div>
                      <h3 className="text-2xl font-bold text-foreground">{active.name}</h3>
                      <p className="text-sm text-accent font-medium">{active.category}</p>
                    </div>
                  </div>
                  <p className="text-foreground-secondary mb-5 italic">&ldquo;{active.vibe}&rdquo;</p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-mono text-muted-foreground">
                      <span>POWER LEVEL</span>
                      <span style={{ color: active.color }}>{active.power}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-background overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${active.power}%` }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                        className="h-full rounded-full"
                        style={{
                          background: `linear-gradient(90deg, ${active.color}, oklch(0.82 0.16 200))`,
                          boxShadow: `0 0 12px ${active.color}80`,
                        }}
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.button
              type="button"
              onClick={spinStack}
              disabled={spinning}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-semibold text-white disabled:opacity-70"
              style={{
                background: 'linear-gradient(135deg, #a855f7, #06b6d4)',
                boxShadow: '0 0 24px rgba(168, 85, 247, 0.35)',
              }}
            >
              {spinning ? (
                <>
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{ duration: 0.7, repeat: Infinity, ease: 'linear' }}
                  >
                    <Shuffle size={20} />
                  </motion.span>
                  Rolling the stack...
                </>
              ) : (
                <>
                  <Shuffle size={20} />
                  Spin Random Stack Combo
                </>
              )}
            </motion.button>

            <AnimatePresence>
              {combo && comboTechs.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="p-5 rounded-xl border border-accent/40 bg-accent/5"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <Sparkles className="text-accent" size={18} />
                    <span className="text-sm font-bold text-accent tracking-wide">COMBO UNLOCKED</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {comboTechs.map((t) => (
                      <span
                        key={t.name}
                        className="px-3 py-1 rounded-full text-xs font-mono border border-primary/40 bg-background-secondary"
                      >
                        {t.icon} {t.name}
                      </span>
                    ))}
                  </div>
                  <p className="text-foreground-secondary leading-relaxed">{combo}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Marquee strip */}
        <div className="mt-14 overflow-hidden rounded-xl border border-primary/25 bg-background-secondary/50 py-3">
          <motion.div
            animate={{ x: ['0%', '-50%'] }}
            transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
            className="flex gap-6 whitespace-nowrap w-max"
          >
            {[...TECH_STACK, ...TECH_STACK].map((tech, i) => (
              <span
                key={`${tech.name}-${i}`}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 text-sm font-mono text-foreground-secondary"
              >
                <span>{tech.icon}</span>
                {tech.name}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
