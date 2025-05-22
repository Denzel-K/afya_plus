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
        sans: ['Open Sans', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
        roboto: ['Roboto', 'system-ui', 'sans-serif'],
        inter: ['Inter', 'system-ui', 'sans-serif'],
        raleway: ['Raleway', 'system-ui', 'sans-serif'],
        heading: ['Raleway', 'system-ui', 'sans-serif'],
        body: ['Open Sans', 'system-ui', 'sans-serif']
      },
      colors: {
        // Base colors
        'primary-azure': '#E4F0F1', // Lighter for better contrast
        'text-primary': '#F0F4F5', // Main text color
        'text-secondary': '#B8C4C9', // Secondary text color

        // Background colors
        'bg-dark': '#121212', // Main background
        'bg-card': '#1E1E1E', // Card background
        'eerie-black': '#1A1A1A', // Slightly lighter than before
        'input-bg': '#2A2A2A', // Input background
        'appt-bg': '#151515', // Appointment background
        'border': '#3A3A3A', // Border color

        // Accent colors
        'accent-primary': '#4D96FF', // Primary accent (blue)
        'accent-secondary': '#9F86FF', // Secondary accent (purple)
        'accent-tertiary': '#FF6B6B', // Tertiary accent (red)

        // Status colors
        'blue': '#4D96FF', // Updated blue
        'admin-blue': '#5D5FEF', // Admin color
        'status-clr': '#9F86FF', // Status color
        'Pending-clr': '#FFBE0B', // Pending status
        'Approved-clr': '#4CAF50', // Approved status
        'Cancelled-clr': '#F44336', // Cancelled status

        // Gradient colors
        'gradient-start': '#4D96FF',
        'gradient-mid': '#9F86FF',
        'gradient-end': '#FF6B6B'
      },
      boxShadow: {
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'card-hover': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'button': '0 4px 6px -1px rgba(77, 150, 255, 0.2), 0 2px 4px -1px rgba(77, 150, 255, 0.1)',
        'button-hover': '0 8px 15px -3px rgba(77, 150, 255, 0.3), 0 4px 6px -2px rgba(77, 150, 255, 0.2)'
      }
    },
  },
  plugins: [],
};
