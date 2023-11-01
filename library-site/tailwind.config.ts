import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}',
    './node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}',
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
        library: "url('../../public/library.png')",
      },
    },
    colors: {
      blue_1: '#40576b',
      white_1: '#ffffff',
    },
  },
  plugins: [],
};

export default config;
