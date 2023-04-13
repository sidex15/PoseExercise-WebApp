/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "cyan-blue": "#023E8A",
        "light-white": "rgba(255, 255, 255, 0.17)",
        "red-me": "#FF0000",
        "grey": "#C5C5C5",
        "cambg": "#CAF0F8",
        "camiconbg": "#0096C7",
        "repsbg": "#9500AD",
        "speedbg": "#E25100",
        "btnstart": "#03045E",
        "btnstop": "#CC0000",
      },
      height:{
        "65vh": "65vh",
        "5%": "5%",
        "95%": "95%",
      },
      width:{
        "c-width": "1920px",
        "95%": "95%",
      },
    },
  },
  plugins: [],
}
