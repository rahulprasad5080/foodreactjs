/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#EF7822',
        secondary: '#F3F4F6',
        sidebar: '#FFFFFF',
      },
    },
  },
  plugins: [],
}
