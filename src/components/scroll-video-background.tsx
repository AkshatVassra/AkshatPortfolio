'use client';

import { useEffect, useRef } from 'react';

export function ScrollVideoBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const wallpaperRef = useRef<HTMLDivElement>(null);
  const videoWrapRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const targetTimeRef = useRef(0);

  useEffect(() => {
    const video = videoRef.current;
    const wallpaper = wallpaperRef.current;
    const videoWrap = videoWrapRef.current;
    if (!video || !wallpaper || !videoWrap) return;

    const FADE_ZONE = 0.18; // first 18% of scroll = crossfade zone

    const onScroll = () => {
      const scrollTop = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll <= 0) return;

      const progress = Math.min(Math.max(scrollTop / maxScroll, 0), 1);

      // Crossfade: wallpaper fades out, video fades in over first FADE_ZONE
      const fadeProgress = Math.min(progress / FADE_ZONE, 1);
      wallpaper.style.opacity = String(1 - fadeProgress);
      videoWrap.style.opacity = String(fadeProgress);

      // Video time: only start advancing once fade begins
      if (video.duration && fadeProgress > 0) {
        const videoProgress = Math.min(Math.max((progress - 0) / 1, 0), 1);
        targetTimeRef.current = videoProgress * video.duration;

        if (rafRef.current !== null) return;
        rafRef.current = requestAnimationFrame(() => {
          rafRef.current = null;
          if (video.duration) {
            video.currentTime = targetTimeRef.current;
          }
        });
      }
    };

    video.addEventListener('loadedmetadata', () => {
      video.currentTime = 0;
    });

    window.addEventListener('scroll', onScroll, { passive: true });
    // set initial state
    onScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div className="fixed inset-0 -z-20 overflow-hidden pointer-events-none">

      {/* ── Tech Wallpaper (shown at top) ── */}
      <div ref={wallpaperRef} className="absolute inset-0" style={{ transition: 'opacity 0.05s linear' }}>
        {/* Base dark gradient */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 120% 80% at 50% 40%, oklch(0.05 0 0) 0%, oklch(0 0 0) 60%, oklch(0 0 0) 100%)',
          }}
        />

        {/* Circuit grid */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(oklch(0.62 0.26 29 / 0.12) 1px, transparent 1px),
              linear-gradient(90deg, oklch(0.62 0.26 29 / 0.12) 1px, transparent 1px)
            `,
            backgroundSize: '48px 48px',
          }}
        />

        {/* Larger accent grid */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(oklch(0.45 0.2 29 / 0.07) 1px, transparent 1px),
              linear-gradient(90deg, oklch(0.45 0.2 29 / 0.07) 1px, transparent 1px)
            `,
            backgroundSize: '192px 192px',
          }}
        />

        {/* Glowing orbs */}
        <div
          className="absolute rounded-full"
          style={{
            width: 700,
            height: 700,
            top: '-15%',
            left: '-10%',
            background: 'radial-gradient(circle, oklch(0.62 0.26 29 / 0.22) 0%, transparent 70%)',
            filter: 'blur(40px)',
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            width: 600,
            height: 600,
            bottom: '-10%',
            right: '-8%',
            background: 'radial-gradient(circle, oklch(0.45 0.2 29 / 0.18) 0%, transparent 70%)',
            filter: 'blur(50px)',
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            width: 400,
            height: 400,
            top: '30%',
            left: '55%',
            background: 'radial-gradient(circle, oklch(0.62 0.26 29 / 0.14) 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />

        {/* Circuit node dots at grid intersections */}
        {Array.from({ length: 40 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: i % 5 === 0 ? 4 : 2,
              height: i % 5 === 0 ? 4 : 2,
              top: `${(i * 7.3) % 100}%`,
              left: `${(i * 11.7) % 100}%`,
              background:
                i % 3 === 0
                  ? 'oklch(0.45 0.2 29 / 0.8)'
                  : 'oklch(0.62 0.26 29 / 0.7)',
              boxShadow:
                i % 5 === 0
                  ? '0 0 6px oklch(0.45 0.2 29 / 0.9)'
                  : '0 0 3px oklch(0.62 0.26 29 / 0.6)',
            }}
          />
        ))}

        {/* Horizontal circuit traces */}
        {[15, 35, 55, 72, 88].map((top, i) => (
          <div
            key={i}
            className="absolute"
            style={{
              top: `${top}%`,
              left: `${[5, 20, 10, 15, 8][i]}%`,
              width: `${[30, 25, 40, 20, 35][i]}%`,
              height: 1,
              background: `linear-gradient(90deg, transparent, oklch(${i % 2 === 0 ? '0.55 0.3 29' : '0.7 0.3 340'} / 0.4), transparent)`,
            }}
          />
        ))}
        {[20, 45, 65, 80].map((top, i) => (
          <div
            key={i}
            className="absolute"
            style={{
              top: `${top}%`,
              right: `${[5, 12, 8, 18][i]}%`,
              width: `${[28, 22, 35, 25][i]}%`,
              height: 1,
              background: `linear-gradient(270deg, transparent, oklch(${i % 2 === 0 ? '0.7 0.3 340' : '0.55 0.3 29'} / 0.35), transparent)`,
            }}
          />
        ))}

        {/* Vertical circuit traces */}
        {[12, 30, 52, 70, 85].map((left, i) => (
          <div
            key={i}
            className="absolute"
            style={{
              left: `${left}%`,
              top: `${[10, 25, 5, 30, 15][i]}%`,
              width: 1,
              height: `${[25, 20, 30, 22, 28][i]}%`,
              background: `linear-gradient(180deg, transparent, oklch(${i % 2 === 0 ? '0.55 0.3 29' : '0.7 0.3 340'} / 0.35), transparent)`,
            }}
          />
        ))}

        {/* "CODE" text watermark */}
        <div
          className="absolute inset-0 flex items-center justify-center select-none"
          style={{ pointerEvents: 'none' }}
        >
          <span
            style={{
              fontSize: 'clamp(6rem, 20vw, 18rem)',
              fontWeight: 900,
              letterSpacing: '-0.05em',
              background:
                'linear-gradient(135deg, oklch(0.62 0.26 29 / 0.06), oklch(0.45 0.2 29 / 0.06))',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              userSelect: 'none',
            }}
          >
            &lt;/&gt;
          </span>
        </div>

        {/* Vignette */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 80% 80% at 50% 50%, transparent 40%, oklch(0 0 0 / 0.5) 100%)',
          }}
        />
      </div>

      {/* ── Video Layer (fades in as user scrolls) ── */}
      <div
        ref={videoWrapRef}
        className="absolute inset-0"
        style={{ opacity: 0, transition: 'opacity 0.05s linear' }}
      >
        <video
          ref={videoRef}
          src="/bg-video.mp4"
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      {/* Shared overlay for readability */}
      <div className="absolute inset-0 bg-black/50" />
    </div>
  );
}
