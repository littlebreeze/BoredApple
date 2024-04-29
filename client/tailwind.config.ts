import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ourTheme: '#0064FF',
        ourBlue: '#4893FF',
        ourPurple: '#CAB8FF',
        ourPink: '#F0A8EA',
        ourRed: '#FF8A8C',
        ourYellow: '#FFC28A',
        ourGreen: '#51D0A2',
        ourLightGray: '#F2F2F2',
        ourGray: '#D9D9D9',
        ourDarkGray: '#737373',
        ourBlack: '#202632',
      },
    },
    fontFamily: {
      Pretendard: ['Pretendard'],
      Ansungtangmyun: ['Ansungtangmyun'],
      Batang: ['Batang'],
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
};
export default config;
