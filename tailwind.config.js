/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      colors: {
        lavender: '#B9AEDC', // Lavender
        deepPurple: '#7E60BF', // Deep Purple
        darkPurple: '#433878', // Dark Purple background color
        grey: '#212121', // Dark grey for background
        lightGrey: '#D1D1D1', // Light grey for text, borders, etc.
        
      },
      backgroundImage: {
        'pattern-lines': 'repeating-linear-gradient(45deg, rgba(255, 255, 255, 0.15) 0px, rgba(255, 255, 255, 0.15) 10px, rgba(255, 255, 255, 0.05) 10px, rgba(255, 255, 255, 0.05) 20px)',
      },
    },
  },
  plugins: [],
}