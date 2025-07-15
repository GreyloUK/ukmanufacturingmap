/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./utils/**/*.{js,ts,jsx,tsx}",
    "./types/**/*.{js,ts,jsx,tsx}",
    "./*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Updated color palette
        'dark': {
          900: '#0d1b2a', // Primary dark navy
          800: '#1a2332', // Slightly lighter
          700: '#2a3441', // Cards background
          600: '#3a4451', // Borders
          500: '#4a5461', // Lighter elements
        },
        'mint': {
          500: '#7af6c1', // Primary mint green
          400: '#92f8cf', // Lighter mint
          600: '#62d4a3', // Darker mint
          300: '#aafadd', // Very light mint
        },
        'purple': {
          500: '#a89ef1', // Primary purple
          400: '#c8a8ff', // Light purple
          600: '#9084d9', // Darker purple
          300: '#d0c7ff', // Very light purple
        },
        // Keep original UK colors for any legacy uses
        'uk-blue': '#012169',
        'uk-red': '#C8102E',
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
      fontWeight: {
        'medium': '500',
        'semibold': '600',
        'bold': '700',
        'extrabold': '800',
      },
      animation: {
        'fade-in': 'fadeIn 0.2s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        glow: {
          '0%': { 
            boxShadow: '0 0 5px rgba(0, 212, 163, 0.2), 0 0 10px rgba(0, 212, 163, 0.1)',
          },
          '100%': { 
            boxShadow: '0 0 10px rgba(0, 212, 163, 0.4), 0 0 20px rgba(0, 212, 163, 0.2)',
          },
        },
      },
    },
  },
  plugins: [],
};