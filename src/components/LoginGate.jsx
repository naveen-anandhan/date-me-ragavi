import React, { useState } from 'react';
import { Lock, KeyRound, Heart, Sparkles, Eye, EyeOff, ShieldAlert } from 'lucide-react';
import { playSqueak, playYesFanfare, triggerHaptic } from '../utils/soundEffects';
import confetti from 'canvas-confetti';

export default function LoginGate({ onLoginSuccess, soundEnabled }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isShaking, setIsShaking] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const cleanUser = username.trim().toLowerCase();
    const cleanPass = password.trim();

    if (cleanUser === 'saravanan' && cleanPass === 'madmg') {
      setError('');
      if (soundEnabled) playYesFanfare();
      triggerHaptic([60, 40, 100]);

      // Burst of golden and pink sparkles on successful login
      confetti({
        particleCount: 60,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#f43f5e', '#ec4899', '#facc15', '#ffffff'],
      });

      // Save auth in session storage
      sessionStorage.setItem('date_me_auth', 'true');

      setTimeout(() => {
        onLoginSuccess();
      }, 400);
    } else {
      if (soundEnabled) playSqueak();
      triggerHaptic([100]);
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 600);

      if (cleanUser !== 'saravanan') {
        setError('Incorrect username! Only Saravanan can enter this portal 🥺');
      } else {
        setError('Secret password incorrect! Please enter the magic key 🔑');
      }
    }
  };

  return (
    <div className="relative z-10 w-full max-w-sm mx-auto p-6 sm:p-8 rounded-3xl bg-white/90 backdrop-blur-2xl border border-pink-200/90 shadow-2xl shadow-pink-300/40 text-center transition-all">
      {/* Top Badge */}
      <div className="inline-flex items-center gap-1.5 px-3.5 py-1 mb-4 rounded-full bg-pink-100/90 border border-pink-200 text-pink-700 text-xs font-bold tracking-wide shadow-sm">
        <Lock className="w-3.5 h-3.5 text-pink-600" />
        <span>Private Love Vault 🔐</span>
      </div>

      {/* Cute Lock Avatar */}
      <div className="relative mx-auto mb-4 w-28 h-28 rounded-2xl overflow-hidden bg-pink-50 p-2 border-2 border-pink-200 shadow-inner flex items-center justify-center">
        <img
          src={`${import.meta.env.BASE_URL}images/image1.gif`}
          alt="Cute kitten holding flowers"
          className="w-full h-full object-contain rounded-xl"
        />
        <div className="absolute -bottom-1 -right-1 bg-white p-1.5 rounded-full shadow-md text-pink-500 border border-pink-100">
          <KeyRound className="w-4 h-4 text-rose-500" />
        </div>
      </div>

      <h2 className="font-bubble text-2xl font-bold text-gray-800 mb-1">
        Welcome Saravanan 💖
      </h2>
      <p className="text-xs text-gray-500 mb-5">
        Enter your secret credentials to unlock the romantic proposal prepared for <span className="font-bold text-pink-600">Ragavi</span>!
      </p>

      {/* Login Form */}
      <form
        onSubmit={handleSubmit}
        className={`space-y-3.5 text-left ${isShaking ? 'animate-wiggle' : ''}`}
      >
        <div>
          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
            Username
          </label>
          <div className="relative">
            <input
              type="text"
              autoComplete="username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setError('');
              }}
              placeholder="saravanan"
              className="w-full pl-3.5 pr-3 py-2.5 rounded-xl border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-400 text-sm font-medium text-gray-800 placeholder-gray-400 bg-white/80"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              autoComplete="current-password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError('');
              }}
              placeholder="•••••"
              className="w-full pl-3.5 pr-10 py-2.5 rounded-xl border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-400 text-sm font-medium text-gray-800 placeholder-gray-400 bg-white/80"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Error message */}
        {error && (
          <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 flex items-start gap-2 text-xs text-rose-600 font-semibold animate-fade-in">
            <ShieldAlert className="w-4 h-4 shrink-0 text-rose-500 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <button
          type="submit"
          className="w-full mt-2 py-3 px-4 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-bubble font-bold text-base shadow-lg shadow-pink-500/30 flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-95 cursor-pointer"
        >
          <Sparkles className="w-4 h-4 text-yellow-200" />
          <span>Unlock My Heart 💖</span>
        </button>
      </form>

      <div className="mt-4 pt-3 border-t border-pink-100 flex items-center justify-center gap-1 text-[11px] text-gray-400">
        <Heart className="w-3 h-3 fill-pink-400 text-pink-400" />
        <span>Dedicated to Ragavi with love</span>
      </div>
    </div>
  );
}

