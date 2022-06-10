module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'main': ['IRANSans', 'sans-serif'],
      },
      colors: {
        'primary': '#6366f1',
        'secondary': '#fafafa',
        'wheat': '#faebd7',
        'lavender': '#e6e6fa',
        'dark-sunny': '#fed766',
        'sky': '#1098F7',
        'season': '#ffb7c5',
        'digest': '#fefcee',
        'digest-border': '#c9ba0d',
        'light-red': '#f3605d',
        'sup-light': '#f1f1f1',
        'border-gray-bottom': '#f0f0f0',
        'light-bg': '#f8f8f8',
        'icon-color': '#757575',
        'title-color': '#2b2b2b',
        'text-color': '#464040',
        'light-gray': '#f5f7fa',
      },
      boxShadow: {
        'strong-inner': '0px 0px 4px 0px inset #e6e6fa',
      },
    },
  },
  plugins: [],
}
