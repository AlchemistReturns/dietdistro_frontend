/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#3b7d3b",
      },
      fontFamily: {
        primary: ['primary', 'sans-serif'],
        secondary: ['secondary', 'sans-serif'],
      },
    },
    plugins: [],
  }
}
