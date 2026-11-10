import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  Heart,
  Sparkles,
  Calendar,
  Utensils,
  MapPin,
  Share2,
  Mail,
  RotateCcw,
  CheckCircle2,
  Copy,
  Download,
} from 'lucide-react';

const DATE_ACTIVITIES = [
  { id: 'dinner', label: '🍽️ Candlelight Dinner & Dessert', desc: 'Fancy food, cozy ambiance, sweet laughs' },
  { id: 'cafe', label: '☕ Cozy Cafe & Book Stroll', desc: 'Warm drinks, book hunting & pastries' },
  { id: 'movie', label: '🍿 Late-Night Movie & Blanket Fort', desc: 'Snacks, popcorn, and warm cuddles' },
  { id: 'sunset', label: '🌅 Sunset Walk & Boba Tea', desc: 'Golden hour photos & sweet iced boba' },
  { id: 'arcade', label: '🎮 Arcade Games & Pizza', desc: 'Claw machines, racing & cheesy slices' },
];

const FOOD_CHOICES = [
  { id: 'pizza', label: '🍕 Pizza & Italian Pasta' },
  { id: 'sushi', label: '🍣 Sushi & Gyoza' },
  { id: 'tacos', label: '🌮 Tacos & Churros' },
  { id: 'burgers', label: '🍔 Burgers & Milkshakes' },
  { id: 'sweets', label: '🍫 Chocolate & Ice Cream' },
];

const DATE_TIMES = [
  'This Friday Evening ✨',
  'This Saturday Afternoon ☀️',
  'Sunday Date Night 🌙',
  'Valentine\'s Day Special 🌹',
  'Whenever You\'re Free 🥰',
];

