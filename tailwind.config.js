/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        xs: "425px",
      },

      colors: {
        primary: "#7261a3",
        "primary-text": "#FFFFFF",
        "secondary-text": "#9A9A9A",
        dark: {
          background: "#1A1A1A",
          "navbar-bg": "#343434",
          "topbar-bg": "#4d4d4d",
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

      zIndex: {
        100: "100",
      },
    },
  },
  plugins: [],
};
