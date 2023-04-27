/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "cyan-blue": "#023E8A",
        "light-white": "rgba(255, 255, 255, 0.17)",
        "red-me": "#FF0000",
        "grey": "#F8F8FF",
        "cambg": "#CAF0F8",
        "camiconbg": "#0096C7",
        "repsbg": "#9500AD",
        "speedbg": "#E25100",
        "btnstart": "#03045E",
        "btnstop": "#CC0000",
        "#03045E": "#03045E",
        "#D9D9D9": "#D9D9D9",
      },
      height:{
        "30vh": "30vh",
        "65vh": "65vh",
        "5%": "5%",
        "95%": "95%",
      },
      width:{
        "c-width": "1920px",
        "95%": "95%",
        "90%": "90%",
        "350px": "350px",
        "10%": "10%",
        "70%": "70%",
        "550px": "550px",
      },
      zIndex: {
        '1': '1',
      },
      boxShadow: {
        'cshadow': '0 0 8px 4px rgba(0, 0, 0, 0.1)',
        '#023E8A': '0 0 8px 4px #023E8A'
      },
      backgroundImage: {
        'dash-banner': "url('/src/img/banner.jpg')",
      },
    },
  },
  plugins: [],
}
