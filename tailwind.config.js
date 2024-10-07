/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#F8CB2E',
        secondary: '#EE5007',
        dark: '#000000',
        gold: {
          DEFAULT: '#FFD700',
          light: '#FFF0B3',
        },
        teal: {
          400: '#2DD4BF', // Adjust this to match your exact teal color
        },
        gray: {
          900: '#111827', // Adjust if needed to match your dark background
        },
      },
      fontSize: {
        '7xl': '74px',
      },
    },
  },
  plugins: [],
}