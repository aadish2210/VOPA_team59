/** @type {import('tailwindcss').Config} */
const {nextui} = require("@nextui-org/react");

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [
    require('daisyui'),
    nextui()
  ],
}