/** @type {import('tailwindcss').Config} */
export default {
content: [
  "./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",
],

theme: {
    extend: {
      colors: {
        primary: '#f0f2f5',
        secondary: '#ff813f',
        tertiary: '#222222',
        customGreen: '#587A57',
      slate: {
        10: '#f1f3f4',
      },
      green: {
        50: '#30AF5B',
        90: '#292C27',
        900: '#587A57',
      },
      gray: {
        10: '#EEEEEE',
        20: '#A2A2A2',
        30: '#787878',
        50: '#585858',
        90: '#141414',
      },
    },

    backgroundImage: {
      hero: "url('/src/assets/msu1.png')",
      banneroffer: "url('/src/assets/banneroffer.png')",
      },

      screens: {
        xs: '400px',
        '3xl': '1440px',
        '4xl': '2200px',
      },

      maxwidth: {
      '10x1': '1512px',
      },

      borderRadius: {
      '5x1': '40px',
      },
    },
  },

  plugins: [],
}