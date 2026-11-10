import React, { useState } from 'react';
import { X, Heart, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function LoveLetterModal({ isOpen, onClose, recipientName, senderName }) {
  const [isOpened, setIsOpened] = useState(false);

  if (!isOpen) return null;

  const handleOpenEnvelope = () => {
    setIsOpened(true);
    confetti({
      particleCount: 40,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#f43f5e', '#ec4899', '#fbcfe8'],
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-rose-200 text-center overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {!isOpened ? (
          /* Sealed Envelope Screen */
          <div className="py-6 flex flex-col items-center">
            <div className="relative mb-6 cursor-pointer group" onClick={handleOpenEnvelope}>
              <div className="w-48 h-32 sm:w-56 sm:h-36 bg-gradient-to-br from-rose-200 to-pink-300 rounded-2xl shadow-lg border-2 border-rose-300 flex items-center justify-center relative overflow-hidden transition-transform group-hover:scale-105">
                {/* Envelope Flap Triangle */}
                <div
                  className="absolute top-0 left-0 right-0 h-16 bg-rose-300/80"
                  style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }}
                />
                {/* Golden Wax Seal */}
                <div className="relative z-10 w-12 h-12 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-300 border-2 border-yellow-200 shadow-md flex items-center justify-center text-white font-bold group-hover:scale-110 transition-transform">
                  <Heart className="w-6 h-6 fill-white" />
                </div>
              </div>
            </div>

            <h3 className="font-bubble text-2xl font-bold text-gray-800 mb-1">
              A Secret Letter For You 💌
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              Tap the wax seal to unlock the message...
            </p>

            <button
              onClick={handleOpenEnvelope}
              className="py-2.5 px-6 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-bold text-sm shadow-md shadow-pink-500/30 flex items-center gap-2 transition-transform hover:scale-105"
            >
              <Sparkles className="w-4 h-4 text-yellow-200" />
              <span>Break Seal & Read</span>
            </button>
          </div>
        ) : (
          /* Opened Letter */
          <div className="py-2 animate-fade-in text-left">
            <div className="mb-4 pb-3 border-b border-pink-100 flex items-center justify-between">
              <div>
                <span className="text-xs uppercase tracking-widest text-pink-500 font-bold">
                  Secret Love Note
                </span>
                <h3 className="font-romantic text-2xl sm:text-3xl font-bold text-gray-800">
                  Dearest {recipientName || 'Love'},
                </h3>
              </div>
              <span className="text-3xl">🌸</span>
            </div>

            <div className="font-romantic text-xl sm:text-2xl text-gray-700 leading-relaxed space-y-3 bg-pink-50/50 p-4 rounded-2xl border border-pink-100">
              <p>
                From the moment I first thought of asking you out, my heart has been doing little happy flips.
              </p>
              <p>
                You bring so much warmth, giggles, and sunshine into my world. Saying "Yes" to this date isn't just about food or fun places—it's about getting to spend time with my absolute favorite person.
              </p>
              <p>
                I promise to make you smile, keep you safe, order your favorite desserts, and cherish every second.
              </p>
              <p className="pt-2 text-right font-bold text-pink-600">
                Forever yours,
                <br />
                {senderName || 'Me'} ❤️
              </p>
            </div>

            <div className="mt-5 text-center">
              <button
                onClick={onClose}
                className="py-2.5 px-8 rounded-full bg-pink-500 hover:bg-pink-600 text-white font-semibold text-sm shadow-md transition-all hover:scale-105"
              >
                Seal With A Kiss 💋
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

