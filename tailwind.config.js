/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'light-blue': '#D6E4F0',
        'dark-blue': '#163172',  
      },
    },
  },
  plugins: [],
}