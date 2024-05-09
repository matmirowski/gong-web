/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'light-blue': '#D6E4F0',
        'button-light-blue': '#1E56A0',  
        'button-dark-blue': '#163172',  
      },
      fontFamily: {
        sans: ['proxima-nova', 'ui-sans-serif', 'system-ui'],
      },
    },
  },
  plugins: [],
}