import { fuchsia, teal, zinc } from 'tailwindcss/colors'

function renderColors({ addBase, theme }) {
  function extractColorVars(colorObj, colorGroup = '') {
    return Object.keys(colorObj).reduce((vars, colorKey) => {
      const value = colorObj[colorKey]

      const newVars =
        typeof value === 'string'
          ? { [`--color${colorGroup}-${colorKey}`]: value }
          : extractColorVars(value, `-${colorKey}`)

      return { ...vars, ...newVars }
    }, {})
  }

  addBase({
    ':root': extractColorVars(theme('colors'))
  })
}

/** @type {import('tailwindcss').Config} */
const twConfig = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './data/**/*.{md,yml}'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: fuchsia,
        secondary: teal,
        neutral: zinc
      }
    }
  },
  plugins: [require('@tailwindcss/typography'), renderColors]
}

export default twConfig
