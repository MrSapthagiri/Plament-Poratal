/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#003366', // Dark blue from logo
          light: '#004d99',
          dark: '#002244',
        },
        secondary: {
          DEFAULT: '#ffffff', // White from logo
          light: '#f8fafc',
          dark: '#e2e8f0',
        },
        accent: {
          DEFAULT: '#1a4a8d', // Medium blue from logo
          light: '#2563eb',
          dark: '#1e40af',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}