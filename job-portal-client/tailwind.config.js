/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: ["lg:flex-row"],
  theme: {
    extend: {
      colors: {
        "primary": "#141414",
        "blue": "#3573E2"
      }

    },
  },
  plugins: [],
}