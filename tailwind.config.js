/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        gold: {
          50: "#fff9db",
          100: "#fff0b3",
          200: "#ffe680",
          300: "#ffdb4d",
          400: "#ffd11a",
          500: "#e6b800",
          600: "#b38f00",
          700: "#806600",
          800: "#4d3d00",
          900: "#1a1400"
        }
      }
    }
  },
  plugins: []
};
