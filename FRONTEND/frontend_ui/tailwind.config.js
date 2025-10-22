// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          primary: '#0f172a',    // Dark blue-black
          secondary: '#1e293b',  // Dark blue
          accent: '#3b82f6',     // Bright blue
          text: '#f8fafc',       // Light text
          muted: '#94a3b8',      // Muted text
          border: '#334155',     // Border color
        }
      }
    },
  },
  plugins: [],
}