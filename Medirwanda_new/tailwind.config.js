export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        blob: 'blob 7s infinite',
        gradient: 'gradient 3s ease infinite',
      },
      keyframes: {
        blob: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '25%': { transform: 'translate(20px, -50px) scale(1.1)' },
          '50%': { transform: 'translate(-20px, 20px) scale(0.9)' },
          '75%': { transform: 'translate(50px, 50px) scale(1.05)' },
        },
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      backgroundImage: {
        'grid-pattern': 'linear-gradient(0deg, transparent 24%, rgba(255, 0, 255, .05) 25%, rgba(255, 0, 255, .05) 26%, transparent 27%, transparent 74%, rgba(255, 0, 255, .05) 75%, rgba(255, 0, 255, .05) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(255, 0, 255, .05) 25%, rgba(255, 0, 255, .05) 26%, transparent 27%, transparent 74%, rgba(255, 0, 255, .05) 75%, rgba(255, 0, 255, .05) 76%, transparent 77%, transparent)',
      },
      backgroundSize: {
        'grid': '50px 50px',
      },
    },
  },
  plugins: [],
}
