const defaultTheme = require("tailwindcss/defaultTheme")

export default {
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Poppins"', ...defaultTheme.fontFamily.sans],
        mono: ['"Ubuntu Mono"', ...defaultTheme.fontFamily.mono],
      },
    },
  },
}
