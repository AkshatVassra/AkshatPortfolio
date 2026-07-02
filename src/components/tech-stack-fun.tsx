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
            background: 'radial-gradient(circle, oklch(0.55 0.2 29 / 0.25) 0%, transparent 70%)',
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

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Orbital ring */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative mx-auto w-full max-w-[380px] aspect-square"
            style={{
              ['--orbit-radius' as any]: 'clamp(105px, 36vw, 150px)',
            }}
          >
            {/* Rotating container */}
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
                    className="absolute left-1/2 top-1/2 w-24 h-24 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none"
                    style={{
                      transform: `rotate(${angle}deg) translateX(var(--orbit-radius)) rotate(${-angle}deg)`,
                    }}
                  >
                    <motion.button
                      type="button"
                      onClick={() => {
                        setActive(tech);
                        setCombo(null);
                      }}
                      whileHover={{
                        scale: 1.12,
                        borderColor: tech.color,
                        backgroundColor: `${tech.color}15`,
                      }}
                      whileTap={{ scale: 0.95 }}
                      animate={{ rotate: -360 }}
                      transition={{ duration: 48, repeat: Infinity, ease: 'linear' }}
                      style={{
                        transformOrigin: 'center',
                        borderColor: isActive ? tech.color : 'rgba(255,255,255,0.1)',
                        backgroundColor: isActive ? `${tech.color}25` : 'rgba(255,255,255,0.03)',
                        boxShadow: isActive ? `0 0 20px ${tech.color}35` : 'none',
                      }}
                      className={`pointer-events-auto flex flex-col items-center gap-1.5 px-3.5 py-2.5 rounded-xl border text-xs font-mono transition-colors text-foreground font-semibold backdrop-blur-md cursor-pointer`}
                    >
                      <span className="text-2xl">{tech.icon}</span>
                      <span className="text-foreground font-bold tracking-wide">{tech.name}</span>
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
                className="w-28 h-28 rounded-full border-2 flex flex-col items-center justify-center font-mono text-center transition-all duration-500"
                style={{
                  borderColor: active ? `${active.color}80` : 'oklch(0.62 0.26 29 / 0.5)',
                  background: active
                    ? `radial-gradient(circle, ${active.color}20 0%, oklch(0.05 0 0) 70%)`
                    : 'radial-gradient(circle, oklch(0.55 0.2 29 / 0.35) 0%, oklch(0.05 0 0) 70%)',
                  boxShadow: active
                    ? `0 0 40px ${active.color}40`
                    : '0 0 40px oklch(0.55 0.2 29 / 0.35)',
                }}
              >
                <Zap className="mb-1 transition-colors duration-500" size={22} style={{ color: active ? active.color : 'var(--color-accent)' }} />
                <span className="text-[10px] tracking-widest transition-colors duration-500" style={{ color: active ? active.color : 'var(--color-accent)' }}>AV.CORE</span>
                <span className="text-lg font-black text-foreground">v2.0</span>
              </motion.div>
            </div>

            {/* Orbit rings */}
            <div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/20 pointer-events-none"
              style={{
                width: 'calc(2 * var(--orbit-radius))',
                height: 'calc(2 * var(--orbit-radius))',
              }}
            />
            <div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-accent/25 pointer-events-none"
              style={{
                width: 'calc(2 * var(--orbit-radius) - 40px)',
                height: 'calc(2 * var(--orbit-radius) - 40px)',
              }}
            />
            <div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dotted border-primary/10 pointer-events-none"
              style={{
                width: 'calc(2 * var(--orbit-radius) + 40px)',
                height: 'calc(2 * var(--orbit-radius) + 40px)',
              }}
            />
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
                  style={{
                    borderColor: `${active.color}30`,
                    boxShadow: `0 8px 32px 0 rgba(0, 0, 0, 0.37), 0 0 24px ${active.color}15`,
                    background: `linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.01) 100%)`,
                  }}
                  className="p-6 rounded-2xl border backdrop-blur-md"
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
                      <span style={{ color: active.color }} className="font-bold">{active.power}%</span>
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
              className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-semibold text-white disabled:opacity-70 cursor-pointer"
              style={{
                background: 'linear-gradient(135deg, oklch(0.62 0.26 29), oklch(0.45 0.2 29))',
                boxShadow: '0 0 24px oklch(0.62 0.26 29 / 0.5)',
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
                  className="p-5 rounded-xl border backdrop-blur-md"
                  style={{
                    borderColor: 'oklch(0.62 0.26 29 / 0.3)',
                    background: 'linear-gradient(135deg, oklch(0.62 0.26 29 / 0.08) 0%, oklch(0.62 0.26 29 / 0.02) 100%)',
                    boxShadow: '0 4px 20px oklch(0.62 0.26 29 / 0.05)',
                  }}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <Sparkles className="text-accent" size={18} />
                    <span className="text-sm font-bold text-accent tracking-wide">COMBO UNLOCKED</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {comboTechs.map((t) => (
                      <span
                        key={t.name}
                        className="px-3 py-1 rounded-full text-xs font-mono border border-white/10 bg-white/5 text-foreground/90"
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

        {/* Marquee strip with fade mask */}
        <div className="relative mt-14 overflow-hidden rounded-xl border border-white/10 bg-background-secondary/40 py-3">
          {/* Fade gradients */}
          <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-background via-background/70 to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-background via-background/70 to-transparent z-10 pointer-events-none" />

          <motion.div
            animate={{ x: ['0%', '-50%'] }}
            transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
            className="flex gap-6 whitespace-nowrap w-max"
          >
            {[...TECH_STACK, ...TECH_STACK].map((tech, i) => (
              <span
                key={`${tech.name}-${i}`}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/5 bg-white/5 text-sm font-mono text-foreground/80 hover:border-accent/40 transition-colors cursor-default"
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
