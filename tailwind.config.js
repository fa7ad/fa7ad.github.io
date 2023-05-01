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

export const content = [
  './app/**/*.{js,ts,jsx,tsx}',
  './pages/**/*.{js,ts,jsx,tsx}',
  './components/**/*.{js,ts,jsx,tsx}',
  './data/**/*.{md,yml}'
]
export const darkMode = 'class'
export const theme = {
  extend: {
    colors: {
      primary: fuchsia,
      secondary: teal,
      neutral: zinc
    }
  }
}
export const plugins = [require('@tailwindcss/typography'), renderColors]

/** @type {import('tailwindcss').Config} */
const twConfig = {
  content,
  darkMode,
  theme,
  plugins
}

export default twConfig