export default function CelebrationCard({
  recipientName,
  senderName,
  onReset,
  onOpenLetter,
}) {
  const [selectedActivity, setSelectedActivity] = useState(DATE_ACTIVITIES[0].id);
  const [selectedFood, setSelectedFood] = useState(FOOD_CHOICES[0].id);
  const [selectedTime, setSelectedTime] = useState(DATE_TIMES[0]);
  const [copiedToast, setCopiedToast] = useState(false);

  // Trigger grand celebration confetti upon opening
  useEffect(() => {
    fireConfetti();
  }, []);

  const fireConfetti = () => {
    // Left side burst
    confetti({
      particleCount: 80,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.7 },
      colors: ['#f43f5e', '#ec4899', '#fb7185', '#ffd1dc', '#facc15'],
    });

    // Right side burst
    confetti({
      particleCount: 80,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.7 },
      colors: ['#f43f5e', '#ec4899', '#fb7185', '#ffd1dc', '#facc15'],
    });

    // Center fountain of hearts & stars
    setTimeout(() => {
      confetti({
        particleCount: 60,
        spread: 100,
        origin: { y: 0.6 },
        colors: ['#ff4081', '#e040fb', '#00e676', '#ffeb3b'],
      });
    }, 300);
  };

  const currentActivityObj =
    DATE_ACTIVITIES.find((a) => a.id === selectedActivity) || DATE_ACTIVITIES[0];
  const currentFoodObj =
    FOOD_CHOICES.find((f) => f.id === selectedFood) || FOOD_CHOICES[0];

  // Compose romantic confirmation message
  const summaryMessage = `YAAAY! 💕 Date officially locked in!\n\nFor: ${recipientName || 'My Favorite Person'}\nFrom: ${senderName || 'Me'}\n📅 When: ${selectedTime}\n✨ Plan: ${currentActivityObj.label}\n🍴 Food: ${currentFoodObj.label}\n\nI can't wait to see you! 🥰❤️`;

  const handleShareWhatsApp = () => {
    const encoded = encodeURIComponent(summaryMessage);
    window.open(`https://api.whatsapp.com/send?text=${encoded}`, '_blank');
  };

  const handleCopySummary = () => {
    navigator.clipboard.writeText(summaryMessage);
    setCopiedToast(true);
    setTimeout(() => setCopiedToast(false), 2500);
  };

  const handleDownloadTicket = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 900;
    canvas.height = 560;
    const ctx = canvas.getContext('2d');

    // Draw background gradient
    const grad = ctx.createLinearGradient(0, 0, 900, 560);
    grad.addColorStop(0, '#fdf2f8');
    grad.addColorStop(0.5, '#ffe4e6');
    grad.addColorStop(1, '#fef3c7');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 900, 560);

    // Draw ticket outer border
    ctx.strokeStyle = '#f43f5e';
    ctx.lineWidth = 6;
    ctx.setLineDash([12, 8]);
    ctx.strokeRect(30, 30, 840, 500);
    ctx.setLineDash([]);

    // Ticket Notches
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(30, 280, 25, -Math.PI / 2, Math.PI / 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(870, 280, 25, Math.PI / 2, -Math.PI / 2);
    ctx.fill();

    // Top Header Banner
    ctx.fillStyle = '#f43f5e';
    ctx.font = 'bold 36px "Fredoka", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('✨ OFFICIAL DREAM DATE PASS ✨', 450, 95);

    ctx.fillStyle = '#ec4899';
    ctx.font = 'bold 22px "Quicksand", sans-serif';
    ctx.fillText(`ADMIT TWO: ${recipientName || 'Ragavi'} & ${senderName || 'Saravanan'} 💕`, 450, 140);

    // Divider
    ctx.strokeStyle = '#fbcfe8';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(80, 170);
    ctx.lineTo(820, 170);
    ctx.stroke();

    // Details Box
    ctx.textAlign = 'left';
    ctx.fillStyle = '#374151';
    ctx.font = 'bold 24px "Fredoka", sans-serif';
    ctx.fillText(`📅 Preferred Time:`, 100, 230);
    ctx.fillStyle = '#e11d48';
    ctx.font = '20px "Quicksand", sans-serif';
    ctx.fillText(`${selectedTime}`, 100, 265);

    ctx.fillStyle = '#374151';
    ctx.font = 'bold 24px "Fredoka", sans-serif';
    ctx.fillText(`✨ Date Activity:`, 100, 325);
    ctx.fillStyle = '#e11d48';
    ctx.font = '20px "Quicksand", sans-serif';
    ctx.fillText(`${currentActivityObj.label}`, 100, 360);

    ctx.fillStyle = '#374151';
    ctx.font = 'bold 24px "Fredoka", sans-serif';
    ctx.fillText(`🍴 Food Choice:`, 100, 420);
    ctx.fillStyle = '#e11d48';
    ctx.font = '20px "Quicksand", sans-serif';
    ctx.fillText(`${currentFoodObj.label}`, 100, 455);

    // Official Stamp
    ctx.save();
    ctx.translate(720, 360);
    ctx.rotate(-0.15);
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 4;
    ctx.strokeRect(-90, -45, 180, 90);
    ctx.fillStyle = '#10b981';
    ctx.textAlign = 'center';
    ctx.font = 'bold 24px "Fredoka", sans-serif';
    ctx.fillText('✓ APPROVED', 0, -5);
    ctx.font = 'bold 14px "Quicksand", sans-serif';
    ctx.fillText('LOCKED IN WITH LOVE', 0, 25);
    ctx.restore();

    // Convert to PNG and download
    const dataUrl = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = `${recipientName || 'Ragavi'}-Saravanan-Dream-Date-Pass.png`;
    a.click();
  };

  return (
    <div className="relative z-10 w-full max-w-lg mx-auto p-6 sm:p-8 rounded-3xl bg-white/90 backdrop-blur-2xl border border-pink-200 shadow-2xl shadow-pink-300/40 text-center transition-all duration-300">
      {/* Celebration Header Badge */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-4 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white text-xs font-bold shadow-md shadow-pink-400/30">
        <Sparkles className="w-4 h-4 animate-spin text-yellow-200" style={{ animationDuration: '4s' }} />
        <span>OFFICIALLY DATING! SHE / HE SAID YES!</span>
        <Heart className="w-3.5 h-3.5 fill-white" />
      </div>

      {/* Romantic GIF */}
      <div className="relative mx-auto mb-5 w-52 h-52 sm:w-60 sm:h-60 rounded-2xl overflow-hidden bg-pink-50/70 p-2 border-2 border-pink-200 shadow-md flex items-center justify-center">
        <img
          src={`${import.meta.env.BASE_URL}images/celebration.gif`}
          alt="Happy bears hugging and kissing"
          className="w-full h-full object-contain rounded-xl"
        />
        <button
          onClick={fireConfetti}
          title="Throw more confetti!"
          className="absolute bottom-3 right-3 bg-white/90 hover:bg-white text-pink-600 p-2 rounded-full shadow-md text-xs font-bold transition-transform hover:scale-110 active:scale-95"
        >
          🎉 More Confetti!
        </button>
      </div>

      {/* Triumphant Headline */}
      <h1 className="font-bubble text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-rose-600 leading-tight mb-2">
        YAAAY! I KNEW IT! ❤️🥰
      </h1>
      <p className="text-gray-600 font-medium text-sm sm:text-base mb-6">
        {recipientName ? (
          <>
            <span className="font-bold text-pink-600">{recipientName}</span>, you just made me the happiest person in the entire universe!
          </>
        ) : (
          'You just made me the happiest person in the entire universe!'
        )}
      </p>

      {/* Interactive Official Date Night Pass / Ticket */}
      <div className="mb-6 p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-rose-50 via-pink-50 to-amber-50 border-2 border-dashed border-rose-300 text-left shadow-inner relative overflow-hidden">
        {/* Ticket corner cutouts */}
        <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-white rounded-full border-r border-rose-300" />
        <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-white rounded-full border-l border-rose-300" />

        <div className="flex items-center justify-between pb-3 border-b border-pink-200">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🎟️</span>
            <div>
              <h2 className="font-bubble font-bold text-gray-800 text-sm sm:text-base">
                DREAM DATE PASS
              </h2>
              <p className="text-[11px] text-pink-600 font-medium tracking-wide">
                ADMIT TWO • NON-TRANSFERABLE 💕
              </p>
            </div>
          </div>
          <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-green-100 text-green-700 border border-green-200">
            ✓ APPROVED
          </span>
        </div>

        {/* Date Options Selectors */}
        <div className="mt-3 space-y-3 text-xs sm:text-sm">
          {/* Plan selector */}
          <div>
            <label className="flex items-center gap-1.5 font-bold text-gray-700 mb-1">
              <MapPin className="w-3.5 h-3.5 text-rose-500" />
              Choose Our Date Idea:
            </label>
            <select
              value={selectedActivity}
              onChange={(e) => setSelectedActivity(e.target.value)}
              className="w-full p-2 rounded-xl bg-white/90 border border-pink-200 font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-400 text-xs sm:text-sm cursor-pointer"
            >
              {DATE_ACTIVITIES.map((act) => (
                <option key={act.id} value={act.id}>
                  {act.label}
                </option>
              ))}
            </select>
          </div>

          {/* Food selector */}
          <div>
            <label className="flex items-center gap-1.5 font-bold text-gray-700 mb-1">
              <Utensils className="w-3.5 h-3.5 text-rose-500" />
              What are we eating?
            </label>
            <select
              value={selectedFood}
              onChange={(e) => setSelectedFood(e.target.value)}
              className="w-full p-2 rounded-xl bg-white/90 border border-pink-200 font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-400 text-xs sm:text-sm cursor-pointer"
            >
              {FOOD_CHOICES.map((food) => (
                <option key={food.id} value={food.id}>
                  {food.label}
                </option>
              ))}
            </select>
          </div>

          {/* Time / Date selector */}
          <div>
            <label className="flex items-center gap-1.5 font-bold text-gray-700 mb-1">
              <Calendar className="w-3.5 h-3.5 text-rose-500" />
              Preferred Time:
            </label>
            <select
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              className="w-full p-2 rounded-xl bg-white/90 border border-pink-200 font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-400 text-xs sm:text-sm cursor-pointer"
            >
              {DATE_TIMES.map((time, idx) => (
                <option key={idx} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-2.5">
        {/* Open Secret Love Letter */}
        <button
          onClick={onOpenLetter}
          className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-bold text-sm sm:text-base shadow-lg shadow-pink-500/30 flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-95"
        >
          <Mail className="w-4 h-4" />
          <span>Read My Secret Love Letter 💌</span>
        </button>

        {/* WhatsApp Share / Confirm */}
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={handleShareWhatsApp}
            className="py-2.5 px-3 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-xs sm:text-sm shadow-md shadow-emerald-500/20 flex items-center justify-center gap-1.5 transition-all hover:scale-[1.02] active:scale-95"
          >
            <Share2 className="w-4 h-4" />
            <span>Send to WhatsApp</span>
          </button>

          <button
            onClick={handleCopySummary}
            className="py-2.5 px-3 rounded-2xl bg-white hover:bg-pink-50 text-pink-700 border border-pink-300 font-semibold text-xs sm:text-sm shadow-sm flex items-center justify-center gap-1.5 transition-all hover:scale-[1.02] active:scale-95"
          >
            {copiedToast ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Copied! 🎉</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copy Date Pass</span>
              </>
            )}
          </button>
        </div>

        {/* Download Ticket as Image Button */}
        <button
          onClick={handleDownloadTicket}
          className="w-full py-2.5 px-3 rounded-2xl bg-gradient-to-r from-amber-400 to-orange-400 hover:from-amber-500 hover:to-orange-500 text-white font-bold text-xs sm:text-sm shadow-md shadow-amber-400/25 flex items-center justify-center gap-1.5 transition-all hover:scale-[1.02] active:scale-95 cursor-pointer"
        >
          <Download className="w-4 h-4" />
          <span>📸 Download Date Pass Photo (PNG)</span>
        </button>

        {/* Replay Proposal Button */}
        <button
          onClick={onReset}
          className="w-full py-2 px-3 text-xs text-gray-500 hover:text-gray-700 flex items-center justify-center gap-1.5 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Ask me again (Play from beginning)</span>
        </button>
      </div>
    </div>
  );
}

