/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        accent: '#C8372D',
        'fg-primary': '#1A1A1A',
        'fg-secondary': '#666666',
        'surface-dark': '#1A1A1A',
        'surface-warm': '#F5F3F0',
      },
      fontFamily: {
        display: ['"Anton"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
        mono: ['"Geist Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
};
