/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        palette: {
          navy: '#45577D',
          burgundy: '#981449',
          sky: '#A4BFDF',
          lavender: '#DAD8E9',
          blue: '#538BD3',
        },
      },
    },
  },
  plugins: [],
};
