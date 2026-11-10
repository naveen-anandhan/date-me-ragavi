/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        bubble: ['"Fredoka"', 'cursive', 'sans-serif'],
        romantic: ['"Dancing Script"', 'cursive', 'sans-serif'],
        sans: ['"Quicksand"', 'sans-serif']
      },
      animation: {
        'bounce-soft': 'bounceSoft 2s infinite ease-in-out',
        'pulse-glow': 'pulseGlow 2s infinite',
        'wiggle': 'wiggle 0.5s ease-in-out infinite',
        'float': 'float 4s ease-in-out infinite',
        'heartbeat': 'heartbeat 1.2s ease-in-out infinite',
      },
      keyframes: {
        bounceSoft: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 15px rgba(244, 63, 94, 0.4), 0 0 30px rgba(244, 63, 94, 0.2)' },
          '50%': { boxShadow: '0 0 30px rgba(244, 63, 94, 0.8), 0 0 50px rgba(244, 63, 94, 0.4)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-4deg)' },
          '50%': { transform: 'rotate(4deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-15px) rotate(3deg)' },
        },
        heartbeat: {
          '0%': { transform: 'scale(1)' },
          '14%': { transform: 'scale(1.25)' },
          '28%': { transform: 'scale(1)' },
          '42%': { transform: 'scale(1.25)' },
          '70%': { transform: 'scale(1)' },
        }
      }
    },
  },
  plugins: [],
}

