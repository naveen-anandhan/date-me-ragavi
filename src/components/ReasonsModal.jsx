import React, { useState } from 'react';
import { X, Heart, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { playPop, triggerHaptic } from '../utils/soundEffects';

const REASONS = [
  {
    number: '01',
    emoji: '☀️',
    title: 'Your Radiant Smile',
    desc: 'The way your face lights up whenever you laugh has the power to turn even my toughest days into pure happiness.',
    tag: 'Pure Magic ✨',
  },
  {
    number: '02',
    emoji: '🧸',
    title: 'Your Caring Heart',
    desc: 'You have the gentlest soul and the sweetest presence. Being around you feels like home.',
    tag: 'One in a Million 💫',
  },
  {
    number: '03',
    emoji: '🪐',
    title: 'The Cutest Energy',
    desc: 'Everything is simply more fun with you—whether we are talking for hours or just sitting in comfortable silence.',
    tag: 'My Favorite Vibe 💖',
  },
  {
    number: '04',
    emoji: '🍫',
    title: 'The Promise of Snacks & Laughs',
    desc: 'I promise to always share my favorite food, order extra fries for you, and keep you laughing endlessly.',
    tag: 'Treats Guaranteed 🍰',
  },
  {
    number: '05',
    emoji: '💍',
    title: 'Because You Are Ragavi',
    desc: 'There is nobody else in the entire universe quite like you. My heart chose you, and it chooses you every single day.',
    tag: 'Forever & Always ❤️',
  },
];

export default function ReasonsModal({ isOpen, onClose, recipientName, soundEnabled }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!isOpen) return null;

  const current = REASONS[currentIndex];

  const handleNext = () => {
    if (soundEnabled) playPop();
    triggerHaptic([20]);
    setCurrentIndex((prev) => (prev + 1) % REASONS.length);
  };

  const handlePrev = () => {
    if (soundEnabled) playPop();
    triggerHaptic([20]);
    setCurrentIndex((prev) => (prev - 1 + REASONS.length) % REASONS.length);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-sm bg-white rounded-3xl p-6 sm:p-7 shadow-2xl border border-pink-200 text-center overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Header */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 mb-3 rounded-full bg-pink-100 text-pink-700 text-xs font-bold">
          <Sparkles className="w-3.5 h-3.5 text-pink-500" />
          <span>Reasons to Say Yes to Saravanan 💕</span>
        </div>

        <h3 className="font-bubble text-xl font-bold text-gray-800 mb-4">
          Why You & Me, {recipientName || 'Ragavi'}?
        </h3>

        {/* Polaroid Card Display */}
        <div className="relative mx-auto mb-5 p-5 bg-gradient-to-br from-pink-50 via-rose-50 to-amber-50 rounded-2xl border-2 border-pink-200 shadow-inner min-h-[220px] flex flex-col justify-between">
          {/* Top row with number and tag */}
          <div className="flex items-center justify-between">
            <span className="font-bubble text-pink-400 text-xs font-bold tracking-widest">
              REASON #{current.number}
            </span>
            <span className="px-2 py-0.5 rounded-full bg-white/80 border border-pink-200 text-[11px] font-bold text-pink-600 shadow-sm">
              {current.tag}
            </span>
          </div>

          {/* Center Emoji & Text */}
          <div className="my-2">
            <span className="text-4xl block mb-2">{current.emoji}</span>
            <h4 className="font-bubble text-lg font-bold text-gray-800 mb-1">
              {current.title}
            </h4>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-medium">
              {current.desc}
            </p>
          </div>

          {/* Bottom Card Footer */}
          <div className="flex items-center justify-center gap-1 text-[11px] text-pink-500 font-semibold">
            <Heart className="w-3 h-3 fill-pink-500" />
            <span>Card {currentIndex + 1} of {REASONS.length}</span>
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="flex items-center justify-between gap-3">
          <button
            onClick={handlePrev}
            className="flex-1 py-2 px-3 rounded-xl border border-pink-200 bg-white hover:bg-pink-50 text-pink-700 text-xs font-bold flex items-center justify-center gap-1 transition-all active:scale-95"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          <button
            onClick={handleNext}
            className="flex-1 py-2 px-3 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white text-xs font-bold flex items-center justify-center gap-1 shadow-md shadow-pink-500/20 transition-all active:scale-95"
          >
            <span>Next Reason</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <button
          onClick={onClose}
          className="w-full mt-3 py-2 text-xs font-bold text-pink-600 hover:text-pink-700 transition-colors"
        >
          I'm convinced! Take me back to say YES! 🥰
        </button>
      </div>
    </div>
  );
}

