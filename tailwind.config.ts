import type { Config } from 'tailwindcss';

const WIDTH_VALUES = {
  '620': '38.75rem',
  '544': '34rem',
  '284': '17.75rem',
};

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      width: {
        ...WIDTH_VALUES,
      },
      maxWidth: {
        ...WIDTH_VALUES,
      },
      minWidth: {
        ...WIDTH_VALUES,
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        black: '#171717',
        gray70: '#333236',
        gray60: '#4B4B4B',
        gray50: '#787486',
        gray40: '#9fa6b2',
        gray30: '#d9d9d9',
        gray20: 'eeeeee',
        gray10: '#fafafa',
        white: '#ffffff',
        violet: '#5534da',
        violet8: '#f1effd',
        red: '#d6173a',
        green: '#7ac555',
        purple: '#760dde',
        orange: '#ffa500',
        blue: '#76a5ea',
        pink: '#e876ea',
      },
    },
    screens: {
      mobile: '375px',
      tablet: '744px',
      desktop: '1024px',
    },
  },
  plugins: [],
};
export default config;
