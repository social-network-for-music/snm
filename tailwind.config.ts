/** @type {import("tailwindcss").Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        spotify: {
          black: "#000000",
          gray: "#303030",
          lightgray: "#353535",
          darkgray: "#242424",
          green: "#1DB954",
          greendark: "#19823E"
        }
      }
    },
    screens: {
      "xs": "320px",
      "sm": "576px",
      "md": "768px",
      "lg": "1024px",
      "xl": "1280px",
      "2xl": "1536px"
    }
  },
  plugins: [],
}
