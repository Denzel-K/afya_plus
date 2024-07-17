/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        raleway: ['Raleway', 'sans-serif']
      },
      colors: {
        'primary-azure': '#DEEAEB',
        'border': '#56595A',
        'input-bg': '#272929',
        'appt-bg': '#0E0E0E',
        'eerie-black': '#181717',
        'blue': '#69B3E4',
        'admin-blue': '#4047D1',
        'status-clr': '#9180AD',
        'Pending-clr': '#E9A316',
        'Approved-clr': '#57E33E',
        'Cancelled-clr': '#E91F36'
      }
    },
  },
  plugins: [],
};
