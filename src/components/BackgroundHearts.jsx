import React, { useEffect, useState } from 'react';
import { playPop } from '../utils/soundEffects';

const HEART_EMOJIS = ['💖', '💕', '🌸', '✨', '🍓', '🎀', '🧸', '💘', '🤍', '💌'];

export default function BackgroundHearts({ soundEnabled }) {
  const [clickHearts, setClickHearts] = useState([]);
  const [floatingParticles, setFloatingParticles] = useState([]);

  useEffect(() => {
    // Generate static floating ambient items
    const particles = Array.from({ length: 18 }).map((_, i) => ({
      id: i,
      emoji: HEART_EMOJIS[i % HEART_EMOJIS.length],
      left: `${(i * 5.5 + Math.random() * 4).toFixed(1)}%`,
      duration: `${(7 + Math.random() * 6).toFixed(1)}s`,
      delay: `${(Math.random() * 8).toFixed(1)}s`,
      drift: `${(Math.random() * 60 - 30).toFixed(0)}px`,
      size: `${(1.2 + Math.random() * 1.4).toFixed(1)}rem`,
      opacity: (0.4 + Math.random() * 0.4).toFixed(2),
    }));
    setFloatingParticles(particles);
  }, []);

  // Handle clicking on background to pop cute heart bursts
  const handleScreenClick = (e) => {
    // Ignore clicks if clicking inside an interactive element like button or input
    if (e.target.closest('button, input, select, textarea, a, .clickable-card')) {
      return;
    }

    if (soundEnabled) {
      playPop();
    }

    const newHeart = {
      id: Date.now() + Math.random(),
      x: e.clientX,
      y: e.clientY,
      emoji: HEART_EMOJIS[Math.floor(Math.random() * HEART_EMOJIS.length)],
    };

    setClickHearts((prev) => [...prev.slice(-12), newHeart]);

    setTimeout(() => {
      setClickHearts((prev) => prev.filter((h) => h.id !== newHeart.id));
    }, 1200);
  };

  return (
    <div
      onClick={handleScreenClick}
      className="fixed inset-0 pointer-events-auto overflow-hidden z-0 cursor-default"
      aria-hidden="true"
    >
      {/* Floating ambient particles */}
      {floatingParticles.map((p) => (
        <div
          key={p.id}
          className="floating-heart select-none cursor-pointer transition-transform hover:scale-150"
          style={{
            '--float-left': p.left,
            '--float-duration': p.duration,
            '--float-delay': p.delay,
            '--drift-x': p.drift,
            fontSize: p.size,
            opacity: p.opacity,
          }}
          onClick={(e) => {
            e.stopPropagation();
            if (soundEnabled) playPop();
            // Poof effect
            const target = e.currentTarget;
            target.style.transform = 'scale(2) rotate(45deg)';
            target.style.opacity = '0';
            setTimeout(() => {
              target.style.transform = '';
              target.style.opacity = p.opacity;
            }, 2500);
          }}
        >
          {p.emoji}
        </div>
      ))}

      {/* Dynamic click burst hearts */}
      {clickHearts.map((h) => (
        <div
          key={h.id}
          className="fixed pointer-events-none text-2xl animate-float"
          style={{
            left: `${h.x - 12}px`,
            top: `${h.y - 16}px`,
            animation: 'burstFade 1.1s cubic-bezier(0.16, 1, 0.3, 1) forwards',
          }}
        >
          {h.emoji}
        </div>
      ))}

      <style>{`
        @keyframes burstFade {
          0% {
            opacity: 1;
            transform: translate3d(0, 0, 0) scale(0.6) rotate(0deg);
          }
          50% {
            opacity: 1;
            transform: translate3d(0, -35px, 0) scale(1.4) rotate(15deg);
          }
          100% {
            opacity: 0;
            transform: translate3d(0, -65px, 0) scale(0.8) rotate(-10deg);
          }
        }
      `}</style>
    </div>
  );
}

