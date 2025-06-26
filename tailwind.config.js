/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        bouncePingpong: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        shadowSquash: {
          '0%, 100%': { transform: 'scaleX(1.3)', opacity: '0.4' },
          '50%': { transform: 'scaleX(1)', opacity: '0.2' },
        },
        eyeMove: {
          '0%, 100%': { transform: 'translateX(0)' },
          '50%': { transform: 'translateX(2px)' },
        },
      },
      animation: {
        bouncePingpong: 'bouncePingpong 0.8s ease-in-out infinite',
        shadowSquash: 'shadowSquash 0.8s ease-in-out infinite',
        eyeMove: 'eyeMove 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
