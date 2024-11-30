/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        slide: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(calc(300px))" }, // Adjusted to fit within container
        },
      },
      animation: {
        slide: "slide .75s linear infinite alternate",
      },
    },
  },
  plugins: [],
};