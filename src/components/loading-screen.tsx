'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BOOT_LINES = [
  '> Initializing kernel...',
  '> Loading graphics engine...',
  '> Compiling shaders...',
  '> Booting game engine...',
  '> Calibrating AI modules...',
  '> Deploying assets...',
  '> All systems online.',
];

const CHARS = '01<>{}アイカキクコ#$%&';

export function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [lines, setLines] = useState<string[]>([]);
  const [exiting, setExiting] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);

  // Matrix rain — optimised: fixed font, pre-set columns, no resize jitter
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const FS = 14;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const cols = Math.floor(canvas.width / FS);
    const drops = new Float32Array(cols).fill(1);
    ctx.font = `${FS}px monospace`;

    let raf: number;
    let last = 0;
    const draw = (now: number) => {
      raf = requestAnimationFrame(draw);
      if (now - last < 40) return; // ~25 fps cap for rain
      last = now;

      ctx.fillStyle = 'rgba(2,4,8,0.12)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < cols; i++) {
        ctx.fillStyle = i % 4 === 0 ? 'oklch(0.45 0.2 29)' : 'oklch(0.62 0.26 29 / 0.5)';
        ctx.fillText(CHARS[Math.floor(Math.random() * CHARS.length)], i * FS, drops[i] * FS);
        if (drops[i] * FS > canvas.height && Math.random() > 0.97) drops[i] = 0;
        drops[i] += 0.7;
      }
    };
    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, []);

  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  // Fast progress: ~1s to reach 100 (run once — unstable onComplete was restarting this effect)
  useEffect(() => {
    let lineIdx = 0;
    let cancelled = false;

    const addLine = () => {
      if (cancelled || lineIdx >= BOOT_LINES.length) return;
      const nextLine = BOOT_LINES[lineIdx++];
      if (!nextLine) return;
      setLines((prev) => [...prev, nextLine]);
      requestAnimationFrame(() => {
        if (terminalRef.current) terminalRef.current.scrollTop = 9999;
      });
    };

    addLine();
    const lineTimer = setInterval(addLine, 160);

    const tick = () => {
      if (cancelled) return;
      progressRef.current += Math.random() * 5 + 2;
      if (progressRef.current >= 100) {
        progressRef.current = 100;
        setProgress(100);
        clearInterval(progTimer);
        clearInterval(lineTimer);
        setTimeout(() => {
          if (cancelled) return;
          setExiting(true);
          setTimeout(() => onCompleteRef.current(), 450);
        }, 250);
      } else {
        setProgress(Math.floor(progressRef.current));
      }
    };
    const progTimer = setInterval(tick, 22);

    return () => {
      cancelled = true;
      clearInterval(progTimer);
      clearInterval(lineTimer);
    };
  }, []);

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.03 }}
          transition={{ duration: 0.45, ease: 'easeInOut' }}
          className="fixed inset-0 z-9999 flex flex-col items-center justify-center overflow-hidden select-none"
          style={{ background: '#020408', willChange: 'opacity' }}
        >
          {/* Matrix rain */}
          <canvas ref={canvasRef} className="absolute inset-0 opacity-20 pointer-events-none" style={{ willChange: 'contents' }} />

          {/* Subtle grid — no blur */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: 'linear-gradient(rgba(168,85,247,0.07) 1px,transparent 1px),linear-gradient(90deg,rgba(168,85,247,0.07) 1px,transparent 1px)',
              backgroundSize: '48px 48px',
            }}
          />

          {/* Scanline — GPU only (translateY) */}
          <motion.div
            className="absolute inset-x-0 h-28 pointer-events-none"
            style={{ background: 'linear-gradient(180deg,transparent,rgba(168,85,247,0.05),transparent)', willChange: 'transform' }}
            animate={{ y: ['-5vh', '105vh'] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          />

          {/* Corner brackets */}
          {(['top-5 left-5 border-t-2 border-l-2','top-5 right-5 border-t-2 border-r-2','bottom-5 left-5 border-b-2 border-l-2','bottom-5 right-5 border-b-2 border-r-2'] as const).map((c, i) => (
            <div key={i} className={`absolute w-8 h-8 ${c}`} style={{ borderColor: 'rgba(6,182,212,0.55)' }} />
          ))}

          {/* Panel */}
          <div className="relative z-10 w-full max-w-md px-6">

            {/* Title — no drop-shadow filter */}
            <div className="mb-6 text-center">
              <motion.h1
                className="text-5xl font-black tracking-[0.25em] font-mono mb-1"
                style={{
                  background: 'linear-gradient(90deg,#a855f7,#06b6d4)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  willChange: 'transform',
                }}
                animate={{ x: [0, -1, 2, 0] }}
                transition={{ duration: 0.12, repeat: Infinity, repeatDelay: 3 }}
              >
                AV.SYS
              </motion.h1>
              <p className="text-[10px] tracking-[0.5em] font-mono" style={{ color: 'rgba(168,85,247,0.5)' }}>
                PORTFOLIO OS v2.0 — INITIALIZING
              </p>
            </div>

            {/* Role pills */}
            <div className="flex flex-wrap justify-center gap-2 mb-5">
              {['Full Stack','Software Dev','Game Dev','AI / ML'].map((r, i) => (
                <motion.span
                  key={r}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07, duration: 0.25 }}
                  className="px-3 py-1 text-[10px] font-mono rounded-full border"
                  style={{
                    borderColor: i % 2 === 0 ? 'rgba(168,85,247,0.45)' : 'rgba(6,182,212,0.45)',
                    color: i % 2 === 0 ? 'rgba(168,85,247,0.9)' : 'rgba(6,182,212,0.9)',
                    background: i % 2 === 0 ? 'rgba(168,85,247,0.06)' : 'rgba(6,182,212,0.06)',
                  }}
                >
                  {r}
                </motion.span>
              ))}
            </div>

            {/* Terminal — no backdrop-filter */}
            <div
              ref={terminalRef}
              className="mb-4 p-3 rounded-lg border font-mono text-xs overflow-y-auto"
              style={{ background: 'rgba(0,0,0,0.7)', borderColor: 'rgba(168,85,247,0.25)', height: 148 }}
            >
              <p className="text-purple-400/35 mb-1.5 text-[10px]">// BOOT LOG</p>
              {lines.map((line, i) => (
                <p
                  key={i}
                  className="leading-relaxed"
                  style={{
                    color: line?.includes('online') ? '#4ade80' : 'rgba(134,239,172,0.7)',
                  }}
                >
                  {line}
                </p>
              ))}
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.5, repeat: Infinity }}
                className="inline-block w-1.5 h-3"
                style={{ background: 'rgba(134,239,172,0.75)' }}
              />
            </div>

            {/* Progress */}
            <div className="space-y-1.5">
              <div className="flex justify-between font-mono text-xs">
                <span style={{ color: 'rgba(6,182,212,0.65)' }}>LOADING SYSTEM</span>
                <span style={{ color: progress === 100 ? '#4ade80' : 'rgba(6,182,212,0.85)' }} className="tabular-nums font-bold">
                  {progress}%
                </span>
              </div>

              <div className="relative h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.05)' }}>
                <div
                  className="absolute inset-y-0 left-0 rounded-full"
                  style={{
                    width: `${progress}%`,
                    background: 'linear-gradient(90deg, oklch(0.62 0.26 29), oklch(0.45 0.2 29))',
                    boxShadow: '0 0 8px oklch(0.45 0.2 29 / 0.6)',
                    transition: 'width 0.05s linear',
                    willChange: 'width',
                  }}
                />
              </div>

              <div className="flex justify-between font-mono text-[9px]">
                {[0,25,50,75,100].map(t => (
                  <span key={t} style={{ color: progress >= t ? 'oklch(0.45 0.2 29 / 0.6)' : 'oklch(0.62 0.26 29 / 0.25)' }}>{t}</span>
                ))}
              </div>
            </div>

            {/* Status */}
            <div className="mt-3 flex justify-between font-mono text-[9px]" style={{ color: 'rgba(168,85,247,0.4)' }}>
              <div className="flex items-center gap-1.5">
                <motion.div
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: progress === 100 ? '#4ade80' : '#a855f7', willChange: 'opacity' }}
                  animate={{ opacity: [1, 0.2, 1] }}
                  transition={{ duration: 0.6, repeat: Infinity }}
                />
                {progress === 100 ? 'READY' : 'LOADING...'}
              </div>
              <span>akshat.vassra.sys</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
