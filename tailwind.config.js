/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#7261a3",
        "primary-text": "#FFFFFF",
        "secondary-text": "#9A9A9A",
        dark: {
          background: "#000000",
          "navbar-bg": "#1A1A1A",
          "topbar-bg": "#343434",
        },
        light: {
          background: "#FFFFFF",
          "navbar-bg": "#454851",
          "topbar-bg": "#E6E6E6",
        },
      },

      fontFamily: {
        sans: ["Laila", "serif"],
      },
    },
  },
  plugins: [],
};
