module.exports = {
  content: ["./*.html", "./src/**/*.js"],
  theme: {
    extend: {
      colors: {
        'aero-black': '#050510',
        'aero-orange': '#ff4f00',
        'aero-orange-light': '#ff6a2a',
        'aero-orange-dark': '#cc3f00',
        'aero-gray': {
          100: '#e5e5e5',
          200: '#cccccc',
          300: '#999999',
          400: '#666666',
          500: '#333333',
          600: '#1a1a1a',
          700: '#111111',
          800: '#0a0a0a',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      backdropBlur: {
        'glass': '14px',
      },
      borderRadius: {
        'glass': '12px',
      },
      animation: {
        'drift-1': 'drift1 8s ease-in-out infinite',
        'drift-2': 'drift2 10s ease-in-out infinite',
        'drift-3': 'drift3 12s ease-in-out infinite',
        'drift-4': 'drift4 9s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 4s ease-in-out infinite',
      },
      keyframes: {
        drift1: {
          '0%, 100%': { transform: 'translate(0px, 0px)' },
          '25%': { transform: 'translate(200px, -120px)' },
          '50%': { transform: 'translate(-100px, 160px)' },
          '75%': { transform: 'translate(150px, 60px)' },
        },
        drift2: {
          '0%, 100%': { transform: 'translate(0px, 0px)' },
          '33%': { transform: 'translate(-180px, 100px)' },
          '66%': { transform: 'translate(140px, -200px)' },
        },
        drift3: {
          '0%, 100%': { transform: 'translate(0px, 0px)' },
          '20%': { transform: 'translate(100px, 130px)' },
          '40%': { transform: 'translate(-200px, -70px)' },
          '60%': { transform: 'translate(80px, -170px)' },
          '80%': { transform: 'translate(-130px, 100px)' },
        },
        drift4: {
          '0%, 100%': { transform: 'translate(0px, 0px)' },
          '50%': { transform: 'translate(-160px, -120px)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.3' },
          '50%': { opacity: '0.6' },
        },
      },
    },
  },
  plugins: [],
}
