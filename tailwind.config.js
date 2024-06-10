/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      textColor: {
        pvBlue: "rgb(139,195,241)",
        trustgreen:"rgba(3,142,96,1)",
        transparencyyellow:"rgba(216,157,8,1)",
        excellenceBlue:"rgba(46,148,234,1)",
        DarkBlue:"rgba(6,78,137,1)"
      }
    },
  },
  plugins: [],
};
