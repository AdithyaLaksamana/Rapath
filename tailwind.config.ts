/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/index.html",
    "./src/pages/**/*.{html,js}", // Arahkan ke file HTML/JS Anda
    "./src/app.js" // Jangan lupa app.js
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}