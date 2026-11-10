import React, { useState } from 'react';
import { X, Sparkles, Copy, Check, Link as LinkIcon, Heart } from 'lucide-react';

export default function CustomizeModal({
  isOpen,
  onClose,
  recipientName,
  setRecipientName,
  senderName,
  setSenderName,
}) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  // Generate shareable link
  const currentUrl = new URL(window.location.href);
  if (recipientName.trim()) {
    currentUrl.searchParams.set('to', recipientName.trim());
  } else {
    currentUrl.searchParams.delete('to');
  }
  if (senderName.trim()) {
    currentUrl.searchParams.set('from', senderName.trim());
  } else {
    currentUrl.searchParams.delete('from');
  }

  const shareableUrl = currentUrl.toString();

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareableUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-7 shadow-2xl border border-pink-200 text-left">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-2">
          <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
          <h3 className="font-bubble text-xl font-bold text-gray-800">
            Personalize Your Proposal 💕
          </h3>
        </div>
        <p className="text-xs text-gray-500 mb-5">
          Customize the names to make it uniquely yours, or generate a link to send directly to your crush!
        </p>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
              Who are you asking out? (Their Name):
            </label>
            <input
              type="text"
              value={recipientName}
              onChange={(e) => setRecipientName(e.target.value)}
              placeholder="e.g. Ragavi, Cutie, Pookie..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-400 text-sm font-medium text-gray-800 placeholder-gray-400"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
              Who is asking? (Your Name):
            </label>
            <input
              type="text"
              value={senderName}
              onChange={(e) => setSenderName(e.target.value)}
              placeholder="e.g. Saravanan, Your Secret Admirer..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-400 text-sm font-medium text-gray-800 placeholder-gray-400"
            />
          </div>

          {/* Shareable Link Box */}
          <div className="pt-2">
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
              Direct Proposal Link to Send:
            </label>
            <div className="flex items-center gap-2">
              <div className="flex-1 px-3 py-2 bg-pink-50 border border-pink-200 rounded-xl text-xs text-gray-600 truncate font-mono">
                {shareableUrl}
              </div>
              <button
                onClick={handleCopyLink}
                className="px-3 py-2 bg-rose-500 hover:bg-rose-600 text-white rounded-xl text-xs font-bold flex items-center gap-1 shadow-sm transition-all active:scale-95 whitespace-nowrap"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-white" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied!' : 'Copy Link'}</span>
              </button>
            </div>
            <p className="mt-1.5 text-[11px] text-gray-400">
              When they open this link, it will have their name and customized romantic note ready!
            </p>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold text-sm shadow-md transition-all hover:scale-[1.02] active:scale-95"
          >
            Apply & Save ✨
          </button>
        </div>
      </div>
    </div>
  );
}

