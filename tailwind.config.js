/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Outfit', 'sans-serif'],
      },
      colors: {
        brand: {
          x: {
            light: '#818cf8',  // light Indigo
            DEFAULT: '#4f46e5', // core Indigo
            dark: '#3730a3',   // dark Indigo
            bg: '#f5f3ff',     // warm soft Indigo highlight
          },
          o: {
            light: '#34d399',  // light Emerald
            DEFAULT: '#059669', // core Emerald
            dark: '#065f46',   // dark Emerald
            bg: '#ecfdf5',     // warm soft Emerald highlight
          }
        }
      },
      boxShadow: {
        'premium': '0 10px 30px -10px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.02)',
        'premium-hover': '0 20px 40px -15px rgba(79, 70, 229, 0.08), 0 1px 5px rgba(0, 0, 0, 0.02)',
        'glass': 'inset 0 2px 4px 0 rgba(255, 255, 255, 0.8), 0 4px 20px -2px rgba(0, 0, 0, 0.04)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'scale-in': 'scaleIn 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
        'shake': 'shake 0.4s cubic-bezier(.36,.07,.19,.97) both',
        'float-slow': 'floatSlow 4s ease-in-out infinite',
        'draw-line': 'drawLine 0.6s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.92)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        shake: {
          '10%, 90%': { transform: 'translate3d(-1px, 0, 0)' },
          '20%, 80%': { transform: 'translate3d(2px, 0, 0)' },
          '30%, 50%, 70%': { transform: 'translate3d(-4px, 0, 0)' },
          '40%, 60%': { transform: 'translate3d(4px, 0, 0)' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        drawLine: {
          '0%': { strokeDashoffset: '100' },
          '100%': { strokeDashoffset: '0' },
        }
      },
    },
  },
  plugins: [],
}
