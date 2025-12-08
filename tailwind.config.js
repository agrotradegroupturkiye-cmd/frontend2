/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./styles/**/*.{css}"
  ],
  safelist: [
    'bg-blue-100', 'text-blue-700',
    'bg-green-100', 'text-green-700',
    'bg-yellow-100', 'text-yellow-700',
    'bg-purple-100', 'text-purple-700',
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1d4ed8",
        secondary: "#9333ea"
      },
      fontFamily: {
        sans: ["Inter", "Arial", "Helvetica", "sans-serif"],
      },
      boxShadow: {
        '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      }
    }
  },
  plugins: [],
};
