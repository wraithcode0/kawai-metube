/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        yt: {
          bg: '#0a0d14',
          surface: '#111624',
          card: '#161d30',
          hover: '#1e263d',
          'hover-light': '#26314f',
          border: '#202b44',
          red: '#ff0033',
          'red-hot': '#ff2a6d',
          'red-hover': '#e6002e',
          blue: '#05d9e8',
          'blue-neon': '#00f0ff',
          'blue-accent': '#3ea6ff',
          'blue-deep': '#0056b3',
          text: '#f3f4f8',
          muted: '#9ba9c4',
          dim: '#65738e'
        }
      },
      fontFamily: {
        sans: ['"Roboto"', '"Quicksand"', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'sans-serif'],
      },
      boxShadow: {
        'kawaii-red': '0 0 20px rgba(255, 0, 51, 0.35)',
        'kawaii-blue': '0 0 20px rgba(0, 240, 255, 0.35)',
        'kawaii-dual': '0 0 25px rgba(255, 0, 51, 0.25), 0 0 25px rgba(0, 240, 255, 0.25)',
      }
    },
  },
  plugins: [],
}
