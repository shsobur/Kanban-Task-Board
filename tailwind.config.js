/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class", // This must be here!
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // This covers all subfolders in src
    "./src/**/**/*.{js,ts,jsx,tsx}", // This covers even deeper subfolders
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light", "dark"],
  },
};