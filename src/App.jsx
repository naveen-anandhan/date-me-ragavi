import React, { useState, useEffect } from 'react';
import BackgroundHearts from './components/BackgroundHearts';
import AudioPlayer from './components/AudioPlayer';
import ProposalCard from './components/ProposalCard';
import CelebrationCard from './components/CelebrationCard';
import LoveLetterModal from './components/LoveLetterModal';
import CustomizeModal from './components/CustomizeModal';
import LoginGate from './components/LoginGate';
import ReasonsModal from './components/ReasonsModal';
import { Settings, Heart, Lock } from 'lucide-react';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('date_me_auth') === 'true';
  });
  const [yesPressed, setYesPressed] = useState(false);
  const [noCount, setNoCount] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isCustomizeOpen, setIsCustomizeOpen] = useState(false);
  const [isLetterOpen, setIsLetterOpen] = useState(false);
  const [isReasonsOpen, setIsReasonsOpen] = useState(false);

  // Recipient is Ragavi, Sender is Saravanan
  const [recipientName, setRecipientName] = useState('Ragavi');
  const [senderName, setSenderName] = useState('Saravanan');

  // Read URL params if provided
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const toParam = params.get('to') || params.get('name');
    const fromParam = params.get('from');

    if (toParam) setRecipientName(toParam);
    if (fromParam) setSenderName(fromParam);
  }, []);

  const handleReset = () => {
    setYesPressed(false);
    setNoCount(0);
  };

  const handleLock = () => {
    sessionStorage.removeItem('date_me_auth');
    setIsAuthenticated(false);
    handleReset();
  };

  return (
    <main className="relative min-h-screen flex flex-col justify-between items-center px-4 py-6 sm:py-10">
      {/* Interactive Floating Background Hearts & Click Bursts */}
      <BackgroundHearts soundEnabled={soundEnabled} />

      {/* Top Header Bar */}
      <header className="relative z-30 w-full max-w-xl flex items-center justify-between mb-2 sm:mb-6">
        <div className="flex items-center gap-2">
          {isAuthenticated && (
            <>
              {/* Brand / Personalize Button */}
              <button
                onClick={() => setIsCustomizeOpen(true)}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/85 hover:bg-white text-rose-600 border border-rose-200 shadow-md backdrop-blur-md text-xs font-bold transition-all hover:scale-105 active:scale-95"
                title="Personalize proposal names"
              >
                <Settings className="w-3.5 h-3.5 text-rose-500" />
                <span>For: {recipientName} 💕</span>
              </button>

              {/* Lock / Logout Button */}
              <button
                onClick={handleLock}
                className="p-1.5 rounded-full bg-white/85 hover:bg-white text-gray-500 hover:text-rose-600 border border-rose-200 shadow-md backdrop-blur-md transition-all hover:scale-105"
                title="Lock portal"
              >
                <Lock className="w-3.5 h-3.5" />
              </button>
            </>
          )}
        </div>

        {/* Audio Suite Player (Music Box + SFX toggle) */}
        <AudioPlayer soundEnabled={soundEnabled} setSoundEnabled={setSoundEnabled} />
      </header>

      {/* Main Interactive Container */}
      <section className="relative z-10 w-full flex-1 flex items-center justify-center py-4">
        {!isAuthenticated ? (
          <LoginGate
            onLoginSuccess={() => setIsAuthenticated(true)}
            soundEnabled={soundEnabled}
          />
        ) : !yesPressed ? (
          <ProposalCard
            recipientName={recipientName}
            onYes={() => setYesPressed(true)}
            soundEnabled={soundEnabled}
            noCount={noCount}
            setNoCount={setNoCount}
            onOpenReasons={() => setIsReasonsOpen(true)}
          />
        ) : (
          <CelebrationCard
            recipientName={recipientName}
            senderName={senderName}
            onReset={handleReset}
            onOpenLetter={() => setIsLetterOpen(true)}
          />
        )}
      </section>

      {/* Reasons to Say Yes Modal */}
      {isAuthenticated && (
        <ReasonsModal
          isOpen={isReasonsOpen}
          onClose={() => setIsReasonsOpen(false)}
          recipientName={recipientName}
          soundEnabled={soundEnabled}
        />
      )}

      {/* Secret Love Letter Envelope Modal */}
      {isAuthenticated && (
        <LoveLetterModal
          isOpen={isLetterOpen}
          onClose={() => setIsLetterOpen(false)}
          recipientName={recipientName}
          senderName={senderName}
        />
      )}

      {/* Proposal Customization Modal */}
      {isAuthenticated && (
        <CustomizeModal
          isOpen={isCustomizeOpen}
          onClose={() => setIsCustomizeOpen(false)}
          recipientName={recipientName}
          setRecipientName={setRecipientName}
          senderName={senderName}
          setSenderName={setSenderName}
        />
      )}

      {/* Bottom Footer Note */}
      <footer className="relative z-20 mt-6 text-center text-xs text-rose-400 font-medium flex items-center justify-center gap-1">
        <span>Saravanan</span>
        <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500 animate-pulse" />
        <span>Ragavi</span>
      </footer>
    </main>
  );
}
