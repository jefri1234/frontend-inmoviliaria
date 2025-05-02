/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './pages/**/*.{js,ts,jsx,tsx}',
      './components/**/*.{js,ts,jsx,tsx}',
      './app/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
      extend: {
        colors: {
          bgPrimary: 'var(--color-bg-primary)',
          textPrimary: 'var(--color-text-primary)',
          accent: 'var(--color-accent)',
        },
      },
    },
    plugins: [],
  }
  