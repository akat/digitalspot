import type { Config } from 'tailwindcss'

export default {
  content: ['./app/**/*.{vue,js,ts}'],
  theme: {
    extend: {
      colors: {
        ink: '#040707',
        leaf: '#040707',
        paper: '#fafafa',
      },
    },
  },
} satisfies Config
