/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      colors: {
        beige: {
          200: '#f7e7ce',  // Lighter beige
          300: '#e3dac9',  // Darker beige for hover
        },
      },
    },
  },
  plugins: [],
}

