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

module.exports = {
  content: ['./pages/**/*.{js,ts}', './components/**/*.{js,ts}'],
  mode: 'jit',
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: colors.teal,
        secondary: colors.fuchsia,
        neutral: colors.gray
      }
    }
  },
  variants: {
    extend: {
      backgroundColor: ['dark'],
      typography: ['dark']
    }
  },
  plugins: [require('@tailwindcss/typography'), renderColors]
}
