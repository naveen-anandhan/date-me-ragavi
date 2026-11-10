// Web Audio API Synthesizer for rich, offline-ready romantic sound effects and melodies
let audioCtx = null;

function getAudioContext() {
  if (!audioCtx) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (AudioContext) {
      audioCtx = new AudioContext();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

// Gentle mobile haptic feedback helper
export function triggerHaptic(pattern = [30]) {
  try {
    if (typeof window !== 'undefined' && 'navigator' in window && navigator.vibrate) {
      navigator.vibrate(pattern);
    }
  } catch {}
}

// Playful "boing/squeak" for "No" button
export function playSqueak() {
  triggerHaptic([40]);
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    const now = ctx.currentTime;

    osc.frequency.setValueAtTime(320, now);
    osc.frequency.exponentialRampToValueAtTime(700, now + 0.08);
    osc.frequency.exponentialRampToValueAtTime(220, now + 0.22);

    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.25);
  } catch {}
}

// Swift playful whoosh when the No button dodges cursor
export function playDodgeWhoosh() {
  triggerHaptic([20, 20, 20]);
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    const now = ctx.currentTime;

    osc.frequency.setValueAtTime(600, now);
    osc.frequency.exponentialRampToValueAtTime(1200, now + 0.09);
    osc.frequency.exponentialRampToValueAtTime(400, now + 0.18);

    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.2);
  } catch {}
}

// Bubble pop sound for popping floating hearts
export function playPop() {
  triggerHaptic([15]);
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    const now = ctx.currentTime;

    osc.frequency.setValueAtTime(800, now);
    osc.frequency.exponentialRampToValueAtTime(1400, now + 0.06);

    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.08);
  } catch {}
}

// Magical romantic harp fanfare for when YES is clicked
export function playYesFanfare() {
  triggerHaptic([100, 50, 100, 50, 200]);
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    // Sweet romantic chord arpeggio (Cmaj9 / Fmaj7 romantic resolution)
    const notes = [
      { freq: 523.25, time: 0.0 }, // C5
      { freq: 659.25, time: 0.1 }, // E5
      { freq: 783.99, time: 0.2 }, // G5
      { freq: 987.77, time: 0.3 }, // B5
      { freq: 1046.5, time: 0.4 }, // C6
      { freq: 1318.51, time: 0.52 }, // E6
      { freq: 1567.98, time: 0.65 }, // G6
    ];

    notes.forEach(({ freq, time }) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + time);

      const startTime = ctx.currentTime + time;
      gain.gain.setValueAtTime(0.001, startTime);
      gain.gain.exponentialRampToValueAtTime(0.25, startTime + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.9);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + 0.95);
    });
  } catch {}
}

// Multi-Track Background Melody Synthesizer
class MelodySynthesizer {
  constructor() {
    this.isPlaying = false;
    this.intervalId = null;
    this.step = 0;
    this.currentTrack = 0; // 0: Lofi Music Box, 1: Romantic Piano, 2: 8-Bit Love Theme
    this.tracks = [
      {
        name: 'Lo-Fi Music Box 🎶',
        oscType: 'triangle',
        speed: 450,
        chords: [
          [523.25, 659.25, 783.99], // C - E - G
          [493.88, 587.33, 783.99], // B - D - G
          [440.0, 523.25, 659.25], // A - C - E
          [349.23, 440.0, 523.25, 659.25], // F - A - C - E
        ],
      },
      {
        name: 'Romantic Piano 🎹',
        oscType: 'sine',
        speed: 550,
        chords: [
          [261.63, 329.63, 392.0, 493.88], // Cmaj7
          [220.0, 261.63, 329.63, 440.0], // Am7
          [174.61, 220.0, 261.63, 349.23], // Fmaj7
          [196.0, 246.94, 293.66, 392.0], // G7
        ],
      },
      {
        name: 'Cute 8-Bit Melody 👾',
        oscType: 'square',
        speed: 300,
        chords: [
          [523.25, 659.25],
          [659.25, 783.99],
          [880.0, 1046.5],
          [783.99, 659.25],
        ],
      },
    ];
  }

  getCurrentTrackName() {
    return this.tracks[this.currentTrack].name;
  }

  nextTrack() {
    this.currentTrack = (this.currentTrack + 1) % this.tracks.length;
    if (this.isPlaying) {
      this.stop();
      this.start();
    }
    return this.getCurrentTrackName();
  }

  start() {
    if (this.isPlaying) return;
    const ctx = getAudioContext();
    if (!ctx) return;
    this.isPlaying = true;

    const track = this.tracks[this.currentTrack];

    const playNote = (freq, offset, duration = 1.2) => {
      if (!this.isPlaying) return;
      try {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = track.oscType;
        osc.frequency.setValueAtTime(freq, ctx.currentTime + offset);

        const startTime = ctx.currentTime + offset;
        const peakGain = track.oscType === 'square' ? 0.015 : 0.04;
        gain.gain.setValueAtTime(0.0001, startTime);
        gain.gain.linearRampToValueAtTime(peakGain, startTime + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + duration + 0.1);
      } catch {}
    };

    const tick = () => {
      const chords = track.chords;
      const chordIndex = Math.floor(this.step / 4) % chords.length;
      const noteIndex = this.step % chords[chordIndex].length;
      const freq = chords[chordIndex][noteIndex];
      playNote(freq, 0, 1.4);

      if (this.step % 3 === 0 && track.oscType !== 'square') {
        playNote(freq * 1.5, 0.2, 0.7);
      }
      this.step++;
    };

    tick();
    this.intervalId = setInterval(tick, track.speed);
  }

  stop() {
    this.isPlaying = false;
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    this.step = 0;
  }

  toggle() {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }
}

export const musicBox = new MelodySynthesizer();
