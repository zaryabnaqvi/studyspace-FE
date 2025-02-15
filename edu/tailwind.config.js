/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui"
import animated from 'tailwindcss-animated'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', 'sans-serif'],
        ibm: ['IBM Plex Mono', 'monospace'],
        rm: ['Roboto Mono', 'monospace']
      },
      gridTemplateColumns: {
        '70/30': '70% 28%'
      }
    },
  },
  plugins: [
    daisyui,
    animated
  ],
  daisyui: {
    themes: ["light"],
    darkTheme: "", // name of one of the included themes for dark mode
    base: false, // applies background color and foreground color for root element by default
    styled: true, // include daisyUI colors and design decisions for all components
    utils: true, // adds responsive and modifier utility classes
    prefix: "", // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
    logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
    themeRoot: ":root", // The element that receives theme color CSS variables
  },
}