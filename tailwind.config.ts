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

          gray: "#242424",
          lightgray: "#2A2A2A",
          lightergray: "#757575",
          darkgray: "#121212",
          green: "#1DB954",
          lightgreen: "#1FDF64",
          darkgreen: "#19823E"
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
