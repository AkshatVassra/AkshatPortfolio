'use client';

import { motion } from 'framer-motion';

// Reduced to 2 blobs + 6 particles — heavy blur removed
export function MotionBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Grid — static, no animation */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(168,85,247,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(168,85,247,0.5) 1px,transparent 1px)',
          backgroundSize: '60px 60px',
          maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)',
        }}
      />

      {/* Blob 1 — only translate + scale, no blur change */}
      <motion.div
        animate={{ x: [0, 80, -50, 0], y: [0, -70, 40, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-40 -left-40 w-[550px] h-[550px] rounded-full"
        style={{ background: 'rgba(168,85,247,0.18)', filter: 'blur(80px)', willChange: 'transform' }}
      />

      {/* Blob 2 */}
      <motion.div
        animate={{ x: [0, -100, 60, 0], y: [0, 60, -40, 0] }}
        transition={{ duration: 28, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -bottom-20 -right-20 w-[500px] h-[500px] rounded-full"
        style={{ background: 'rgba(6,182,212,0.14)', filter: 'blur(90px)', willChange: 'transform' }}
      />

      {/* 6 lightweight particles — translate + opacity only */}
      {[0,1,2,3,4,5].map(i => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full"
          style={{
            top: `${[15,35,55,70,25,80][i]}%`,
            left: `${[10,30,55,75,85,45][i]}%`,
            background: i % 2 === 0 ? 'rgba(6,182,212,0.7)' : 'rgba(168,85,247,0.7)',
            willChange: 'transform, opacity',
          }}
          animate={{ y: [0, -28, 0], opacity: [0, 0.8, 0] }}
          transition={{ duration: 4 + i * 0.8, repeat: Infinity, delay: i * 0.6, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
}
