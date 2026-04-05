/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        body: ['DM Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        bg: {
          primary: '#080C14',
          secondary: '#0D1322',
          card: '#111827',
          elevated: '#1A2235',
        },
        accent: {
          cyan: '#00D4FF',
          green: '#00FF87',
          purple: '#7B5EA7',
          amber: '#FFB800',
          red: '#FF4757',
        },
        border: {
          subtle: 'rgba(255,255,255,0.06)',
          glow: 'rgba(0,212,255,0.3)',
        }
      },
      backgroundImage: {
        'grid-pattern': "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.02'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
      },
      animation: {
        'fade-up': 'fadeUp 0.5s ease forwards',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
        'slide-in': 'slideIn 0.4s ease forwards',
        'counter': 'counter 1s ease forwards',
        'shimmer': 'shimmer 2s infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(0,212,255,0.1)' },
          '50%': { boxShadow: '0 0 40px rgba(0,212,255,0.3)' },
        },
        slideIn: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      },
      boxShadow: {
        'card': '0 4px 24px rgba(0,0,0,0.4)',
        'glow-cyan': '0 0 30px rgba(0,212,255,0.2)',
        'glow-green': '0 0 30px rgba(0,255,135,0.2)',
      },
    },
  },
  plugins: [],
}
