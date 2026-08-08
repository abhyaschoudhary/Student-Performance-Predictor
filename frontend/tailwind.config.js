/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#182230',
        brand: {
          50: '#edf5ff',
          100: '#d9eaff',
          500: '#2674d9',
          600: '#1d60ba',
          700: '#184d97',
        },
      },
      boxShadow: {
        card: '0 1px 2px rgba(16, 24, 40, .04), 0 8px 24px rgba(16, 24, 40, .06)',
      },
    },
  },
  plugins: [],
}
