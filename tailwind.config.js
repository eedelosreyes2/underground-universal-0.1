module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{html,js}',
    './node_modules/tw-elements/dist/js/**/*.js',
  ],
  darkMode: 'class',
  theme: {
    screens: {
      sm: '715px',
      md: '895px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    colors: {
      h3: '#555555',
      primary: '#FF0000',
      secondary: '#C0C0C0',
      rookie: '#FF6200',
      player: '#FFA200',
      pro: '#FFC800',
      veteran: '#FFEA00',
      white: 'white',
      gray: 'gray',
      black: 'black',
      fill: {
        dark: '#0C0C0C',
        light: '#F4F6F9',
      },
      nav: {
        dark: '#1A1A1A',
        light: '#FFFFFF',
      },
      component: {
        dark: '#131313',
        light: '#FEFEFE',
      },
      spotify: '#1DB954',
      appleMusic: '#FC3C44',
      soundcloud: '#F27100',
      bandcamp: '#4AC4E4',
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
    require('tw-elements/dist/plugin'),
  ],
};
