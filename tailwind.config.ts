import type { Config } from 'tailwindcss';

type AccType = Record<string, string>;

const range = (start: number, end: number): number[] => {
  let array = [];
  for (let i = start; i <= end; ++i) {
    array.push(i);
  }
  return array;
};

const pxToRem = (px: number, base = 16) => `${px / base}rem`;

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './page-layout/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './page-layout/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    spacing: {
      ...range(0, 2000).reduce((acc: AccType, px: number) => {
        acc[`${px}pxr`] = pxToRem(px);
        return acc;
      }, {}),
    },
    fontSize: {
      ...range(0, 2000).reduce((acc: AccType, px: number) => {
        acc[`${px}pxr`] = pxToRem(px);
        return acc;
      }, {}),
    },
    extend: {
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
        gray20: '#EEEEEE',
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
        yellow: '#ffd600',
        brown: '#694b41',
        lightGreen: '#d1f2ae',
        lightPurple: '#d0def2',
        lightOrange: '#ffa500',
        lightBlue: '#c7e4f4',
        lightPink: '#fadce9',
        lightRed: '#e9bba9',
        lightYellow: '#ffed8e',
        pastelRed: '#db7151',
        pastelBlue: '#81a3ca',
        darkBlue: '#2e5c95',
        lightBrown: '#e1d3c0',
      },
    },
    screens: {
      mobile: { min: '375px', max: '743px' },
      tablet: { min: '744px', max: '1023px' },
      desktop: '1024px',
    },
  },
  plugins: [],
};
export default config;
