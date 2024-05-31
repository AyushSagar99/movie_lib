/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    'node_modules/flowbite-react/lib/esm/**/*.js',
  ],
  theme: {
    extend: {
      colors: {
      'black-rgba': 'rgba(0, 0, 0, 0.5)',
    },
  },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}

