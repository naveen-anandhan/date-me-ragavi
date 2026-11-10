import React, { useState, useRef } from 'react';
import { PROPOSAL_STAGES } from '../data/stages';
import { playSqueak, playDodgeWhoosh, playYesFanfare } from '../utils/soundEffects';
import { Heart, Sparkles, AlertCircle } from 'lucide-react';

export default function ProposalCard({
  recipientName,
  onYes,
  soundEnabled,
  noCount,
  setNoCount,
  onOpenReasons,
}) {
  const [dodgePosition, setDodgePosition] = useState({ x: 0, y: 0 });
  const [isDodging, setIsDodging] = useState(false);
  const cardRef = useRef(null);

  const stageIndex = Math.min(noCount, PROPOSAL_STAGES.length - 1);
  const currentStage = PROPOSAL_STAGES[stageIndex];

  // Button scaling factors
  // Growth curve: starts gentle, gets hilariously big
  const scale = 1 + Math.min(noCount, 12) * 0.16;
  const paddingY = Math.min(14 + noCount * 4, 32);
  const paddingX = Math.min(28 + noCount * 6, 60);
  const fontSize = Math.min(18 + noCount * 3, 36);

  // Handle clicking NO
  const handleNoClick = () => {
    if (soundEnabled) {
      playSqueak();
    }
    const nextCount = noCount + 1;
    setNoCount(nextCount);

    // If we've reached dodging stage, jump immediately
    if (nextCount >= 5) {
      triggerDodge();
    }
  };

  // Dodging mechanic when mouse gets close or button is hovered/clicked
  const triggerDodge = () => {
    if (soundEnabled) {
      playDodgeWhoosh();
    }
    setIsDodging(true);

    // Calculate a safe randomized translation offset within the viewport
    const maxX = Math.min(window.innerWidth / 3, 160);
    const maxY = Math.min(window.innerHeight / 4, 130);

    const randomX = (Math.random() - 0.5) * 2 * maxX;
    const randomY = (Math.random() - 0.5) * 2 * maxY;

    setDodgePosition({ x: randomX, y: randomY });
  };

  const handleNoMouseEnter = () => {
    if (noCount >= 5) {
      triggerDodge();
    }
  };

  const handleYesClick = () => {
    if (soundEnabled) {
      playYesFanfare();
    }
    onYes();
  };

  return (
    <div
      ref={cardRef}
      className="relative z-10 w-full max-w-md mx-auto p-6 sm:p-8 rounded-3xl bg-white/85 backdrop-blur-xl border border-pink-200/80 shadow-2xl shadow-pink-200/50 text-center transition-all duration-300"
    >
      {/* Decorative top badge */}
      <div className="inline-flex items-center gap-1.5 px-3 py-1 mb-4 rounded-full bg-pink-100/80 border border-pink-200 text-pink-700 text-xs font-semibold tracking-wide shadow-sm">
        <Sparkles className="w-3.5 h-3.5 text-pink-500 animate-spin" style={{ animationDuration: '6s' }} />
        <span>{currentStage.badge}</span>
      </div>

      {/* Cute GIF Display with soft glow frame */}
      <div className="relative mx-auto mb-5 w-56 h-56 sm:w-64 sm:h-64 rounded-2xl overflow-hidden bg-pink-50/60 p-2 border-2 border-pink-200/60 shadow-inner flex items-center justify-center">
        <img
          src={currentStage.image}
          alt={currentStage.alt}
          className="w-full h-full object-contain rounded-xl transition-all duration-300"
          loading="eager"
        />
        {/* Subtle decorative heart sticker on the image */}
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm p-1.5 rounded-full shadow-md text-pink-500">
          <Heart className="w-4 h-4 fill-pink-500" />
        </div>
      </div>

      {/* Main Heading */}
      <h1 className="font-bubble text-2xl sm:text-3xl font-bold text-gray-800 leading-snug mb-2">
        {recipientName && noCount === 0 ? (
          <>
            Hey <span className="text-pink-600 font-extrabold">{recipientName}</span>...{' '}
            <br />
            {currentStage.heading}
          </>
        ) : (
          currentStage.heading
        )}
      </h1>

      {/* Pleading Subtext */}
      <p className="text-sm sm:text-base text-gray-600 font-medium mb-3 min-h-[44px] flex items-center justify-center px-2">
        {currentStage.subtext}
      </p>

      {/* Button to open Reasons to Say Yes */}
      {onOpenReasons && (
        <button
          onClick={onOpenReasons}
          className="inline-flex items-center gap-1.5 px-3 py-1 mb-4 rounded-full bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 text-xs font-bold transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-sm"
        >
          <span>🍓 Need convincing, {recipientName || 'Ragavi'}? Tap for 5 sweet reasons!</span>
        </button>
      )}

      {/* Pity / Dramatic Heartbreak Progress Bar */}
      {noCount > 0 && (
        <div className="mb-6 p-2 rounded-xl bg-pink-50/90 border border-pink-100 flex items-center justify-between text-xs text-pink-600 font-medium">
          <span className="flex items-center gap-1">
            <AlertCircle className="w-3.5 h-3.5 text-pink-500" />
            Pity Counter:
          </span>
          <div className="flex gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <span
                key={i}
                className={`transition-transform duration-200 ${
                  i < noCount ? 'scale-110 opacity-100' : 'opacity-25'
                }`}
              >
                💔
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Response Action Buttons */}
      <div className="relative flex flex-col sm:flex-row items-center justify-center gap-4 pt-2 pb-2">
        {/* The Growing YES Button */}
        <button
          onClick={handleYesClick}
          style={{
            transform: `scale(${scale})`,
            paddingTop: `${paddingY}px`,
            paddingBottom: `${paddingY}px`,
            paddingLeft: `${paddingX}px`,
            paddingRight: `${paddingX}px`,
            fontSize: `${fontSize}px`,
          }}
          className="relative group z-20 font-bubble font-bold text-white rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-red-500 hover:from-pink-600 hover:to-red-600 shadow-lg shadow-pink-500/40 hover:shadow-xl hover:shadow-pink-500/60 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
        >
          <Heart className="w-5 h-5 fill-white animate-heartbeat inline-block" />
          <span>Yes! ❤️</span>
          <Sparkles className="w-4 h-4 text-yellow-200 opacity-90 group-hover:rotate-12 transition-transform inline-block" />
        </button>

        {/* The "No / Please Think Again" Button */}
        <button
          onClick={handleNoClick}
          onMouseEnter={handleNoMouseEnter}
          onTouchStart={handleNoMouseEnter}
          style={
            isDodging && noCount >= 5
              ? {
                  transform: `translate(${dodgePosition.x}px, ${dodgePosition.y}px)`,
                  transition: 'transform 0.22s cubic-bezier(0.34, 1.56, 0.64, 1)',
                }
              : undefined
          }
          className={`z-10 px-5 py-3 rounded-full font-medium text-sm sm:text-base border transition-all duration-200 cursor-pointer shadow-sm ${
            noCount >= 5
              ? 'bg-rose-100/90 hover:bg-rose-200 text-rose-700 border-rose-300 font-bold'
              : 'bg-gray-100/90 hover:bg-rose-50 text-gray-700 hover:text-rose-600 border-gray-200 hover:border-pink-300 active:scale-95'
          }`}
        >
          {currentStage.noText}
        </button>
      </div>

      {/* Dodging Helper Hint when button runs away */}
      {noCount >= 5 && (
        <p className="mt-4 text-xs font-semibold text-rose-500 animate-pulse">
          ✨ The button doesn't want you to say no! Just tap YES! 🥰
        </p>
      )}
    </div>
  );
}

