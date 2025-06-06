/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      animation: {
        "loading-text": "loading-text 1s ease-out infinite",
      },
      colors: {
        body: {
          DEFAULT: "rgb(var(--bg-body))",
        },
      },
      keyframes: {
        "loading-text": {
          "0%, 100%": { color: colors.neutral["700"] },
          "30%": { color: colors.neutral["500"] },
        },
      },
    },
    fontFamily: {
      sans: ["Inter"],
    },
  },
  plugins: [],
};
