import type { Config } from 'tailwindcss'

export default {
  content: ['./app/**/*.{vue,js,ts}'],
  theme: {
    extend: {
      colors: {
        ink: '#040707',
        leaf: '#040707',
        paper: '#fafafa',
        // Set per slice by the .slice-theme-* classes in main.css
        slice: {
          bg: 'var(--slice-bg)',
          fg: 'var(--slice-fg)',
          body: 'var(--slice-body)',
          subtle: 'var(--slice-subtle)',
          line: 'var(--slice-line)',
        },
      },
    },
  },
} satisfies Config
