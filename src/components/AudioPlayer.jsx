import React, { useState, useEffect } from 'react';
import { musicBox } from '../utils/soundEffects';
import { Volume2, VolumeX, Disc, SkipForward } from 'lucide-react';

export default function AudioPlayer({ soundEnabled, setSoundEnabled }) {
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [trackName, setTrackName] = useState(musicBox.getCurrentTrackName());

  const toggleMusic = () => {
    const playing = musicBox.toggle();
    setIsPlayingMusic(playing);
  };

  const handleNextTrack = (e) => {
    e.stopPropagation();
    const nextName = musicBox.nextTrack();
    setTrackName(nextName);
  };

  const toggleSFX = () => {
    setSoundEnabled((prev) => !prev);
  };

  useEffect(() => {
    return () => {
      musicBox.stop();
    };
  }, []);

  return (
    <div className="fixed top-4 right-4 z-40 flex items-center gap-2">
      {/* Background Lofi Music Player */}
      <div
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold shadow-md border transition-all duration-300 backdrop-blur-md cursor-pointer ${
          isPlayingMusic
            ? 'bg-rose-500 text-white border-rose-300 shadow-rose-200'
            : 'bg-white/85 hover:bg-white text-rose-600 border-rose-200'
        }`}
        onClick={toggleMusic}
      >
        <Disc
          className={`w-4 h-4 ${isPlayingMusic ? 'animate-spin text-white' : 'text-rose-500'}`}
          style={{ animationDuration: '3s' }}
        />
        <span className="hidden sm:inline">
          {isPlayingMusic ? trackName : 'Play Music 🎶'}
        </span>
        {isPlayingMusic && (
          <>
            <span className="flex items-end gap-0.5 h-3 ml-1">
              <span className="w-0.5 bg-white rounded-full animate-bounce h-2" style={{ animationDelay: '0.1s' }} />
              <span className="w-0.5 bg-white rounded-full animate-bounce h-3" style={{ animationDelay: '0.3s' }} />
              <span className="w-0.5 bg-white rounded-full animate-bounce h-1.5" style={{ animationDelay: '0.2s' }} />
            </span>
            <button
              onClick={handleNextTrack}
              title="Next Track"
              className="ml-1 p-0.5 rounded-full hover:bg-white/20 text-white transition-colors"
            >
              <SkipForward className="w-3.5 h-3.5" />
            </button>
          </>
        )}
      </div>

      {/* Sound FX Toggle Button */}
      <button
        onClick={toggleSFX}
        title={soundEnabled ? 'Mute Sound Effects' : 'Enable Sound Effects'}
        className="p-2 rounded-full bg-white/85 hover:bg-white text-rose-600 border border-rose-200 shadow-md backdrop-blur-md transition-all hover:scale-105"
      >
        {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 text-gray-400" />}
      </button>
    </div>
  );
}
