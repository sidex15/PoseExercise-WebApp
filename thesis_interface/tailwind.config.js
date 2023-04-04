/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "cyan-blue": "#023E8A",
        "light-white": "rgba(255, 255, 255, 0.17)",
        "red-me": "#FF0000",
        "grey": "#EFEFEF",
        "pinkish": "#C5C5C5",
      },
      height:{
        "65vh": "65vh",
      },
      width:{
        "c-width": "1920px",
      },
    },
  },
  plugins: [],
}
