import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/flowbite/**/*.js',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        back_card: "url('../../public/back_card.png')",
        people: "url('../../public/people.jpg')",
        book_fly: "url('../../public/book_fly.png')",
        book_cover: "url('../../public/book_cover.png')",
      },
    },
    colors: {
      blue_1: '#40576b',
    },
  },
  plugins: [],
};

export default config;
