/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primaryColor: "#000000",
        secondaryColor: "#ffffff",
        buttonColor: "#1DA1F2",
        hoverColor: "#657786"
      }
    },
  },
  plugins: [],
}