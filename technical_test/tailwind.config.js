/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.tsx",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#ffffff",
        accent: "#38bdf8",
        textColor: "#000000",
        mutedText: "#444a53",
      },
    },
  },
  plugins: [],
};
