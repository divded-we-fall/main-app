/** @type {import('tailwindcss').Config} */
import { gameScreenWidth, blockWidth} from './src/data/constants.js'


export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        slide: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: `translateX(calc(${gameScreenWidth}px - ${blockWidth}px))` }, // Adjusted to fit within container
        },
      },
      animation: {
        slide: "slide .75s linear infinite alternate",
      },
    },
  },
  plugins: [],
};