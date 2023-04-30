const colors = require('tailwindcss/colors')

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
module.exports = {
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
        primary: colors.fuchsia,
        secondary: colors.teal,
        neutral: colors.zinc
      }
    }
  },
  plugins: [require('@tailwindcss/typography'), renderColors]
}
