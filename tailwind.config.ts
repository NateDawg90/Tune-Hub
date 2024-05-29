import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        jet: {
          300: '#3D3B3C',
          500: '#323031',
        },
        gray: '#7F7979',
        silver: '#C1BDB3',
        'davys-gray': '#5F5B6B',
      },
    },
  },
  plugins: [],
};
export default config;
