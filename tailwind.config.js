const colors = require('tailwindcss/colors')

module.exports = {
  content: ['./pages/**/*.{js,ts}', './components/**/*.{js,ts}'],
  mode: 'jit',
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: colors.teal,
        secondary: colors.fuchsia,
        neutral: colors.coolGray
      }
    }
  },
  variants: {
    extend: {
      backgroundColor: ['dark']
    }
  },
  plugins: []
}
