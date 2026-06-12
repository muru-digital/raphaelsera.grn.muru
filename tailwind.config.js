/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {

      fontFamily: {
        flowmery: ['Flowmery'],
      },

      colors: {
        primary: "#0040ffff",

        emerald: "#1E5E45",
        emeraldMid: "#2D7A5C",
        emeraldLight: "#4A9E7A",
        emeraldPale: "#C8DED5",

        cream: "#F8F5EE",
        creamDark: "#EDE8DC",

        gold: "#BF9A3F",
        goldLight: "#D4B96A",
        goldPale: "#E8D9A8",

        text: "#2C2C2A",
        textMid: "#5A5248",
        textLight: "#9A8E80",

        white: "#FFFFFF",
      }

    },
  },
  plugins: [],
}

