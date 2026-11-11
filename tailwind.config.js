/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        cream: "#F6F0E7", // primary background
        sand: "#EFE5D8", // secondary background
        ink: "#382318", // primary text
        muted: "#766557", // secondary text
        accent: { DEFAULT: "#A66A3F", deep: "#8F5830", light: "#C99B70" },
        line: "#E5D9CA", // borders
        success: "#397653",
        danger: "#B54747",
      },
      fontFamily: {
        serif: ['"Playfair Display"', "Georgia", "serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 1px 2px rgba(56,35,24,.04), 0 12px 32px -12px rgba(56,35,24,.18)",
        lift: "0 2px 4px rgba(56,35,24,.05), 0 24px 48px -16px rgba(56,35,24,.28)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: 0, transform: "translateY(18px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        "fade-in": { "0%": { opacity: 0 }, "100%": { opacity: 1 } },
        "scale-in": {
          "0%": { opacity: 0, transform: "scale(.94)" },
          "100%": { opacity: 1, transform: "scale(1)" },
        },
        "toast-in": {
          "0%": { opacity: 0, transform: "translateY(12px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up .8s cubic-bezier(.2,.7,.2,1) both",
        "fade-in": "fade-in .8s ease both",
        "scale-in": "scale-in .9s cubic-bezier(.2,.7,.2,1) both",
        "toast-in": "toast-in .25s ease both",
      },
    },
  },
  plugins: [],
};
